# Editorial Foundation

Before changing the UI, inspect system.config.json for defaultStyle. For Stone also read STONE.md, which overrides the original typography and colours. Read DESIGN.md and inspect the existing reference app. Treat its components and tokens as the starting point for this project.

- Use the existing shadcn components in src/components/ui and compositions in src/components/foundation. Preserve their keyboard, focus and accessible naming behaviour.
- Use semantic colour and spacing tokens. Follow the spacing relationships in DESIGN.md. Avoid one-off values when an existing role fits.
- Use the shared font, readable text sizes, restrained corner radius, and consistent label/control/error spacing.
- Keep expressive artwork or display treatments separate from essential controls and reading order.
- Keep product logic outside shared UI components. Change the local app freely for its purpose; promote general improvements deliberately to the source design system.
- Read SYSTEM.md for the source/version relationship. An installed copy does not update itself from the registry.
- After changes, run npm run check. If registry content changed, test the installation path described in README.md. Inspect affected layouts at desktop and phone widths and exercise changed interactions.
- Do not put secrets or private application data into the registry, documentation, examples, or Git history.

For a new product created from this template, replace the reference app in src/App.tsx with the requested product. Keep shared foundation components, CSS tokens, DESIGN.md, and these rules as the baseline. Update product name and metadata in index.html and package.json.

To create a Stone product from this template, run `npm run style:set -- stone`. The reference comparison menu changes only the preview; this command changes the product default. When replacing the reference app, remove the reference.css and preview-themes.css imports. Keep theme.css and foundation.css. The original style remains available with `npm run style:set -- editorial`.
