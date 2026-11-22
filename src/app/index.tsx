import { Image } from 'expo-image';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getLocalizedCategories, getLocalizedNews, type NewsArticle } from '@/data/news';
import { useLanguage, useTheme } from '@/hooks/use-theme';

export default function NewsScreen() {
  const theme = useTheme();
  const { language, t } = useLanguage();
  const { width } = useWindowDimensions();
  const localizedCategories = getLocalizedCategories(language);
  const localizedNews = getLocalizedNews(language);
  const [category, setCategory] = useState(localizedCategories.all);
  const [secondaryTag, setSecondaryTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<NewsArticle | null>(null);
  const featured = localizedNews[0];
  const primaryCategories = [localizedCategories.all, ...localizedCategories.primary];
  const secondaryCategories = localizedCategories.secondary;
  const activeCategory = primaryCategories.includes(category) ? category : localizedCategories.all;
  const activeSecondaryTag = secondaryTag && secondaryCategories.includes(secondaryTag) ? secondaryTag : null;
  const selectedLocalized = selected ? localizedNews.find((article) => article.id === selected.id) ?? null : null;
  const normalizeText = (text: string) =>
    text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase(language === 'pt' ? 'pt-BR' : language);
  const normalizedQuery = normalizeText(searchQuery.trim());
  const searchSuggestions = normalizedQuery
    ? secondaryCategories
        .filter((tag) => normalizeText(tag).includes(normalizedQuery))
        .slice(0, 5)
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

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      {width >= 980 && (
        <>
          <View style={styles.leftRail}>
            <View style={[styles.sponsorCard, styles.sponsorWhite]}>
              <Text style={styles.sponsorLabel}>{t('sponsor')}</Text>
              <Text style={styles.sponsorTitle}>{t('localCommerce')}</Text>
              <Text style={styles.sponsorText}>{t('connectionsNearYou')}</Text>
            </View>
          </View>
          <View style={styles.rightRail}>
            <View style={[styles.sponsorCard, styles.sponsorRed]}>
              <Text style={styles.sponsorLabel}>{t('advertising')}</Text>
              <Text style={styles.sponsorTitle}>{t('lifeInSc')}</Text>
              <Text style={styles.sponsorText}>{t('discoverPaths')}</Text>
            </View>
          </View>
        </>
      )}
      <ScrollView
        style={styles.pageScroll}
        contentContainerStyle={styles.pageScrollContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.pageRow}>
        <View style={styles.mainColumn}>
          <View style={styles.list}>
            <View style={styles.welcome}>
              <Text style={styles.eyebrow}>{t('homeEyebrow')}</Text>
              <Text style={styles.heading}>{t('homeHeadingStart')}<Text style={styles.green}>{t('homeHeadingEnd')}</Text></Text>
              <Text style={styles.intro}>{t('homeIntro')}</Text>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel={`Ler destaque: ${featured.title}`} onPress={() => setSelected(featured)} style={styles.hero}>
              <Image source={featured.image} style={styles.heroImage} contentFit="cover" accessibilityLabel="Foto ilustrativa de um encontro de pessoas" />
              <View style={styles.heroCopy}>
                <View style={styles.heroTop}><Text style={styles.heroTag}>{t('featured')}</Text><Text style={styles.heroCity}>{featured.city}</Text></View>
                <Text style={styles.heroTitle}>{featured.title}</Text>
                <Text style={styles.heroSummary}>{featured.summary}</Text>
                <View style={styles.heroBottom}><Text style={styles.heroMeta}>{t('demonstration')} · {featured.readingTime} {t('reading')}</Text><Text style={styles.heroArrow}>↗</Text></View>
              </View>
            </Pressable>
            <View style={styles.disclaimer}><View style={styles.dot} /><Text style={styles.disclaimerText}>{t('disclaimer')}</Text></View>
            <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={styles.filters}>
              {primaryCategories.map((item) => (
                <Pressable key={item} accessibilityRole="button" accessibilityLabel={`Filtrar notícias: ${item}`} accessibilityState={{ selected: activeCategory === item }} onPress={() => { setCategory(item); setSearchQuery(''); }} style={[styles.chip, activeCategory === item && styles.selectedChip]}>
                  <Text style={[styles.chipText, activeCategory === item && styles.selectedChipText]}>{item}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>⌕</Text>
              <TextInput
                value={searchQuery}
                onChangeText={(text) => { setSearchQuery(text); setSecondaryTag(null); }}
                placeholder={t('searchPlaceholder')}
                placeholderTextColor="#7A8B8E"
                style={styles.searchInput}
                accessibilityLabel="Pesquisar tag secundária"
              />
              {searchQuery.length > 0 && (
                <View style={styles.searchSuggestions}>
                  {searchSuggestions.length > 0 ? searchSuggestions.map((tag) => (
                    <Pressable
                      key={tag}
                      onPress={() => { setSearchQuery(tag); setSecondaryTag(tag); }}
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
            <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={styles.secondaryFilters}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: activeSecondaryTag === null }}
                onPress={() => { setSecondaryTag(null); setSearchQuery(''); }}
                style={[styles.secondaryChip, activeSecondaryTag === null && styles.selectedSecondaryChip]}
              >
                <Text style={[styles.secondaryChipText, activeSecondaryTag === null && styles.selectedSecondaryChipText]}>{t('allTags')}</Text>
              </Pressable>
              {secondaryCategories.map((tag) => (
                <Pressable
                  key={tag}
                  accessibilityRole="button"
                  accessibilityState={{ selected: activeSecondaryTag === tag }}
                  onPress={() => { setSecondaryTag(tag); setSearchQuery(tag); }}
                  style={[styles.secondaryChip, activeSecondaryTag === tag && styles.selectedSecondaryChip]}
                >
                  <Text style={[styles.secondaryChipText, activeSecondaryTag === tag && styles.selectedSecondaryChipText]}>{tag}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <View style={styles.sectionHeading}><View><Text style={styles.eyebrow}>{t('inside')}</Text><Text style={styles.sectionTitle} accessibilityRole="header">{activeCategory === localizedCategories.all ? t('latestNews') : activeCategory}</Text></View><Text style={styles.count}>{articles.length} {t('newsCount')}</Text></View>
            {articles.map((item) => (
          <Pressable key={item.id} onPress={() => setSelected(item)} accessibilityRole="button" accessibilityLabel={`Ler notícia: ${item.title}`} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
            <View><Image source={item.image} style={styles.cardImage} contentFit="cover" accessibilityLabel={`Foto ilustrativa para a categoria ${item.primaryTag}`} /><View style={styles.cardTags}><View style={styles.cardTag}><Text style={styles.cardTagText}>{item.primaryTag}</Text></View>{item.secondaryTags.slice(0, 2).map((tag) => <View key={tag} style={styles.secondaryCardTag}><Text style={styles.secondaryCardTagText}>{tag}</Text></View>)}</View></View>
            <View style={styles.cardCopy}>
              <Text style={styles.city}>{item.city} · Santa Catarina</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSummary}>{item.summary}</Text>
              <View style={styles.cardBottom}><Text style={styles.meta}>{t('fakeNews')} · {item.readingTime} {t('reading')}</Text><Text style={styles.read}>{t('read')} →</Text></View>
            </View>
          </Pressable>
            ))}
            <View style={styles.footer}><Text style={styles.footerBrand}>conexão sc</Text><Text style={styles.footerText}>{t('footerText')}</Text><Text style={styles.footerSmall}>{t('footerSmall')}</Text></View>
          </View>
      <Modal visible={selectedLocalized !== null} animationType="slide" onRequestClose={() => setSelected(null)}>
        <SafeAreaView style={styles.reader}>
          <View style={styles.readerHeader}><Pressable onPress={() => setSelected(null)} accessibilityRole="button" accessibilityLabel={t('backNews')} style={styles.back}><Text style={styles.backText}>{t('backNews')}</Text></Pressable><Text style={styles.readerLabel}>CONEXÃO SC</Text></View>
          {selectedLocalized && <ScrollView contentContainerStyle={styles.readerContent}>
            <Image source={selectedLocalized.image} contentFit="cover" style={styles.readerImage} accessibilityLabel="Foto ilustrativa da notícia" />
            <Text style={styles.eyebrow}>{selectedLocalized.category.toUpperCase()} · {selectedLocalized.city}</Text>
            <Text style={styles.readerTitle} accessibilityRole="header">{selectedLocalized.title}</Text>
            <Text style={styles.readerSummary}>{selectedLocalized.summary}</Text>
            <Text style={styles.meta}>Conexão SC · {selectedLocalized.readingTime} {t('reading')}</Text>
            <View style={styles.readerNotice}><Text style={styles.disclaimerText}>{t('readerDisclaimer')}</Text></View>
            <Text style={styles.body}>{selectedLocalized.body}</Text>
          </ScrollView>}
        </SafeAreaView>
      </Modal>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F8FA' },
  pageScroll: { flex: 1, width: '100%' },
  pageScrollContent: { flexGrow: 1 },
  pageRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', width: '100%', minHeight: '100%' },
  mainColumn: { flex: 1, maxWidth: 620, width: '100%' },
  leftRail: { position: 'absolute', top: 24, left: 12, width: 158, zIndex: 2 },
  rightRail: { position: 'absolute', top: 24, right: 12, width: 158, zIndex: 2 },
  sponsorCard: { width: '100%', minHeight: 250, borderRadius: 12, padding: 14, gap: 8, borderWidth: 1 },
  sponsorWhite: { backgroundColor: '#E8F2F7', borderColor: '#B9D2E0' },
  sponsorRed: { backgroundColor: '#FBE8EC', borderColor: '#E8B9C1' },
  sponsorLabel: { color: '#7A7770', fontSize: 8, fontWeight: '800', letterSpacing: 1 },
  sponsorTitle: { color: '#005B96', fontSize: 13, fontWeight: '800' },
  sponsorText: { color: '#587080', fontSize: 10, lineHeight: 14 },
  list: { width: '100%', maxWidth: 640, alignSelf: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  welcome: { paddingTop: 28, paddingBottom: 24, gap: 12 },
  eyebrow: { color: '#005B96', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  heading: { fontSize: 32, lineHeight: 38, fontWeight: '800', color: '#12304A', letterSpacing: -1 },
  green: { color: '#005B96' },
  intro: { color: '#587080', fontSize: 15, lineHeight: 23 },
  hero: { overflow: 'hidden', borderRadius: 20, backgroundColor: '#12304A' },
  heroImage: { width: '100%', height: 210, backgroundColor: '#B9D2E0' },
  heroCopy: { padding: 22, gap: 14 },
  heroTop: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 12 },
  heroTag: { color: '#8E1D2E', backgroundColor: '#FBE8EC', paddingVertical: 5, paddingHorizontal: 9, borderRadius: 6, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  heroCity: { color: '#B9D2E0', fontSize: 12 },
  heroTitle: { color: '#FFF', fontSize: 25, lineHeight: 32, fontWeight: '700', letterSpacing: -0.4 },
  heroSummary: { color: '#B9D2E0', fontSize: 14, lineHeight: 22 },
  heroBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  heroMeta: { flex: 1, color: '#B9D2E0', fontSize: 10, lineHeight: 16 },
  heroArrow: { color: '#E8B9C1', fontSize: 27 },
  disclaimer: { flexDirection: 'row', gap: 8, alignItems: 'center', marginVertical: 18 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#C6283D' },
  disclaimerText: { color: '#587080', fontSize: 12, lineHeight: 19, flexShrink: 1 },
  filters: { gap: 8, paddingVertical: 6, paddingBottom: 22 },
  chip: { minHeight: 44, paddingHorizontal: 17, justifyContent: 'center', borderRadius: 24, borderWidth: 1, borderColor: '#D8E5EC', backgroundColor: '#FFF' },
  selectedChip: { backgroundColor: '#C6283D', borderColor: '#C6283D' },
  chipText: { color: '#587080', fontSize: 13, fontWeight: '600' },
  selectedChipText: { color: '#FFF' },
  searchBox: { minHeight: 46, marginBottom: 10, borderRadius: 12, borderWidth: 1, borderColor: '#D8E5EC', backgroundColor: '#FFF', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, zIndex: 20 },
  searchIcon: { color: '#005B96', fontSize: 20, marginRight: 8 },
  searchInput: { flex: 1, minHeight: 44, color: '#12304A', fontSize: 14 },
  searchSuggestions: { position: 'absolute', left: 0, right: 0, top: 50, backgroundColor: '#FFF', borderRadius: 10, borderWidth: 1, borderColor: '#D8E5EC', padding: 6, zIndex: 30 },
  suggestion: { minHeight: 40, justifyContent: 'center', borderRadius: 7, paddingHorizontal: 10 },
  suggestionText: { color: '#12304A', fontSize: 13, fontWeight: '600' },
  noSuggestion: { color: '#587080', fontSize: 12, padding: 10 },
  secondaryFilters: { gap: 8, paddingVertical: 4, paddingBottom: 18 },
  secondaryChip: { minHeight: 38, paddingHorizontal: 13, justifyContent: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#B9D2E0', backgroundColor: '#E8F2F7' },
  selectedSecondaryChip: { backgroundColor: '#005B96', borderColor: '#005B96' },
  secondaryChipText: { color: '#245675', fontSize: 12, fontWeight: '700' },
  selectedSecondaryChipText: { color: '#FFF' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 18, paddingTop: 8 },
  sectionTitle: { color: '#12304A', fontSize: 25, lineHeight: 34, fontWeight: '700', marginTop: 4 },
  count: { color: '#587080', fontSize: 12 },
  card: { borderRadius: 16, overflow: 'hidden', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#D8E5EC', marginBottom: 20 },
  pressed: { opacity: 0.8 },
  cardImage: { width: '100%', height: 184, backgroundColor: '#DCEFF7' },
  cardTags: { position: 'absolute', left: 14, right: 14, bottom: 14, flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  cardTag: { backgroundColor: '#FFFFFF', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6 },
  cardTagText: { color: '#005B96', fontSize: 11, fontWeight: '700' },
  secondaryCardTag: { backgroundColor: '#E8F2F7', borderWidth: 1, borderColor: '#B9D2E0', borderRadius: 6, paddingHorizontal: 9, paddingVertical: 6 },
  secondaryCardTagText: { color: '#587080', fontSize: 10, fontWeight: '700' },
  cardCopy: { padding: 18, gap: 10 },
  city: { color: '#005B96', fontSize: 11, fontWeight: '600' },
  cardTitle: { color: '#12304A', fontSize: 20, lineHeight: 27, fontWeight: '700' },
  cardSummary: { color: '#587080', fontSize: 14, lineHeight: 22 },
  cardBottom: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 6 },
  meta: { color: '#587080', fontSize: 11, lineHeight: 18 },
  read: { color: '#005B96', fontSize: 12, fontWeight: '700' },
  footer: { paddingVertical: 30, borderTopWidth: 1, borderTopColor: '#D8E5EC', gap: 10, marginTop: 10 },
  footerBrand: { color: '#12304A', fontSize: 22, fontWeight: '800' },
  footerText: { color: '#587080', fontSize: 14 },
  footerSmall: { color: '#587080', fontSize: 11 },
  reader: { flex: 1, backgroundColor: '#FFF' },
  readerHeader: { paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#D8E5EC' },
  back: { minHeight: 52, justifyContent: 'center', paddingHorizontal: 4 },
  backText: { color: '#005B96', fontSize: 16, fontWeight: '600' },
  readerLabel: { color: '#587080', fontSize: 10, letterSpacing: 1 },
  readerContent: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 22, gap: 20, paddingBottom: 40 },
  readerImage: { width: '100%', height: 220, borderRadius: 16, backgroundColor: '#DCEFF7' },
  readerTitle: { color: '#12304A', fontSize: 30, lineHeight: 38, fontWeight: '800' },
  readerSummary: { color: '#587080', fontSize: 17, lineHeight: 26 },
  readerNotice: { backgroundColor: '#E8F2F7', padding: 14, borderRadius: 10 },
  body: { color: '#245675', fontSize: 17, lineHeight: 29 },
});
