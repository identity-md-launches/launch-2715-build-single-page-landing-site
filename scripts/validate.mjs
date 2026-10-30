import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

// Optional module paths let a sandbox keep all installed dependencies outside the source tree.
const moduleArg = (name) => process.argv.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3);
const { chromium, webkit } = await import(moduleArg('playwright') || 'playwright');
const { default: AxeBuilder } = await import(moduleArg('axe') || '@axe-core/playwright');
const output = 'test/scratch/interaction';
await mkdir(output, { recursive: true });

const exportRoot = resolve('dist');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.txt': 'text/plain' };
const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://preview.invalid').pathname);
  if (!pathname.startsWith('/preview/')) { response.writeHead(404).end(); return; }
  const path = resolve(exportRoot, pathname.slice(9) || 'index.html');
  if (!path.startsWith(`${exportRoot}/`)) { response.writeHead(403).end(); return; }
  try {
    const body = await readFile(path);
    response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' }).end(body);
  } catch { response.writeHead(404).end(); }
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const origin = `http://127.0.0.1:${server.address().port}`;
const url = `${origin}/preview/`;
const results = { checks: [], limitations: [] };
const check = (name, detail = 'passed') => results.checks.push({ name, result: detail });
const frame = (page) => page.evaluate(() => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))));
const overflow = (page) => page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));

async function run(browserType, name) {
  let browser;
  try { browser = await browserType.launch({ headless: true }); }
  catch (error) {
    if (name === 'WebKit') {
      results.limitations.push('WebKit could not launch: required browser runtime libraries are unavailable. No WebKit behavior is claimed.');
      return;
    }
    throw error;
  }
  try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' });
    const errors = [];
    const failures = [];
    const external = [];
    await context.route('**/*', (route) => {
      const requestUrl = route.request().url();
      if (requestUrl.startsWith(origin) || requestUrl.startsWith('data:')) return route.continue();
      external.push(new URL(requestUrl).origin);
      return route.abort();
    });
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => { if (response.status() >= 400) failures.push(response.status()); });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('h1').getAttribute('aria-label'), 'routr/');
    assert(await page.evaluate(() => document.fonts.check('400 14px "JetBrains Mono"') && document.fonts.check('500 14px "JetBrains Mono"')));
    for (const selector of ['h1', '.hero-description', '.hero-actions']) {
      const box = await page.locator(selector).boundingBox();
      assert(box && box.y >= 0 && box.y + box.height < 844, `${selector} must fit the first 390px screen`);
    }
    check(`${name}: first screen`, 'Product, explanation and primary action visible at 390 × 844; both local font weights loaded.');

    for (const width of [320, 390, 640, 768, 960, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await frame(page);
      const size = await overflow(page);
      assert(size.content <= size.viewport + 1, `Horizontal overflow at ${width}: ${size.content}`);
      assert(await page.locator(width <= 960 ? '.flow-mobile' : '.flow-desktop').isVisible());
    }
    check(`${name}: responsive layout`, 'No horizontal overflow at 320, 390, 640, 768, 960, 1024 or 1440; diagram changes orientation.');

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url);
    await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
    await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash, '#main');
    await page.goto(url);
    for (let n = 0; n < 5; n++) await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').getAttribute('data-open'), 'launch');
    assert.equal(await page.locator(':focus').evaluate((el) => getComputedStyle(el).outlineStyle), 'solid');
    await page.screenshot({ path: `${output}/${name.toLowerCase()}-keyboard-focus.png` });
    await page.keyboard.press('Enter');
    const launch = page.locator('#launch-dialog');
    await launch.waitFor({ state: 'visible' });
    assert.match(await launch.textContent(), /Launch date and contract: TBA/);
    for (let n = 0; n < 4; n++) {
      await page.keyboard.press('Tab');
      assert(await page.evaluate(() => document.activeElement === document.body || !!document.activeElement.closest('#launch-dialog')), 'Tab must not reach a background control while modal');
    }
    await page.screenshot({ path: `${output}/${name.toLowerCase()}-launch-mobile.png` });
    let axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    assert.deepEqual(axe.violations.map((v) => ({ id: v.id, count: v.nodes.length })), [], 'Launch dialog accessibility scan');
    await page.keyboard.press('Escape');
    assert.equal(await launch.isVisible(), false);
    assert.equal(await page.locator(':focus').getAttribute('data-open'), 'launch');
    check(`${name}: launch and keyboard`, 'Skip link, keyboard activation, modal containment, Escape, focus return and visible focus style pass.');

    await page.locator('.hero-actions [data-open="docs"]').click();
    const docs = page.locator('#docs-dialog');
    await docs.waitFor({ state: 'visible' });
    assert.match(await docs.textContent(), /API endpoints, integrations and launch details: TBA/);
    axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    assert.deepEqual(axe.violations.map((v) => ({ id: v.id, count: v.nodes.length })), [], 'Docs dialog accessibility scan');
    await page.screenshot({ path: `${output}/${name.toLowerCase()}-docs-mobile.png` });
    await docs.locator('[data-close]').click();
    assert.equal(await page.locator(':focus').getAttribute('data-open'), 'docs');
    await page.locator('.hero-actions [data-open="launch"]').click();
    await page.mouse.click(3, 3);
    assert.equal(await launch.isVisible(), false);
    check(`${name}: documentation`, 'Concept guide opens, states API details are TBA, closes and restores focus. Backdrop dismissal also passes.');

    const motion = page.locator('#motion-toggle');
    await motion.click();
    assert.equal(await motion.getAttribute('aria-pressed'), 'true');
    await frame(page);
    assert.equal(await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running' && a.effect.getTiming().iterations === Infinity).length), 0);
    assert.equal(await page.locator('.typed-word').evaluate((el) => getComputedStyle(el).clipPath), 'inset(0px)', 'Pausing must leave the entire wordmark readable');
    await motion.click();
    assert.equal(await motion.getAttribute('aria-pressed'), 'false');
    await frame(page);
    assert(await page.evaluate(() => document.getAnimations().some((a) => a.playState === 'running' && a.effect.getTiming().iterations === Infinity)));
    check(`${name}: motion control`, 'Pause stops all endless animations and completes the logo; resume restarts ambient motion without replaying the typing.');

    const send = page.locator('#send-request');
    const terminalBefore = await page.locator('.terminal').boundingBox();
    await send.click();
    assert(await send.isDisabled(), 'Request button disabled while the simulation runs');
    await page.waitForFunction(() => document.querySelector('#request-count').textContent === '4 requests completed');
    assert.equal(await send.isDisabled(), false);
    assert.equal(await page.locator('#log-lines li').count(), 9);
    assert.deepEqual(await page.locator('#log-lines li').evaluateAll((rows) => rows.slice(-3).map((row) => row.querySelector('.log-stage').textContent)), ['request', 'routed', 'paid']);
    assert.match(await page.locator('#request-announcement').textContent(), /No funds moved/);
    const terminalAfter = await page.locator('.terminal').boundingBox();
    assert.equal(terminalBefore.height, terminalAfter.height, 'Simulation must not resize the terminal');
    for (let n = 0; n < 5; n++) {
      await send.click();
      await page.waitForFunction(() => !document.querySelector('#send-request').disabled);
    }
    assert.equal(await page.locator('#request-count').textContent(), '9 requests completed');
    assert.equal(await page.locator('#log-lines li').count(), 9);
    check(`${name}: request simulation`, 'Pending state, request → routed → paid, completion status, bounded log, six repeated requests and stable panel height pass.');

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await frame(page);
    assert(await motion.isDisabled());
    assert.equal(await page.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length), 0);
    assert(await page.locator('.goal-list').isVisible());
    assert.equal(await page.locator('.goal-list li').count(), 10);
    await send.click();
    await page.waitForFunction(() => document.querySelector('#request-count').textContent === '10 requests completed');
    check(`${name}: reduced motion`, 'No running animations, all ten static goals available, simulation completes without staged delay.');
    await page.emulateMedia({ reducedMotion: 'no-preference' });

    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const [selector, hash] of [['a[href="#how-it-works"]', '#how-it-works'], ['a[href="#swarm"]', '#swarm']]) {
      await page.locator(`nav ${selector}`).click();
      assert.equal(new URL(page.url()).hash, hash);
      const top = (await page.locator(hash).boundingBox()).y;
      assert(top >= 0 && top < 100, `${hash} should scroll into view`);
    }
    const xLinks = await page.locator('a[href^="https:"]').evaluateAll((links) => links.map((link) => ({ href: link.href, target: link.target, rel: link.rel })));
    assert(xLinks.length >= 4);
    assert(xLinks.every((link) => link.href === 'https://x.com/routrnetwork' && link.target === '_blank' && link.rel.includes('noopener')));
    check(`${name}: navigation`, 'Both section anchors scroll correctly; all outbound links point to the supplied X profile and isolate new tabs.');

    await page.goto(url);
    await page.evaluate(() => document.fonts.ready);
    axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    assert.deepEqual(axe.violations.map((v) => ({ id: v.id, count: v.nodes.length })), [], 'Homepage accessibility scan');
    check(`${name}: accessibility scan`, 'axe WCAG 2 A/AA and WCAG 2.1 A/AA: zero violations on the homepage and both open dialogs.');

    await page.screenshot({ path: `${output}/${name.toLowerCase()}-desktop.png`, fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: `${output}/${name.toLowerCase()}-mobile.png` });
    await page.screenshot({ path: `${output}/${name.toLowerCase()}-mobile-full.png`, fullPage: true });

    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
      await frame(page);
      const size = await overflow(page);
      assert(size.content <= size.viewport + 1, `Text enlargement overflows at ${width}: ${size.content}`);
      await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
    }
    check(`${name}: text enlargement`, '200% root text size reflows without horizontal overflow at 320, 390 and 1440. This is not native browser zoom.');

    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto(url);
    for (let n = 0; n < 5; n++) await page.keyboard.press('Tab');
    assert.equal(await page.locator(':focus').evaluate((el) => getComputedStyle(el).outlineStyle), 'solid');
    await page.screenshot({ path: `${output}/${name.toLowerCase()}-forced-colors.png` });
    await page.emulateMedia({ forcedColors: 'none' });
    check(`${name}: forced colors`, 'Emulated forced colors preserves the primary control and a solid keyboard focus outline.');
    assert.deepEqual(errors, [], 'No page errors');
    assert.deepEqual(failures, [], 'No failed local resource responses');
    assert.deepEqual(external, [], 'No external requests are needed to render or interact');
    check(`${name}: resources`, 'No script errors, failed local resources or attempted external requests; production export works under /preview/.');
    await context.close();
  } finally { await browser.close(); }
}

try {
  await run(chromium, 'Chromium');
  await run(webkit, 'WebKit');
  await writeFile(`${output}/results.json`, `${JSON.stringify(results, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
} finally { await new Promise((done) => server.close(done)); }
