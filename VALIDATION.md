# Validation

## 0.4.0 — Landing clarity and reusable compositions

- Both full registry items installed into the separate existing React/Vite consumer projects, adding EmptyState and CopyCommand and updating PageHeader and shared CSS. Both consumers passed a production build importing and rendering the new components without reference or landing styles.
- Installed compositions were inspected at desktop and 375px phone widths, including both styles in dark mode. The phone consumers retained a document width of 375px, visible command text, and correct h2 output from PageHeader level=2.
- The landing page was checked in Editorial and Stone at 375px with no horizontal overflow. Its embedded workspace has one page h1, a section h2, workspace h3 and detail h4.
- Search/no-results and clearing, editing and saving, archive/restore and the empty archive, creation validation and successful creation were exercised in the shared workspace. The direct components link opened the correct reference tab in the selected style. ArrowRight selected the new activity tab example.
- Native clipboard interaction copied the displayed Stone full-foundation and theme-only commands. Changing the install option cleared the previous success message. Clipboard-denial and asynchronous race handling were reviewed in code; those failure paths were not browser-simulated.
- Browser checks remain manual. This is not an exhaustive accessibility, zoom or cross-browser audit.

## 0.3.1 landing page

- The landing page uses the existing 0.3.1 controls, layouts and theme tokens. It has separate composition CSS and does not change registry contents.
- `npm run check` passes, including the additional production HTML entry.
- Editorial and Stone were inspected at desktop and 375px phone widths. Neither had horizontal page overflow on the phone. The copy control retains a 44 × 44px target.
- The style selector updates the page, reference links and versioned install command. The Stone command was copied and its clipboard text verified. Empty-name validation, successful session-only saving, the expressive switch, section anchors and navigation to the reference were exercised.
- The page remains a local preview and private-repository source. No public deployment or exhaustive accessibility audit is claimed.

## 0.3.1 — Review fixes

- `npm run check` passed: 36 opaque colour pairs, four official shadcn registry builds, TypeScript and the production reference/check-page build.
- Both full registry items installed successfully with the shadcn CLI into separate clean React/Vite projects. Editorial created 18 files; Stone created 19. Both consumers passed their own production build, with bundled fonts and no reference-page CSS.
- All eight rendered checks passed in each installed consumer at 375px, for both light/dark modes and 100%/200% root font size. Both also passed at 1280px with 200% root font size in light mode. This is text enlargement, not browser zoom or a complete responsive matrix.
- At 375px with normal text: page width stayed at 375px, the long button fit within 327px, the complete alert title remained visible, the switch measured 44 × 44px and the header had exactly one 32px region gap. Enlarged text retained those layout contracts without horizontal page overflow.
- Rendered enabled, unselected tab contrast was 5.48:1/5.05:1 for Editorial light and 5.57:1/4.87:1 for Stone light (line/filled). Both dark styles exceeded 6.9:1 for both tab variants.
- Manual interaction checks in the shared source fixture: tab arrow-key selection, switch Space and corner clicks outside its visual track, long select popover wrapping within the phone viewport, dialog initial focus, Shift+Tab containment and Escape focus return.
- The reference example's selected and unselected rows share the same 24px/16px padding and aligned project/status columns. Typography attribution and demo-only scope are visible in the reference.
- `/checks.html` is a manual browser regression fixture. CI continues to run build, registry, generated-file and token checks; it does not run these browser interactions. No full assistive-technology or cross-browser certification is claimed.

## 0.2.0

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
