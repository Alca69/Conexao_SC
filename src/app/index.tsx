import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { categories, news, type NewsArticle } from '@/data/news';

export default function NewsScreen() {
  const [category, setCategory] = useState('Todas');
  const [selected, setSelected] = useState<NewsArticle | null>(null);
  const featured = news[0];
  const articles = category === 'Todas' ? news.slice(1) : news.filter((article) => article.category === category);

  return (
    <View style={styles.screen}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <View style={styles.welcome}>
              <Text style={styles.eyebrow}>PARA QUEM CHAMA SC DE LAR</Text>
              <Text style={styles.heading}>Informação para se sentir<Text style={styles.green}> em casa.</Text></Text>
              <Text style={styles.intro}>Notícias, histórias e conexões para imigrantes em Santa Catarina.</Text>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel={`Ler destaque: ${featured.title}`} onPress={() => setSelected(featured)} style={styles.hero}>
              <Image source={featured.image} style={styles.heroImage} contentFit="cover" accessibilityLabel="Foto ilustrativa de um encontro de pessoas" />
              <View style={styles.heroCopy}>
                <View style={styles.heroTop}><Text style={styles.heroTag}>EM DESTAQUE</Text><Text style={styles.heroCity}>{featured.city}</Text></View>
                <Text style={styles.heroTitle}>{featured.title}</Text>
                <Text style={styles.heroSummary}>{featured.summary}</Text>
                <View style={styles.heroBottom}><Text style={styles.heroMeta}>DEMONSTRAÇÃO · {featured.readingTime} de leitura</Text><Text style={styles.heroArrow}>↗</Text></View>
              </View>
            </Pressable>
            <View style={styles.disclaimer}><View style={styles.dot} /><Text style={styles.disclaimerText}>MVP com notícias fictícias e fotos ilustrativas.</Text></View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
              {categories.map((item) => (
                <Pressable key={item} accessibilityRole="button" accessibilityLabel={`Filtrar notícias: ${item}`} accessibilityState={{ selected: category === item }} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.selectedChip]}>
                  <Text style={[styles.chipText, category === item && styles.selectedChipText]}>{item}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <View style={styles.sectionHeading}><View><Text style={styles.eyebrow}>FIQUE POR DENTRO</Text><Text style={styles.sectionTitle} accessibilityRole="header">{category === 'Todas' ? 'Últimas notícias' : category}</Text></View><Text style={styles.count}>{articles.length} notícias</Text></View>
          </>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => setSelected(item)} accessibilityRole="button" accessibilityLabel={`Ler notícia: ${item.title}`} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
            <View><Image source={item.image} style={styles.cardImage} contentFit="cover" accessibilityLabel={`Foto ilustrativa para a categoria ${item.category}`} /><View style={styles.cardTag}><Text style={styles.cardTagText}>{item.category}</Text></View></View>
            <View style={styles.cardCopy}>
              <Text style={styles.city}>{item.city} · Santa Catarina</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSummary}>{item.summary}</Text>
              <View style={styles.cardBottom}><Text style={styles.meta}>Notícia fictícia · {item.readingTime} de leitura</Text><Text style={styles.read}>Ler →</Text></View>
            </View>
          </Pressable>
        )}
        ListFooterComponent={<View style={styles.footer}><Text style={styles.footerBrand}>conexão sc</Text><Text style={styles.footerText}>Diferentes origens. Um lugar em comum.</Text><Text style={styles.footerSmall}>Conteúdo fictício para demonstração do MVP.</Text></View>}
      />
      <Modal visible={selected !== null} animationType="slide" onRequestClose={() => setSelected(null)}>
        <SafeAreaView style={styles.reader}>
          <View style={styles.readerHeader}><Pressable onPress={() => setSelected(null)} accessibilityRole="button" accessibilityLabel="Voltar para as notícias" style={styles.back}><Text style={styles.backText}>← Notícias</Text></Pressable><Text style={styles.readerLabel}>CONEXÃO SC</Text></View>
          {selected && <ScrollView contentContainerStyle={styles.readerContent}>
            <Image source={selected.image} contentFit="cover" style={styles.readerImage} accessibilityLabel="Foto ilustrativa da notícia" />
            <Text style={styles.eyebrow}>{selected.category.toUpperCase()} · {selected.city}</Text>
            <Text style={styles.readerTitle} accessibilityRole="header">{selected.title}</Text>
            <Text style={styles.readerSummary}>{selected.summary}</Text>
            <Text style={styles.meta}>Redação Conexão SC · {selected.readingTime} de leitura</Text>
            <View style={styles.readerNotice}><Text style={styles.disclaimerText}>Notícia fictícia. Pessoas, eventos e iniciativas descritos são exemplos de demonstração.</Text></View>
            <Text style={styles.body}>{selected.body}</Text>
          </ScrollView>}
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F6F5' },
  list: { width: '100%', maxWidth: 640, alignSelf: 'center', paddingHorizontal: 20 },
  welcome: { paddingTop: 28, paddingBottom: 24, gap: 12 },
  eyebrow: { color: '#146D5C', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  heading: { fontSize: 32, lineHeight: 38, fontWeight: '800', color: '#122B32', letterSpacing: -1 },
  green: { color: '#146D5C' },
  intro: { color: '#627478', fontSize: 15, lineHeight: 23 },
  hero: { overflow: 'hidden', borderRadius: 20, backgroundColor: '#113E37' },
  heroImage: { width: '100%', height: 210, backgroundColor: '#CBDCD6' },
  heroCopy: { padding: 22, gap: 14 },
  heroTop: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 12 },
  heroTag: { color: '#133D33', backgroundColor: '#D6EFAD', paddingVertical: 5, paddingHorizontal: 9, borderRadius: 6, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  heroCity: { color: '#C3DBD5', fontSize: 12 },
  heroTitle: { color: '#FFF', fontSize: 25, lineHeight: 32, fontWeight: '700', letterSpacing: -0.4 },
  heroSummary: { color: '#C3DBD5', fontSize: 14, lineHeight: 22 },
  heroBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  heroMeta: { flex: 1, color: '#C3DBD5', fontSize: 10, lineHeight: 16 },
  heroArrow: { color: '#D6EFAD', fontSize: 27 },
  disclaimer: { flexDirection: 'row', gap: 8, alignItems: 'center', marginVertical: 18 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#146D5C' },
  disclaimerText: { color: '#627478', fontSize: 12, lineHeight: 19, flexShrink: 1 },
  filters: { gap: 8, paddingVertical: 6, paddingBottom: 22 },
  chip: { minHeight: 44, paddingHorizontal: 17, justifyContent: 'center', borderRadius: 24, borderWidth: 1, borderColor: '#DCE3E0', backgroundColor: '#FFF' },
  selectedChip: { backgroundColor: '#122B32', borderColor: '#122B32' },
  chipText: { color: '#52676B', fontSize: 13, fontWeight: '600' },
  selectedChipText: { color: '#FFF' },
  sectionHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 18, paddingTop: 8 },
  sectionTitle: { color: '#122B32', fontSize: 25, lineHeight: 34, fontWeight: '700', marginTop: 4 },
  count: { color: '#627478', fontSize: 12 },
  card: { borderRadius: 16, overflow: 'hidden', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E6EAE9', marginBottom: 20 },
  pressed: { opacity: 0.8 },
  cardImage: { width: '100%', height: 184, backgroundColor: '#DCE3E0' },
  cardTag: { position: 'absolute', left: 14, bottom: 14, backgroundColor: '#FFFFFF', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6 },
  cardTagText: { color: '#146D5C', fontSize: 11, fontWeight: '700' },
  cardCopy: { padding: 18, gap: 10 },
  city: { color: '#146D5C', fontSize: 11, fontWeight: '600' },
  cardTitle: { color: '#122B32', fontSize: 20, lineHeight: 27, fontWeight: '700' },
  cardSummary: { color: '#627478', fontSize: 14, lineHeight: 22 },
  cardBottom: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 6 },
  meta: { color: '#738487', fontSize: 11, lineHeight: 18 },
  read: { color: '#146D5C', fontSize: 12, fontWeight: '700' },
  footer: { paddingVertical: 30, borderTopWidth: 1, borderTopColor: '#DCE3E0', gap: 10, marginTop: 10 },
  footerBrand: { color: '#122B32', fontSize: 22, fontWeight: '800' },
  footerText: { color: '#627478', fontSize: 14 },
  footerSmall: { color: '#627478', fontSize: 11 },
  reader: { flex: 1, backgroundColor: '#FFF' },
  readerHeader: { paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E6EAE9' },
  back: { minHeight: 52, justifyContent: 'center', paddingHorizontal: 4 },
  backText: { color: '#146D5C', fontSize: 16, fontWeight: '600' },
  readerLabel: { color: '#627478', fontSize: 10, letterSpacing: 1 },
  readerContent: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 22, gap: 20, paddingBottom: 40 },
  readerImage: { width: '100%', height: 220, borderRadius: 16, backgroundColor: '#DCE3E0' },
  readerTitle: { color: '#122B32', fontSize: 30, lineHeight: 38, fontWeight: '800' },
  readerSummary: { color: '#627478', fontSize: 17, lineHeight: 26 },
  readerNotice: { backgroundColor: '#F0F5F2', padding: 14, borderRadius: 10 },
  body: { color: '#33494E', fontSize: 17, lineHeight: 29 },
});
