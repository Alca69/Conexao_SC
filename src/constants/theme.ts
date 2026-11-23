import '@/global.css';

import { Platform } from 'react-native';

/**
 * Paleta Conexão SC.
 * Azul (oceano/acolhimento) como cor de marca e vermelho (bandeira de SC) como acento pontual.
 * `brand` = preenchimentos (botões, chips) com `onBrand` como texto por cima.
 * `accent` = cor de texto/links de destaque (ajustada para ter contraste em cada modo).
 */
export const Colors = {
  light: {
    text: '#0F2A43',
    textSecondary: '#52677A',
    textMuted: '#74879A',
    background: '#F3F6F9',
    backgroundElement: '#E7EEF4',
    backgroundSelected: '#D9E6F0',
    surface: '#FFFFFF',
    surfaceRaised: '#FFFFFF',
    border: '#DCE5ED',
    borderStrong: '#C3D2DF',

    brand: '#0B5C98',
    onBrand: '#FFFFFF',
    brandSoft: '#E3EFF8',
    accent: '#0B5C98',

    danger: '#C6283D',
    onDanger: '#FFFFFF',
    accentSoft: '#FCEBEE',
    accentText: '#9B1C2E',

    warningBg: '#FFF6DD',
    warningBorder: '#F0DFA8',
    warningText: '#6B5A1E',

    inverseText: '#FFFFFF',
    inverseSurface: '#0F2A43',
    inverseTextSecondary: '#B9CCDC',
    overlay: 'rgba(8, 22, 36, 0.55)',
    shadow: '#0F2A43',

    mapLand: '#DDE9DF',
    mapLandBorder: '#BFD0C3',
    mapRoad: '#F7F2DF',
    mapLabel: '#6F8873',
    mapWater: '#DCEBF5',
  },
  dark: {
    text: '#EAF1F7',
    textSecondary: '#A9BCCB',
    textMuted: '#82979F',
    background: '#0A1724',
    backgroundElement: '#122436',
    backgroundSelected: '#1B3550',
    surface: '#112233',
    surfaceRaised: '#172C41',
    border: '#233A52',
    borderStrong: '#34526E',

    brand: '#2A7DBD',
    onBrand: '#FFFFFF',
    brandSoft: '#16324B',
    accent: '#6DBBEE',

    danger: '#D6384D',
    onDanger: '#FFFFFF',
    accentSoft: '#3A1D2B',
    accentText: '#FFB3C0',

    warningBg: '#2E2713',
    warningBorder: '#4D4120',
    warningText: '#E8D79A',

    inverseText: '#0A1724',
    inverseSurface: '#050E17',
    inverseTextSecondary: '#A9BCCB',
    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: '#000000',

    mapLand: '#1B2D26',
    mapLandBorder: '#2B4439',
    mapRoad: '#34423A',
    mapLabel: '#7C9885',
    mapWater: '#12304A',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
export type Palette = { [K in ThemeColor]: string };

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
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

export const Radius = { sm: 8, md: 12, lg: 16, xl: 22, pill: 999 } as const;

/** Sombra suave e multiplataforma (no escuro, a borda sustenta a elevação). */
export const elevation = (c: Palette, level: 1 | 2 = 1): object =>
  Platform.select({
    web: {
      boxShadow:
        level === 1
          ? `0 1px 2px ${c.shadow}14, 0 4px 14px ${c.shadow}0F`
          : `0 2px 4px ${c.shadow}18, 0 12px 28px ${c.shadow}1F`,
    },
    default: {
      shadowColor: c.shadow,
      shadowOpacity: level === 1 ? 0.08 : 0.14,
      shadowRadius: level === 1 ? 8 : 16,
      shadowOffset: { width: 0, height: level === 1 ? 2 : 6 },
      elevation: level === 1 ? 2 : 5,
    },
  }) ?? {};

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 1120;
