# Working in tcgscan-theme

Shared design tokens for **tcgscan-app** (Expo SDK 57) and **michi-maker** (Expo SDK 56). Both
consume this package by git-commit pin, so a change here is a change to BOTH apps. Read `README.md`
for the export map.

## Hard rules

0. **`variants.ts` is the canonical color source; `palettes.ts` is a derived view.** The four
   brand variants (michi-maker's richer 44-key palette + binder surface + per-variant radius) live
   in `variants.ts`. **michi consumes `VARIANTS` directly** (it keeps its own module-load +
   luminance resolution). **tcgscan consumes `palettes.ts`**, which flattens each variant into an
   explicit light/dark `Palette` (michi's luminance rule applied at build time). Change a colour in
   `variants.ts` and BOTH apps get it. Do NOT hand-edit `palettes.ts` values — they're derived.
1. **Keep the data layer import-free.** `variants.ts`, `palettes.ts` and `tokens.ts` must not
   import `react-native` or anything else. That lets the contrast checker run under plain Node and
   keeps the package immune to the SDK 56/57 skew between the two apps. Anything needing a platform
   API goes in `platform.ts` (the only RN-touching file; RN is an *optional* peer dep). Cross-file
   imports use `.ts` extensions (tsconfig `rewriteRelativeImportExtensions` rewrites them on emit)
   so Node can load the source directly.
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
   the pair is defined, the way the existing `info`-level pairs are. The variants were tuned so all
   152 pairs pass — a few interactive/status tokens (`accentSoft` as a text-bearing tint,
   `success`/`danger`/`warning`) carry AA nudges off michi's raw values; keep them AA if you retint.

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

- `src/variants.ts` — the CANONICAL variant data (import-free): michi's `VARIANTS`, `VARIANT_LIST`,
  `Tokens` type, `isDarkHex`. michi consumes this directly.
- `src/palettes.ts` — tcgscan's DERIVED view (import-free): flattens `VARIANTS` into explicit
  light/dark `Themes` + `Colors`, plus the fixed `Chrome` layer and variant labels.
- `src/tokens.ts` — non-color data (import-free): `Type`, `Spacing`, `Radius`, `Content`, `Breakpoints`.
- `src/platform.ts` — `Fonts`, `BottomTabInset` via `Platform.select` (imports react-native).
- `src/index.ts` — the single public surface.
- `scripts/check-contrast.mjs` — the WCAG audit (reads `src/palettes.ts`, i.e. tcgscan's view).
