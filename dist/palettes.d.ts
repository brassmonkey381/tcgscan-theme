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
export type Palette = Tokens['colors']['light'] & Tokens['palette'] & {
    /** Section headings and page titles: the variant's own ink, else the scheme's `text`. */
    heading: string;
};
export type ThemeColor = keyof Palette;
/** A full light+dark pair. */
export interface ThemeVariantColors {
    light: Palette;
    dark: Palette;
}
/**
 * Brand variants for tcgscan-app. `tcgscan` is now the BRAND scheme (deep navy + electric blue,
 * see variants.ts) rather than michi's `neutral`, which it aliased before the brand pass; the rest
 * map 1:1. The key is unchanged, so every saved preference and the variant type still resolve. tcgscan thus
 * ADOPTS michi's values while its 50 consumer files — which read the same key names — are untouched.
 */
export declare const Themes: {
    readonly tcgscan: ThemeVariantColors;
    readonly bibo: ThemeVariantColors;
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
    /** Accent for a FILLED control on chrome, with `accentText` on top. */
    readonly accent: "#2F6FED";
    /** The label on an `accent` fill. */
    readonly accentText: "#FFFFFF";
    /** Accent as TEXT or an ICON on chrome. */
    readonly link: "#8AB4FF";
    /** Success mark on chrome (the toast check). */
    readonly success: "#4ED18C";
};
/**
 * BiBo's chrome (tcgscan-app's rebrand): the same fixed, scheme-independent layer, in the brand's
 * "pixel-screen hardware" colours (marketing-studio apps/tcgscan/rebrand/SPEC.md): navy screens,
 * a yellow fill with a navy label, cyan-400 as ink. Same keys as `Chrome`, so an app swaps the
 * whole layer by choosing which one it exports; michi keeps `Chrome`.
 */
export declare const ChromeBibo: {
    /** Viewfinder and capture controls: the deepest navy, not black. */
    readonly deepest: "#010F1D";
    /** Results sheet behind the scan list (navy-900, the mascots' screen colour). */
    readonly deep: "#02182D";
    /** Each recognized-card block (navy-800). */
    readonly base: "#0A2038";
    /** Action prompt and success toast glass. */
    readonly toast: "#0A2038F7";
    /** Hairline on the glass cards: a faint cyan, the pixel glow at rest. */
    readonly toastBorder: "#3FD8FF26";
    /** Text on chrome surfaces. */
    readonly text: "#FFFFFF";
    /** Secondary text on chrome surfaces. */
    readonly textSecondary: "#A3B3D1";
    /** Yellow: Bo's body, the shutter, the one primary. */
    readonly accent: "#FEC634";
    /** Text on yellow is always navy-800 (SPEC). */
    readonly accentText: "#0A2038";
    /** Cyan-400 as text or an icon: it only ever glows on navy. */
    readonly link: "#3FD8FF";
    /** Success mark on chrome (the toast check). */
    readonly success: "#4ED18C";
};
/**
 * BiBo's brand hardware, by name (marketing-studio apps/tcgscan/rebrand/SPEC.md): the fixed colours
 * the app draws its brand surfaces with, independent of light or dark. Bands and frames are
 * yellow500 with a yellow700 lip; screens are navy900 with cyan400 pixels; text on any yellow is
 * navy800. cyan400 is never text on a light ground (use the palette's `link` there).
 */
export declare const BrandBibo: {
    /** Page ground in light mode: the pale yellow. */
    readonly yellow50: "#FFF6DA";
    /** Bo's body: bands, frames, the shutter, the primary fill. */
    readonly yellow500: "#FEC634";
    /** Pressed yellow, and the lid of a box. */
    readonly yellow600: "#F2A51C";
    /** The hardware lip under yellow (the one allowed shadow, 0 3px 0). */
    readonly yellow700: "#EE9117";
    /** Screens: the mascots' faces, the tab bar, scan HUD panels. */
    readonly navy900: "#02182D";
    /** Text on yellow, outlines on yellow hardware. */
    readonly navy800: "#0A2038";
    /** An unlit pixel or empty segment on a screen. */
    readonly navy700: "#12295A";
    /** The pixel glow: text, icons and match boxes on navy only. */
    readonly cyan400: "#3FD8FF";
    /** Cyan for text or icons on a light ground. */
    readonly cyanInk: "#00709F";
    /** Secondary text on a navy screen. */
    readonly onScreenMuted: "#A3B3D1";
};
