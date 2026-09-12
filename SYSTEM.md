# Source and version

System: Editorial Foundation
Version: 0.5.0
Source: https://github.com/Staiola/editorial-foundation
Registry items: `theme`, `foundation`, `stone-theme` and `stone-foundation`

This is a source-copy design system for React, Tailwind v4 and shadcn CSS variables. Installed components belong to the consuming project. A later change in the source registry does not update them automatically.

## New app

Create a new GitHub repository from the source template, clone it, run npm ci, then npm run dev. Replace src/App.tsx with the product. Keep the shared components and design rules. Update app name and metadata. AGENTS.md guides a new Codex session to use the existing foundation.

## Existing app

Install the theme or full foundation using the registry command in README.md. Pin a tag or commit for a reproducible source snapshot. Read and reference the installed DESIGN.md from the consuming project's AGENTS.md. Compare any existing components before replacing them.

## Improvements

Experiment in the app. If a change is generally useful, apply it in the source repository and update DESIGN.md and CHANGELOG.md. Build the registry, run checks, inspect representative screens, then tag a new version. Adopt that version in other apps deliberately.

Keep product-specific calculations, backend code, client data and secrets out of the shared foundation. A house energy calculator can use these controls and layout patterns; its calculations remain separate app logic.

Styles share source components. `system.config.json` selects a template default; `npm run style:set -- stone` generates Stone as the default app theme. Registry items select their own explicit tokens independently of the template default. Original v0.2.0 installs remain pinned and unchanged.
