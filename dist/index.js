/**
 * tcgscan-theme — the shared design tokens for tcgscan-app and michi-maker.
 *
 * Two layers:
 *   - Pure data (palettes, tokens): no react-native import, so plain Node can load it (the
 *     contrast checker) and it's immune to the SDK 56/57 skew between the two apps.
 *   - Platform (`./platform`): the only RN-dependent module (Fonts, tab insets).
 *
 * Apps resolve the active scheme/variant into a live `Palette` in their own provider; this
 * package supplies the token DATA and the type contracts, not the React runtime. See AGENTS.md.
 */
export { Colors, Chrome, ChromeBibo, BrandBibo, Themes, THEME_VARIANTS, THEME_VARIANT_LABELS, } from "./palettes.js";
// The canonical variant data (michi-maker's richer colors + binder surface + per-variant radius).
// michi consumes these directly and keeps its own module-load resolution; tcgscan's Themes above
// are derived from them. See variants.ts.
export { VARIANTS, VARIANT_LIST, isDarkHex, } from "./variants.js";
export { Type, TypeBibo, RadiusBibo, Spacing, Radius, Content, Breakpoints, } from "./tokens.js";
export { Fonts, BottomTabInset } from "./platform.js";
