/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#12304A',
    background: '#F4F8FA',
    backgroundElement: '#E8F2F7',
    backgroundSelected: '#DCEFF7',
    textSecondary: '#587080',
    surface: '#FFFFFF',
    border: '#D8E5EC',
    accent: '#005B96',
    accentSoft: '#FBE8EC',
    accentText: '#8E1D2E',
    inverseText: '#FFFFFF',
    inverseSurface: '#12304A',
    overlay: 'rgba(7, 25, 29, 0.55)',
  },
  dark: {
    text: '#F4F8FA',
    background: '#10283D',
    backgroundElement: '#193B57',
    backgroundSelected: '#245675',
    textSecondary: '#B9D2E0',
    surface: '#193B57',
    border: '#38627D',
    accent: '#7CC7F2',
    accentSoft: '#5A2940',
    accentText: '#FFD4DE',
    inverseText: '#10283D',
    inverseSurface: '#081A2A',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

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
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
