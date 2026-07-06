---
name: verify
description: Build, serve, and drive the docs app (apps/docs) in a real browser to verify changes end-to-end. Use when verifying docs-site features like navigation, search, or layout.
---

# Verify apps/docs changes

The docs app is a Next.js static export (`output: "export"`, `trailingSlash: true`)
deployed to GitHub Pages. Verify against the built `out/` directory — that is the
real deployed artifact — not just `next dev`.

## Build and serve

```bash
cd apps/docs && npm run build          # static export to out/ (~30s)
cd apps/docs/out && python3 -m http.server <port> --bind 127.0.0.1
```

Remember trailing slashes when visiting pages: `/docs/components/button/`.

## Drive with Playwright

Playwright is not a repo dependency. Install it in the session scratchpad and pin
the version to the browser builds already cached in `~/Library/Caches/ms-playwright`
(check the dir, e.g. `chromium-1208` → `playwright@1.58.0`; verify with
`grep -A2 '"chromium"' node_modules/playwright-core/browsers.json`). Installing
latest may demand a browser build that isn't cached.

```bash
cd <scratchpad> && npm i playwright@<matching> && node script.mjs
```

## Gotchas

- Client-side navigations (`router.push`) complete after `waitForLoadState`
  resolves — wait for `page.waitForURL(...)` or a timeout before reading `page.url()`.
- Search dialog: open with `Meta+k`, input is `getByRole("searchbox")`, results are
  `.modal-content .list-group-item-action`. The search index is the static file
  `out/api/search` (Orama export), fetched lazily on first keystroke.
- Dark mode: `page.evaluate(() => { localStorage.theme = "dark"; document.documentElement.classList.add("dark"); })`.
