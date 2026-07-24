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
import { type Tokens } from './variants.ts';
export type Scheme = 'light' | 'dark';
/** The resolved palette for one scheme: the 5 scheme roles + the full semantic palette. */
export type Palette = Tokens['colors']['light'] & Tokens['palette'];
export type ThemeColor = keyof Palette;
/** A full light+dark pair. */
export interface ThemeVariantColors {
    light: Palette;
    dark: Palette;
}
/**
 * Brand variants for tcgscan-app. `tcgscan` is michi's `neutral` scheme (the key stays `tcgscan`
 * so the app's saved preference and variant type are unaffected); the rest map 1:1. tcgscan thus
 * ADOPTS michi's values while its 50 consumer files — which read the same key names — are untouched.
 */
export declare const Themes: {
    readonly tcgscan: ThemeVariantColors;
    readonly vintage: ThemeVariantColors;
    readonly pop: ThemeVariantColors;
    readonly vault: ThemeVariantColors;
};
export type ThemeVariant = keyof typeof Themes;
export declare const THEME_VARIANTS: ThemeVariant[];
/** Display names for the app's Settings picker. */
export declare const THEME_VARIANT_LABELS: Record<ThemeVariant, string>;
/**
 * Default-variant explicit light/dark, for code that imports `Colors` directly rather than
 * resolving a variant. It's the `tcgscan` (neutral) pair.
 */
export declare const Colors: {
    readonly light: Palette;
    readonly dark: Palette;
};
/**
 * Surfaces that deliberately do NOT follow the scheme — the scanner viewfinder and the
 * toast/prompt glass. Fixed dark, scheme-independent, so they read over any content. A named
 * layer, not tokens that forgot to be themed; do not swap them for `Colors` values.
 */
export declare const Chrome: {
    /** Viewfinder and capture controls. */
    readonly deepest: "#000000";
    /** Results sheet behind the scan list. */
    readonly deep: "#0C0C0C";
    /** Each recognized-card block. */
    readonly base: "#16181C";
    /** Action prompt and success toast glass. */
    readonly toast: "#1C1F24F7";
    /** Hairline on the glass cards. */
    readonly toastBorder: "#FFFFFF22";
    /** Text on chrome surfaces. */
    readonly text: "#FFFFFF";
    /** Secondary text on chrome surfaces. */
    readonly textSecondary: "#A8ADB8";
    /** Accent for a FILLED control on chrome (white label on top). */
    readonly accent: "#2F6FED";
    /** Accent as TEXT or an ICON on chrome. */
    readonly link: "#8AB4FF";
    /** Success mark on chrome (the toast check). */
    readonly success: "#4ED18C";
};
