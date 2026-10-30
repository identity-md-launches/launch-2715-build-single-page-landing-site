# routr/

A single-page landing site for the routing layer for AI agent swarms.

> liquidity in. compute out. agents never stop.

The source and finished static export are included. `dist/index.html` is the publishing entry point; the publisher does not need to run a build. Vite's base is `./`, all assets are local, and navigation uses page anchors and native dialogs. There is no backend or wallet connection.

## Install and develop

Use Node.js 24.12+ and npm.

```sh
npm ci
npm run dev
```

## Rebuild and preview

```sh
npm run typecheck
npm run build
npm run preview
```

The build typechecks TypeScript and replaces `dist/` with the production export. Keep `dist/` alongside the source and lockfile in the submission. Serve the export through HTTP; opening the HTML directly as a local file does not provide the module behavior of static hosting.

The production page uses locally bundled JetBrains Mono and original SVG/ASCII artwork. `public/og-image.png` is the 1200 × 630 share card; its editable composition is `assets/share-card.svg`. Font license notices ship with the fonts. See `NOTICE.md` for attribution.

## Interactions

- **Launch App (soon)** opens an honest launch-status dialog with TBA launch and contract information and a link to the supplied X profile.
- **Docs** opens local concept notes. The notes explain funding, routing and continuity; API endpoints and integrations are explicitly TBA.
- **How it works / The swarm** scroll to their sections on desktop. Those sections remain in the normal reading order on mobile.
- **Pause motion** stops the decorative animations and completes any unfinished wordmark typing. Reduced motion prevents animation and shows all ten swarm goals as static text.
- **Send a request** runs a local request → routed → paid example. The terminal and its status say simulated; no inference is purchased and no funds move. Counts reset on reload.
- All **X** links point to `https://x.com/routrnetwork` and open a separate tab.

No ticker, contract address, yield, fee, provider integration or token economics is invented.

## Validate

The reproducible interaction suite serves `dist/` under `/preview/`, launches browsers, blocks external requests, checks mobile/desktop behavior and closes its own server.

```sh
npx playwright install chromium webkit
npm run test:interaction
npm run audit:export
```

Playwright requires its browser binaries and browser runtime libraries. A missing WebKit runtime is reported as a limitation; failures after a browser starts fail the suite. Screenshots and detailed test results go to `test/scratch/interaction/`. That folder is disposable and is not needed to build or run the site.

Worker validation performed on the final export:

| Check | Actual result |
| --- | --- |
| TypeScript `tsc --noEmit` | Passed |
| Vite production build | Passed |
| `scripts/validate.mjs` | 12 Chromium check groups passed |
| Responsive widths | No horizontal overflow at 320, 390, 640, 768, 960, 1024 and 1440px |
| 390 × 844 first screen | Product, explanation and main action visible |
| axe WCAG 2/2.1 A/AA | Zero violations on the homepage and both open dialogs |
| Static hosting | Relative assets work under `/preview/`; no external render requests, missing resources or script errors |
| Motion | Pause/resume, full logo on pause and reduced motion passed; zero running animations under reduced motion |
| Text enlargement | 200% root text size reflows at 320, 390 and 1440px |
| Pinned taste@1 probe | 14/16 passed; uppercase labels and monospace prose retained as explicit brief requirements |
| Export audit | Relative references and share asset checked; complete delivery below 8 MiB |

The worker installed its frontend and browser dependencies in a temporary external toolchain. It invoked that toolchain's `tsc` and `vite` binaries and ran `scripts/validate.mjs` using its supported `--playwright=<module>` and `--axe=<module>` options. The package scripts above are the standard installed-project equivalents.

The final pinned probe command was:

```sh
IMD_PLAYWRIGHT=/tmp/routr-toolchain/node_modules/playwright/index.mjs PLAYWRIGHT_BROWSERS_PATH=/tmp/routr-browsers node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste --offline
```

The pinned input is removed from the delivery; its measured results are retained in `artifacts/validation.md`. The source-owned interaction and export checks remain available after delivery.

WebKit was attempted but could not launch because browser runtime libraries were unavailable. Native Safari, physical devices, screen-reader sessions, native browser zoom, an RTL/localization variant and a 10% speed animation-panel review were not verified. The X destination's availability and hosted social unfurl behavior were not tested. The share image exists locally; the final hosting URL is intentionally not guessed.

See [DESIGN.md](DESIGN.md) for the final tokens and components, [artifacts/validation.md](artifacts/validation.md) for the six-domain review and findings, and [artifacts/mobile-first-screen.png](artifacts/mobile-first-screen.png) for the phone's first screen. These are worker checks, not independent certification.

## Delivery hygiene

Source, package manifests, lockfile, static assets and `dist/` are complete. Dependencies and browser downloads are installed outside the submission. No generated dependency directory, cache, archive, source map, registry mirror or submodule is required. No ignore file was created or modified. `npm run audit:export` checks the explicit delivery paths against the 8 MiB cap.
