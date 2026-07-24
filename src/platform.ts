/**
 * The one RN-dependent token module: things that resolve per platform.
 *
 * `react-native` is an OPTIONAL peer dependency — a Node script (the contrast checker) never
 * imports this file, so it never pulls RN in. Apps import it through `index.ts` and get the
 * platform-resolved values. Fonts are stack DECLARATIONS only; the actual binaries ship as
 * per-app assets (web `@font-face`, native `.ttf` via expo-font), since a font can't travel
 * through a JS package on native.
 */
import { Platform } from 'react-native';

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
})!;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
