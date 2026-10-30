const faces = ['[o_o]', '[-_-]', '[>_<]', '[=_=]', '[^_^]', '[O_O]'];

const packet = (path: string, duration: number, delay = 0) =>
  `<circle class="packet" r="3" style="offset-path:path('${path}');--duration:${duration}s;--delay:${delay}s"/>`;

const wire = (path: string, duration = 3, delay = 0) =>
  `<path class="wire" d="${path}"/>${packet(path, duration, delay)}`;

const node = (x: number, y: number, w: number, h: number, content: string, extra = '') =>
  `<g class="flow-node ${extra}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/>${content}</g>`;

export function flowDiagram(): string {
  const desktop = `
    <svg class="flow-desktop" viewBox="0 0 1120 330" aria-hidden="true">
      <defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 5 3 0 6" fill="none" stroke="#696969"/></marker></defs>
      ${wire('M110 190 C150 190 150 190 190 190', 3)}
      ${wire('M370 190 C420 190 430 190 480 190', 2.5, -1)}
      ${wire('M650 190 C760 190 800 190 900 190', 3.6, -2)}
      ${wire('M810 65 C745 65 755 153 650 153', 2.8, -1.5)}
      ${wire('M810 105 C750 105 730 172 650 172', 2.2, -0.5)}
      ${wire('M810 145 C752 145 740 191 650 191', 3.2, -2)}
      ${wire('M280 229 C280 300 420 291 565 291 C765 291 990 310 990 229', 5, -1)}
      <g class="flow-label"><text x="150" y="172" text-anchor="middle">DEPOSIT</text><text x="424" y="172" text-anchor="middle">LIQUIDITY</text><text x="772" y="215" text-anchor="middle">INFERENCE</text></g>
      <rect class="wire-label-bg" x="461" y="276" width="213" height="28"/><text class="funding-label" x="567" y="295" text-anchor="middle">COMPUTE FUNDING $</text>
      ${node(20, 151, 90, 78, '<text class="node-symbol" x="65" y="187" text-anchor="middle">[$]</text><text class="flow-label" x="65" y="211" text-anchor="middle">USER</text>')}
      ${node(190, 151, 180, 78, '<text class="node-symbol" x="280" y="185" text-anchor="middle">$ ⇄ $</text><text class="node-label" x="280" y="210" text-anchor="middle">AMM POOL</text>')}
      ${node(480, 133, 170, 114, '<text class="router-word" x="565" y="188" text-anchor="middle">routr/</text><text class="flow-label" x="565" y="217" text-anchor="middle">ROUTING LAYER</text>', 'router-node')}
      ${node(900, 151, 180, 78, '<text class="node-symbol" x="990" y="185" text-anchor="middle">[≡]</text><text class="node-label" x="990" y="210" text-anchor="middle">MODEL PROVIDER</text>')}
      <g class="agent-stack">
        <text class="flow-label" x="810" y="29">THE AGENTS</text>
        <text class="agent-face" x="810" y="69">[o_o]</text><text class="call call-1" x="883" y="69">call / data</text>
        <text class="agent-face" x="810" y="109">[&gt;_&lt;]</text><text class="call call-2" x="883" y="109">text / next()</text>
        <text class="agent-face" x="810" y="149">[=_=]</text><text class="call call-3" x="883" y="149">00101</text>
      </g>
    </svg>`;

  const mobile = `
    <svg class="flow-mobile" viewBox="0 0 320 650" aria-hidden="true">
      <defs><marker id="arrow-m" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 5 3 0 6" fill="none" stroke="#696969"/></marker></defs>
      ${wire('M160 75 C160 95 160 95 160 119', 2)}
      ${wire('M160 195 C160 250 160 289 160 344', 3, -1)}
      ${wire('M160 438 C160 480 160 490 160 534', 3, -1.5)}
      ${wire('M250 264 C290 264 290 390 246 390', 3, -1)}
      ${wire('M74 157 C18 157 21 479 74 479 C120 479 247 479 247 534', 5)}
      <text class="flow-label" x="177" y="103">DEPOSIT</text>
      <text class="flow-label" x="176" y="321">LIQUIDITY</text>
      <text class="flow-label" x="176" y="466">INFERENCE</text>
      <rect class="wire-label-bg" x="48" y="492" width="216" height="25"/><text class="funding-label" x="160" y="509" text-anchor="middle">COMPUTE FUNDING $</text>
      ${node(114, 0, 92, 75, '<text class="node-symbol" x="160" y="33" text-anchor="middle">[$]</text><text class="flow-label" x="160" y="58" text-anchor="middle">USER</text>')}
      ${node(74, 119, 172, 76, '<text class="node-symbol" x="160" y="151" text-anchor="middle">$ ⇄ $</text><text class="node-label" x="160" y="177" text-anchor="middle">AMM POOL</text>')}
      <g class="agent-stack"><text class="flow-label" x="160" y="237" text-anchor="middle">THE AGENTS</text><text class="agent-face" x="160" y="267" text-anchor="middle">[o_o] [&gt;_&lt;] [=_=]</text><text class="call" x="160" y="289" text-anchor="middle">call / data / next() / 00101</text></g>
      ${node(74, 344, 172, 94, '<text class="router-word" x="160" y="390" text-anchor="middle">routr/</text><text class="flow-label" x="160" y="417" text-anchor="middle">ROUTING LAYER</text>', 'router-node')}
      ${node(74, 534, 172, 80, '<text class="node-symbol" x="160" y="568" text-anchor="middle">[≡]</text><text class="node-label" x="160" y="595" text-anchor="middle">MODEL PROVIDER</text>')}
    </svg>`;

  return `${desktop}${mobile}`;
}

export const goals = [
  'CURE CANCER', 'AI RESEARCH', 'CLEAN ENERGY', 'DECODE GENOMES',
  'BUILD A COMPANY', 'SPACE RESEARCH', 'BUILD THE NEXT LLM',
  'AUTOMATE THE WORK', 'EXPLORE CONSCIOUSNESS', 'SOLVE HARD PROBLEMS',
];

export function swarmField(): string {
  let agents = '';
  for (let i = 0; i < 216; i++) {
    const col = i % 18;
    const row = Math.floor(i / 18);
    const jitterX = ((i * 17) % 13) - 6;
    const jitterY = ((i * 11) % 9) - 4;
    const bright = i % 29 === 0 ? ' agent-bright' : '';
    agents += `<text class="swarm-agent${bright}" x="${24 + col * 63 + jitterX}" y="${29 + row * 32 + jitterY}" style="--duration:${10 + i % 9}s;--delay:-${i % 15}s">${faces[i % faces.length].replaceAll('>', '&gt;').replaceAll('<', '&lt;')}</text>`;
  }
  const positions = [[112, 84], [670, 52], [850, 178], [365, 241], [135, 336], [705, 336], [360, 116], [635, 210], [710, 274], [200, 180]];
  const bubbles = goals.map((goal, i) => {
    const [x, y] = positions[i];
    const w = goal.length * 7.3 + 24;
    return `<g class="goal-position" transform="translate(${x} ${y})" style="--goal-width:${w}px;--mobile-y:${65 + (i % 4) * 80}px"><g class="goal-bubble goal-${i}" style="--delay:${i * -4}s"><rect x="0" y="-19" width="${w}" height="30"/><text x="12" y="0">${goal}</text></g></g>`;
  }).join('');
  return `<svg viewBox="0 0 1140 410" class="swarm-art" aria-hidden="true">${agents}${bubbles}</svg>`;
}
