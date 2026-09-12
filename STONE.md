# Stone — a second style in Editorial Foundation

Stone keeps the foundation's components, spacing and behaviour. It changes typography, palette and a few surface details. Use this document alongside DESIGN.md; the typography and colour choices here supersede the original style's choices.

## Visual direction

A neutral grotesk for work, a considered serif for editorial moments, warm stone and deep charcoal. Yellow is a purposeful highlight. Keep the composition clear before adding expression.

Stone bundles Geist and Geist Mono for interface text and Source Serif 4 for display typography. The palette combines warm stone, charcoal, off-white and yellow.

## Type rules

- Geist 400 for body text, controls and large sans headings; 500 for useful emphasis. Body and inputs remain 16px; everyday labels remain at least 14px.
- Source Serif 4 400 for the `EditorialHeading size="display"` role and occasional editorial passages. It is not the default for input labels, buttons, tables or numerical results.
- Geist Mono for short eyebrow labels and actual technical notation. Do not turn every label into an uppercase technical caption.
- Page heading tracking is −0.025em. Display tracking is −0.025em. Keep the existing type sizes and responsive rules; application workspaces do not need a marketing-sized headline.

## Colour and surfaces

Stone defines matching light and dark palettes, including secondary surfaces, muted text, input boundaries, focus and chart colours.

| Role | Light | Dark |
| --- | --- | --- |
| Background | `#E3E0D9` | `#1D1D1B` |
| Main text | `#1D1D1B` | `#F0F0F0` |
| Panel | `#D6D2C8` | `#2B2B28` |
| Secondary text | `#58564F` | `#B9B5AC` |
| Accent | `#FFBD01` | `#FFBD01` |

Yellow carries dark text. Avoid yellow text on light stone: it does not have sufficient text contrast. Primary controls stay charcoal in light mode and off-white in dark mode. Error colours keep their semantic role. Use 2px corners, flat surfaces and useful dividers. Most content remains directly on the page.

## Use in a new app

Create a new app from the existing GitHub template, then run:

```sh
npm ci
npm run style:set -- stone
npm run dev
```

This changes the template's default theme at source. It keeps working after you replace App.tsx with your product. Remove the reference-only `preview-themes.css` and `reference.css` imports from main.tsx when replacing the comparison app. Do not retain reference-app style selection in a product unless that product actually needs it.

## Use in an existing app

```sh
npx shadcn@latest add Staiola/editorial-foundation/stone-foundation#v0.5.0
```

If the existing project already has the foundation components, use `stone-theme` instead. Inspect changes before replacing locally modified styles. The registry copies source; it does not synchronise apps automatically. In the receiving AGENTS.md, point to `docs/editorial-foundation/DESIGN.md` and `docs/editorial-foundation/STONE.md` when installed with the full item.

## Storage decision

One repository, two named styles. Shared controls receive one source fix; each style has independent tokens and installable registry items. Make a new GitHub repository for each actual product built from the template. Split the design system itself only if the variations need independent ownership or incompatible component behaviour.
