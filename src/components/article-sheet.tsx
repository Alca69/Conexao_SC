import { Image, type ImageSource } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { useMemo, useState } from 'react';
import { Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { elevation, Fonts, Radius, type Palette } from '@/constants/theme';
import { useLayout, type Layout } from '@/hooks/use-layout';
import { useTheme } from '@/hooks/use-theme';

export type RelatedItem = { id: string; title: string; image: ImageSource; tag: string };

export type ArticleSheetProps = {
  visible: boolean;
  onClose: () => void;
  /** Identifica o artigo; troca de artigo volta ao topo */
  articleKey?: string;
  backLabel: string;
  closeLabel: string;
  image?: ImageSource;
  imageCredit?: string;
  imageCreditLabel?: string;
  tags?: string[];
  eyebrow?: string;
  title?: string;
  summary?: string;
  byline?: string;
  meta?: string;
  notice?: string;
  body?: string;
  source?: { url: string; label: string };
  relatedTitle?: string;
  related?: RelatedItem[];
  onSelectRelated?: (id: string) => void;
};

/** Leitor de matéria em folha modal: tela cheia no celular e cartão centralizado em tablets e desktops. */
export function ArticleSheet(props: ArticleSheetProps) {
  const c = useTheme();
  const layout = useLayout();
  const styles = useMemo(() => createStyles(c, layout), [c, layout]);
  const [progress, setProgress] = useState(0);
  const { visible, onClose, title } = props;
  const paragraphs = (props.body ?? '').split(/\n\s*\n/).filter(Boolean);

  const content = (
    <View style={styles.sheet}>
      <View style={styles.topBar}>
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel={props.backLabel} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <Text style={styles.backText}>{props.backLabel}</Text>
        </Pressable>
        <View style={styles.brandMark}>
          <View style={styles.mark}><Text style={styles.markText}>SC</Text></View>
          <Text style={styles.brandText}>CONEXÃO SC</Text>
        </View>
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel={props.closeLabel} style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}>
          <Text style={styles.closeText}>×</Text>
        </Pressable>
      </View>
      <View style={styles.progressTrack}><View style={[styles.progressBar, { width: `${Math.round(progress * 100)}%` }]} /></View>

      <ScrollView
        key={props.articleKey}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={32}
        onScroll={({ nativeEvent }) => {
          const max = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height;
          setProgress(max > 0 ? Math.min(1, Math.max(0, nativeEvent.contentOffset.y / max)) : 0);
        }}
      >
        {props.image && (
          <View style={styles.imageWrap}>
            <Image source={props.image} contentFit="cover" style={styles.image} accessibilityLabel="Foto ilustrativa da matéria" />
            <View style={styles.imageShade} pointerEvents="none" />
            {!!props.tags?.length && (
              <View style={styles.imageTags}>
                {props.tags.map((tag, index) => (
                  <View key={tag} style={[styles.tag, index === 0 && styles.tagPrimary]}>
                    <Text style={[styles.tagText, index === 0 && styles.tagTextPrimary]}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        <View style={styles.article}>
          {!!props.eyebrow && <Text style={styles.eyebrow}>{props.eyebrow}</Text>}
          <Text style={styles.title} accessibilityRole="header">{title}</Text>

          {(props.byline || props.meta) && (
            <View style={styles.byline}>
              <View style={styles.avatar}><Text style={styles.avatarText}>SC</Text></View>
              <View style={styles.bylineCopy}>
                {!!props.byline && <Text style={styles.bylineName}>{props.byline}</Text>}
                {!!props.meta && <Text style={styles.bylineMeta}>{props.meta}</Text>}
              </View>
            </View>
          )}

          {!!props.summary && (
            <View style={styles.lead}><Text style={styles.leadText}>{props.summary}</Text></View>
          )}

          {!!props.notice && (
            <View style={styles.notice}>
              <Text style={styles.noticeIcon}>ⓘ</Text>
              <Text style={styles.noticeText}>{props.notice}</Text>
            </View>
          )}

          {paragraphs.map((paragraph, index) => (
            <Text key={index} style={styles.body}>{paragraph}</Text>
          ))}

          {props.source && (
            <Pressable
              accessibilityRole="link"
              onPress={() => props.source && WebBrowser.openBrowserAsync(props.source.url)}
              style={({ pressed }) => [styles.sourceButton, pressed && styles.pressed]}
            >
              <Text style={styles.sourceButtonText}>{props.source.label} ↗</Text>
            </Pressable>
          )}

          {!!props.imageCredit && (
            <Text style={styles.credit}>{props.imageCreditLabel ?? 'Foto'}: {props.imageCredit}</Text>
          )}
        </View>

        {!!props.related?.length && (
          <View style={styles.related}>
            <Text style={styles.relatedHeading}>{props.relatedTitle}</Text>
            <View style={styles.relatedList}>
              {props.related.map((item) => (
                <Pressable
                  key={item.id}
                  accessibilityRole="button"
                  accessibilityLabel={item.title}
                  onPress={() => props.onSelectRelated?.(item.id)}
                  style={({ pressed }) => [styles.relatedCard, pressed && styles.pressed]}
                >
                  <Image source={item.image} contentFit="cover" style={styles.relatedImage} />
                  <View style={styles.relatedCopy}>
                    <Text style={styles.relatedTag}>{item.tag}</Text>
                    <Text style={styles.relatedItemTitle} numberOfLines={3}>{item.title}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType={Platform.OS === 'web' ? 'fade' : 'slide'}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {layout.isTablet && <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityRole="button" accessibilityLabel={props.closeLabel} />}
        {layout.isTablet ? content : <SafeAreaView style={styles.phoneSafe}>{content}</SafeAreaView>}
      </View>
    </Modal>
  );
}

const createStyles = (c: Palette, l: Layout) =>
  StyleSheet.create({
    overlay: { flex: 1, backgroundColor: l.isTablet ? c.overlay : c.surface, alignItems: 'center', justifyContent: 'center', padding: l.isTablet ? 28 : 0 },
    phoneSafe: { flex: 1, width: '100%', backgroundColor: c.surface },
    sheet: l.isTablet
      ? { width: '100%', maxWidth: 800, maxHeight: '100%', flex: 1, backgroundColor: c.background, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: c.border, ...elevation(c, 2) }
      : { flex: 1, width: '100%', backgroundColor: c.background },
    pressed: { opacity: 0.7 },

    topBar: { minHeight: 58, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: c.surface, borderBottomWidth: 1, borderBottomColor: c.border },
    backButton: { minHeight: 44, paddingHorizontal: 8, justifyContent: 'center' },
    backText: { color: c.accent, fontSize: 15, fontWeight: '700' },
    brandMark: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    mark: { width: 22, height: 22, borderRadius: 7, backgroundColor: c.brand, alignItems: 'center', justifyContent: 'center' },
    markText: { color: c.onBrand, fontSize: 9, fontWeight: '800' },
    brandText: { color: c.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1.4 },
    closeButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: c.backgroundElement, alignItems: 'center', justifyContent: 'center' },
    closeText: { color: c.text, fontSize: 24, lineHeight: 26 },
    progressTrack: { height: 3, backgroundColor: c.border },
    progressBar: { height: 3, backgroundColor: c.danger },

    scrollContent: { paddingBottom: 40 },
    imageWrap: { width: '100%', height: l.isTablet ? 340 : 240, backgroundColor: c.backgroundSelected },
    image: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    imageShade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 110, backgroundColor: 'rgba(5, 14, 23, 0.45)' },
    imageTags: { position: 'absolute', left: 20, right: 20, bottom: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    tag: { backgroundColor: 'rgba(255,255,255,0.18)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)', borderRadius: 6, paddingHorizontal: 9, paddingVertical: 4 },
    tagPrimary: { backgroundColor: c.danger, borderColor: c.danger },
    tagText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', letterSpacing: 0.3 },
    tagTextPrimary: { color: c.onDanger },

    article: { width: '100%', maxWidth: 680, alignSelf: 'center', paddingHorizontal: l.isTablet ? 32 : 20, paddingTop: 24, gap: 18 },
    eyebrow: { color: c.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
    title: { fontFamily: Fonts.serif, color: c.text, fontSize: l.isTablet ? 34 : 27, lineHeight: l.isTablet ? 42 : 34, fontWeight: '800', letterSpacing: -0.7 },
    byline: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: c.border },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: c.brand, alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: c.onBrand, fontSize: 13, fontWeight: '800' },
    bylineCopy: { flex: 1, gap: 2 },
    bylineName: { color: c.text, fontSize: 14, fontWeight: '800' },
    bylineMeta: { color: c.textMuted, fontSize: 12, lineHeight: 17 },
    lead: { borderLeftWidth: 3, borderLeftColor: c.danger, paddingLeft: 16 },
    leadText: { fontFamily: Fonts.serif, color: c.textSecondary, fontSize: l.isTablet ? 19 : 17, lineHeight: l.isTablet ? 30 : 27, fontWeight: '500' },
    notice: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', backgroundColor: c.brandSoft, borderWidth: 1, borderColor: c.borderStrong, borderRadius: Radius.md, padding: 14 },
    noticeIcon: { color: c.accent, fontSize: 16, lineHeight: 19 },
    noticeText: { flex: 1, color: c.textSecondary, fontSize: 12.5, lineHeight: 19 },
    body: { fontFamily: Fonts.serif, color: c.text, fontSize: 17, lineHeight: 29 },
    sourceButton: { minHeight: 50, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: c.brand, paddingHorizontal: 16, marginTop: 4 },
    sourceButtonText: { color: c.onBrand, fontSize: 14, fontWeight: '800', textAlign: 'center' },
    credit: { color: c.textMuted, fontSize: 11, lineHeight: 16 },

    related: { width: '100%', maxWidth: 680, alignSelf: 'center', paddingHorizontal: l.isTablet ? 32 : 20, paddingTop: 36, gap: 14 },
    relatedHeading: { color: c.text, fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
    relatedList: { gap: 12 },
    relatedCard: { flexDirection: 'row', backgroundColor: c.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: c.border, overflow: 'hidden' },
    relatedImage: { width: 96, minHeight: 88, backgroundColor: c.backgroundSelected },
    relatedCopy: { flex: 1, padding: 12, gap: 4, justifyContent: 'center' },
    relatedTag: { color: c.accent, fontSize: 10, fontWeight: '800', letterSpacing: 0.4 },
    relatedItemTitle: { fontFamily: Fonts.serif, color: c.text, fontSize: 14, lineHeight: 20, fontWeight: '700' },
  });
