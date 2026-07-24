/**
 * Palette data — the color half of the design tokens.
 *
 * Deliberately free of imports: no `react-native`, no CSS. That keeps the palettes loadable by
 * plain Node, which is what lets `scripts/check-contrast.mjs` verify every variant/scheme pair
 * without a bundler or a simulator, and keeps the core free of the SDK 56/57 skew between the two
 * consuming apps. Anything that needs a platform API (fonts, tab insets) lives in `platform.ts`;
 * `index.ts` re-exports everything so consumers import from one place.
 */
export declare const Colors: {
    readonly light: {
        readonly text: "#0F1115";
        readonly background: "#FFFFFF";
        readonly backgroundElement: "#F0F0F3";
        readonly backgroundSelected: "#E0E1E6";
        readonly textSecondary: "#60646C";
        /**
         * The brand blue. Use it for FILLS, BORDERS and ICONS — it clears 4.5:1 on white
         * but only 4.0:1 on `backgroundElement`, so it is not safe as body text on a
         * tinted surface. For accent-colored TEXT use `link`.
         */
        readonly accent: "#2F6FED";
        /** Text/icon drawn on an `accent` fill. */
        readonly accentText: "#FFFFFF";
        /** Tinted chips, pressed rows, callout backgrounds. Label these with `text`. */
        readonly accentSoft: "#E7EEFD";
        /**
         * Accent-colored TEXT. A shade darker than `accent` so it clears 4.5:1 on every
         * light surface in every variant, including `backgroundElement`, where the raw
         * brand blue lands at 4.0:1. Verified by scripts/check-contrast.mjs.
         */
        readonly link: "#185FEB";
        /** Dividers and default borders. */
        readonly hairline: "#E4E6EC";
        /** Emphasised borders — inputs, tiles, the browse kit's `border`. */
        readonly hairlineStrong: "#D3D7E0";
        /** Raised surface sitting on `background`. */
        readonly panel: "#FAFAFC";
        /** Modal backdrop. Same in both schemes by design. */
        readonly scrim55: "rgba(0,0,0,0.55)";
        /** Image placeholder fill while art loads. */
        readonly imagePlaceholder: "rgba(127,127,127,0.12)";
        readonly success: "#11814A";
        readonly danger: "#C43B4D";
        readonly warning: "#996706";
    };
    readonly dark: {
        readonly text: "#FFFFFF";
        readonly background: "#131417";
        readonly backgroundElement: "#212225";
        readonly backgroundSelected: "#2E3135";
        readonly textSecondary: "#B0B4BA";
        readonly accent: "#5B8DF5";
        /**
         * DARK ink, not white. The dark-scheme accent is deliberately light so it reads
         * as text/icons against a dark ground — which means white on top of it is only
         * 3.2:1 (2.3:1 on vintage's amber). A dark label clears 5.8–8.2:1 across every
         * variant. Same convention as Material 3's `on-primary`.
         */
        readonly accentText: "#0F1115";
        readonly accentSoft: "#17233C";
        readonly link: "#8AB4FF";
        readonly hairline: "#25282F";
        readonly hairlineStrong: "#333844";
        readonly panel: "#1A1D23";
        readonly scrim55: "rgba(0,0,0,0.55)";
        readonly imagePlaceholder: "rgba(127,127,127,0.12)";
        readonly success: "#4ED18C";
        readonly danger: "#F0768A";
        readonly warning: "#F0A35B";
    };
};
export type Scheme = keyof typeof Colors;
/**
 * The resolved palette for one scheme — what a `useTheme()` in the app returns.
 *
 * Values are widened to `string` rather than inheriting the literal types from the
 * `as const` above, so a variant can override a field with a different hex.
 */
export type Palette = {
    readonly [K in keyof typeof Colors.light]: string;
};
export type ThemeColor = keyof Palette;
/** A full light+dark pair. */
export interface ThemeVariantColors {
    light: Palette;
    dark: Palette;
}
/**
 * Brand variants. These are pure data — no component knows they exist, which is why
 * they could only land after the literals were retired. A screen still holding a
 * hardcoded color simply won't follow them.
 */
export declare const Themes: {
    /** The default: TCGScan blue on neutral gray. */
    readonly tcgscan: ThemeVariantColors;
    /** Warm paper and aged amber — reads like a binder page under lamplight. */
    readonly vintage: ThemeVariantColors;
    /** High-chroma violet — the loud one, for the holo-chase crowd. */
    readonly pop: ThemeVariantColors;
    /** Deep, cold and high-contrast — a vault, for long sorting sessions. */
    readonly vault: ThemeVariantColors;
};
export type ThemeVariant = keyof typeof Themes;
export declare const THEME_VARIANTS: ThemeVariant[];
/** Display names for the app's Settings picker. */
export declare const THEME_VARIANT_LABELS: Record<ThemeVariant, string>;
/**
 * Surfaces that deliberately do NOT follow the scheme.
 *
 * A viewfinder shouldn't turn white in light mode, and the toast/prompt are fixed
 * dark glass so they read over any content. These are a named layer, not tokens
 * that forgot to be themed — do not swap them for `Colors` values.
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
    /**
     * Accent for a FILLED control on chrome (white label on top). Deliberately the
     * light-scheme blue, not the dark one: #5B8DF5 under white text only reaches ~2.9:1,
     * while this holds ~4.6:1.
     */
    readonly accent: "#2F6FED";
    /**
     * Accent as TEXT or an ICON on chrome — the inverse trade. The light blue would
     * disappear against near-black, so this is the dark-scheme value.
     */
    readonly link: "#8AB4FF";
    /** Success mark on chrome (the toast check). Matches dark-scheme `success`. */
    readonly success: "#4ED18C";
};
