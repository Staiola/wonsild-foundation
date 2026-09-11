# Validation — 0.2.0

Completed locally:

- Official shadcn CLI successfully builds both registry items from registry.json.
- TypeScript check and Vite production build pass for the reference app.
- Full foundation installed with the shadcn CLI into a clean second React/Vite project. Its imports, locally bundled font and production build pass.
- Desktop and 375px browser review of the reference app. At 375px the document content width equals the viewport width (no horizontal overflow).
- Light and dark theme inspected; mobile reference, component and example-app views checked.
- Create-project dialog opened with initial focus on its input. Shift+Tab wraps to the close button and Tab returns to the input. Project creation updates the list and count.
- Empty project name produces an inline error. Archive filter produces the intended empty state. The slider thumb has an accessible name.
- scripts/check-contrast.mjs checks selected opaque foreground/background pairs in light and dark themes, including input and focus contrast.

Limits:

- This is a starter and reference app. The example project data is in memory, not backed by accounts or a database.
- No broad assistive-technology certification, every-browser matrix or exhaustive 200% text-zoom audit is claimed. Review each real consuming app's content and interactions.
- A theme token test cannot establish the accessibility of all possible overlays, opacity changes, third-party components or future pages.
- An installation with existing customised components requires a diff review; the clean-project test cannot establish compatibility with every existing app.

Remote GitHub/template and CI verification is recorded in the delivery result once publishing completes.

## 0.3.0 — Stone variation

- `npm run check` passed: 36 opaque colour pairs across both styles and light/dark modes, four registry items built by the shadcn CLI, TypeScript and production build.
- A separate configured Vite/shadcn app installed the local `stone-foundation` JSON successfully (19 files), then passed its production build. Browser inspection confirmed Geist body text, Source Serif 4 display headings, stone background and 44px input height without reference-app CSS.
- `style:set` was exercised in an isolated template configuration for both Stone and Editorial; each generated its intended default tokens.
- Reference preview inspected at desktop and 375px phone widths. Stone foundations and controls were visually checked; the phone components and example app had no document overflow. The mobile project dialog displayed empty-name validation and successfully created an in-memory project. Dialog Escape closing and Stone dark mode were exercised.
- Original style remains separately selectable; the existing v0.2.0 release remains available. This release does not replace installed copies in other apps.
- These checks do not constitute a full assistive-technology or cross-browser audit. Stone uses Source Serif 4 for its display serif and defines its own dark palette.
