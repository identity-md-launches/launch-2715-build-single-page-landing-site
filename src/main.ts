import './style.css';
import { flowDiagram, goals, swarmField } from './visuals';

const xUrl = 'https://x.com/routrnetwork';
const root = document.querySelector<HTMLDivElement>('#app')!;

root.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header wrap">
    <a class="wordmark" href="#" aria-label="routr/ home">routr<span>/</span></a>
    <nav aria-label="Main navigation">
      <a class="desktop-nav" href="#how-it-works">HOW IT WORKS</a>
      <a class="desktop-nav" href="#swarm">THE SWARM</a>
      <button class="nav-link" type="button" data-open="docs">DOCS <span aria-hidden="true">↗</span></button>
      <a class="nav-x" href="${xUrl}" target="_blank" rel="noopener noreferrer" aria-label="routr/ on X (opens in a new tab)">X <span aria-hidden="true">↗</span></a>
    </nav>
  </header>

  <main id="main">
    <section class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-body">
        <div class="hero-copy">
          <h1 id="hero-title" aria-label="routr/"><span class="typed-word" aria-hidden="true">routr<span class="slash">/</span></span><span class="cursor" aria-hidden="true">_</span></h1>
          <p class="tagline">liquidity in. compute out.<br/> <span>agents never stop.</span></p>
          <p class="hero-description">The routing layer for AI agent swarms.<br class="desktop-break"/> Liquidity funds compute. Agents keep going.</p>
          <div class="hero-actions">
            <button class="button button-primary" type="button" data-open="launch">Launch App <span class="soon">(soon)</span><span aria-hidden="true">↗</span></button>
            <button class="button button-secondary" type="button" data-open="docs">Docs <span aria-hidden="true">↗</span></button>
            <a class="hero-x" href="${xUrl}" target="_blank" rel="noopener noreferrer" aria-label="routr/ on X (opens in a new tab)">X <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div class="hero-agent" aria-hidden="true">
          <div class="agent-coordinate coordinate-top">agent_001 <span>→</span> next()</div>
          <div class="ascii-agent"><span class="antenna">│<br/>┌─┴─┐</span><span class="face">[o_o]</span><span class="legs">└┬─┬┘<br/> ┘ └ </span></div>
          <span class="agent-orbit orbit-one">call()</span><span class="agent-orbit orbit-two">00101</span><span class="agent-orbit orbit-three">[-_-]</span><span class="agent-orbit orbit-four">[&gt;_&lt;]</span>
          <div class="agent-coordinate coordinate-bottom"><span>↳</span> ready for the next request<span class="agent-caret">_</span></div>
        </div>
      </div>
    </section>

    <section class="routing-section wrap" aria-labelledby="routing-title">
      <div class="section-bar"><h2 id="routing-title">THE COMPUTE LOOP</h2><button type="button" id="motion-toggle" class="motion-toggle" aria-pressed="false"><span aria-hidden="true">[Ⅱ]</span> PAUSE MOTION</button></div>
      <figure class="flow-figure">
        ${flowDiagram()}
        <figcaption class="sr-only">A user deposits liquidity in an AMM pool. Agents send requests to routr/, which routes them to a model provider. A compute funding line pays the provider from the pool.</figcaption>
      </figure>
      <div class="diagram-footer"><span>LIQUIDITY → ROUTING → INFERENCE</span><span class="diagram-note">a continuous loop, by design.</span></div>
    </section>

    <section class="how-section wrap" id="how-it-works" aria-labelledby="how-title">
      <div class="section-heading"><h2 id="how-title">Fund the loop.</h2><p>From liquidity to the next thought.<br/> Here’s how it works.</p></div>
      <ol class="steps">
        <li class="step"><div class="step-top"><h3><span class="step-number">01 /</span> Liquidity goes in.</h3><span class="step-icon" aria-hidden="true">[$]</span></div><p>Liquidity in an AMM pool becomes the funding source for agent compute.</p><code>pool → compute</code></li>
        <li class="step"><div class="step-top"><h3><span class="step-number">02 /</span> Agents make the call.</h3><span class="step-icon" aria-hidden="true">[o_o]</span></div><p>Agents send requests to routr/. The routing layer sends them to model providers.</p><code>request → provider</code></li>
        <li class="step"><div class="step-top"><h3><span class="step-number">03 /</span> The pool picks it up.</h3><span class="step-icon" aria-hidden="true">[≡]</span></div><p>Inference is paid from the pool. Agents keep working without managing API keys or budgets.</p><code>paid → next()</code></li>
      </ol>
    </section>

    <section class="swarm-section" id="swarm" aria-labelledby="swarm-title">
      <div class="wrap">
        <div class="section-heading"><h2 id="swarm-title">A swarm with a purpose.</h2><p>A swarm of independent minds.<br/> A shared source of compute.</p></div>
        <div class="swarm-field">
          <div class="swarm-caption"><span>THE POSSIBILITY SPACE</span><span aria-hidden="true">[ every agent, a purpose ]</span></div>
          ${swarmField()}
          <ul class="goal-list sr-only">${goals.map((goal) => `<li>${goal}</li>`).join('')}</ul>
          <div class="swarm-bottom"><span>[o_o] <span class="muted">→</span> [^_^]</span><span>let them cook.</span></div>
        </div>
      </div>
    </section>

    <section class="terminal-section wrap" aria-labelledby="terminal-title">
      <div class="terminal-intro"><h2 id="terminal-title">The next call<br/> is already waiting.</h2><p>Request. Route. Pay. Repeat.<br/> A look inside the loop.</p><button id="send-request" class="button button-secondary" type="button">Send a request <span aria-hidden="true">→</span></button><p class="simulation-note">A local simulation; no funds move.</p></div>
      <div class="terminal">
        <div class="terminal-toolbar"><span><span aria-hidden="true">[&gt;_]</span> routr/ terminal</span><span class="simulated-label">simulated</span></div>
        <div class="terminal-body"><div class="terminal-command"><span class="accent">$</span> routr observe --requests</div><ol id="log-lines" class="log-lines" aria-label="Simulated request log"></ol><div class="terminal-prompt" aria-hidden="true"><span class="accent">›</span> <span class="log-cursor">_</span></div></div>
        <div class="terminal-status"><span id="log-state">[ ready ]</span><span id="request-count">3 requests completed</span></div>
      </div>
      <p id="request-announcement" class="sr-only" role="status"></p>
    </section>

    <section class="closing wrap" aria-label="Follow the launch"><span class="closing-face" aria-hidden="true">[^_^]</span><p>The swarm is coming<span class="accent">.</span></p><a href="${xUrl}" target="_blank" rel="noopener noreferrer">Follow @routrnetwork <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></section>
  </main>

  <footer class="site-footer wrap"><a class="wordmark" href="#" aria-label="routr/ home">routr<span>/</span></a><span>contract: TBA</span><a href="${xUrl}" target="_blank" rel="noopener noreferrer" aria-label="routr/ on X (opens in a new tab)">X <span aria-hidden="true">↗</span></a><span class="footer-message">built for what comes next.</span></footer>

  <dialog id="launch-dialog" aria-labelledby="launch-title" aria-describedby="launch-description">
    <div class="dialog-bar"><span>routr/ launch status</span><button type="button" class="close-button" data-close aria-label="Close launch status">[x]</button></div>
    <div class="dialog-content"><span class="dialog-face" aria-hidden="true">[o_o]</span><h2 id="launch-title">The swarm is getting ready.</h2><p id="launch-description">The app is coming soon. Launch date and contract: TBA.</p><p>Follow routr/ on X for launch updates.</p><a class="button button-primary" href="${xUrl}" target="_blank" rel="noopener noreferrer">Follow on X <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></div>
  </dialog>

  <dialog id="docs-dialog" aria-labelledby="docs-title">
    <div class="dialog-bar"><span>routr/ concept notes</span><button type="button" class="close-button" data-close aria-label="Close documentation">[x]</button></div>
    <div class="dialog-content docs-content"><h2 id="docs-title">The routing layer, explained.</h2><p>routr/ connects agent requests to model providers and pays inference from liquidity in an AMM pool.</p><dl><dt>01 / Funding</dt><dd>Liquidity in the pool funds compute. Pool parameters and economic details: TBA.</dd><dt>02 / Routing</dt><dd>Agents send requests to routr/. It routes those requests to model providers.</dd><dt>03 / Continuity</dt><dd>The pool pays for inference so agents can keep running without managing individual API keys or budgets.</dd></dl><div class="docs-note"><span>DEVELOPER REFERENCE</span><p>API endpoints, integrations and launch details: TBA. These notes describe the concept; the app is not live yet.</p></div><a href="${xUrl}" target="_blank" rel="noopener noreferrer">Follow development on X <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></div>
  </dialog>
`;

// Native dialogs provide modality, keyboard containment and Escape handling.
for (const opener of document.querySelectorAll<HTMLButtonElement>('[data-open]')) {
  opener.addEventListener('click', () => {
    const dialog = document.querySelector<HTMLDialogElement>(`#${opener.dataset.open}-dialog`)!;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      opener.focus({ preventScroll: true });
    }, { once: true });
  });
}
for (const dialog of document.querySelectorAll<HTMLDialogElement>('dialog')) {
  dialog.querySelector<HTMLButtonElement>('[data-close]')!.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle = document.querySelector<HTMLButtonElement>('#motion-toggle')!;
let userPaused = false;
const syncMotion = () => {
  const paused = userPaused || reducedMotion.matches;
  document.documentElement.dataset.motion = paused ? 'paused' : 'running';
  if (paused) document.querySelector('.typed-word')?.classList.add('typing-complete');
  motionToggle.setAttribute('aria-pressed', String(userPaused));
  motionToggle.innerHTML = reducedMotion.matches
    ? '<span aria-hidden="true">[=]</span> REDUCED MOTION'
    : userPaused
      ? '<span aria-hidden="true">[&gt;]</span> RESUME MOTION'
      : '<span aria-hidden="true">[Ⅱ]</span> PAUSE MOTION';
  motionToggle.disabled = reducedMotion.matches;
};
motionToggle.addEventListener('click', () => { userPaused = !userPaused; syncMotion(); });
reducedMotion.addEventListener('change', syncMotion);
syncMotion();

const log = document.querySelector<HTMLOListElement>('#log-lines')!;
const sendButton = document.querySelector<HTMLButtonElement>('#send-request')!;
const logState = document.querySelector<HTMLSpanElement>('#log-state')!;
const count = document.querySelector<HTMLSpanElement>('#request-count')!;
const announcement = document.querySelector<HTMLParagraphElement>('#request-announcement')!;
let completed = 3;

function addLog(id: number, stage: 'request' | 'routed' | 'paid') {
  const message = {
    request: '<span class="log-face">[o_o]</span> agent → routr/',
    routed: '<span class="log-face">[≡]</span> → model provider',
    paid: '<span class="log-face">[$]</span> pool → inference',
  }[stage];
  const row = document.createElement('li');
  row.innerHTML = `<span class="log-id">${String(id).padStart(5, '0')}</span><span class="log-stage ${stage === 'paid' ? 'accent' : ''}">${stage}</span><span class="log-message">${message}</span>`;
  log.append(row);
  while (log.children.length > 9) log.firstElementChild?.remove();
}

for (let id = 1; id <= completed; id++) {
  (['request', 'routed', 'paid'] as const).forEach((stage) => addLog(id, stage));
}

const stageDelay = async () => {
  if (!userPaused && !reducedMotion.matches) await new Promise<void>((resolve) => window.setTimeout(resolve, 320));
};

sendButton.addEventListener('click', async () => {
  sendButton.disabled = true;
  logState.textContent = '[ routing... ]';
  announcement.textContent = '';
  const nextId = completed + 1;
  addLog(nextId, 'request');
  await stageDelay();
  addLog(nextId, 'routed');
  await stageDelay();
  addLog(nextId, 'paid');
  completed = nextId;
  count.textContent = `${completed} requests completed`;
  logState.textContent = '[ ready ]';
  announcement.textContent = `Simulated request ${completed} routed to a model provider and paid from the pool. No funds moved.`;
  sendButton.disabled = false;
});
