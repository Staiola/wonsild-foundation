# Netlify deployment

Foundation is deployed from this repository to https://wonsild-foundation.netlify.app.
The Netlify build command and output directory are recorded in netlify.toml.

The build uses relative asset and navigation URLs so it can also be served at
https://staiola.studio/wonsild/. The landing page is index.html; the component
reference is reference.html; checks.html contains the stress checks.

The main staiola.studio repository owns these routing rules (in its _redirects):

```text
/wonsild /wonsild/ 301
/wonsild/* https://wonsild-foundation.netlify.app/:splat 200
```

Keep these before any catch-all rule. Both Netlify projects must belong to the
same team. No DNS change is needed. Deploy Foundation before the parent routing
change. This does not change the GitHub-based registry installation commands.
Public registry JSON is served at /wonsild/r/foundation.json, with the other
items alongside it. The GitHub repository itself may remain private.

Verify the landing page, component navigation, both styles, fonts, favicon,
checks page and registry JSON through both addresses after deployment.

Reference: https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/
