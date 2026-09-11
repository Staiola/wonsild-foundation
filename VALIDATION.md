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
