# tcgscan-theme

Shared design tokens for the two TCGScan apps — **tcgscan-app** and **michi-maker**. One source
of truth for brand color, typography, spacing and radii, so the sister apps read as one family and
a token change lands in both from a single place.

MIT. Consumed by git-commit pin (like `tcgscan-browse`); `dist/` is committed so consumers install
without a build step.

## What's in it

| Export | Layer | Notes |
|---|---|---|
| `Colors`, `Themes`, `Chrome`, `THEME_VARIANTS`, `THEME_VARIANT_LABELS` | pure data | 4 brand variants (`tcgscan`, `vintage`, `pop`, `vault`) × light/dark, plus the fixed dark "chrome" surfaces (viewfinder, toast) |
| `Type`, `Spacing`, `Radius`, `Content`, `Breakpoints` | pure data | the type scale and layout tokens; role names shared across both apps |
| `Fonts`, `BottomTabInset` | platform (`react-native`) | the only RN-dependent module — resolved per platform |
| types: `Palette`, `Scheme`, `ThemeVariant`, `TypeToken`, … | — | the contracts an app's theme provider builds on |

## Two layers, on purpose

- **Pure data** (`palettes.ts`, `tokens.ts`) imports nothing — no `react-native`. That keeps it
  loadable by plain Node (the contrast checker) and immune to the Expo SDK 56/57 skew between the
  two consuming apps.
- **Platform** (`platform.ts`) is the single file that imports `react-native`. `react-native` is an
  **optional** peer dependency, so a Node script that only touches the data never pulls RN in.

Apps resolve the active scheme + variant into a live `Palette` in their **own** provider and expose
their own `useTheme()`. This package supplies the token DATA and the type contracts, not the React
runtime — so it stays free of app routing, state, or user data.

## Fonts

Font **stack declarations** live here (`Fonts`), but the **binaries do not** — a font can't travel
through a JS package on native. Each app ships its own: web via `@font-face`, native via a bundled
`.ttf` registered with `expo-font`.

## Contrast checker

`npm run check:contrast` audits every variant × scheme pair against WCAG 2.1. It reads the
import-free `src/palettes.ts` directly, so it gates the palette at the source for both apps. `--all`
prints passes too.

## Consuming it

```
npm i github:brassmonkey381/tcgscan-theme#<commit>
```

Pin by commit and bump deliberately, the same discipline as `tcgscan-browse`.

## Building / releasing

```
npm run build     # tsc → dist/ (committed)
npm run check     # tsc --noEmit
```

A release is one commit: the token change, `npm run build`, and `npm run check:contrast` green.
See `AGENTS.md`.
