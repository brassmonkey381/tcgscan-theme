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
 * Spacing. Word keys are original and in use; the numeric aliases are the michi-shaped names for
 * new code. Same values, pick either.
 */
export declare const Spacing: {
    readonly half: 2;
    readonly one: 4;
    readonly two: 8;
    readonly three: 16;
    readonly four: 24;
    readonly five: 32;
    readonly six: 64;
};
export declare const Radius: {
    readonly sm: 4;
    /** Buttons, inputs, chips. */
    readonly control: 8;
    /** Cards and panels. */
    readonly panel: 12;
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
