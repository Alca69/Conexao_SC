/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { translations, type LanguageCode, type TranslationKey } from '@/constants/i18n';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { createContext, createElement, useContext, useMemo, useState, type PropsWithChildren } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';
type ResolvedTheme = keyof typeof Colors;

type ThemeContextValue = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [preference, setPreference] = useState<ThemePreference>('system');
  const [language, setLanguage] = useState<LanguageCode>('pt');

  return createElement(
    ThemeContext.Provider,
    { value: { preference, setPreference } },
    createElement(LanguageContext.Provider, { value: { language, setLanguage } }, children)
  );
}

export function useThemePreference() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemePreference must be used inside AppThemeProvider');
  }
  return context;
}

export function useTheme() {
  const scheme = useColorScheme();
  const { preference } = useThemePreference();
  const theme: ResolvedTheme = preference === 'system' ? (scheme === 'dark' ? 'dark' : 'light') : preference;

  return useMemo(() => Colors[theme], [theme]);
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside AppThemeProvider');
  }

  const { language } = context;
  return {
    ...context,
    language,
    t: (key: TranslationKey) => translations[language][key],
  };
}
