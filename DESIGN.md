# WonsildFoundation — 0.5.1

An editorial studio system for web applications and their public websites. Chosen direction: crisp typography, generous space, quiet controls.

## What makes it coherent

Use three layers: shared tokens, reusable layout primitives, and documented composition rules. A theme controls shared values; it cannot enforce a well-composed page by itself. The registry distributes the implementation. Review of real screens remains necessary.

The foundation is intentionally calm. Character comes from scale, well-chosen imagery, useful language, and a single expressive moment. The design must still look deliberate with no illustration or animation present.

## Spacing by relationship

These are house rules, not universal laws of graphic design. Use rem values so spacing respects the user's root font size. A 4px base unit is a convenience; optical corrections of 1–2px are acceptable and should stay local.

| Token / role | Default at 16px root | Usage |
| --- | --- | --- |
| `ef-label-gap` | 8px | Label to control; value to unit |
| `ef-related-gap` | 12px | Closely related controls |
| `ef-group-gap` | 24px | Separate fields or small groups |
| `ef-region-gap` | 40px | Major app regions |
| `ef-section-gap` | 64px | Editorial sections; 40px on small screens |
| `ef-page-gutter` | 24px → 48px | Responsive page inset |
| `ef-page-max` | 1280px | Main content maximum width |
| `ef-reading-max` | 65ch | Prose line-length ceiling |

Related items must feel closer to one another than to the next group. Repeated sections use the same internal spacing. Align headings, text, tables, and control edges to shared columns. Put larger space between semantic groups, not equal space between every element.

Use 12 columns for complex desktop composition when helpful, 6 on tablet and 4 on mobile. Prefer simple actual CSS grids for simple layouts. Do not force 12 columns into every component. Use content-driven breakpoints: collapse a layout before labels or controls become cramped.

## Typography

Draft type direction: DM Sans for interface and editorial text, with Helvetica Neue / Arial as fallbacks. A serif may appear in an expressive feature only. The starter bundles DM Sans locally. The registry installs its font package and imports the font in CSS; the fallback stack remains available.

| Role | Size / line height | Weight and use |
| --- | --- | --- |
| Metadata | 12 / 18px | 400; dates, secondary context |
| UI label | 14 / 20px | 500; clear sentence case |
| Body / inputs | 16 / 24px | 400; readable everyday work |
| Item heading | 16 / 24px | 500; nested empty regions and compact groups |
| Lede | 18 / 27px | 400; introductory copy |
| Group heading | 20 / 28px | 500 |
| Page heading | 32–48px / 1.1 | 400; tracking −0.04em |
| Editorial display | 40–72px / 1.05 | 400; tracking −0.05em |

Limit each local section to three visual text levels. Large display type belongs to an introduction, not every dashboard value. Use tabular numerals for changing numeric data. Monospace is reserved for code or genuine technical notation. Use sentence case by default; uppercase is an occasional small label, not a texture applied to every field.

## Colour and surfaces

Light: near-white paper `#FAFAF7`, deep neutral ink `#20251F`, secondary text `#62685F`, quiet panel `#F0F1EC`, structural line `#D6D9CE`. Dark values are defined alongside these in the registry item.

Primary actions use ink on paper in reverse. The optional olive accent marks selection or one focal area. Stone is a separate installed variation; see STONE.md for its palette and typography.

Keep colour roles stable. A brand accent never replaces the meaning of error, success, or warning. Pair status colour with text. Structural separators may be subtle; an input border must be visibly stronger when needed to identify its boundary. Interactive focus uses a distinct outline.

Use a 2px base corner radius (0.125rem at the default root size): almost square, with a subtle softening. Circular avatars are an explicit exception. Most content sits directly on the page. Add a bounded surface when it communicates grouping, selection, or an overlay; do not put every heading, statistic, and paragraph into its own card. Shadows are reserved for actual overlays.

## Components and behaviour

Build on shadcn's existing accessible controls. Do not recreate dropdown, dialog, keyboard, or focus behaviour just to achieve a visual style. Verify the chosen controls in the consuming app.

Target a comfortable 44px minimum interactive height. Dense desktop rows can use a compact variant when their content and targets remain usable. Keep input text at 16px. Provide hover, focus, pressed/selected, disabled, loading, empty, error, and success states as applicable. Loading should preserve useful geometry. Errors sit next to the relevant field.

Layout primitives shipped in this release: `EditorialPage`, `EditorialStack`, `EditorialCluster`, `EditorialGrid`, and `EditorialHeading`. Their CSS uses the shared role tokens. These constrain common choices without removing the ability to adapt a page. The included shadcn controls apply these rules. Newly added third-party controls must be reviewed against them.

## The expressive layer

Choose one focal gesture per viewport: oversized editorial type, a striking photograph, an unconventional crop, a typographic experiment, or an unusual illustration. Start with roughly 10–15% of the composition as a heuristic, not a measurable quality score.

Expression may change the illustration, display type, feature layout, and accent treatment. It must preserve reading order, meaningful labels, contrast, navigation predictability, focus visibility, and comfortable controls. Essential tasks must work with all decorative elements removed. Honour reduced-motion preferences.

The preview's notebook lettering demonstrates this boundary: the letters can become playful while the project list and form retain their structure.

## Avoiding a familiar generated look

- Do not use beige + orange + monospace as the whole identity.
- Do not decorate ordinary labels with arbitrary serial numbers, slashes, or faux technical measurements.
- Do not repeat giant metrics, equal-size cards, gradients, glows, or section dividers without a content reason.
- Use real content to establish hierarchy. One meaningful image is preferable to decoration in every gap.
- An accent change is a variation, not a new design system.

## Review before calling a screen ready

Check small phones, tablet, desktop, long labels, empty lists, real data, keyboard-only use, visible focus, error and loading states, dark mode, 200% zoom, reduced motion, and text/background contrast. Use the same core components in a marketing page, a working list/table, and a form before expanding the library.

Version 0.5.1 includes a working React/shadcn reference app, four source-generated registry items, and a reusable starter. See VALIDATION.md for the checks performed. This is a foundation for production apps, not a certification of every future screen or third-party component.

## Reference implementation docs

- https://ui.shadcn.com/docs/theming
- https://ui.shadcn.com/docs/registry/registry-item-json
- https://ui.shadcn.com/docs/cli

The original visual direction above remains the default. Stone inherits the spacing, component and interaction rules; STONE.md supplies its alternative type and colour rules.

## Component contracts after the review

Parent layouts own spacing between blocks. PageHeader has no bottom margin: use EditorialStack gap="region" around it and the following content, or set one gap in the page layout. Its internal label/title/description spacing remains local. In v0.3.0 it supplied its own outer margin; standalone consumers must add spacing when adopting this fix.

Long button text, tab labels, selected values and alert headings wrap by default. Horizontal tab lists wrap into rows; retain Radix arrow-key order. Select popovers use a viewport-bounded popper layout. Review custom fixed heights before overriding these defaults. Icon-only controls still need an accessible label.

Switch has a 44 × 44px button target (both visual sizes). The smaller track is decorative inside that target. Do not shrink the root hit area to match the track.

Editorial's expressive serif is Georgia via the system serif stack; DM Sans is bundled. The demo explicitly labels layouts that are not shipped registry blocks. The separate /checks.html page exercises raw controls without reference.css.


## Empty regions and copyable commands

Use EmptyState for an empty collection or an unsuccessful search. Explain the reason and provide the next useful action. Its heading level is configurable; keep it below the surrounding section heading. It handles presentation only, not filtering or data fetching.

Use CopyCommand for a visible, selectable command with clipboard status and a manual-copy fallback. It never executes the displayed code. It resets feedback when the value changes and ignores stale asynchronous clipboard results.

PageHeader accepts a level prop (default 1) so embedded examples can keep a correct heading hierarchy without changing their appearance.


## Shared component defaults

Use `ef-body`, `ef-lede`, `ef-caption` and `ef-numeric` for recurring text roles. `EditorialHeading size="item"` is visually below the group role. Heading level controls semantics independently of size. All rectangular control radius mappings use the style's radius: 2px for both Editorial and Stone, including badges. Circular switch tracks and slider thumbs remain intentional control shapes.

EditorialStack stretches content but gives direct Button children their intrinsic width. `align="stretch"` explicitly stretches actions; `align="start"` makes all children intrinsic. Cluster remains useful for action groups. Button `variant="line"` provides the same underline appearance as line Tabs for filter buttons; keep button semantics for filtering and tab semantics for switching panels.

EmptyState's `edge` decides which boundaries it owns. Use `both` for a standalone region, `bottom` below an existing rule, and `none` inside a divided section. Do not remove every border based only on sibling order. Keep its text inset aligned with the collection it replaces.

Tables wrap text and retain a labelled, focusable horizontal scroll area. Set short dates and amounts to `whitespace-nowrap` selectively; long client names should wrap. At phone widths simplify columns when possible. List/detail screens should place the list above its details before either column becomes cramped, as the workspace example does at 50rem.
