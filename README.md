# Editorial Foundation

Your personal editorial design system: styled shadcn components, a working reference app, reusable layouts, and a registry for other projects.

**Source:** https://github.com/Staiola/editorial-foundation  
**Version:** 0.4.1
**Start here:** [DESIGN.md](DESIGN.md) for visual rules; [SYSTEM.md](SYSTEM.md) for how copies and updates work.

## Choose a style

**Editorial** is the original DM Sans / paper / olive style. **Stone** uses Geist, Source Serif 4, warm stone, charcoal and yellow. Both live here and share the same controls and spacing rules. See [STONE.md](STONE.md) for the type pairing and style rules.

Use the **Style** menu in the reference app to compare them on every screen, including light and dark mode. `?style=stone` opens the Stone preview; this URL setting is only for comparison.

For a new app from this template, choose Stone with `npm run style:set -- stone`. Run `npm run style:set -- editorial` to restore the original default. These commands change the generated app theme, so the choice survives replacing the reference app.

For an existing configured shadcn app:

```sh
npx shadcn@latest add Staiola/editorial-foundation/stone-foundation#v0.4.1
```

For only the Stone theme and layout CSS:

```sh
npx shadcn@latest add Staiola/editorial-foundation/stone-theme#v0.4.1
```

A fresh-session prompt / Raycast snippet:

> Use the Stone variation of my design system at https://github.com/Staiola/editorial-foundation. For a new app, start from that template and run npm run style:set -- stone. Read AGENTS.md, DESIGN.md and STONE.md. Reuse its typography, spacing and shared controls. Build: [describe the app].

## Start a new app

Use **Use this template → Create a new repository** on GitHub. Make the new app private unless you intend to share its source. Clone the new repository and run:

```sh
npm ci
npm run dev
```

Requires Node 22.12 or newer. The development server prints its local URL. Open the new project in Codex and describe what you want to build. The included AGENTS.md points the agent to your design rules and existing components.

A prompt for a completely fresh session:

> Create a private house energy calculator app from my GitHub template Staiola/editorial-foundation. Read AGENTS.md and DESIGN.md. Reuse the foundation's typography, spacing, controls and layouts. Replace the example app with the calculator; keep calculation logic separate from shared UI. Keep SYSTEM.md as the record of the source design system.

This requires GitHub access in that session. Files and instructions travel with the repository; the previous chat is not required. On another computer, sign into GitHub, clone the app repository, and run npm ci.

## Browse the reference

The system's landing page lives at `/landing.html` and links to the reference at `/`. It uses the shared components and tokens, with its own composition CSS in `src/styles/landing.css`. Both styles can be previewed with `?style=editorial` or `?style=stone`. The live sample stores its state only until the page reloads; the install command changes with the selected style. This page is part of the starter/reference site, not a new registry item.

The app contains three views:

- **Foundations:** typography, spacing relationships, semantic colours and optional expression.
- **Components:** real interactive controls and selected, disabled, invalid and feedback states.
- **Example app:** a project list, settings form, empty state and keyboard-accessible create dialog.

The example data is held in memory and resets when the view is remounted or the app reloads. Only the light/dark preference is stored in the browser. It is a design reference, not a backend application.

## Add the foundation to an existing app

In a configured React + Tailwind v4 + shadcn project with CSS variables enabled:

```sh
npx shadcn@latest add Staiola/editorial-foundation/foundation#v0.4.1
```

For just the theme and spacing/layout CSS:

```sh
npx shadcn@latest add Staiola/editorial-foundation/theme#v0.4.1
```

The repository is private. Authenticate with the GitHub CLI on the machine doing the install (`gh auth login`) or use the supported GitHub credentials for your environment. Never put a token in these commands or commit credentials.

For a local installation without GitHub:

```sh
npx shadcn@latest add /absolute/path/to/editorial-foundation/public/r/foundation.json
```

Review differences if the receiving app already has components with the same names. The full item includes 11 styled controls, shared layouts, PageHeader, TextField, EmptyState, CopyCommand, theme values, DM Sans, and design/source documentation. Wrap the app or page in `className="ef-system"`. Add a pointer to `docs/editorial-foundation/DESIGN.md` in the receiving project's AGENTS.md; installation deliberately does not replace that file.

```tsx
import { EditorialPage, EditorialStack } from "@/components/foundation/layout";
import { PageHeader } from "@/components/foundation/page-header";
import { TextField } from "@/components/foundation/text-field";
import { Button } from "@/components/ui/button";

export function CalculatorPage() {
  return (
    <main className="ef-system">
      <EditorialPage>
        <EditorialStack gap="region">
          <PageHeader title="House energy calculator" />
          <TextField label="Floor area (m²)" type="number" min="1" />
          <Button>Calculate</Button>
        </EditorialStack>
      </EditorialPage>
    </main>
  );
}
```

Adjust imports to your configured aliases. These UI examples do not implement energy calculations.

## Where to change things

| Source | Purpose |
| --- | --- |
| src/styles/tokens.json and stone.tokens.json | Original and Stone palettes, fonts and spacing roles |
| src/styles/foundation.css | Shared layout and composition rules |
| src/components/ui | Styled shadcn controls |
| src/components/foundation | Page header, field and layout compositions |
| src/App.tsx | Reference/example app; replace this for a new product |
| src/styles/reference.css | Reference-only presentation; replace for a new product |
| DESIGN.md | Human and agent design guidance |
| AGENTS.md | Instructions loaded by Codex in the project |
| system.config.json | Registry identity, source URL and default style |

Edit source files, then run:

```sh
npm run check
```

This regenerates theme CSS and all four registry items, validates/builds the registry through the shadcn CLI, typechecks the project and builds the app. Generated files are tracked so GitHub users can inspect them, but the GitHub registry resolves actual source files from registry.json. Do not edit public/r or generated theme.css directly.

The foundation source and the reference app use the same components. The dependency lockfile makes fresh installs repeatable. GitHub Actions runs the checks for pushes and pull requests and detects stale generated files.

## Updating your system

Improve a component in this source repository, update DESIGN.md when a rule changes, update the version and CHANGELOG.md, run checks and inspect affected examples. Commit the source and generated registry together, then tag a release. Upgrade existing projects explicitly after reviewing local differences. A template or registry copy does not automatically synchronise with its source.

Consult [VALIDATION.md](VALIDATION.md) for this release's checks and their limits. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for the original shadcn license notice.

## 0.3.1 migration and release checks

PageHeader no longer adds a bottom margin. Put it with the next block in EditorialStack gap="region", as in the example above. If you used it alone, add the outer gap in your page layout. Buttons and selects grow to fit long text; tab lists can wrap; alert titles remain fully visible. Switch retains a small visual track inside a 44px target.

The example app's navigation and list/detail compositions are demo-only, not installable registry blocks. The shared controls and layout primitives are distributed. Source adoption remains deliberate; existing project copies do not change automatically.

Open /checks.html from the reference footer. Run its layout checks at desktop and phone widths, for both styles and light/dark modes, with normal and 200% root text. It checks actual rendered tab contrast, overflow, title visibility, switch geometry and header spacing. Exercise tab arrow keys, switch keyboard/corner clicks, long select options and dialog focus/Escape separately. This browser check is manual; npm run check and CI still run build, registry and token checks.


## 0.4.0 examples and compositions

The full registries now include EmptyState and CopyCommand alongside PageHeader and TextField. Theme-only installs include shared CSS but do not install these React components. PageHeader accepts an optional level prop for a nested heading; its default is still h1.

The reference supports direct links: /?view=components and /?view=workspace, combined with either style query. The component reference demonstrates empty states, copyable commands, tab navigation and a table. The shared project example supports search, creation, editing, archive and restore using session-only data. Its application logic and composition CSS live under src/examples and are not distributed as registry blocks.
