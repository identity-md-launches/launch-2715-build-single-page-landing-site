# routr/ design system

## Overview

routr/ is the routing layer for AI agent swarms. This page introduces the concept to agent builders and people interested in funding compute through liquidity. Its single visual idea is a routing terminal: deposits, agent calls and inference connected by thin wires, then a field of small independent agents.

The implemented system is dark, flat and entirely monospace. Large lowercase branding establishes hierarchy; compact uppercase labels identify processes and controls. The hero, diagram, three steps, swarm and simulated terminal share the same content edges. Application launch and API details remain TBA.

The source is `src/main.ts`, `src/visuals.ts` and `src/style.css`. This is a small Vite and TypeScript page with native DOM elements; it has no client framework or runtime package dependencies.

## Colors

All tokens are declared in `src/style.css:18` using hex notation.

| Token | Value | Implemented role |
| --- | --- | --- |
| `--bg` | `#0D0D0D` | Page and diagram background |
| `--surface` | `#111111` | Neutral controls, nodes, dialogs and goal labels |
| `--surface-hover` | `#1C1C1C` | Secondary control hover |
| `--text` | `#E5E5E5` | Primary text and readable ASCII |
| `--muted` | `#888888` | Supporting copy, labels, log IDs |
| `--accent` | `#C4ED68` | Primary action, logo slash, routed packets, paid state, goals and focus |
| `--border` | `#2B2B2B` | Structural 1px dividers |
| `--border-active` | `#5A6348` | Routing node, goal outlines and dialog perimeter |
| `--grid` | `#202020` | Faint 1px dots on a 24px grid |
| `--art-ink` | `#42483B` | Decorative swarm faces only |

The primary action hover is `#D0F58A`. Diagram wires use `#4A4A4A`, arrowheads `#696969`, and packet glow `#C4ED6880`. The modal backdrop uses `#000000CC`. These are local artwork/state values rather than additional text roles. The only accent fill on the main page is Launch App. A modal replaces that context with Follow on X.

Calculated WCAG contrast pairs: primary text/page 15.43:1, muted/page 5.48:1, muted/surface 5.33:1, muted/grid dots 4.60:1, dark text/accent 14.49:1. Browser and automated contrast coverage and its limitations are recorded in `artifacts/validation.md`. Decorative dim agents do not carry readable information; all goals have an accessible text equivalent. The page has one dark theme. Forced colors uses system `Highlight` for focus.

## Typography

JetBrains Mono is served from `public/fonts/jetbrains-mono-regular.woff2` and `public/fonts/jetbrains-mono-medium.woff2`. Available normal weights are 400 and 500; those are the only weights used. The fallback is `monospace`. Both faces were confirmed loaded in Chromium. `font-display: swap`, root font smoothing and `font-synthesis: none` are implemented.

| Role/token | Desktop size | At 640px and below |
| --- | --- | --- |
| Label/data `--text-xs` | 0.75rem / 12px | 12px |
| UI/body `--text-sm` | 0.875rem / 14px | 14px |
| Card heading `--text-base` | 1rem / 16px | 16px |
| Tagline/wordmark `--text-lead` | 1.5rem / 24px | 1.25rem / 20px |
| Section heading `--text-heading` | 2rem / 32px | 1.5rem / 24px |
| Hero logo `--text-display` | 8rem / 128px | 5rem / 80px |

The display token becomes 6rem at 1088px and below. The logo is additionally capped at `22vw` to reflow at 320px and during text enlargement. The probe measured six sizes per representative width, including the display logo. SVG artwork uses 12px labels, 20px symbols and a 32px routr/ node at its native viewBox size. Desktop diagram labels become 16px between 960px and 1088px to preserve legibility as the SVG scales.

Body line-height is 1.6, supporting hero copy 1.7, step copy 1.75, headings 1.25 and logo 1.1. Display tracking is -0.07em, section headings and wordmarks -0.04em, tagline -0.025em. Other text has natural spacing. Copy measures range from 38ch to 62ch. Headings balance, paragraphs use pretty wrapping, IDs use tabular numerals, and log messages can wrap instead of truncating.

## Layout

`.wrap` is the shared container: centered with a maximum width of 74rem / 1184px and minimum 48px side gutters on wide layouts. Gutters become 32px at 1088px and below, then 20px at 640px and below. Spacing tokens use 8, 16, 24, 32, 48, 64 and 96px. Major section spacing uses 96px, reduced to 64px on phones. Internal component values include 12px gaps, 18px strips and 20px terminal padding.

| Breakpoint | Implemented change |
| --- | --- |
| `68rem` / 1088px | Smaller display logo, 32px gutters, compact hero and terminal gaps, larger SVG labels, secondary footer phrase hidden |
| `60rem` / 960px | Horizontal flow replaced by a vertical SVG with maximum width 360px |
| `52rem` / 832px | Hero decoration and desktop section links hidden; headings, steps and terminal become single columns; goal bubbles move into the visible center of the cropped swarm |
| `40rem` / 640px | 20px gutters, 80px logo cap, 24px headings, 20px tagline; compact button padding and stacked diagram toolbar |

Header and action rows wrap when text grows. Step items form a three-column ordered list on desktop and one column on smaller screens. The terminal is a two-column section on desktop and follows its action on mobile. Its log retains nine lines; the normal request interaction does not resize the panel. At 390 × 844, the product, plain explanation and Launch App action fit the first screen. Layout checks passed at 320, 390, 640, 768, 960, 1024 and 1440px. Text at 200% reflowed at 320, 390 and 1440px; native browser zoom was not tested.

Only the decorative swarm is clipped. Important text is not ellipsized. Its SVG stays wide to keep hundreds of agents dense on phones; goal labels reposition centrally and an accessible list contains all ten goals. With reduced motion, that list is also visibly rendered.

## Elevation & Depth

The interface uses flat 1px borders and tonal surfaces, without card shadows. Solid borders divide structures; dashed borders separate diagram and terminal status strips. The grid is a fixed, noninteractive pseudo-element behind the page. Only moving SVG packets have a small glow. Native dialogs use the browser's top layer over a dark backdrop; there are no custom z-index modal stacks or sticky controls over content.

## Shapes

All controls, panels, cards and dialog corners are square. Button minimum height is 48px; header, footer, close and motion controls use at least 44px targets. Keyboard focus uses a 2px lime outline offset 5px from the control. Decorative glows and layers ignore pointer events. Icons are textual ASCII/kaomoji and diagram line art, with no icon package.

## Components

| Pattern | Source | States and reuse |
| --- | --- | --- |
| Wordmark/header | `src/main.ts:9`, `.wordmark` | Lowercase routr/ with lime slash; home anchor and utility links |
| Buttons | `.button`, `.button-primary`, `.button-secondary` in `src/style.css` | One accent fill; neutral secondary; hover only on hover devices; visible focus; 0.96 press scale when motion is allowed; native disabled pending state |
| Dialogs | `src/main.ts:86`, handlers at `src/main.ts:98` | Native modal, named heading, close button, Escape and backdrop dismissal; background scroll locks; focus returns to its trigger |
| Flow diagram | `flowDiagram()` in `src/visuals.ts:12` | Desktop/mobile SVG variants; cubic Bézier wires, directional arrows and glowing packets; shared plain-text figcaption |
| Step cards | `src/main.ts:52`, `.steps`, `.step` | Three ordered terminal cards; inline step number, heading, copy and terminal summary; code baseline aligned on desktop |
| Swarm | `swarmField()` in `src/visuals.ts:65` | 216 seeded faces and ten goal overlays; illustrative, not network activity; restrained transform drift and opacity pulses |
| Motion toggle | `src/main.ts:118`, motion media queries | Pause/resume controls all CSS animation. Reduced motion prevents animation entirely and disables the toggle with an explanatory label |
| Request terminal | `src/main.ts:137` | Three seeded simulated requests; Send a request appends request/routed/paid, temporarily disables itself and updates a stable polite status region; keeps nine log rows |

Typing runs once for 750ms. Pausing completes the logo and prevents typing from replaying on resume. Cursors blink over 1.3s; floating hero art takes 10–13s; packet paths 2–5s; swarm drift 10–18s. Goal labels follow a 40s opacity cycle. Interactive color transitions are 150ms with explicitly named properties. All animation is inside `prefers-reduced-motion: no-preference`; no animation is needed to understand state. There is no autoplaying network log.

## Do's and Don'ts

- Start another surface with `.wrap`, the existing type tokens and a native heading hierarchy. Keep one primary action per context.
- Reuse `.button`, the flat borders and square corners. Use native links for navigation and buttons for local state.
- Keep routr/ lowercase, operational labels uppercase, prose readable and TBA values explicit.
- Pair decorative SVG with plain text. Keep goals aspirational and any fabricated activity labeled simulated.
- Add motion only inside the existing preference guard and global pause rule. Keep a static equivalent.
- Do not add a ticker, contract address, economic claims, wallet flow, external font service or icon library without new product requirements.

For an additional page, reuse the header/container, choose an existing heading/body role, compose native controls with the button patterns, and check it at 320 and 390px before exporting it with relative assets. See `NOTICE.md` for guidance and font attribution.
