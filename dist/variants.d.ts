/**
 * The canonical brand variants — the single source both apps theme from.
 *
 * This is michi-maker's richer token set (44-key semantic palette + binder surface tokens +
 * per-variant radius), moved here verbatim so michi's appearance is unchanged and tcgscan-app
 * ADOPTS these schemes. Import-free by design (no react-native): each app keeps its own
 * resolution/provider — michi its module-load + luminance resolve, tcgscan its live context —
 * and both read the DATA from here. `palettes.ts` derives tcgscan's explicit light/dark view
 * from these; michi consumes `VARIANTS` directly.
 *
 * A variant is: the 5 scheme-aware `colors` roles, the semantic `palette` (light base), a
 * `paletteDark` partial merged over the base when the effective scheme is dark, the binder
 * `surface`, control `radius`, and the `slotBacking` fallback.
 */
declare const NEUTRAL: {
    colors: {
        light: {
            text: string;
            background: string;
            backgroundElement: string;
            backgroundSelected: string;
            textSecondary: string;
        };
        dark: {
            text: string;
            background: string;
            backgroundElement: string;
            backgroundSelected: string;
            textSecondary: string;
        };
    };
    palette: {
        accent: string;
        accentText: string;
        accentSoft: string;
        link: string;
        selectionSoft: string;
        selectionTint: string;
        white: string;
        black: string;
        surface: string;
        panel: string;
        panelAlt: string;
        controlBorder: string;
        handle: string;
        hairline: string;
        hairlineStrong: string;
        ink: string;
        ink2: string;
        ink3: string;
        ink4: string;
        muted: string;
        muted2: string;
        muted3: string;
        muted4: string;
        onDark: string;
        onDarkMuted: string;
        onDarkMuted2: string;
        danger: string;
        dangerAlt: string;
        dangerBg: string;
        success: string;
        chrome: string;
        chromeDeep: string;
        chromeDeepest: string;
        toast: string;
        scrim30: string;
        scrim40: string;
        scrim45: string;
        scrim55: string;
        scrim60: string;
        scrim62: string;
        swatchBorder: string;
        grayBorder50: string;
        grayBorder70: string;
        skeletonFill: string;
        tagWarn: string;
        warning: string;
        imagePlaceholder: string;
    };
    paletteDark: {
        accent: string;
        accentText: string;
        link: string;
        accentSoft: string;
        selectionSoft: string;
        selectionTint: string;
        surface: string;
        panel: string;
        panelAlt: string;
        controlBorder: string;
        handle: string;
        hairline: string;
        hairlineStrong: string;
        ink: string;
        ink2: string;
        ink3: string;
        ink4: string;
        muted: string;
        muted2: string;
        muted3: string;
        muted4: string;
        danger: string;
        success: string;
        dangerBg: string;
        warning: string;
    };
    surface: {
        mat: string;
        pocketFill: string;
        pocketBorder: string;
        pocketInnerShadow: string;
        cardFrame: string;
        cardFrameBorder: string;
        foilSheen: string;
        insertHighlight: string;
        insertBorder: string;
        selection: string;
    };
    radius: {
        xs: number;
        tag: number;
        sm: number;
        thumb: number;
        control: number;
        panel: number;
        actionBar: number;
        lg: number;
        sheet: number;
        pill: number;
    };
    slotBacking: string;
};
type PaletteRoles = typeof NEUTRAL.palette;
export type Tokens = Omit<typeof NEUTRAL, 'paletteDark'> & {
    paletteDark: Partial<PaletteRoles>;
};
export declare const VARIANTS: {
    readonly neutral: {
        colors: {
            light: {
                text: string;
                background: string;
                backgroundElement: string;
                backgroundSelected: string;
                textSecondary: string;
            };
            dark: {
                text: string;
                background: string;
                backgroundElement: string;
                backgroundSelected: string;
                textSecondary: string;
            };
        };
        palette: {
            accent: string;
            accentText: string;
            accentSoft: string;
            link: string;
            selectionSoft: string;
            selectionTint: string;
            white: string;
            black: string;
            surface: string;
            panel: string;
            panelAlt: string;
            controlBorder: string;
            handle: string;
            hairline: string;
            hairlineStrong: string;
            ink: string;
            ink2: string;
            ink3: string;
            ink4: string;
            muted: string;
            muted2: string;
            muted3: string;
            muted4: string;
            onDark: string;
            onDarkMuted: string;
            onDarkMuted2: string;
            danger: string;
            dangerAlt: string;
            dangerBg: string;
            success: string;
            chrome: string;
            chromeDeep: string;
            chromeDeepest: string;
            toast: string;
            scrim30: string;
            scrim40: string;
            scrim45: string;
            scrim55: string;
            scrim60: string;
            scrim62: string;
            swatchBorder: string;
            grayBorder50: string;
            grayBorder70: string;
            skeletonFill: string;
            tagWarn: string;
            warning: string;
            imagePlaceholder: string;
        };
        paletteDark: {
            accent: string;
            accentText: string;
            link: string;
            accentSoft: string;
            selectionSoft: string;
            selectionTint: string;
            surface: string;
            panel: string;
            panelAlt: string;
            controlBorder: string;
            handle: string;
            hairline: string;
            hairlineStrong: string;
            ink: string;
            ink2: string;
            ink3: string;
            ink4: string;
            muted: string;
            muted2: string;
            muted3: string;
            muted4: string;
            danger: string;
            success: string;
            dangerBg: string;
            warning: string;
        };
        surface: {
            mat: string;
            pocketFill: string;
            pocketBorder: string;
            pocketInnerShadow: string;
            cardFrame: string;
            cardFrameBorder: string;
            foilSheen: string;
            insertHighlight: string;
            insertBorder: string;
            selection: string;
        };
        radius: {
            xs: number;
            tag: number;
            sm: number;
            thumb: number;
            control: number;
            panel: number;
            actionBar: number;
            lg: number;
            sheet: number;
            pill: number;
        };
        slotBacking: string;
    };
    readonly vintage: Tokens;
    readonly pop: Tokens;
    readonly vault: Tokens;
};
export type VariantId = keyof typeof VARIANTS;
export type PaletteTokens = PaletteRoles;
export declare const VARIANT_LIST: {
    id: VariantId;
    label: string;
    desc: string;
}[];
/** Luminance check so palette darkness follows a variant's EFFECTIVE background. */
export declare function isDarkHex(hex: string): boolean;
export {};
