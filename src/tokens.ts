/**
 * Non-color tokens — the type scale, spacing, radii, content widths and breakpoints.
 *
 * Like `palettes.ts`, this is import-free (no `react-native`) so it stays loadable by plain Node
 * and free of the SDK-version skew between the two consuming apps. The `Type` presets are typed
 * with a local `TextStyleToken` structural type rather than react-native's `TextStyle`, so an app
 * can spread a preset straight onto a `<Text style>` and TypeScript is happy, but nothing here
 * imports RN. Role names follow michi-maker so the two apps stay portable.
 */

/** The subset of react-native's TextStyle these presets use — declared locally to stay RN-free. */
export interface TextStyleToken {
  fontSize: number;
  lineHeight: number;
  fontWeight:
    | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
    | 'normal' | 'bold';
  letterSpacing?: number;
  fontVariant?: string[];
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

/**
 * Type scale. Naming these sizes is what makes a font swap or a density setting a one-file change.
 * Role names match michi's scale so the two apps stay portable.
 */
export const Type = {
  /** Landing wordmark. */
  display: { fontSize: 40, lineHeight: 44, fontWeight: '800', letterSpacing: -0.5 },
  /** Page and hero headings. */
  title: { fontSize: 22, lineHeight: 28, fontWeight: '700', letterSpacing: -0.2 },
  /** Screen titles, modal headers. */
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '700', letterSpacing: -0.2 },
  /** Card titles, section labels. */
  subtitle: { fontSize: 16, lineHeight: 22, fontWeight: '700' },
  /** Default reading text. */
  body: { fontSize: 15, lineHeight: 22, fontWeight: '500' },
  /** Card bodies, help text. */
  bodySm: { fontSize: 13.5, lineHeight: 19, fontWeight: '500' },
  /** Buttons, rows, tabs. */
  label: { fontSize: 13, lineHeight: 18, fontWeight: '600' },
  /** Footnotes, metadata. */
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' },
  /** Prices, similarity scores, scan timings — tabular so columns line up. */
  data: {
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  /** Small caps section header (uppercase + tracked). */
  overline: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
} as const satisfies Record<string, TextStyleToken>;

export type TypeToken = keyof typeof Type;

/**
 * Spacing. Word keys are original and in use; the numeric aliases are the michi-shaped names for
 * new code. Same values, pick either.
 */
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 4,
  /** Buttons, inputs, chips. */
  control: 8,
  /** Cards and panels. */
  panel: 12,
  /** Bottom sheets and modals. */
  sheet: 20,
  /** Fully rounded. */
  pill: 999,
} as const;

/** Centered content widths. `app` is the 560px column. */
export const Content = {
  app: 560,
  prose: 640,
  wide: 1080,
} as const;

/**
 * Breakpoints, in `useWindowDimensions().width` terms.
 * `rail` — enough room for a side rail / two-up layout.
 * `hero` — full desktop, wide hero and multi-column grids.
 */
export const Breakpoints = {
  rail: 900,
  hero: 1180,
} as const;
