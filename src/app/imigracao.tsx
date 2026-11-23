import * as WebBrowser from 'expo-web-browser';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppFooter } from '@/components/app-footer';
import { ResponsiveGrid } from '@/components/responsive-grid';
import { elevation, Fonts, Radius, type Palette } from '@/constants/theme';
import { getImmigrationGuide } from '@/data/immigration';
import { useLayout, type Layout } from '@/hooks/use-layout';
import { useLanguage, useTheme } from '@/hooks/use-theme';

const open = (url: string) => WebBrowser.openBrowserAsync(url);

export default function ImmigrationGuideScreen() {
  const c = useTheme();
  const layout = useLayout();
  const { language } = useLanguage();
  const styles = useMemo(() => createStyles(c, layout), [c, layout]);
  const guide = getImmigrationGuide(language);

  return (
    <ScrollView style={{ backgroundColor: c.background }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator>
      <View style={styles.content}>
        <View style={styles.head}>
          <Text style={styles.eyebrow}>{guide.eyebrow}</Text>
          <Text style={styles.title} accessibilityRole="header">{guide.title}</Text>
          <Text style={styles.intro}>{guide.intro}</Text>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeIcon}>ⓘ</Text>
          <Text style={styles.noticeText}>{guide.notice}</Text>
        </View>

        <View style={styles.section}>
          <SectionHeading styles={styles} title={guide.stepsTitle} subtitle={guide.stepsIntro} />
          <ResponsiveGrid gap={14}>
            {guide.steps.map((step, index) => (
              <View key={step.title} style={[styles.card, styles.fill]}>
                <View style={styles.stepNumber}><Text style={styles.stepNumberText}>{index + 1}</Text></View>
                <Text style={styles.cardTitle}>{step.title}</Text>
                <Text style={styles.cardText}>{step.text}</Text>
                {step.url && (
                  <Pressable accessibilityRole="link" accessibilityLabel={`${step.title}: ${guide.openStep}`} onPress={() => open(step.url!)} style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}>
                    <Text style={styles.linkButtonText}>{guide.officialSite} ↗</Text>
                  </Pressable>
                )}
              </View>
            ))}
          </ResponsiveGrid>
        </View>

        <View style={styles.section}>
          <SectionHeading styles={styles} title={guide.pathsTitle} subtitle={guide.pathsIntro} />
          <ResponsiveGrid gap={14}>
            {guide.paths.map((path) => (
              <View key={path.id} style={[styles.card, styles.fill]}>
                <View style={styles.tag}><Text style={styles.tagText}>{path.tag}</Text></View>
                <Text style={styles.cardTitle}>{path.title}</Text>
                <Text style={styles.whoLabel}>{guide.whoLabel}</Text>
                <Text style={styles.cardText}>{path.who}</Text>
                <Text style={styles.cardText}>{path.text}</Text>
                <Pressable accessibilityRole="link" accessibilityLabel={`${path.title}: ${guide.openStep}`} onPress={() => open(path.url)} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
                  <Text style={styles.primaryButtonText}>{guide.officialSite} ↗</Text>
                </Pressable>
              </View>
            ))}
          </ResponsiveGrid>
        </View>

        <View style={styles.section}>
          <SectionHeading styles={styles} title={guide.docsTitle} subtitle={guide.docsIntro} />
          <View style={styles.docsCard}>
            {guide.docs.map((doc) => (
              <View key={doc} style={styles.docRow}>
                <View style={styles.check}><Text style={styles.checkText}>✓</Text></View>
                <Text style={styles.docText}>{doc}</Text>
              </View>
            ))}
            <Text style={styles.docsNote}>{guide.docsNote}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeading styles={styles} title={guide.localTitle} subtitle={guide.localIntro} />
          <ResponsiveGrid gap={14}>
            {guide.local.map((item) => (
              <View key={item.name} style={[styles.card, styles.fill]}>
                <Text style={styles.localRole}>{item.role}</Text>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardText}>{item.text}</Text>
                <Pressable accessibilityRole="link" accessibilityLabel={`${item.name}: ${guide.openStep}`} onPress={() => open(item.url)} style={({ pressed }) => [styles.linkButton, pressed && styles.pressed]}>
                  <Text style={styles.linkButtonText}>{guide.officialSite} ↗</Text>
                </Pressable>
              </View>
            ))}
          </ResponsiveGrid>
        </View>

        <View style={styles.scam}>
          <Text style={styles.scamIcon}>⚠</Text>
          <View style={styles.scamCopy}>
            <Text style={styles.scamTitle}>{guide.scamTitle}</Text>
            <Text style={styles.scamText}>{guide.scamText}</Text>
          </View>
        </View>
      </View>
      <AppFooter />
    </ScrollView>
  );
}

function SectionHeading({ styles, title, subtitle }: { styles: ReturnType<typeof createStyles>; title: string; subtitle: string }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.sectionTitle} accessibilityRole="header">{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    </View>
  );
}

const createStyles = (c: Palette, l: Layout) =>
  StyleSheet.create({
    content: { width: '100%', maxWidth: l.maxWidth, alignSelf: 'center', paddingHorizontal: l.gutter, paddingTop: l.isTablet ? 44 : 28, paddingBottom: 40, gap: 36 },
    head: { gap: 12, maxWidth: 760 },
    eyebrow: { color: c.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
    title: { fontFamily: Fonts.serif, color: c.text, fontSize: l.isTablet ? 42 : 30, lineHeight: l.isTablet ? 50 : 37, fontWeight: '800', letterSpacing: -1 },
    intro: { color: c.textSecondary, fontSize: l.isTablet ? 17 : 16, lineHeight: 27 },
    notice: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', backgroundColor: c.warningBg, borderWidth: 1, borderColor: c.warningBorder, borderRadius: Radius.md, padding: 14, marginTop: -12 },
    noticeIcon: { color: c.warningText, fontSize: 16, lineHeight: 19 },
    noticeText: { flex: 1, color: c.warningText, fontSize: 13, lineHeight: 20 },

    section: { gap: 18 },
    sectionHead: { gap: 6, paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: c.text },
    sectionTitle: { fontFamily: Fonts.serif, color: c.text, fontSize: l.isTablet ? 26 : 22, fontWeight: '800', letterSpacing: -0.5 },
    sectionSubtitle: { color: c.textSecondary, fontSize: 14, lineHeight: 22, maxWidth: 760 },

    card: { backgroundColor: c.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: c.border, padding: 20, gap: 10, ...elevation(c, 1) },
    fill: { flexGrow: 1 },
    pressed: { opacity: 0.75 },
    stepNumber: { width: 32, height: 32, borderRadius: 16, backgroundColor: c.brand, alignItems: 'center', justifyContent: 'center' },
    stepNumberText: { color: c.onBrand, fontSize: 14, fontWeight: '800' },
    cardTitle: { fontFamily: Fonts.serif, color: c.text, fontSize: 19, lineHeight: 25, fontWeight: '800', letterSpacing: -0.2 },
    cardText: { color: c.textSecondary, fontSize: 14, lineHeight: 22 },
    tag: { alignSelf: 'flex-start', backgroundColor: c.brandSoft, borderRadius: 6, paddingHorizontal: 9, paddingVertical: 4 },
    tagText: { color: c.accent, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
    whoLabel: { color: c.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1.2, marginTop: 2 },
    localRole: { color: c.accent, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
    linkButton: { marginTop: 'auto', alignSelf: 'flex-start', minHeight: 40, justifyContent: 'center', paddingTop: 4 },
    linkButtonText: { color: c.accent, fontSize: 13, fontWeight: '800' },
    primaryButton: { marginTop: 'auto', minHeight: 46, borderRadius: Radius.md, backgroundColor: c.brand, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
    primaryButtonText: { color: c.onBrand, fontSize: 14, fontWeight: '800' },

    docsCard: { backgroundColor: c.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: c.border, padding: 22, gap: 14, ...elevation(c, 1) },
    docRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
    check: { width: 22, height: 22, borderRadius: 11, backgroundColor: c.brandSoft, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
    checkText: { color: c.accent, fontSize: 12, fontWeight: '800' },
    docText: { flex: 1, color: c.text, fontSize: 15, lineHeight: 23 },
    docsNote: { color: c.textMuted, fontSize: 12, lineHeight: 19, paddingTop: 12, borderTopWidth: 1, borderTopColor: c.border },

    scam: { flexDirection: 'row', gap: 14, alignItems: 'flex-start', backgroundColor: c.accentSoft, borderWidth: 1, borderColor: c.borderStrong, borderRadius: Radius.lg, padding: 20 },
    scamIcon: { color: c.accentText, fontSize: 22, lineHeight: 26 },
    scamCopy: { flex: 1, gap: 4 },
    scamTitle: { color: c.accentText, fontSize: 15, fontWeight: '800' },
    scamText: { color: c.text, fontSize: 14, lineHeight: 22 },
  });
