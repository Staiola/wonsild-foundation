# Netlify deployment

Foundation is deployed from this repository to https://wonsild-foundation.netlify.app.
The Netlify build command and output directory are recorded in netlify.toml.

The build uses relative asset and navigation URLs so it can also be served at
https://staiola.studio/wonsild/. The landing page is index.html; the component
reference is reference.html; checks.html contains the stress checks.

The staiola.studio website is deployed from https://github.com/Staiola/staiolastudio
(Netlify project `staiolastudio`). Its `_redirects` file owns these routing rules:

```
/wonsild     https://wonsild-foundation.netlify.app/        200
/wonsild/*   https://wonsild-foundation.netlify.app/:splat  200
```

Netlify matches trailing-slash variants alike, so both rules are rewrites.
The landing HTML normalizes an exact /wonsild visit to /wonsild/ before loading
relative assets, preserving query parameters and anchors. Do not add a Netlify
/wonsild → /wonsild/ redirect: it also matches /wonsild/ and loops. Link to
/wonsild/ with the trailing slash; a visit without it briefly requests the
landing scripts from the site root (404) before the address is normalized.

Keep these before any catch-all rule. No DNS change is needed. Deploy Foundation
before changing the parent routing. This does not change the GitHub-based
registry installation commands. Public registry JSON is served at
/wonsild/r/foundation.json, with the other items alongside it.

Verify the landing page, component navigation, both styles, fonts, favicon,
checks page and registry JSON through both addresses after deployment.

Reference: https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/
