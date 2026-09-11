# Mission: a personal shadcn design system, available across projects

The accepted visual direction is editorial studio: crisp typography, generous space, quiet controls, and optional expressive moments. Working name: Editorial Foundation.

## Delivery sequence

1. Establish a normal React + TypeScript + Vite starter with Tailwind v4. Preserve the accepted design rules; use real shadcn components and a locally bundled font.
2. Implement a compact reference app with the foundation, component states, and a working project list/form/dialog example. Add light/dark mode and responsive layouts.
3. Package a registry from the actual source used by the app. Include the theme, reusable layout and field compositions, selected styled shadcn controls, and portable design guidance. Test installation into a clean consuming project.
4. Include AGENTS.md, usage documentation, source/version tracking, a dependency lockfile, and repeatable build/check scripts. Keep app-specific experiments separate from shared defaults.
5. Create a private GitHub template repository under the confirmed account/name. Push a reviewed initial version and create a version tag. Verify the remote, default branch, privacy, and template setting. Use the user's existing GitHub authentication.

## Definition of working

- A fresh checkout can install with npm ci and build without TypeScript errors.
- The reference app shows the accepted visual direction and usable examples.
- Shared UI covers focus, selected, disabled, invalid, and empty states where relevant.
- Desktop, narrow-screen, keyboard dialog behaviour and visible focus are checked.
- A fresh consuming React/shadcn app can install the foundation registry and compile its imports.
- The repository can be referenced by URL from a new session, and the template contains instructions for using the design system.
- Source copies are versioned; updates are explicit, never silently applied to existing apps.

## Day-to-day use

New app: create a repository from the template, open it in Codex, and describe the product. Existing app: install the relevant registry items and read DESIGN.md. Another computer: clone the relevant repository after signing into GitHub. Shared improvement: update this repository, check it, tag a release, and deliberately adopt it in other projects.

## Scope

The reference app is a developer/design reference, not a production product backend. The first release does not include accounts, billing, databases, a public website, or native mobile components. The energy calculator is a future example product, not an additional app to build in this delivery.
