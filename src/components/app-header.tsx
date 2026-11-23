import { router, usePathname, type Href } from 'expo-router';
import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { languageOptions } from '@/constants/i18n';
import { elevation, Fonts, Radius, type Palette } from '@/constants/theme';
import { INLINE_NAV_BREAKPOINT } from '@/components/legalize-fab';
import { useLayout } from '@/hooks/use-layout';
import { useLanguage, useTheme, useThemePreference, type ThemePreference } from '@/hooks/use-theme';

export function AppHeader() {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const layout = useLayout();
  const styles = useMemo(() => createStyles(theme, layout.gutter), [theme, layout.gutter]);
  const { preference, setPreference } = useThemePreference();
  const { language, setLanguage, t } = useLanguage();
  const showInlineNav = layout.width >= INLINE_NAV_BREAKPOINT;

  const sections: { label: string; href: Href; description: string; highlight?: boolean }[] = [
    { label: t('navNews'), href: '/', description: t('navNewsDescription') },
    { label: t('navHousing'), href: '/financas-moradia', description: t('navHousingDescription') },
    { label: t('navLife'), href: '/vivencia', description: t('navLifeDescription') },
    { label: t('navPublic'), href: '/documentacao', description: t('navPublicDescription') },
    // Destaque estratégico: ação principal para quem acabou de chegar. Sempre por último.
    { label: t('navDocs'), href: '/imigracao', description: t('navDocsDescription'), highlight: true },
  ];
  const themeOptions: { label: string; value: ThemePreference }[] = [
    { label: t('light'), value: 'light' },
    { label: t('dark'), value: 'dark' },
    { label: t('system'), value: 'system' },
  ];
  const selectedLanguage = languageOptions.find((option) => option.code === language) ?? languageOptions[0];
  const selectedTheme = themeOptions.find((option) => option.value === preference) ?? themeOptions[2];
  const themeIcon = (value: ThemePreference) => (value === 'light' ? '☀' : value === 'dark' ? '☾' : '◐');

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <Pressable accessibilityRole="link" accessibilityLabel="Conexão SC, ir para o início" onPress={() => router.navigate('/')} style={styles.brand}>
            <View style={styles.mark}><Text style={styles.markText}>SC</Text></View>
            <View>
              <Text style={styles.brandTitle}>conexão<Text style={styles.brandAccent}> sc</Text></Text>
              {!showInlineNav && layout.width >= 360 && <Text style={styles.tagline}>INFORMAÇÃO QUE ACOLHE</Text>}
            </View>
          </Pressable>

          {showInlineNav && (
            <View style={styles.inlineNav}>
              {sections.map((section) => {
                const active = pathname === section.href;
                return (
                  <Pressable
                    key={section.label}
                    accessibilityRole="link"
                    accessibilityState={{ selected: active }}
                    onPress={() => router.navigate(section.href)}
                    style={({ pressed }) => [styles.inlineLink, active && styles.inlineLinkActive, section.highlight && styles.inlineLinkHighlight, pressed && { opacity: 0.7 }]}
                  >
                    <Text style={[styles.inlineLinkText, active && styles.inlineLinkTextActive, section.highlight && styles.inlineLinkTextHighlight]}>{section.highlight ? `${section.label} →` : section.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          <View style={styles.headerActions}>
            <View style={styles.quickGroup}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${t('language')}: ${selectedLanguage.label}`}
                accessibilityState={{ expanded: languageOpen }}
                onPress={() => setLanguageOpen((current) => !current)}
                style={[styles.quickOption, languageOpen && styles.quickOptionOpen]}
              >
                <Image source={selectedLanguage.flag} style={styles.languageFlag} contentFit="cover" />
              </Pressable>
              {languageOpen && languageOptions.filter((option) => option.code !== language).map((option) => (
                <Pressable
                  key={option.code}
                  accessibilityRole="button"
                  accessibilityLabel={`Usar idioma ${option.label}`}
                  onPress={() => { setLanguage(option.code); setLanguageOpen(false); }}
                  style={styles.quickOption}
                >
                  <Image source={option.flag} style={styles.languageFlag} contentFit="cover" />
                </Pressable>
              ))}
            </View>
            <View style={styles.quickGroup}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Tema atual: ${selectedTheme.label}`}
                accessibilityState={{ expanded: themeOpen }}
                onPress={() => setThemeOpen((current) => !current)}
                style={[styles.quickOption, themeOpen && styles.quickOptionOpen]}
              >
                <Text style={styles.themeIcon}>{themeIcon(selectedTheme.value)}</Text>
              </Pressable>
              {themeOpen && themeOptions.filter((option) => option.value !== preference).map((option) => (
                <Pressable
                  key={option.value}
                  accessibilityRole="button"
                  accessibilityLabel={`Usar tema ${option.label}`}
                  onPress={() => { setPreference(option.value); setThemeOpen(false); }}
                  style={styles.quickOption}
                >
                  <Text style={styles.themeIcon}>{themeIcon(option.value)}</Text>
                </Pressable>
              ))}
            </View>
            {!showInlineNav && (
              <Pressable accessibilityRole="button" accessibilityLabel="Abrir menu de navegação" accessibilityState={{ expanded: open }} onPress={() => setOpen(true)} style={styles.menuButton}>
                <View style={styles.menuLine} /><View style={styles.menuLine} /><View style={[styles.menuLine, styles.menuLineShort]} />
              </Pressable>
            )}
          </View>
        </View>
      </View>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} accessibilityRole="button" accessibilityLabel="Fechar menu" />
          <SafeAreaView style={styles.drawer} accessibilityViewIsModal>
            <View style={styles.drawerHeading}>
              <Text style={styles.drawerTitle}>{t('explore')}</Text>
              <Pressable accessibilityRole="button" accessibilityLabel="Fechar menu" onPress={() => setOpen(false)} style={styles.close}>
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.drawerSubtitle}>{t('drawerSubtitle')}</Text>
              {sections.map((section) => {
                const active = pathname === section.href;
                return (
                  <Pressable
                    key={section.label}
                    accessibilityRole="link"
                    accessibilityState={{ selected: active }}
                    onPress={() => { setOpen(false); router.navigate(section.href); }}
                    style={[styles.navItem, active && styles.navItemActive, section.highlight && styles.navItemHighlight]}
                  >
                    <View style={styles.navCopy}>
                      <Text style={[styles.navTitle, section.highlight && styles.navTitleHighlight]}>{section.label}</Text>
                      <Text style={[styles.navDescription, section.highlight && styles.navDescriptionHighlight]}>{section.description}</Text>
                    </View>
                    <Text style={[styles.arrow, section.highlight && styles.navTitleHighlight]}>›</Text>
                  </Pressable>
                );
              })}
              <Text style={styles.drawerLabel}>{t('language')}</Text>
              <View style={styles.optionWrap}>
                {languageOptions.map((option) => {
                  const selected = language === option.code;
                  return (
                    <Pressable key={option.code} accessibilityRole="button" accessibilityLabel={`Usar idioma ${option.label}`} accessibilityState={{ selected }} onPress={() => setLanguage(option.code)} style={[styles.pill, selected && styles.pillSelected]}>
                      <Image source={option.flag} style={styles.languageFlag} contentFit="cover" />
                      <Text style={[styles.pillText, selected && styles.pillTextSelected]}>{option.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
              <Text style={styles.drawerLabel}>{t('appearance')}</Text>
              <View style={styles.optionWrap}>
                {themeOptions.map((option) => {
                  const selected = preference === option.value;
                  return (
                    <Pressable key={option.value} accessibilityRole="button" accessibilityLabel={`Usar tema ${option.label}`} accessibilityState={{ selected }} onPress={() => setPreference(option.value)} style={[styles.pill, selected && styles.pillSelected]}>
                      <Text style={[styles.pillText, selected && styles.pillTextSelected]}>{themeIcon(option.value)}  {option.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
            <Text style={styles.drawerFooter}>{t('footer')}</Text>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}

const createStyles = (c: Palette, gutter: number) =>
  StyleSheet.create({
    header: { backgroundColor: c.surface, borderBottomWidth: 1, borderBottomColor: c.border, zIndex: 50 },
    headerInner: { width: '100%', maxWidth: 1120 + 64, alignSelf: 'center', paddingHorizontal: gutter, minHeight: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
    brand: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
    mark: { width: 38, height: 38, borderRadius: 11, backgroundColor: c.brand, alignItems: 'center', justifyContent: 'center' },
    markText: { color: c.onBrand, fontSize: 15, fontWeight: '800', letterSpacing: 0.3 },
    brandTitle: { fontFamily: Fonts.serif, color: c.text, fontSize: 22, fontWeight: '800', letterSpacing: -0.7 },
    brandAccent: { color: c.danger },
    tagline: { color: c.textMuted, fontSize: 8, fontWeight: '700', letterSpacing: 1.8, marginTop: 1 },
    inlineNav: { flexDirection: 'row', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' },
    inlineLink: { paddingHorizontal: 14, minHeight: 40, justifyContent: 'center', borderRadius: Radius.pill },
    inlineLinkActive: { backgroundColor: c.brandSoft },
    inlineLinkText: { color: c.textSecondary, fontSize: 14, fontWeight: '600' },
    inlineLinkTextActive: { color: c.accent, fontWeight: '800' },
    inlineLinkHighlight: { backgroundColor: c.brand, marginLeft: 8, paddingHorizontal: 18, ...elevation(c, 1) },
    inlineLinkTextHighlight: { color: c.onBrand, fontWeight: '800' },
    headerActions: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    quickGroup: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: c.backgroundElement, borderRadius: Radius.pill, padding: 2 },
    quickOption: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    quickOptionOpen: { backgroundColor: c.surface, ...elevation(c, 1) },
    languageFlag: { width: 22, height: 22, borderRadius: 11, overflow: 'hidden' },
    themeIcon: { color: c.text, fontSize: 17, fontWeight: '700' },
    menuButton: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', gap: 5 },
    menuLine: { height: 2, width: 22, borderRadius: 2, backgroundColor: c.text },
    menuLineShort: { width: 15, alignSelf: 'flex-end', marginRight: 11 },
    overlay: { flex: 1, backgroundColor: c.overlay, alignItems: 'flex-end' },
    drawer: { width: '88%', maxWidth: 390, flex: 1, paddingHorizontal: 24, backgroundColor: c.surface, ...elevation(c, 2) },
    drawerHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, gap: 8 },
    drawerTitle: { flex: 1, fontSize: 22, fontWeight: '800', color: c.text, letterSpacing: -0.4 },
    close: { width: 44, height: 44, borderRadius: 22, backgroundColor: c.backgroundElement, alignItems: 'center', justifyContent: 'center' },
    closeText: { color: c.text, fontSize: 26, lineHeight: 28 },
    drawerSubtitle: { color: c.textSecondary, fontSize: 15, lineHeight: 23, marginTop: 12, marginBottom: 24 },
    navItem: { padding: 16, borderRadius: Radius.md, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: 'transparent' },
    navItemActive: { backgroundColor: c.brandSoft, borderColor: c.borderStrong },
    navItemHighlight: { backgroundColor: c.brand, borderColor: c.brand, marginTop: 8, ...elevation(c, 1) },
    navTitleHighlight: { color: c.onBrand },
    navDescriptionHighlight: { color: 'rgba(255,255,255,0.85)' },
    navCopy: { flex: 1 },
    navTitle: { color: c.text, fontSize: 17, fontWeight: '800' },
    navDescription: { color: c.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 4 },
    arrow: { color: c.accent, fontSize: 26 },
    drawerFooter: { color: c.textMuted, fontSize: 12, paddingVertical: 20 },
    drawerLabel: { color: c.textMuted, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginTop: 24, marginBottom: 10, textTransform: 'uppercase' },
    optionWrap: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
    pill: { minHeight: 42, paddingHorizontal: 14, borderRadius: Radius.pill, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, flexDirection: 'row', alignItems: 'center', gap: 8 },
    pillSelected: { backgroundColor: c.brand, borderColor: c.brand },
    pillText: { color: c.text, fontSize: 13, fontWeight: '700' },
    pillTextSelected: { color: c.onBrand },
  });
