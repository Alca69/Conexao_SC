import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppFooter } from '@/components/app-footer';
import { ArticleSheet } from '@/components/article-sheet';
import { ChipScroller } from '@/components/chip-scroller';

import { elevation, Fonts, Radius, type Palette } from '@/constants/theme';
import { formatPublished, getLocalizedCategories, getLocalizedNews, type NewsArticle } from '@/data/news';
import { useLayout, type Layout } from '@/hooks/use-layout';
import { useLanguage, useTheme } from '@/hooks/use-theme';

const ASIDE_WIDTH = 264;
const COLUMN_GAP = 28;
const CARD_GAP = 20;

export default function NewsScreen() {
  const theme = useTheme();
  const layout = useLayout();
  const { language, t } = useLanguage();
  const localizedCategories = getLocalizedCategories(language);
  const localizedNews = getLocalizedNews(language);
  const [category, setCategory] = useState(localizedCategories.all);
  const [secondaryTag, setSecondaryTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<NewsArticle | null>(null);
  const hasAside = layout.width >= 1180;
  const mainWidth = layout.contentWidth - (hasAside ? ASIDE_WIDTH + COLUMN_GAP : 0);
  const cardColumns = mainWidth >= 680 ? 2 : 1;
  const cardWidth = Math.floor((mainWidth - CARD_GAP * (cardColumns - 1)) / cardColumns);
  const wideHero = mainWidth >= 680;
  const styles = useMemo(() => createStyles(theme, layout, wideHero), [theme, layout, wideHero]);

  const featured = localizedNews[0];
  const primaryCategories = [localizedCategories.all, ...localizedCategories.primary];
  const secondaryCategories = localizedCategories.secondary;
  const activeCategory = primaryCategories.includes(category) ? category : localizedCategories.all;
  const activeSecondaryTag = secondaryTag && secondaryCategories.includes(secondaryTag) ? secondaryTag : null;
  const selectedLocalized = selected ? localizedNews.find((article) => article.id === selected.id) ?? null : null;
  const normalizeText = (text: string) =>
    text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLocaleLowerCase(language === 'pt' ? 'pt-BR' : language);
  const normalizedQuery = normalizeText(searchQuery.trim());
  const searchSuggestions = normalizedQuery
    ? secondaryCategories
        .filter((tag) => normalizeText(tag).includes(normalizedQuery))
        .slice(0, 5)
    : [];
  const related = selectedLocalized
    ? localizedNews.filter((article) => article.id !== selectedLocalized.id && article.primaryTag === selectedLocalized.primaryTag).concat(localizedNews.filter((article) => article.id !== selectedLocalized.id && article.primaryTag !== selectedLocalized.primaryTag)).slice(0, 3)
    : [];
  const articles = localizedNews.slice(1).filter((article) => {
    const matchesPrimary = activeCategory === localizedCategories.all || article.primaryTag === activeCategory;
    const matchesSecondary = !activeSecondaryTag || article.secondaryTags.includes(activeSecondaryTag);
    const matchesSearch =
      !normalizedQuery ||
      article.secondaryTags.some((tag) => normalizeText(tag).includes(normalizedQuery)) ||
      normalizeText(article.title).includes(normalizedQuery);
    return matchesPrimary && matchesSecondary && matchesSearch;
  });

  const isFiltered = activeCategory !== localizedCategories.all || activeSecondaryTag !== null || normalizedQuery.length > 0;
  const highlights = isFiltered ? [] : articles.slice(0, 2);
  const gridArticles = isFiltered ? articles : articles.slice(2);
  const mostRead = [localizedNews[2], localizedNews[0], localizedNews[5], localizedNews[3], localizedNews[7]].filter(Boolean);

  const mostReadBlock = (
    <View style={styles.mostRead}>
      <Text style={styles.mostReadHeading}>{t('mostRead')}</Text>
      {mostRead.map((item, index) => (
        <Pressable key={item.id} onPress={() => setSelected(item)} accessibilityRole="button" accessibilityLabel={item.title} style={({ pressed }) => [styles.mostReadItem, index > 0 && styles.mostReadDivider, pressed && styles.pressed]}>
          <Text style={styles.mostReadNumber}>{index + 1}</Text>
          <View style={styles.mostReadCopy}>
            <Text style={styles.mostReadCategory}>{item.category.toUpperCase()}</Text>
            <Text style={styles.mostReadTitle} numberOfLines={3}>{item.title}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.pageScroll}
        contentContainerStyle={styles.pageScrollContent}
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.page}>
          <View style={[styles.mainColumn, { width: mainWidth }]}>
            <View style={styles.welcome}>
              <Text style={styles.eyebrow}>{t('homeEyebrow')}</Text>
              <Text style={styles.heading}>{t('homeHeadingStart')}<Text style={styles.headingAccent}>{t('homeHeadingEnd')}</Text></Text>
              <Text style={styles.intro}>{t('homeIntro')}</Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Ler destaque: ${featured.title}`}
              onPress={() => setSelected(featured)}
              style={({ pressed }) => [styles.hero, pressed && styles.pressed]}
            >
              <Image source={featured.image} style={styles.heroImage} contentFit="cover" accessibilityLabel="Foto ilustrativa de um encontro de pessoas" />
              <View style={styles.heroCopy}>
                <View style={styles.heroTop}>
                  <Text style={styles.heroTag}>{t('featured')}</Text>
                  <Text style={styles.heroCity}>{featured.city}</Text>
                </View>
                <Text style={styles.heroTitle}>{featured.title}</Text>
                <Text style={styles.heroSummary}>{featured.summary}</Text>
                <View style={styles.heroBottom}>
                  <Text style={styles.heroMeta}>{t('by')} {featured.author} · {formatPublished(featured.publishedAt, language)} · {featured.readingTime} {t('reading')}</Text>
                  <Text style={styles.heroArrow}>↗</Text>
                </View>
              </View>
            </Pressable>

            <View style={styles.disclaimer}>
              <View style={styles.demoBadge}><Text style={styles.demoBadgeText}>{t('demoBadge')}</Text></View>
              <Text style={styles.disclaimerText}>{t('disclaimer')}</Text>
            </View>

            <View style={styles.filters}>
            <ChipScroller label="Categorias">
              {primaryCategories.map((item) => (
                <Pressable
                  key={item}
                  accessibilityRole="button"
                  accessibilityLabel={`Filtrar notícias: ${item}`}
                  accessibilityState={{ selected: activeCategory === item }}
                  onPress={() => { setCategory(item); setSearchQuery(''); }}
                  style={[styles.chip, activeCategory === item && styles.selectedChip]}
                >
                  <Text style={[styles.chipText, activeCategory === item && styles.selectedChipText]}>{item}</Text>
                </Pressable>
              ))}
            </ChipScroller>
            </View>

            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>⌕</Text>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={t('searchPlaceholder')}
                placeholderTextColor={theme.textMuted}
                style={styles.searchInput}
                accessibilityLabel="Pesquisar tag secundária"
              />
              {searchQuery.length > 0 && (
                <Pressable accessibilityRole="button" accessibilityLabel="Limpar pesquisa" onPress={() => setSearchQuery('')} style={styles.clearButton}>
                  <Text style={styles.clearText}>×</Text>
                </Pressable>
              )}
              {searchQuery.length > 0 && (
                <View style={styles.searchSuggestions}>
                  {searchSuggestions.length > 0 ? searchSuggestions.map((tag) => (
                    <Pressable
                      key={tag}
                      onPress={() => { setSecondaryTag(tag); setSearchQuery(''); }}
                      style={styles.suggestion}
                      accessibilityRole="button"
                    >
                      <Text style={styles.suggestionText}>{tag}</Text>
                    </Pressable>
                  )) : (
                    <Text style={styles.noSuggestion}>{t('noSuggestion')}</Text>
                  )}
                </View>
              )}
            </View>

            <View style={styles.secondaryFilters}>
            <ChipScroller label="Tags">
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: activeSecondaryTag === null }}
                onPress={() => setSecondaryTag(null)}
                style={[styles.secondaryChip, activeSecondaryTag === null && styles.selectedSecondaryChip]}
              >
                <Text style={[styles.secondaryChipText, activeSecondaryTag === null && styles.selectedSecondaryChipText]}>{t('allTags')}</Text>
              </Pressable>
              {secondaryCategories.map((tag) => (
                <Pressable
                  key={tag}
                  accessibilityRole="button"
                  accessibilityState={{ selected: activeSecondaryTag === tag }}
                  onPress={() => setSecondaryTag(activeSecondaryTag === tag ? null : tag)}
                  style={[styles.secondaryChip, activeSecondaryTag === tag && styles.selectedSecondaryChip]}
                >
                  <Text style={[styles.secondaryChipText, activeSecondaryTag === tag && styles.selectedSecondaryChipText]}>{tag}{activeSecondaryTag === tag ? '  ×' : ''}</Text>
                </Pressable>
              ))}
            </ChipScroller>
            </View>

            {highlights.length > 0 && (
              <View style={styles.highlightBlock}>
                <Text style={styles.blockHeading}>{t('highlights')}</Text>
                <View style={styles.highlightRow}>
                  {highlights.map((item) => (
                    <Pressable key={item.id} onPress={() => setSelected(item)} accessibilityRole="button" accessibilityLabel={`Ler notícia: ${item.title}`} style={({ pressed }) => [styles.highlight, { width: cardColumns === 2 ? cardWidth : '100%' }, pressed && styles.pressed]}>
                      <Image source={item.image} style={styles.highlightImage} contentFit="cover" />
                      <View style={styles.highlightCopy}>
                        <Text style={styles.city}>{item.category.toUpperCase()}</Text>
                        <Text style={styles.highlightTitle} numberOfLines={4}>{item.title}</Text>
                        <Text style={styles.meta}>{formatPublished(item.publishedAt, language)} · {item.readingTime} {t('reading')}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.sectionHeading}>
              <View style={styles.sectionHeadingCopy}>
                <Text style={styles.eyebrow}>{t('inside')}</Text>
                <Text style={styles.sectionTitle} accessibilityRole="header">
                  {activeCategory === localizedCategories.all ? t('latestNews') : activeCategory}
                </Text>
              </View>
              <Text style={styles.count}>{articles.length} {t('newsCount')}</Text>
            </View>

            <View style={styles.grid}>
              {gridArticles.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => setSelected(item)}
                  accessibilityRole="button"
                  accessibilityLabel={`Ler notícia: ${item.title}`}
                  style={({ pressed }) => [styles.card, { width: cardWidth }, pressed && styles.pressed]}
                >
                  <View>
                    <Image source={item.image} style={styles.cardImage} contentFit="cover" accessibilityLabel={`Foto ilustrativa para a categoria ${item.primaryTag}`} />
                    <View style={styles.cardTags}>
                      <View style={styles.cardTag}><Text style={styles.cardTagText}>{item.primaryTag}</Text></View>
                      {item.secondaryTags.slice(0, 2).map((tag) => (
                        <View key={tag} style={styles.secondaryCardTag}><Text style={styles.secondaryCardTagText}>{tag}</Text></View>
                      ))}
                    </View>
                  </View>
                  <View style={styles.cardCopy}>
                    <Text style={styles.city}>{item.city} · Santa Catarina</Text>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSummary}>{item.summary}</Text>
                    <View style={styles.cardBottom}>
                      <Text style={styles.meta}>{item.author} · {formatPublished(item.publishedAt, language)} · {item.readingTime} {t('reading')}</Text>
                      <Text style={styles.read}>{t('read')} →</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>

            {!hasAside && mostReadBlock}
          </View>

          {hasAside && (
            <View style={styles.aside}>
              {mostReadBlock}
              <View style={[styles.sponsorCard, styles.sponsorBlue]}>
                <Text style={styles.sponsorLabel}>{t('sponsor')}</Text>
                <Text style={styles.sponsorTitle}>{t('localCommerce')}</Text>
                <Text style={styles.sponsorText}>{t('connectionsNearYou')}</Text>
              </View>
              <View style={[styles.sponsorCard, styles.sponsorRed]}>
                <Text style={styles.sponsorLabel}>{t('advertising')}</Text>
                <Text style={[styles.sponsorTitle, styles.sponsorTitleRed]}>{t('lifeInSc')}</Text>
                <Text style={styles.sponsorText}>{t('discoverPaths')}</Text>
              </View>
            </View>
          )}
        </View>
        <AppFooter />
      </ScrollView>

      <ArticleSheet
        visible={selectedLocalized !== null}
        onClose={() => setSelected(null)}
        articleKey={selectedLocalized?.id}
        backLabel={t('backNews')}
        closeLabel={t('close')}
        image={selectedLocalized?.image}
        tags={selectedLocalized ? [selectedLocalized.primaryTag, ...selectedLocalized.secondaryTags.slice(0, 2)] : []}
        eyebrow={selectedLocalized ? `${selectedLocalized.category.toUpperCase()} · ${selectedLocalized.city}` : undefined}
        title={selectedLocalized?.title}
        summary={selectedLocalized?.summary}
        byline={selectedLocalized ? `${t('by')} ${selectedLocalized.author}` : undefined}
        meta={selectedLocalized ? `${formatPublished(selectedLocalized.publishedAt, language)} · ${selectedLocalized.city} · ${selectedLocalized.readingTime} ${t('reading')}` : undefined}
        notice={t('readerDisclaimer')}
        body={selectedLocalized?.body}
        relatedTitle={t('keepReading')}
        related={related.map((item) => ({ id: item.id, title: item.title, image: item.image, tag: item.primaryTag }))}
        onSelectRelated={(id) => setSelected(localizedNews.find((article) => article.id === id) ?? null)}
      />
    </View>
  );
}

const createStyles = (c: Palette, l: Layout, wideHero: boolean) =>
  StyleSheet.create({
    screen: { flex: 1, backgroundColor: c.background },
    pageScroll: { flex: 1, width: '100%' },
    pageScrollContent: { flexGrow: 1, paddingBottom: 24 },
    page: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: COLUMN_GAP, width: '100%', maxWidth: l.maxWidth, alignSelf: 'center', paddingHorizontal: l.gutter },
    mainColumn: { maxWidth: '100%' },
    aside: { width: ASIDE_WIDTH, gap: 16, paddingTop: 40 },
    sponsorCard: { width: '100%', minHeight: 220, borderRadius: Radius.lg, padding: 20, gap: 8, borderWidth: 1 },
    sponsorBlue: { backgroundColor: c.brandSoft, borderColor: c.borderStrong },
    sponsorRed: { backgroundColor: c.accentSoft, borderColor: c.borderStrong },
    sponsorLabel: { color: c.textMuted, fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
    sponsorTitle: { color: c.accent, fontSize: 16, fontWeight: '800' },
    sponsorTitleRed: { color: c.accentText },
    sponsorText: { color: c.textSecondary, fontSize: 13, lineHeight: 19 },

    welcome: { paddingTop: l.isTablet ? 44 : 28, paddingBottom: 26, gap: 12, maxWidth: 720 },
    eyebrow: { color: c.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
    heading: { fontFamily: Fonts.serif, fontSize: l.isTablet ? 44 : 32, lineHeight: l.isTablet ? 52 : 38, fontWeight: '800', color: c.text, letterSpacing: -1.2 },
    headingAccent: { color: c.accent },
    intro: { color: c.textSecondary, fontSize: l.isTablet ? 17 : 15, lineHeight: l.isTablet ? 27 : 23 },

    hero: { overflow: 'hidden', borderRadius: Radius.xl, backgroundColor: c.inverseSurface, flexDirection: wideHero ? 'row' : 'column', borderWidth: 1, borderColor: c.border, ...elevation(c, 2) },
    heroImage: { width: wideHero ? '48%' : '100%', height: wideHero ? undefined : 210, minHeight: wideHero ? 320 : 210, backgroundColor: c.backgroundSelected },
    heroCopy: { flex: 1, padding: wideHero ? 30 : 22, gap: 14, justifyContent: 'center' },
    heroTop: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 12 },
    heroTag: { color: c.onDanger, backgroundColor: c.danger, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 6, fontSize: 10, fontWeight: '800', letterSpacing: 1, overflow: 'hidden' },
    heroCity: { color: '#B9CCDC', fontSize: 12 },
    heroTitle: { fontFamily: Fonts.serif, color: '#FFFFFF', fontSize: wideHero ? 28 : 24, lineHeight: wideHero ? 36 : 31, fontWeight: '800', letterSpacing: -0.5 },
    heroSummary: { color: '#B9CCDC', fontSize: 14, lineHeight: 22 },
    heroBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
    heroMeta: { flex: 1, color: '#9DB3C5', fontSize: 11, lineHeight: 16 },
    heroArrow: { color: '#FFFFFF', fontSize: 26 },

    disclaimer: { flexDirection: 'row', gap: 12, alignItems: 'center', marginVertical: 18, padding: 12, borderRadius: Radius.md, backgroundColor: c.warningBg, borderWidth: 1, borderColor: c.warningBorder },
    demoBadge: { backgroundColor: c.warningText, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 },
    demoBadgeText: { color: c.warningBg, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
    blockHeading: { color: c.text, fontSize: 13, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase', paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: c.text, marginBottom: 16 },
    highlightBlock: { marginBottom: 12 },
    highlightRow: { flexDirection: 'row', flexWrap: 'wrap', gap: CARD_GAP },
    highlight: { flexDirection: 'row', gap: 14, backgroundColor: c.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: c.border, overflow: 'hidden', ...elevation(c, 1) },
    highlightImage: { width: 112, minHeight: 132, backgroundColor: c.backgroundSelected },
    highlightCopy: { flex: 1, paddingVertical: 14, paddingRight: 14, gap: 6, justifyContent: 'center' },
    highlightTitle: { fontFamily: Fonts.serif, color: c.text, fontSize: 16, lineHeight: 22, fontWeight: '800' },
    mostRead: { width: '100%', backgroundColor: c.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: c.border, padding: 18, marginBottom: 8 },
    mostReadHeading: { color: c.text, fontSize: 13, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase', paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: c.danger },
    mostReadItem: { flexDirection: 'row', gap: 14, paddingVertical: 14, alignItems: 'flex-start' },
    mostReadDivider: { borderTopWidth: 1, borderTopColor: c.border },
    mostReadNumber: { fontFamily: Fonts.serif, color: c.danger, fontSize: 28, lineHeight: 30, fontWeight: '800', width: 26 },
    mostReadCopy: { flex: 1, gap: 4 },
    mostReadCategory: { color: c.accent, fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
    mostReadTitle: { fontFamily: Fonts.serif, color: c.text, fontSize: 14, lineHeight: 20, fontWeight: '700' },
    disclaimerText: { color: c.textSecondary, fontSize: 12, lineHeight: 19, flexShrink: 1 },

    filters: { paddingBottom: 12 },
    chip: { minHeight: 42, paddingHorizontal: 18, justifyContent: 'center', borderRadius: Radius.pill, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface },
    selectedChip: { backgroundColor: c.brand, borderColor: c.brand },
    chipText: { color: c.textSecondary, fontSize: 13, fontWeight: '700' },
    selectedChipText: { color: c.onBrand },

    searchBox: { minHeight: 48, marginBottom: 12, borderRadius: Radius.md, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, zIndex: 20 },
    searchIcon: { color: c.accent, fontSize: 20, marginRight: 8 },
    searchInput: { flex: 1, minHeight: 44, color: c.text, fontSize: 14, outlineStyle: 'none' } as object,
    searchSuggestions: { position: 'absolute', left: 0, right: 0, top: 52, backgroundColor: c.surfaceRaised, borderRadius: Radius.md, borderWidth: 1, borderColor: c.border, padding: 6, zIndex: 30, ...elevation(c, 2) },
    suggestion: { minHeight: 42, justifyContent: 'center', borderRadius: 8, paddingHorizontal: 10 },
    suggestionText: { color: c.text, fontSize: 13, fontWeight: '600' },
    noSuggestion: { color: c.textSecondary, fontSize: 12, padding: 10 },

    secondaryFilters: { paddingBottom: 14 },
    clearButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: c.backgroundElement, alignItems: 'center', justifyContent: 'center' },
    clearText: { color: c.textSecondary, fontSize: 20, lineHeight: 22 },
    secondaryChip: { minHeight: 36, paddingHorizontal: 13, justifyContent: 'center', borderRadius: Radius.sm, borderWidth: 1, borderColor: c.borderStrong, backgroundColor: c.brandSoft },
    selectedSecondaryChip: { backgroundColor: c.brand, borderColor: c.brand },
    secondaryChipText: { color: c.accent, fontSize: 12, fontWeight: '700' },
    selectedSecondaryChipText: { color: c.onBrand },

    sectionHeading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10, marginBottom: 18, paddingTop: 12 },
    sectionHeadingCopy: { flexShrink: 1 },
    sectionTitle: { fontFamily: Fonts.serif, color: c.text, fontSize: l.isTablet ? 28 : 24, lineHeight: 34, fontWeight: '800', marginTop: 4, letterSpacing: -0.5 },
    count: { color: c.textMuted, fontSize: 12, paddingBottom: 6 },

    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: CARD_GAP },
    card: { borderRadius: Radius.lg, overflow: 'hidden', backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, ...elevation(c, 1) },
    pressed: { opacity: 0.85 },
    cardImage: { width: '100%', height: 184, backgroundColor: c.backgroundSelected },
    cardTags: { position: 'absolute', left: 14, right: 14, bottom: 14, flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    cardTag: { backgroundColor: c.surface, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5 },
    cardTagText: { color: c.accent, fontSize: 11, fontWeight: '800' },
    secondaryCardTag: { backgroundColor: c.brandSoft, borderWidth: 1, borderColor: c.borderStrong, borderRadius: 6, paddingHorizontal: 9, paddingVertical: 5 },
    secondaryCardTagText: { color: c.textSecondary, fontSize: 10, fontWeight: '700' },
    cardCopy: { padding: 18, gap: 8, flexGrow: 1 },
    city: { color: c.accent, fontSize: 11, fontWeight: '700' },
    cardTitle: { fontFamily: Fonts.serif, color: c.text, fontSize: 19, lineHeight: 26, fontWeight: '800', letterSpacing: -0.2 },
    cardSummary: { color: c.textSecondary, fontSize: 14, lineHeight: 22 },
    cardBottom: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 6, marginTop: 'auto' },
    meta: { color: c.textMuted, fontSize: 11, lineHeight: 18 },
    read: { color: c.accent, fontSize: 12, fontWeight: '800' },


  });
