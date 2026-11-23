import { Image } from 'expo-image';
import { router, type Href } from 'expo-router';
import { useMemo } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { languageOptions } from '@/constants/i18n';
import { Fonts, Radius, type Palette } from '@/constants/theme';
import { useLayout, type Layout } from '@/hooks/use-layout';
import { useLanguage, useTheme } from '@/hooks/use-theme';

/** Rodapé compacto, 100% traduzido (pt/es/en), com telefones de emergência úteis a quem chegou há pouco. */
export function AppFooter() {
  const c = useTheme();
  const layout = useLayout();
  const { language, setLanguage, t } = useLanguage();
  const styles = useMemo(() => createStyles(c, layout), [c, layout]);

  const explore: { label: string; href: Href }[] = [
    { label: t('navNews'), href: '/' },
    { label: t('navHousing'), href: '/financas-moradia' },
    { label: t('navLife'), href: '/vivencia' },
    { label: t('navPublic'), href: '/documentacao' },
    { label: t('navDocs'), href: '/imigracao' },
  ];
  const institutional: { label: string; href: Href }[] = [
    { label: t('aboutLink'), href: '/sobre' },
    { label: t('footerCorrections'), href: '/sobre' },
    { label: t('footerPrivacy'), href: '/sobre' },
  ];
  const emergency = [
    { number: '190', label: t('emergencyPolice') },
    { number: '192', label: t('emergencySamu') },
    { number: '193', label: t('emergencyFire') },
    { number: '180', label: t('emergencyWomen') },
  ];

  return (
    <View style={styles.footer}>
      <View style={styles.inner}>
        <View style={styles.top}>
          <View style={styles.brandBlock}>
            <View style={styles.mark}><Text style={styles.markText}>SC</Text></View>
            <View style={styles.brandCopy}>
              <Text style={styles.brandTitle}>conexão<Text style={styles.brandAccent}> sc</Text></Text>
              <Text style={styles.tagline}>{t('footerText')}</Text>
            </View>
          </View>
          <View style={styles.languages}>
            {languageOptions.map((option) => {
              const selected = option.code === language;
              return (
                <Pressable
                  key={option.code}
                  accessibilityRole="button"
                  accessibilityLabel={`${t('language')}: ${option.label}`}
                  accessibilityState={{ selected }}
                  onPress={() => setLanguage(option.code)}
                  style={[styles.langPill, selected && styles.langPillSelected]}
                >
                  <Image source={option.flag} style={styles.flag} contentFit="cover" />
                  <Text style={[styles.langText, selected && styles.langTextSelected]}>{option.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.middle}>
          <View style={styles.links}>
            <View style={styles.linkGroup}>
              <Text style={styles.heading}>{t('footerExplore')}</Text>
              <View style={styles.linkList}>
                {explore.map((item) => (
                  <Pressable key={item.label} accessibilityRole="link" onPress={() => router.navigate(item.href)} style={styles.linkRow}>
                    <Text style={styles.link}>{item.label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <View style={styles.linkGroup}>
              <Text style={styles.heading}>{t('footerInstitutional')}</Text>
              <View style={styles.linkList}>
                {institutional.map((item) => (
                  <Pressable key={item.label} accessibilityRole="link" onPress={() => router.navigate(item.href)} style={styles.linkRow}>
                    <Text style={styles.link}>{item.label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.emergency}>
            <Text style={styles.heading}>{t('footerUseful')}</Text>
            <View style={styles.emergencyGrid}>
              {emergency.map((item) => (
                <Pressable
                  key={item.number}
                  accessibilityRole="link"
                  accessibilityLabel={`${item.label}: ${item.number}`}
                  onPress={() => Linking.openURL(`tel:${item.number}`)}
                  style={({ pressed }) => [styles.emergencyItem, pressed && { opacity: 0.7 }]}
                >
                  <Text style={styles.emergencyNumber}>{item.number}</Text>
                  <Text style={styles.emergencyLabel} numberOfLines={2}>{item.label}</Text>
                </Pressable>
              ))}
            </View>
            <Text style={styles.note}>{t('footerCallNote')}</Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.bottomText}>© {new Date().getFullYear()} Conexão SC · {t('footerRights')}</Text>
          <Text style={styles.bottomText}>{t('footerSmall')}</Text>
        </View>
      </View>
    </View>
  );
}

const createStyles = (c: Palette, l: Layout) =>
  StyleSheet.create({
    footer: { width: '100%', backgroundColor: c.surface, borderTopWidth: 1, borderTopColor: c.border, marginTop: 24 },
    inner: { width: '100%', maxWidth: l.maxWidth, alignSelf: 'center', paddingHorizontal: l.gutter, paddingTop: 24, paddingBottom: l.width < 1080 ? 96 : 16, gap: 20 },

    top: { flexDirection: l.isTablet ? 'row' : 'column', alignItems: l.isTablet ? 'center' : 'flex-start', justifyContent: 'space-between', gap: 14 },
    brandBlock: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    brandCopy: { gap: 1 },
    mark: { width: 34, height: 34, borderRadius: 10, backgroundColor: c.brand, alignItems: 'center', justifyContent: 'center' },
    markText: { color: c.onBrand, fontSize: 13, fontWeight: '800' },
    brandTitle: { fontFamily: Fonts.serif, color: c.text, fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
    brandAccent: { color: c.danger },
    tagline: { color: c.textSecondary, fontSize: 12 },
    languages: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    langPill: { minHeight: 34, paddingHorizontal: 10, borderRadius: Radius.pill, borderWidth: 1, borderColor: c.border, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: c.background },
    langPillSelected: { borderColor: c.brand, backgroundColor: c.brandSoft },
    flag: { width: 16, height: 16, borderRadius: 8, overflow: 'hidden' },
    langText: { color: c.textSecondary, fontSize: 12, fontWeight: '700' },
    langTextSelected: { color: c.accent },

    middle: { flexDirection: l.isDesktop ? 'row' : 'column', gap: l.isDesktop ? 48 : 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: c.border },
    links: { flexDirection: 'row', gap: l.isTablet ? 56 : 32, flexWrap: 'wrap' },
    linkGroup: { gap: 6 },
    linkList: { gap: 0 },
    heading: { color: c.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 4 },
    linkRow: { minHeight: 30, justifyContent: 'center' },
    link: { color: c.text, fontSize: 13, fontWeight: '600' },

    emergency: { flex: l.isDesktop ? 1 : undefined, gap: 6 },
    emergencyGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    emergencyItem: { flexGrow: 1, flexBasis: l.isTablet ? 0 : '45%', flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: c.background, borderWidth: 1, borderColor: c.border, borderRadius: Radius.md, paddingVertical: 8, paddingHorizontal: 10, minWidth: 120 },
    emergencyNumber: { fontFamily: Fonts.serif, color: c.danger, fontSize: 20, fontWeight: '800' },
    emergencyLabel: { flex: 1, color: c.textSecondary, fontSize: 11, lineHeight: 14 },
    note: { color: c.textMuted, fontSize: 11, lineHeight: 15 },

    bottom: { borderTopWidth: 1, borderTopColor: c.border, paddingTop: 14, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4 },
    bottomText: { color: c.textMuted, fontSize: 11, lineHeight: 16 },
  });
