(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=o(a);fetch(a.href,n)}})();const f=["[o_o]","[-_-]","[>_<]","[=_=]","[^_^]","[O_O]"],M=(e,t,o=0)=>`<circle class="packet" r="3" style="offset-path:path('${e}');--duration:${t}s;--delay:${o}s"/>`,r=(e,t=3,o=0)=>`<path class="wire" d="${e}"/>${M(e,t,o)}`,l=(e,t,o,s,a,n="")=>`<g class="flow-node ${n}"><rect x="${e}" y="${t}" width="${o}" height="${s}"/>${a}</g>`;function O(){const e=`
    <svg class="flow-desktop" viewBox="0 0 1120 330" aria-hidden="true">
      <defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 5 3 0 6" fill="none" stroke="#696969"/></marker></defs>
      ${r("M110 190 C150 190 150 190 190 190",3)}
      ${r("M370 190 C420 190 430 190 480 190",2.5,-1)}
      ${r("M650 190 C760 190 800 190 900 190",3.6,-2)}
      ${r("M810 65 C745 65 755 153 650 153",2.8,-1.5)}
      ${r("M810 105 C750 105 730 172 650 172",2.2,-.5)}
      ${r("M810 145 C752 145 740 191 650 191",3.2,-2)}
      ${r("M280 229 C280 300 420 291 565 291 C765 291 990 310 990 229",5,-1)}
      <g class="flow-label"><text x="150" y="172" text-anchor="middle">DEPOSIT</text><text x="424" y="172" text-anchor="middle">LIQUIDITY</text><text x="772" y="215" text-anchor="middle">INFERENCE</text></g>
      <rect class="wire-label-bg" x="461" y="276" width="213" height="28"/><text class="funding-label" x="567" y="295" text-anchor="middle">COMPUTE FUNDING $</text>
      ${l(20,151,90,78,'<text class="node-symbol" x="65" y="187" text-anchor="middle">[$]</text><text class="flow-label" x="65" y="211" text-anchor="middle">USER</text>')}
      ${l(190,151,180,78,'<text class="node-symbol" x="280" y="185" text-anchor="middle">$ ⇄ $</text><text class="node-label" x="280" y="210" text-anchor="middle">AMM POOL</text>')}
      ${l(480,133,170,114,'<text class="router-word" x="565" y="188" text-anchor="middle">routr/</text><text class="flow-label" x="565" y="217" text-anchor="middle">ROUTING LAYER</text>',"router-node")}
      ${l(900,151,180,78,'<text class="node-symbol" x="990" y="185" text-anchor="middle">[≡]</text><text class="node-label" x="990" y="210" text-anchor="middle">MODEL PROVIDER</text>')}
      <g class="agent-stack">
        <text class="flow-label" x="810" y="29">THE AGENTS</text>
        <text class="agent-face" x="810" y="69">[o_o]</text><text class="call call-1" x="883" y="69">call / data</text>
        <text class="agent-face" x="810" y="109">[&gt;_&lt;]</text><text class="call call-2" x="883" y="109">text / next()</text>
        <text class="agent-face" x="810" y="149">[=_=]</text><text class="call call-3" x="883" y="149">00101</text>
      </g>
    </svg>`,t=`
    <svg class="flow-mobile" viewBox="0 0 320 650" aria-hidden="true">
      <defs><marker id="arrow-m" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 5 3 0 6" fill="none" stroke="#696969"/></marker></defs>
      ${r("M160 75 C160 95 160 95 160 119",2)}
      ${r("M160 195 C160 250 160 289 160 344",3,-1)}
      ${r("M160 438 C160 480 160 490 160 534",3,-1.5)}
      ${r("M250 264 C290 264 290 390 246 390",3,-1)}
      ${r("M74 157 C18 157 21 479 74 479 C120 479 247 479 247 534",5)}
      <text class="flow-label" x="177" y="103">DEPOSIT</text>
      <text class="flow-label" x="176" y="321">LIQUIDITY</text>
      <text class="flow-label" x="176" y="466">INFERENCE</text>
      <rect class="wire-label-bg" x="48" y="492" width="216" height="25"/><text class="funding-label" x="160" y="509" text-anchor="middle">COMPUTE FUNDING $</text>
      ${l(114,0,92,75,'<text class="node-symbol" x="160" y="33" text-anchor="middle">[$]</text><text class="flow-label" x="160" y="58" text-anchor="middle">USER</text>')}
      ${l(74,119,172,76,'<text class="node-symbol" x="160" y="151" text-anchor="middle">$ ⇄ $</text><text class="node-label" x="160" y="177" text-anchor="middle">AMM POOL</text>')}
      <g class="agent-stack"><text class="flow-label" x="160" y="237" text-anchor="middle">THE AGENTS</text><text class="agent-face" x="160" y="267" text-anchor="middle">[o_o] [&gt;_&lt;] [=_=]</text><text class="call" x="160" y="289" text-anchor="middle">call / data / next() / 00101</text></g>
      ${l(74,344,172,94,'<text class="router-word" x="160" y="390" text-anchor="middle">routr/</text><text class="flow-label" x="160" y="417" text-anchor="middle">ROUTING LAYER</text>',"router-node")}
      ${l(74,534,172,80,'<text class="node-symbol" x="160" y="568" text-anchor="middle">[≡]</text><text class="node-label" x="160" y="595" text-anchor="middle">MODEL PROVIDER</text>')}
    </svg>`;return`${e}${t}`}const $=["CURE CANCER","AI RESEARCH","CLEAN ENERGY","DECODE GENOMES","BUILD A COMPANY","SPACE RESEARCH","BUILD THE NEXT LLM","AUTOMATE THE WORK","EXPLORE CONSCIOUSNESS","SOLVE HARD PROBLEMS"];function T(){let e="";for(let s=0;s<216;s++){const a=s%18,n=Math.floor(s/18),i=s*17%13-6,h=s*11%9-4,A=s%29===0?" agent-bright":"";e+=`<text class="swarm-agent${A}" x="${24+a*63+i}" y="${29+n*32+h}" style="--duration:${10+s%9}s;--delay:-${s%15}s">${f[s%f.length].replaceAll(">","&gt;").replaceAll("<","&lt;")}</text>`}const t=[[112,84],[670,52],[850,178],[365,241],[135,336],[705,336],[360,116],[635,210],[710,274],[200,180]],o=$.map((s,a)=>{const[n,i]=t[a],h=s.length*7.3+24;return`<g class="goal-position" transform="translate(${n} ${i})" style="--goal-width:${h}px;--mobile-y:${65+a%4*80}px"><g class="goal-bubble goal-${a}" style="--delay:${a*-4}s"><rect x="0" y="-19" width="${h}" height="30"/><text x="12" y="0">${s}</text></g></g>`}).join("");return`<svg viewBox="0 0 1140 410" class="swarm-art" aria-hidden="true">${e}${o}</svg>`}const d="https://x.com/routrnetwork",k=document.querySelector("#app");k.innerHTML=`
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header wrap">
    <a class="wordmark" href="#" aria-label="routr/ home">routr<span>/</span></a>
    <nav aria-label="Main navigation">
      <a class="desktop-nav" href="#how-it-works">HOW IT WORKS</a>
      <a class="desktop-nav" href="#swarm">THE SWARM</a>
      <button class="nav-link" type="button" data-open="docs">DOCS <span aria-hidden="true">↗</span></button>
      <a class="nav-x" href="${d}" target="_blank" rel="noopener noreferrer" aria-label="routr/ on X (opens in a new tab)">X <span aria-hidden="true">↗</span></a>
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
            <a class="hero-x" href="${d}" target="_blank" rel="noopener noreferrer" aria-label="routr/ on X (opens in a new tab)">X <span aria-hidden="true">↗</span></a>
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
        ${O()}
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
          ${T()}
          <ul class="goal-list sr-only">${$.map(e=>`<li>${e}</li>`).join("")}</ul>
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

    <section class="closing wrap" aria-label="Follow the launch"><span class="closing-face" aria-hidden="true">[^_^]</span><p>The swarm is coming<span class="accent">.</span></p><a href="${d}" target="_blank" rel="noopener noreferrer">Follow @routrnetwork <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></section>
  </main>

  <footer class="site-footer wrap"><a class="wordmark" href="#" aria-label="routr/ home">routr<span>/</span></a><span>contract: TBA</span><a href="${d}" target="_blank" rel="noopener noreferrer" aria-label="routr/ on X (opens in a new tab)">X <span aria-hidden="true">↗</span></a><span class="footer-message">built for what comes next.</span></footer>

  <dialog id="launch-dialog" aria-labelledby="launch-title" aria-describedby="launch-description">
    <div class="dialog-bar"><span>routr/ launch status</span><button type="button" class="close-button" data-close aria-label="Close launch status">[x]</button></div>
    <div class="dialog-content"><span class="dialog-face" aria-hidden="true">[o_o]</span><h2 id="launch-title">The swarm is getting ready.</h2><p id="launch-description">The app is coming soon. Launch date and contract: TBA.</p><p>Follow routr/ on X for launch updates.</p><a class="button button-primary" href="${d}" target="_blank" rel="noopener noreferrer">Follow on X <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></div>
  </dialog>

  <dialog id="docs-dialog" aria-labelledby="docs-title">
    <div class="dialog-bar"><span>routr/ concept notes</span><button type="button" class="close-button" data-close aria-label="Close documentation">[x]</button></div>
    <div class="dialog-content docs-content"><h2 id="docs-title">The routing layer, explained.</h2><p>routr/ connects agent requests to model providers and pays inference from liquidity in an AMM pool.</p><dl><dt>01 / Funding</dt><dd>Liquidity in the pool funds compute. Pool parameters and economic details: TBA.</dd><dt>02 / Routing</dt><dd>Agents send requests to routr/. It routes those requests to model providers.</dd><dt>03 / Continuity</dt><dd>The pool pays for inference so agents can keep running without managing individual API keys or budgets.</dd></dl><div class="docs-note"><span>DEVELOPER REFERENCE</span><p>API endpoints, integrations and launch details: TBA. These notes describe the concept; the app is not live yet.</p></div><a href="${d}" target="_blank" rel="noopener noreferrer">Follow development on X <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a></div>
  </dialog>
`;for(const e of document.querySelectorAll("[data-open]"))e.addEventListener("click",()=>{const t=document.querySelector(`#${e.dataset.open}-dialog`);t.showModal(),document.body.classList.add("dialog-open"),t.addEventListener("close",()=>{document.body.classList.remove("dialog-open"),e.focus({preventScroll:!0})},{once:!0})});for(const e of document.querySelectorAll("dialog"))e.querySelector("[data-close]").addEventListener("click",()=>e.close()),e.addEventListener("click",t=>{if(t.target!==e)return;const o=e.getBoundingClientRect();(t.clientX<o.left||t.clientX>o.right||t.clientY<o.top||t.clientY>o.bottom)&&e.close()});const u=window.matchMedia("(prefers-reduced-motion: reduce)"),m=document.querySelector("#motion-toggle");let c=!1;const y=()=>{const e=c||u.matches;document.documentElement.dataset.motion=e?"paused":"running",e&&document.querySelector(".typed-word")?.classList.add("typing-complete"),m.setAttribute("aria-pressed",String(c)),m.innerHTML=u.matches?'<span aria-hidden="true">[=]</span> REDUCED MOTION':c?'<span aria-hidden="true">[&gt;]</span> RESUME MOTION':'<span aria-hidden="true">[Ⅱ]</span> PAUSE MOTION',m.disabled=u.matches};m.addEventListener("click",()=>{c=!c,y()});u.addEventListener("change",y);y();const x=document.querySelector("#log-lines"),b=document.querySelector("#send-request"),w=document.querySelector("#log-state"),S=document.querySelector("#request-count"),v=document.querySelector("#request-announcement");let p=3;function g(e,t){const o={request:'<span class="log-face">[o_o]</span> agent → routr/',routed:'<span class="log-face">[≡]</span> → model provider',paid:'<span class="log-face">[$]</span> pool → inference'}[t],s=document.createElement("li");for(s.innerHTML=`<span class="log-id">${String(e).padStart(5,"0")}</span><span class="log-stage ${t==="paid"?"accent":""}">${t}</span><span class="log-message">${o}</span>`,x.append(s);x.children.length>9;)x.firstElementChild?.remove()}for(let e=1;e<=p;e++)["request","routed","paid"].forEach(t=>g(e,t));const E=async()=>{!c&&!u.matches&&await new Promise(e=>window.setTimeout(e,320))};b.addEventListener("click",async()=>{b.disabled=!0,w.textContent="[ routing... ]",v.textContent="";const e=p+1;g(e,"request"),await E(),g(e,"routed"),await E(),g(e,"paid"),p=e,S.textContent=`${p} requests completed`,w.textContent="[ ready ]",v.textContent=`Simulated request ${p} routed to a model provider and paid from the pool. No funds moved.`,b.disabled=!1});
