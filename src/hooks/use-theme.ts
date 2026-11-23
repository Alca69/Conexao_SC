/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { translations, type LanguageCode, type TranslationKey } from '@/constants/i18n';
import { useColorScheme } from '@/hooks/use-color-scheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

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

const THEME_KEY = 'conexaosc:theme';
const LANGUAGE_KEY = 'conexaosc:language';
const THEME_VALUES: ThemePreference[] = ['light', 'dark', 'system'];
const LANGUAGE_VALUES: LanguageCode[] = ['pt', 'es', 'en'];

export function AppThemeProvider({ children }: PropsWithChildren) {
  // Padrão: modo claro. Depois que o usuário escolher outro modo (ou idioma), a escolha é lembrada.
  const [preference, setPreferenceState] = useState<ThemePreference>('light');
  const [language, setLanguageState] = useState<LanguageCode>('pt');

  useEffect(() => {
    let active = true;
    AsyncStorage.multiGet([THEME_KEY, LANGUAGE_KEY])
      .then(([[, storedTheme], [, storedLanguage]]) => {
        if (!active) return;
        if (storedTheme && THEME_VALUES.includes(storedTheme as ThemePreference)) setPreferenceState(storedTheme as ThemePreference);
        if (storedLanguage && LANGUAGE_VALUES.includes(storedLanguage as LanguageCode)) setLanguageState(storedLanguage as LanguageCode);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const setPreference = useCallback((value: ThemePreference) => {
    setPreferenceState(value);
    AsyncStorage.setItem(THEME_KEY, value).catch(() => {});
  }, []);

  const setLanguage = useCallback((value: LanguageCode) => {
    setLanguageState(value);
    AsyncStorage.setItem(LANGUAGE_KEY, value).catch(() => {});
  }, []);

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

export function useIsDark() {
  const scheme = useColorScheme();
  const { preference } = useThemePreference();
  return preference === 'system' ? scheme === 'dark' : preference === 'dark';
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
