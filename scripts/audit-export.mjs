import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';

const paths = ['assets', 'artifacts', 'dist', 'public', 'src', 'scripts', 'LICENSES', 'index.html', 'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 'README.md', 'DESIGN.md', 'NOTICE.md'];
async function size(path) {
  const info = await stat(path);
  if (!info.isDirectory()) {
    assert(!/\.(tgz|zip|map)$/.test(path), `Unnecessary packaging artifact: ${path}`);
    return info.size;
  }
  const entries = await readdir(path, { withFileTypes: true });
  let bytes = 0;
  for (const entry of entries) {
    assert(!/^(node_modules|\.cache|\.npm|\.vite|vendor)$/.test(entry.name), `Generated dependency/cache path: ${path}`);
    assert(!entry.isSymbolicLink(), 'No symlinks or submodules belong in the submission');
    bytes += await size(join(path, entry.name));
  }
  return bytes;
}
let total = 0;
for (const path of paths) total += await size(path);
assert(total <= 8_388_608, `Submission exceeds 8 MiB: ${total} bytes`);

const index = await readFile('dist/index.html', 'utf8');
assert.match(index, /<title>routr\//);
for (const key of ['description', 'og:title', 'og:image']) assert(index.includes(`"${key}"`));
const refs = [...index.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1]);
const share = index.match(/property="og:image" content="([^"]+)"/)[1];
for (const ref of [...refs, share]) {
  assert(!ref.startsWith('/') && !ref.includes('://'), `Export reference must be local and relative: ${ref}`);
  await readFile(resolve('dist', ref));
}
for (const file of await readdir('dist/assets')) {
  if (!file.endsWith('.css')) continue;
  const path = join('dist/assets', file);
  const css = await readFile(path, 'utf8');
  for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    if (match[1].startsWith('#')) continue; // SVG marker references are document fragments, not files.
    assert(!match[1].startsWith('/') && !match[1].includes('://'), 'CSS assets must be local and relative');
    await readFile(resolve(dirname(path), match[1]));
  }
}
for (const file of ['favicon.svg', 'og-image.png', 'fonts/jetbrains-mono-regular.woff2', 'fonts/jetbrains-mono-medium.woff2', 'fonts/OFL.txt']) {
  assert((await readFile(`public/${file}`)).equals(await readFile(`dist/${file}`)), `${file} differs from its public source`);
}
const png = await readFile('dist/og-image.png');
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
const manifest = JSON.parse(await readFile('package.json', 'utf8'));
const lock = JSON.parse(await readFile('package-lock.json', 'utf8'));
assert.deepEqual(manifest.devDependencies, lock.packages[''].devDependencies);
process.stdout.write(`${JSON.stringify({ submissionBytes: total, limitBytes: 8_388_608, productionExportBytes: await size('dist'), assetReferences: 'all relative and present', shareImage: '1200 × 630 PNG', dependencyLock: 'matches manifest' }, null, 2)}\n`);
