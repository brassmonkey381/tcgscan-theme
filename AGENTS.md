# Working in tcgscan-theme

Shared design tokens for **tcgscan-app** (Expo SDK 57) and **michi-maker** (Expo SDK 56). Both
consume this package by git-commit pin, so a change here is a change to BOTH apps. Read `README.md`
for the export map.

## Hard rules

1. **Keep the data layer import-free.** `palettes.ts` and `tokens.ts` must not import
   `react-native` or anything else. That is what lets the contrast checker run under plain Node and
   what keeps the package immune to the SDK 56/57 skew between the two apps. Anything needing a
   platform API goes in `platform.ts` (the only RN-touching file; RN is an *optional* peer dep).
2. **No app code here.** No routing, no state stores, no user data, no components — token DATA and
   type contracts only. Each app owns its own theme provider and `useTheme()`. (Same charter spirit
   as `tcgscan-browse`: this is the seam, not an app.)
3. **A change is breaking for two apps.** Adding a token to the base palette is safe (variants
   inherit it). Renaming or removing a token, or changing a `Type`/`Radius` key, breaks both
   consumers — grep both apps before you do it, and land the pin bump in each.
4. **Fonts ship as per-app assets, never through this package.** Only the `Fonts` stack
   declarations live here; binaries can't travel through a JS package on native.
5. **Contrast is gated, not eyeballed.** Any color change must keep `npm run check:contrast` green
   (WCAG 2.1: 4.5 body / 3.0 large + non-text). If a pair must fail, justify it in a comment where
   the pair is defined, the way the existing `info`-level pairs are.

## Release workflow

A release is ONE commit:

```
# edit tokens in src/
npm run check:contrast     # must pass
npm run check              # tsc --noEmit
npm run build              # tsc → dist/ (dist IS committed)
git commit -am "vX.Y.Z — <what changed>"
git push
```

Then bump the commit pin in each consuming app that needs the change. `dist/` is committed so
consumers install via `github:` with no build step — never leave `dist/` stale.

## Layout

- `src/palettes.ts` — color data (import-free): `Colors`, `Themes`, `Chrome`, variant list/labels.
- `src/tokens.ts` — non-color data (import-free): `Type`, `Spacing`, `Radius`, `Content`, `Breakpoints`.
- `src/platform.ts` — `Fonts`, `BottomTabInset` via `Platform.select` (imports react-native).
- `src/index.ts` — the single public surface.
- `scripts/check-contrast.mjs` — the WCAG audit (reads `src/palettes.ts`).
