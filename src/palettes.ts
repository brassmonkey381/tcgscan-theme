/**
 * Palette data — the color half of the design tokens.
 *
 * Deliberately free of imports: no `react-native`, no CSS. That keeps the palettes loadable by
 * plain Node, which is what lets `scripts/check-contrast.mjs` verify every variant/scheme pair
 * without a bundler or a simulator, and keeps the core free of the SDK 56/57 skew between the two
 * consuming apps. Anything that needs a platform API (fonts, tab insets) lives in `platform.ts`;
 * `index.ts` re-exports everything so consumers import from one place.
 */

export const Colors = {
  light: {
    /* — scheme roles — */
    text: '#0F1115',
    background: '#FFFFFF',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',

    /* — brand — */
    /**
     * The brand blue. Use it for FILLS, BORDERS and ICONS — it clears 4.5:1 on white
     * but only 4.0:1 on `backgroundElement`, so it is not safe as body text on a
     * tinted surface. For accent-colored TEXT use `link`.
     */
    accent: '#2F6FED',
    /** Text/icon drawn on an `accent` fill. */
    accentText: '#FFFFFF',
    /** Tinted chips, pressed rows, callout backgrounds. Label these with `text`. */
    accentSoft: '#E7EEFD',
    /**
     * Accent-colored TEXT. A shade darker than `accent` so it clears 4.5:1 on every
     * light surface in every variant, including `backgroundElement`, where the raw
     * brand blue lands at 4.0:1. Verified by scripts/check-contrast.mjs.
     */
    link: '#185FEB',

    /* — structure — */
    /** Dividers and default borders. */
    hairline: '#E4E6EC',
    /** Emphasised borders — inputs, tiles, the browse kit's `border`. */
    hairlineStrong: '#D3D7E0',
    /** Raised surface sitting on `background`. */
    panel: '#FAFAFC',
    /** Modal backdrop. Same in both schemes by design. */
    scrim55: 'rgba(0,0,0,0.55)',
    /** Image placeholder fill while art loads. */
    imagePlaceholder: 'rgba(127,127,127,0.12)',

    /* — meaning — */
    /* Tuned to clear 4.5:1 as text on the lightest surface of EVERY variant
       (#FFFFFF, vintage #FBF8F2, vault #F4F6F9) — see scripts/check-contrast.mjs. */
    success: '#11814A',
    danger: '#C43B4D',
    warning: '#996706',
  },
  dark: {
    /* — scheme roles — */
    text: '#FFFFFF',
    background: '#131417',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',

    /* — brand — */
    accent: '#5B8DF5',
    /**
     * DARK ink, not white. The dark-scheme accent is deliberately light so it reads
     * as text/icons against a dark ground — which means white on top of it is only
     * 3.2:1 (2.3:1 on vintage's amber). A dark label clears 5.8–8.2:1 across every
     * variant. Same convention as Material 3's `on-primary`.
     */
    accentText: '#0F1115',
    accentSoft: '#17233C',
    link: '#8AB4FF',

    /* — structure — */
    hairline: '#25282F',
    hairlineStrong: '#333844',
    panel: '#1A1D23',
    scrim55: 'rgba(0,0,0,0.55)',
    imagePlaceholder: 'rgba(127,127,127,0.12)',

    /* — meaning — */
    success: '#4ED18C',
    danger: '#F0768A',
    warning: '#F0A35B',
  },
} as const;

export type Scheme = keyof typeof Colors;
/**
 * The resolved palette for one scheme — what a `useTheme()` in the app returns.
 *
 * Values are widened to `string` rather than inheriting the literal types from the
 * `as const` above, so a variant can override a field with a different hex.
 */
export type Palette = { readonly [K in keyof typeof Colors.light]: string };
export type ThemeColor = keyof Palette;

/** A full light+dark pair. */
export interface ThemeVariantColors {
  light: Palette;
  dark: Palette;
}

/**
 * Build a variant by overriding only what differs from the base. Anything not named
 * falls through, so a variant stays a few lines instead of a duplicated palette —
 * and a token added to the base automatically reaches every variant.
 */
function make(overrides: {
  light?: Partial<Palette>;
  dark?: Partial<Palette>;
}): ThemeVariantColors {
  return {
    light: { ...Colors.light, ...overrides.light },
    dark: { ...Colors.dark, ...overrides.dark },
  };
}

/**
 * Brand variants. These are pure data — no component knows they exist, which is why
 * they could only land after the literals were retired. A screen still holding a
 * hardcoded color simply won't follow them.
 */
export const Themes = {
  /** The default: TCGScan blue on neutral gray. */
  tcgscan: Colors as ThemeVariantColors,

  /** Warm paper and aged amber — reads like a binder page under lamplight. */
  vintage: make({
    light: {
      background: '#FBF8F2',
      backgroundElement: '#F2EBDE',
      backgroundSelected: '#E7DCC8',
      text: '#1C1710',
      textSecondary: '#6B5D48',
      accent: '#9A6634',
      accentSoft: '#F3E7D5',
      link: '#8A5A2B',
      hairline: '#E8DFCE',
      hairlineStrong: '#D8CBB2',
      panel: '#FDFBF6',
    },
    dark: {
      background: '#17140F',
      backgroundElement: '#241F17',
      backgroundSelected: '#332B20',
      text: '#F7F1E6',
      textSecondary: '#B8A98F',
      accent: '#D9A05B',
      accentSoft: '#2E2417',
      link: '#E8BE84',
      hairline: '#2B2419',
      hairlineStrong: '#3B3224',
      panel: '#1D1913',
    },
  }),

  /** High-chroma violet — the loud one, for the holo-chase crowd. */
  pop: make({
    light: {
      accent: '#7C3AED',
      accentSoft: '#EDE6FE',
      link: '#6D28D9',
      backgroundElement: '#F2EEFB',
      backgroundSelected: '#E3DAF8',
    },
    dark: {
      background: '#141019',
      backgroundElement: '#221B2C',
      backgroundSelected: '#312542',
      accent: '#A78BFA',
      accentSoft: '#241B36',
      link: '#C4B5FD',
      hairline: '#2A2136',
      hairlineStrong: '#3A2F4B',
      panel: '#1A1522',
    },
  }),

  /** Deep, cold and high-contrast — a vault, for long sorting sessions. */
  vault: make({
    light: {
      background: '#F4F6F9',
      backgroundElement: '#E7EBF1',
      backgroundSelected: '#D6DCE6',
      hairline: '#DDE2EA',
      hairlineStrong: '#C6CDD9',
      panel: '#FFFFFF',
    },
    dark: {
      background: '#0B0D12',
      backgroundElement: '#171A22',
      backgroundSelected: '#232833',
      accent: '#4C8DFF',
      accentSoft: '#122038',
      link: '#8FBAFF',
      hairline: '#1E222B',
      hairlineStrong: '#2C323E',
      panel: '#12151C',
    },
  }),
} as const satisfies Record<string, ThemeVariantColors>;

export type ThemeVariant = keyof typeof Themes;

export const THEME_VARIANTS = Object.keys(Themes) as ThemeVariant[];

/** Display names for the app's Settings picker. */
export const THEME_VARIANT_LABELS: Record<ThemeVariant, string> = {
  tcgscan: 'TCGScan',
  vintage: 'Vintage',
  pop: 'Pop',
  vault: 'Vault',
};

/**
 * Surfaces that deliberately do NOT follow the scheme.
 *
 * A viewfinder shouldn't turn white in light mode, and the toast/prompt are fixed
 * dark glass so they read over any content. These are a named layer, not tokens
 * that forgot to be themed — do not swap them for `Colors` values.
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

  /**
   * Accent for a FILLED control on chrome (white label on top). Deliberately the
   * light-scheme blue, not the dark one: #5B8DF5 under white text only reaches ~2.9:1,
   * while this holds ~4.6:1.
   */
  accent: '#2F6FED',
  /**
   * Accent as TEXT or an ICON on chrome — the inverse trade. The light blue would
   * disappear against near-black, so this is the dark-scheme value.
   */
  link: '#8AB4FF',
  /** Success mark on chrome (the toast check). Matches dark-scheme `success`. */
  success: '#4ED18C',
} as const;
