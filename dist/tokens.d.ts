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
    fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold';
    letterSpacing?: number;
    fontVariant?: string[];
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}
/**
 * Type scale. Naming these sizes is what makes a font swap or a density setting a one-file change.
 * Role names match michi's scale so the two apps stay portable.
 */
export declare const Type: {
    /** Landing wordmark. */
    readonly display: {
        readonly fontSize: 40;
        readonly lineHeight: 44;
        readonly fontWeight: "800";
        readonly letterSpacing: -0.5;
    };
    /** Page and hero headings. */
    readonly title: {
        readonly fontSize: 22;
        readonly lineHeight: 28;
        readonly fontWeight: "700";
        readonly letterSpacing: -0.2;
    };
    /** Screen titles, modal headers. */
    readonly heading: {
        readonly fontSize: 20;
        readonly lineHeight: 26;
        readonly fontWeight: "700";
        readonly letterSpacing: -0.2;
    };
    /** Card titles, section labels. */
    readonly subtitle: {
        readonly fontSize: 16;
        readonly lineHeight: 22;
        readonly fontWeight: "700";
    };
    /** Default reading text. */
    readonly body: {
        readonly fontSize: 15;
        readonly lineHeight: 22;
        readonly fontWeight: "500";
    };
    /** Card bodies, help text. */
    readonly bodySm: {
        readonly fontSize: 13.5;
        readonly lineHeight: 19;
        readonly fontWeight: "500";
    };
    /** Buttons, rows, tabs. */
    readonly label: {
        readonly fontSize: 13;
        readonly lineHeight: 18;
        readonly fontWeight: "600";
    };
    /** Footnotes, metadata. */
    readonly caption: {
        readonly fontSize: 12;
        readonly lineHeight: 16;
        readonly fontWeight: "500";
    };
    /** Prices, similarity scores, scan timings — tabular so columns line up. */
    readonly data: {
        readonly fontSize: 12.5;
        readonly lineHeight: 17;
        readonly fontWeight: "600";
        readonly fontVariant: ["tabular-nums"];
    };
    /** Small caps section header (uppercase + tracked). */
    readonly overline: {
        readonly fontSize: 13;
        readonly lineHeight: 18;
        readonly fontWeight: "700";
        readonly letterSpacing: 1;
        readonly textTransform: "uppercase";
    };
};
export type TypeToken = keyof typeof Type;
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
export declare const Spacing: {
    readonly half: 2;
    readonly one: 4;
    readonly two: 8;
    readonly three: 16;
    readonly four: 24;
    readonly five: 32;
    readonly six: 64;
    readonly s2: 2;
    readonly s4: 4;
    readonly s6: 6;
    readonly s8: 8;
    readonly s10: 10;
    readonly s12: 12;
    readonly s14: 14;
    readonly s16: 16;
    readonly s18: 18;
    readonly s20: 20;
    readonly s24: 24;
    readonly s32: 32;
    readonly s48: 48;
    readonly s64: 64;
};
/**
 * Fixed radius scale (michi-maker's base values). tcgscan-app uses the fixed export; michi
 * resolves radius PER VARIANT from `variants.ts` (some variants round more), so michi keeps its
 * own — this is the neutral base, which is also exactly tcgscan's prior 5 values.
 */
export declare const Radius: {
    readonly xs: 2;
    readonly tag: 3;
    readonly sm: 4;
    readonly thumb: 6;
    /** Buttons, inputs, chips. */
    readonly control: 8;
    /** Cards and panels. */
    readonly panel: 12;
    readonly actionBar: 14;
    readonly lg: 16;
    /** Bottom sheets and modals. */
    readonly sheet: 20;
    /** Fully rounded. */
    readonly pill: 999;
};
/** Centered content widths. `app` is the 560px column. */
export declare const Content: {
    readonly app: 560;
    readonly prose: 640;
    readonly wide: 1080;
};
/**
 * Breakpoints, in `useWindowDimensions().width` terms.
 * `rail` — enough room for a side rail / two-up layout.
 * `hero` — full desktop, wide hero and multi-column grids.
 */
export declare const Breakpoints: {
    readonly rail: 900;
    readonly hero: 1180;
};
/**
 * BiBo's text ladder (owner's round 3 pick, 2026-10-31: "Roomy"): title 36, heading 22, body 17,
 * small 15, caption 13, and nothing in between. Same keys as `Type`, so tcgscan-app swaps the
 * whole scale by exporting this as its `Type`; michi keeps `Type`. Page titles (36) are drawn by
 * the shell; in-screen titles take the heading step.
 */
export declare const TypeBibo: {
    readonly display: {
        readonly fontSize: 36;
        readonly lineHeight: 42;
        readonly fontWeight: "800";
        readonly letterSpacing: -0.5;
    };
    readonly title: {
        readonly fontSize: 22;
        readonly lineHeight: 28;
        readonly fontWeight: "700";
        readonly letterSpacing: -0.2;
    };
    readonly heading: {
        readonly fontSize: 22;
        readonly lineHeight: 28;
        readonly fontWeight: "700";
        readonly letterSpacing: -0.2;
    };
    readonly subtitle: {
        readonly fontSize: 17;
        readonly lineHeight: 23;
        readonly fontWeight: "700";
    };
    readonly body: {
        readonly fontSize: 17;
        readonly lineHeight: 24;
        readonly fontWeight: "500";
    };
    readonly bodySm: {
        readonly fontSize: 15;
        readonly lineHeight: 21;
        readonly fontWeight: "500";
    };
    readonly label: {
        readonly fontSize: 15;
        readonly lineHeight: 20;
        readonly fontWeight: "600";
    };
    readonly caption: {
        readonly fontSize: 13;
        readonly lineHeight: 18;
        readonly fontWeight: "500";
    };
    readonly data: {
        readonly fontSize: 15;
        readonly lineHeight: 20;
        readonly fontWeight: "600";
        readonly fontVariant: ["tabular-nums"];
    };
    readonly overline: {
        readonly fontSize: 13;
        readonly lineHeight: 18;
        readonly fontWeight: "700";
        readonly letterSpacing: 1;
        readonly textTransform: "uppercase";
    };
};
/**
 * BiBo's corner ladder (owner's picks: round 1's 8 / 14 / 18, extended in round 3): card images 6,
 * chips 8, buttons and inputs 14, cards 18, sheets 28, pills round. Same keys as `Radius`, swapped
 * in by tcgscan-app; the small keys all land on the image step.
 */
export declare const RadiusBibo: {
    readonly xs: 6;
    readonly tag: 6;
    readonly sm: 6;
    readonly thumb: 6;
    readonly control: 14;
    readonly panel: 18;
    readonly actionBar: 14;
    readonly lg: 18;
    readonly sheet: 28;
    readonly pill: 999;
};
