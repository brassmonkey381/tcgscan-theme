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
export { Colors, Chrome, Themes, THEME_VARIANTS, THEME_VARIANT_LABELS, type Scheme, type Palette, type ThemeColor, type ThemeVariant, type ThemeVariantColors, } from './palettes';
export { Type, Spacing, Radius, Content, Breakpoints, type TypeToken, type TextStyleToken, } from './tokens';
export { Fonts, BottomTabInset } from './platform';
