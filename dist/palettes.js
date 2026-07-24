/**
 * The color half of the tokens, DERIVED from the canonical `variants.ts`.
 *
 * michi-maker consumes `variants.ts` directly (its native colors+palette+paletteDark shape).
 * tcgscan-app consumes what's here: each variant flattened into an explicit light+dark `Palette`
 * (michi's luminance rule applied at build time — no runtime sniffing), which is the shape
 * tcgscan's live theme provider and its WCAG contrast checker expect. Same values, two shapes.
 *
 * Import-free (no react-native) so the contrast checker loads it under plain Node.
 */
import { VARIANTS, isDarkHex } from "./variants.js";
/**
 * Flatten one canonical variant into an explicit palette for a scheme. Mirrors michi's resolve:
 * the scheme roles + the light base palette, with `paletteDark` merged over it when the variant's
 * EFFECTIVE background is dark (so Dark Vault stays dark under a light OS, exactly as in michi).
 */
function resolve(v, scheme) {
    const roles = v.colors[scheme];
    const dark = isDarkHex(roles.background);
    return { ...roles, ...v.palette, ...(dark ? v.paletteDark : {}) };
}
const themeFor = (v) => ({
    light: resolve(v, 'light'),
    dark: resolve(v, 'dark'),
});
/**
 * Brand variants for tcgscan-app. `tcgscan` is michi's `neutral` scheme (the key stays `tcgscan`
 * so the app's saved preference and variant type are unaffected); the rest map 1:1. tcgscan thus
 * ADOPTS michi's values while its 50 consumer files — which read the same key names — are untouched.
 */
export const Themes = {
    tcgscan: themeFor(VARIANTS.neutral),
    vintage: themeFor(VARIANTS.vintage),
    pop: themeFor(VARIANTS.pop),
    vault: themeFor(VARIANTS.vault),
};
export const THEME_VARIANTS = Object.keys(Themes);
/** Display names for the app's Settings picker. */
export const THEME_VARIANT_LABELS = {
    tcgscan: 'TCGScan',
    vintage: 'Vintage',
    pop: 'Pop',
    vault: 'Vault',
};
/**
 * Default-variant explicit light/dark, for code that imports `Colors` directly rather than
 * resolving a variant. It's the `tcgscan` (neutral) pair.
 */
export const Colors = {
    light: Themes.tcgscan.light,
    dark: Themes.tcgscan.dark,
};
/**
 * Surfaces that deliberately do NOT follow the scheme — the scanner viewfinder and the
 * toast/prompt glass. Fixed dark, scheme-independent, so they read over any content. A named
 * layer, not tokens that forgot to be themed; do not swap them for `Colors` values.
 */
export const Chrome = {
    /** Viewfinder and capture controls. */
    deepest: '#000000',
    /** Results sheet behind the scan list. */
    deep: '#0C0C0C',
    /** Each recognized-card block. */
    base: '#16181C',
    /** Action prompt and success toast glass. */
    toast: '#1C1F24F7',
    /** Hairline on the glass cards. */
    toastBorder: '#FFFFFF22',
    /** Text on chrome surfaces. */
    text: '#FFFFFF',
    /** Secondary text on chrome surfaces. */
    textSecondary: '#A8ADB8',
    /** Accent for a FILLED control on chrome (white label on top). */
    accent: '#2F6FED',
    /** Accent as TEXT or an ICON on chrome. */
    link: '#8AB4FF',
    /** Success mark on chrome (the toast check). */
    success: '#4ED18C',
};
