/**
 * Non-color tokens — the type scale, spacing, radii, content widths and breakpoints.
 *
 * Like `palettes.ts`, this is import-free (no `react-native`) so it stays loadable by plain Node
 * and free of the SDK-version skew between the two consuming apps. The `Type` presets are typed
 * with a local `TextStyleToken` structural type rather than react-native's `TextStyle`, so an app
 * can spread a preset straight onto a `<Text style>` and TypeScript is happy, but nothing here
 * imports RN. Role names follow michi-maker so the two apps stay portable.
 */
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
};
/**
 * Spacing. Two vocabularies over one set of values:
 *
 *   - Ordinal keys (`half`…`six`) are michi-maker's original COARSE scale — each step roughly
 *     doubles (2,4,8,16,24,32,64). michi uses these ~570×; keep using them there.
 *   - Value-named keys (`s2`…`s64`) are a complete 2px GRID, so a finer layout (tcgscan-app's)
 *     tokenizes exactly with no rounding. `s8 === two`, `s16 === three`, etc.
 *
 * The scale is a superset serving both apps; pick ONE vocabulary per app and stay consistent.
 * A future density change edits these numbers in one place. Truly arbitrary one-off values
 * (odd hairline nudges) are fine to leave raw — a scale should not grow a token for every integer.
 */
export const Spacing = {
    // Ordinal (coarse) — michi-maker's scale.
    half: 2,
    one: 4,
    two: 8,
    three: 16,
    four: 24,
    five: 32,
    six: 64,
    // Value grid (2px) — the same values plus the in-between steps, named by their pixel value.
    s2: 2,
    s4: 4,
    s6: 6,
    s8: 8,
    s10: 10,
    s12: 12,
    s14: 14,
    s16: 16,
    s18: 18,
    s20: 20,
    s24: 24,
    s32: 32,
    s48: 48,
    s64: 64,
};
/**
 * Fixed radius scale (michi-maker's base values). tcgscan-app uses the fixed export; michi
 * resolves radius PER VARIANT from `variants.ts` (some variants round more), so michi keeps its
 * own — this is the neutral base, which is also exactly tcgscan's prior 5 values.
 */
export const Radius = {
    xs: 2,
    tag: 3,
    sm: 4,
    thumb: 6,
    /** Buttons, inputs, chips. */
    control: 8,
    /** Cards and panels. */
    panel: 12,
    actionBar: 14,
    lg: 16,
    /** Bottom sheets and modals. */
    sheet: 20,
    /** Fully rounded. */
    pill: 999,
};
/** Centered content widths. `app` is the 560px column. */
export const Content = {
    app: 560,
    prose: 640,
    wide: 1080,
};
/**
 * Breakpoints, in `useWindowDimensions().width` terms.
 * `rail` — enough room for a side rail / two-up layout.
 * `hero` — full desktop, wide hero and multi-column grids.
 */
export const Breakpoints = {
    rail: 900,
    hero: 1180,
};
/**
 * BiBo's text ladder (owner's round 3 pick, 2026-10-31: "Roomy"): title 36, heading 22, body 17,
 * small 15, caption 13, and nothing in between. Same keys as `Type`, so tcgscan-app swaps the
 * whole scale by exporting this as its `Type`; michi keeps `Type`. Page titles (36) are drawn by
 * the shell; in-screen titles take the heading step.
 */
export const TypeBibo = {
    display: { fontSize: 36, lineHeight: 42, fontWeight: '800', letterSpacing: -0.5 },
    title: { fontSize: 22, lineHeight: 28, fontWeight: '700', letterSpacing: -0.2 },
    heading: { fontSize: 22, lineHeight: 28, fontWeight: '700', letterSpacing: -0.2 },
    subtitle: { fontSize: 17, lineHeight: 23, fontWeight: '700' },
    body: { fontSize: 17, lineHeight: 24, fontWeight: '500' },
    bodySm: { fontSize: 15, lineHeight: 21, fontWeight: '500' },
    label: { fontSize: 15, lineHeight: 20, fontWeight: '600' },
    caption: { fontSize: 13, lineHeight: 18, fontWeight: '500' },
    data: { fontSize: 15, lineHeight: 20, fontWeight: '600', fontVariant: ['tabular-nums'] },
    overline: { fontSize: 13, lineHeight: 18, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
};
/**
 * BiBo's corner ladder (owner's picks: round 1's 8 / 14 / 18, extended in round 3): card images 6,
 * chips 8, buttons and inputs 14, cards 18, sheets 28, pills round. Same keys as `Radius`, swapped
 * in by tcgscan-app; the small keys all land on the image step.
 */
export const RadiusBibo = {
    xs: 6,
    tag: 6,
    sm: 6,
    thumb: 6,
    control: 14,
    panel: 18,
    actionBar: 14,
    lg: 18,
    sheet: 28,
    pill: 999,
};
