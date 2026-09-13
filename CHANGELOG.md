# Changelog

## 0.5.1

- Rename the system and reference site to WonsildFoundation; retain Editorial and Stone as styles and update source and install links to Staiola/wonsild-foundation while preserving installed documentation paths and component exports.
- Link the WonsildFoundation Linear project and park the optional gradient-accent idea in STA-14.
- Improve GitHub, guide and changelog visibility on the reference and landing pages; make cross-page installation links reach their section.
- Add an optional Accent trace experiment to the site’s GitHub button, with a short clockwise nudge and reduced-motion support.
- Reduce Editorial’s shared corner radius from 4px to 2px. Use the shared radius for badges so rectangular UI stays almost square in both styles.

## 0.5.0

- Make full registry items explicit theme installs; include base styles, animation imports and consistent radius mappings in all four items. Preserve version metadata through the CLI build.
- Add eight isolated consumer-install checks to the main check command and CI, including conflicting existing palettes and production builds.
- Keep CopyCommand focusable while pending, preserve Button styling through asChild composition, and share dark preference between the landing and reference.
- Give stacks intrinsic standalone actions with explicit alignment options; ship nested heading, body, lede, caption and numeric roles. Add EmptyState edge and size options.
- Align line tabs and first/last table text, share underline styling with filter buttons, wrap long table cells and provide a focusable labelled scroll region. Increase slider-track contrast and use keyboard focus styling on dialog close.
- Keep the invoices composition and clipboard/layout harness as consumer test fixtures, separate from distributed product components.

## 0.4.1

- Describe both styles independently in the documentation and registry metadata.
- Remove design-reference provenance while retaining the licenses for the components and fonts actually used.

## 0.4.0

- Clarify the landing page offering, inventory, private access and three adoption paths.
- Add shared EmptyState and CopyCommand compositions to both full registries.
- Reuse the working project example on the landing page, with search, creation, editing, archive and restore states.
- Add reference examples for empty states, command copying, tabs and tables. Link directly to reference views with the view query parameter.
- Add an optional heading level to PageHeader for embedded compositions. Existing usage keeps its h1 default.

## 0.3.1

- Use opaque semantic text for enabled tabs; give switches a 44px actual button target.
- Wrap long button/tab/select labels and alert titles; bound select popovers to the viewport.
- Let parent layouts own PageHeader spacing and constrain its inner content at enlarged text sizes.
- Keep selected project rows aligned, identify demo-only compositions and label the expressive serif accurately.
- Add a separate raw-component check page for actual contrast, sizing, overflow and composition regressions.
- Migration: standalone PageHeader users now supply an outer gap; switches occupy a 44px box and select popovers default to popper positioning.

## 0.3.0

- Add Stone with Geist, Geist Mono, Source Serif 4 and the warm neutral/yellow reference palette.
- Add independent stone-theme and stone-foundation registry items using shared components.
- Compare both styles in all reference screens; choose a lasting template default with style:set.
- Preserve original style and prior release. Check contrast for both modes of both styles.

## 0.2.0

- React + TypeScript + Vite starter using real shadcn/Radix controls.
- Accepted editorial theme, locally bundled DM Sans and explicit light/dark values.
- Shared layout primitives, accessible text-field composition and page headers.
- Reference app for foundations, component states and a working project form/dialog.
- Source-generated theme and foundation registry items, design rules and agent guidance.

## 0.1.0

- Initial design direction, inline study and local registry draft.
