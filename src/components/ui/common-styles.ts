import { StyleSheet } from 'react-native';

import { elevation, Fonts, Radius, type Palette } from '@/constants/theme';
import type { Layout } from '@/hooks/use-layout';

/** Estilos compartilhados pelas telas de conteúdo (Vivência, Vida pública, Finanças e Moradia). */
export function createCommonStyles(c: Palette, l: Layout) {
  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.background },
    content: { width: '100%', maxWidth: l.maxWidth, alignSelf: 'center', paddingHorizontal: l.gutter, paddingTop: l.isTablet ? 40 : 28, paddingBottom: 56, gap: 18 },
    eyebrow: { color: c.accent, fontSize: 11, lineHeight: 16, fontWeight: '800', letterSpacing: 1.4 },
    title: { fontFamily: Fonts.serif, color: c.text, fontSize: l.isTablet ? 40 : 30, lineHeight: l.isTablet ? 46 : 36, fontWeight: '800', letterSpacing: -0.8 },
    description: { color: c.textSecondary, fontSize: l.isTablet ? 17 : 16, lineHeight: 26, maxWidth: 720 },
    notice: { backgroundColor: c.warningBg, borderRadius: Radius.md, borderWidth: 1, borderColor: c.warningBorder, padding: 14, gap: 4 },
    noticeTitle: { color: c.warningText, fontSize: 13, fontWeight: '800' },
    noticeText: { color: c.warningText, fontSize: 13, lineHeight: 20 },
    card: { overflow: 'hidden', borderRadius: Radius.lg, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, ...elevation(c, 1) },
    pressed: { opacity: 0.85 },
    image: { width: '100%', height: l.isTablet ? 200 : 190, backgroundColor: c.backgroundSelected },
    categoryBadge: { position: 'absolute', left: 14, bottom: 14, backgroundColor: c.surface, borderRadius: Radius.sm, paddingHorizontal: 10, paddingVertical: 6 },
    categoryText: { color: c.accent, fontSize: 11, fontWeight: '800' },
    mapBadge: { position: 'absolute', right: 14, top: 14, backgroundColor: c.brand, borderRadius: Radius.pill, paddingHorizontal: 12, minHeight: 36, justifyContent: 'center' },
    mapBadgeText: { color: c.onBrand, fontSize: 11, fontWeight: '800' },
    cardCopy: { padding: 18, gap: 8, flexGrow: 1 },
    location: { color: c.accent, fontSize: 11, fontWeight: '700', letterSpacing: 0.2 },
    cardTitle: { fontFamily: Fonts.serif, color: c.text, fontSize: 19, lineHeight: 26, fontWeight: '800', letterSpacing: -0.2 },
    summary: { color: c.textSecondary, fontSize: 14, lineHeight: 22 },
    cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 'auto', paddingTop: 8 },
    date: { flex: 1, color: c.textMuted, fontSize: 11, lineHeight: 18 },
    read: { color: c.accent, fontSize: 12, fontWeight: '800' },
    reader: { flex: 1, backgroundColor: c.background },
    readerHeader: { minHeight: 60, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: c.border, backgroundColor: c.surface },
    backButton: { minHeight: 44, justifyContent: 'center' },
    backText: { color: c.accent, fontSize: 15, fontWeight: '700' },
    readerLabel: { color: c.textMuted, fontSize: 10, letterSpacing: 1.2, fontWeight: '700' },
    readerContent: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: l.isTablet ? 32 : 20, paddingBottom: 48, gap: 16 },
    readerImage: { width: '100%', height: l.isTablet ? 340 : 220, borderRadius: Radius.lg, backgroundColor: c.backgroundSelected },
    imageCredit: { color: c.textMuted, fontSize: 10, lineHeight: 16 },
    readerTitle: { fontFamily: Fonts.serif, color: c.text, fontSize: l.isTablet ? 34 : 28, lineHeight: l.isTablet ? 42 : 36, fontWeight: '800', letterSpacing: -0.6 },
    readerSummary: { color: c.textSecondary, fontSize: 17, lineHeight: 26 },
    readerDate: { color: c.textMuted, fontSize: 12 },
    body: { color: c.text, fontSize: 17, lineHeight: 29 },
    sourceButton: { minHeight: 50, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: c.brand, paddingHorizontal: 16 },
    sourceButtonText: { color: c.onBrand, fontSize: 14, fontWeight: '800', textAlign: 'center' },
  });
}
