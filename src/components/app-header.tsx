import { router, usePathname, type Href } from 'expo-router';
import { useState } from 'react';
import { Image } from 'expo-image';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { languageOptions } from '@/constants/i18n';
import { useLanguage, useTheme, useThemePreference, type ThemePreference } from '@/hooks/use-theme';

export function AppHeader() {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const { preference, setPreference } = useThemePreference();
  const { language, setLanguage, t } = useLanguage();
  const sections: { label: string; href: Href; description: string }[] = [
    { label: t('navNews'), href: '/', description: t('navNewsDescription') },
    { label: t('navHousing'), href: '/financas-moradia', description: t('navHousingDescription') },
    { label: t('navLife'), href: '/vivencia', description: t('navLifeDescription') },
    { label: t('navPublic'), href: '/documentacao', description: t('navPublicDescription') },
  ];
  const themeOptions: { label: string; value: ThemePreference }[] = [
    { label: t('light'), value: 'light' },
    { label: t('dark'), value: 'dark' },
    { label: t('system'), value: 'system' },
  ];
  const selectedLanguage = languageOptions.find((option) => option.code === language) ?? languageOptions[0];
  const selectedTheme = themeOptions.find((option) => option.value === preference) ?? themeOptions[2];
  const themeIcon = (value: ThemePreference) => value === 'light' ? '☀' : value === 'dark' ? '☾' : '◐';

  return (
    <>
      <View style={[styles.header, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
        <View style={styles.brand}>
          <View style={styles.mark}><Text style={styles.markText}>SC</Text></View>
          <View><Text style={[styles.brandTitle, { color: theme.text }]}>conexão<Text style={[styles.brandAccent, { color: theme.accentText }]}> sc</Text></Text><Text style={[styles.tagline, { color: theme.textSecondary }]}>INFORMAÇÃO QUE ACOLHE</Text></View>
        </View>
        <View style={styles.headerActions}>
        <View style={styles.languageActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${t('language')}: ${selectedLanguage.label}`}
            accessibilityState={{ expanded: languageOpen }}
            onPress={() => setLanguageOpen((current) => !current)}
            style={[styles.languageOption, { backgroundColor: languageOpen ? theme.backgroundElement : 'transparent' }]}
          >
            <Image source={selectedLanguage.flag} style={styles.languageFlag} contentFit="cover" />
          </Pressable>
          {languageOpen && languageOptions.filter((option) => option.code !== language).map((option) => (
            <Pressable
              key={option.code}
              accessibilityRole="button"
              accessibilityLabel={`Usar idioma ${option.label}`}
              onPress={() => { setLanguage(option.code); setLanguageOpen(false); }}
              style={styles.languageOption}
            >
              <Image source={option.flag} style={styles.languageFlag} contentFit="cover" />
            </Pressable>
          ))}
        </View>
          <View style={styles.themeActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Tema atual: ${selectedTheme.label}`}
            accessibilityState={{ expanded: themeOpen }}
            onPress={() => setThemeOpen((current) => !current)}
            style={[styles.themeQuickOption, themeOpen && { backgroundColor: theme.backgroundElement }]}
          >
            <Text style={[styles.themeQuickText, { color: theme.text }]}>{themeIcon(selectedTheme.value)}</Text>
          </Pressable>
          {themeOpen && themeOptions.filter((option) => option.value !== preference).map((option) => (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              accessibilityLabel={`Usar tema ${option.label}`}
              accessibilityState={{ selected: preference === option.value }}
              onPress={() => { setPreference(option.value); setThemeOpen(false); }}
              style={styles.themeQuickOption}
            >
              <Text style={[styles.themeQuickText, { color: theme.text }]}>{themeIcon(option.value)}</Text>
            </Pressable>
          ))}
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Abrir menu de navegação" accessibilityState={{ expanded: open }} onPress={() => setOpen(true)} style={styles.menuButton}>
            <View style={[styles.menuLine, { backgroundColor: theme.text }]} /><View style={[styles.menuLine, { backgroundColor: theme.text }]} /><View style={[styles.menuLine, { backgroundColor: theme.text }]} />
          </Pressable>
        </View>
      </View>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} accessibilityRole="button" accessibilityLabel="Fechar menu" />
          <SafeAreaView style={[styles.drawer, { backgroundColor: theme.surface }]} accessibilityViewIsModal>
            <View style={styles.drawerHeading}><Text style={[styles.drawerTitle, { color: theme.text }]}>{t('explore')}</Text><Pressable accessibilityRole="button" accessibilityLabel="Fechar menu" onPress={() => setOpen(false)} style={styles.close}><Text style={[styles.closeText, { color: theme.text }]}>×</Text></Pressable></View>
            <ScrollView>
              <Text style={[styles.drawerSubtitle, { color: theme.textSecondary }]}>{t('drawerSubtitle')}</Text>
              {sections.map((section) => (
                <Pressable key={section.label} accessibilityRole="link" accessibilityState={{ selected: pathname === section.href }} onPress={() => { setOpen(false); router.navigate(section.href); }} style={[styles.navItem, pathname === section.href && { backgroundColor: theme.accentSoft }]}>
                  <View style={styles.navCopy}><Text style={[styles.navTitle, { color: theme.text }]}>{section.label}</Text><Text style={[styles.navDescription, { color: theme.textSecondary }]}>{section.description}</Text></View><Text style={[styles.arrow, { color: theme.accent }]}>›</Text>
                </Pressable>
              ))}
              <Text style={[styles.themeLabel, { color: theme.text }]}>{t('language')}</Text>
              <View style={styles.drawerLanguageOptions}>
                {languageOptions.map((option) => (
                  <Pressable key={option.code} accessibilityRole="button" accessibilityLabel={`Usar idioma ${option.label}`} accessibilityState={{ selected: language === option.code }} onPress={() => setLanguage(option.code)} style={[styles.drawerLanguageOption, { borderColor: theme.border }, language === option.code && { backgroundColor: theme.accent, borderColor: theme.accent }]}>
                    <Image source={option.flag} style={styles.languageFlag} contentFit="cover" />
                    <Text style={[styles.themeOptionText, { color: language === option.code ? theme.inverseText : theme.text }]}>{option.label}</Text>
                  </Pressable>
                ))}
              </View>
              <Text style={[styles.themeLabel, { color: theme.text }]}>{t('appearance')}</Text>
              <View style={styles.themeOptions}>
                {themeOptions.map((option) => (
                  <Pressable
                    key={option.value}
                    accessibilityRole="button"
                    accessibilityLabel={`Usar tema ${option.label}`}
                    accessibilityState={{ selected: preference === option.value }}
                    onPress={() => setPreference(option.value)}
                    style={[styles.themeOption, { borderColor: theme.border }, preference === option.value && { backgroundColor: theme.accent, borderColor: theme.accent }]}
                  >
                    <Text style={[styles.themeOptionText, { color: preference === option.value ? theme.inverseText : theme.text }]}>{option.label}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
            <Text style={[styles.drawerFooter, { color: theme.textSecondary }]}>{t('footer')}</Text>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10, flexShrink: 1 },
  mark: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#005B96', alignItems: 'center', justifyContent: 'center' },
  markText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  brandTitle: { color: '#12304A', fontSize: 23, fontWeight: '800', letterSpacing: -0.8 },
  brandAccent: { color: '#C6283D' },
  tagline: { color: '#587080', fontSize: 8, letterSpacing: 1.8, marginTop: 3 },
  menuButton: { minWidth: 48, minHeight: 48, justifyContent: 'center', alignItems: 'center', gap: 5 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  languageActions: { flexDirection: 'row', alignItems: 'center', gap: 1, marginRight: 4 },
  languageOption: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  languageFlag: { width: 24, height: 24, borderRadius: 12, overflow: 'hidden' },
  themeActions: { flexDirection: 'row', alignItems: 'center', gap: 1 },
  themeQuickOption: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  themeQuickText: { fontSize: 17, fontWeight: '700' },
  menuLine: { height: 2, width: 23, borderRadius: 2, backgroundColor: '#12304A' },
  overlay: { flex: 1, backgroundColor: 'rgba(7, 25, 29, 0.55)', alignItems: 'flex-end' },
  drawer: { width: '88%', maxWidth: 380, flex: 1, paddingHorizontal: 24 },
  drawerHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, gap: 8 },
  drawerTitle: { flex: 1, fontSize: 21, fontWeight: '700', color: '#12304A' },
  close: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  closeText: { color: '#12304A', fontSize: 32 },
  drawerSubtitle: { color: '#587080', fontSize: 15, lineHeight: 23, marginTop: 16, marginBottom: 30 },
  navItem: { padding: 16, borderRadius: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 12 },
  active: { backgroundColor: '#FBE8EC' },
  navCopy: { flex: 1 },
  navTitle: { color: '#12304A', fontSize: 19, fontWeight: '700' },
  navDescription: { color: '#587080', fontSize: 13, marginTop: 6 },
  arrow: { color: '#005B96', fontSize: 28 },
  drawerFooter: { color: '#587080', fontSize: 13, paddingVertical: 24 },
  themeLabel: { fontSize: 16, fontWeight: '700', marginTop: 24, marginBottom: 10 },
  themeOptions: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  drawerLanguageOptions: { gap: 8, flexDirection: 'row', flexWrap: 'wrap' },
  drawerLanguageOption: { minHeight: 40, paddingHorizontal: 10, borderRadius: 20, borderWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  themeOption: { minHeight: 40, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, justifyContent: 'center' },
  themeOptionText: { fontSize: 13, fontWeight: '700' },
});
