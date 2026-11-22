import { Image } from 'expo-image';
import type { ImageSource } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage, useTheme } from '@/hooks/use-theme';

type HousingItem = {
  id: string;
  kind: 'Notícia' | 'Oferta';
  title: string;
  summary: string;
  neighborhood: string;
  details: string;
  image: ImageSource;
  latitude?: number;
  longitude?: number;
};

const items: HousingItem[] = [
  {
    id: 'planejamento-moradia',
    kind: 'Notícia',
    title: 'Como planejar a mudança para um bairro em Florianópolis',
    summary: 'Um guia ilustrativo para comparar transporte, comércio, acesso a serviços e rotina de diferentes regiões da cidade.',
    neighborhood: 'Florianópolis',
    details: 'Conteúdo fictício de demonstração',
    image: require('@/assets/images/news/moradia.jpg'),
  },
  {
    id: 'adaptacao-ilha',
    kind: 'Notícia',
    title: 'Moradores contam como foi encontrar um novo lar na Ilha',
    summary: 'Relatos imaginários sobre adaptação a novos bairros, deslocamentos e convivência com vizinhos.',
    neighborhood: 'Centro',
    details: 'Conteúdo fictício de demonstração',
    image: require('@/assets/images/news/comunidade.jpg'),
  },
  {
    id: 'kitnet-trindade',
    kind: 'Oferta',
    title: 'Kitnet mobiliada para demonstração',
    summary: 'Opção ilustrativa próxima à região universitária, com mobiliário básico e transporte nas proximidades.',
    neighborhood: 'Trindade',
    details: 'Imóvel fictício · R$ 1.800/mês',
    image: require('@/assets/images/news/cidade.jpg'),
    latitude: -27.5996,
    longitude: -48.5218,
  },
  {
    id: 'apartamento-campeche',
    kind: 'Oferta',
    title: 'Apartamento de 2 quartos em Campeche',
    summary: 'Residência de exemplo a poucos minutos de mercados e da praia, indicada para famílias.',
    neighborhood: 'Campeche',
    details: 'Imóvel fictício · R$ 2.900/mês',
    image: require('@/assets/images/news/moradia.jpg'),
    latitude: -27.6698,
    longitude: -48.4905,
  },
  {
    id: 'quarto-saco-dos-limões',
    kind: 'Oferta',
    title: 'Quarto compartilhado no Saco dos Limões',
    summary: 'Oferta simulada em área residencial com fácil acesso ao centro e ao transporte público.',
    neighborhood: 'Saco dos Limões',
    details: 'Imóvel fictício · R$ 950/mês',
    image: require('@/assets/images/news/comunidade.jpg'),
    latitude: -27.6042,
    longitude: -48.5083,
  },
];

const weekdays = [
  { short: 'Dom', name: 'Domingo' },
  { short: 'Seg', name: 'Segunda-feira' },
  { short: 'Ter', name: 'Terça-feira' },
  { short: 'Qua', name: 'Quarta-feira' },
  { short: 'Qui', name: 'Quinta-feira' },
  { short: 'Sex', name: 'Sexta-feira' },
  { short: 'Sáb', name: 'Sábado' },
];

const weekdayImages: ImageSource[] = [
  require('@/assets/images/news/comunidade.jpg'),
  require('@/assets/images/news/trabalho.jpg'),
  require('@/assets/images/news/moradia.jpg'),
  require('@/assets/images/news/educacao.jpg'),
  require('@/assets/images/news/cultura.jpg'),
  require('@/assets/images/news/cidade.jpg'),
  require('@/assets/images/news/comunidade.jpg'),
];

const promotionsByDay = [
  { title: 'Frutas e padaria', items: 'Bananas, tomates e pães com até 30% de desconto.' },
  { title: 'Hortifruti', items: 'Legumes da feira e verduras frescas em oferta.' },
  { title: 'Carnes e congelados', items: 'Cortes selecionados e itens congelados com preços especiais.' },
  { title: 'Mercearia', items: 'Arroz, feijão, café e leite em promoções por tempo limitado.' },
  { title: 'Limpeza e cuidados', items: 'Produtos de limpeza e higiene pessoal em combinação.' },
  { title: 'Cesta do fim de semana', items: 'Queijos, frios e bebidas para o final de semana.' },
  { title: 'Padaria e lanches', items: 'Pães, bolos e lanches preparados em promoção.' },
];

type Supermarket = {
  id: string;
  name: string;
  neighborhood: string;
  promotions: string;
  url: string;
  left: `${number}%`;
  top: `${number}%`;
};

const supermarkets: Supermarket[] = [
  {
    id: 'angeloni',
    name: 'Angeloni',
    neighborhood: 'Centro',
    promotions: 'Hortifruti, carnes e padaria',
    url: 'https://www.angeloni.com.br/',
    left: '46%',
    top: '30%',
  },
  {
    id: 'imperatriz',
    name: 'Imperatriz',
    neighborhood: 'Trindade',
    promotions: 'Cesta básica e congelados',
    url: 'https://www.imperatriz.com.br/',
    left: '59%',
    top: '40%',
  },
  {
    id: 'fort',
    name: 'Fort Atacadista',
    neighborhood: 'Estreito',
    promotions: 'Limpeza, bebidas e atacado',
    url: 'https://www.fortatacadista.com.br/',
    left: '38%',
    top: '58%',
  },
  {
    id: 'carrefour',
    name: 'Carrefour',
    neighborhood: 'Beira-Mar',
    promotions: 'Mercearia e eletrônicos',
    url: 'https://www.carrefour.com.br/',
    left: '64%',
    top: '23%',
  },
  {
    id: 'big',
    name: 'BIG',
    neighborhood: 'Estreito',
    promotions: 'Produtos frescos e ofertas semanais',
    url: 'https://www.big.com.br/',
    left: '28%',
    top: '46%',
  },
];

export default function FinancesAndHousingScreen() {
  const theme = useTheme();
  const { t } = useLanguage();
  const today = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(today);
  const [promotionMapVisible, setPromotionMapVisible] = useState(false);
  const [hoveredStore, setHoveredStore] = useState<string | null>(null);

  const openMap = async (item: HousingItem) => {
    const query = item.latitude && item.longitude
      ? `${item.latitude},${item.longitude}`
      : `${item.neighborhood}, Florianópolis, Santa Catarina`;

    await WebBrowser.openBrowserAsync(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
    );
  };

  const openStore = async (store: Supermarket) => {
    await WebBrowser.openBrowserAsync(store.url);
  };

  const promotion = promotionsByDay[selectedDay];

  return (
    <>
    <ScrollView contentContainerStyle={[styles.content, { backgroundColor: theme.background }]}>
      <Text style={styles.eyebrow}>{t('housingEyebrow')}</Text>
      <Text style={styles.title} accessibilityRole="header">{t('housingTitle')}</Text>
      <Text style={styles.description}>
        Notícias e opções ilustrativas para conhecer bairros e planejar uma mudança na capital.
      </Text>
      <View style={styles.notice}>
        <Text style={styles.noticeText}>
          Todas as informações e ofertas desta página são fictícias e não representam imóveis disponíveis.
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ver promoções de supermercados de ${weekdays[selectedDay].name}`}
        onPress={() => setPromotionMapVisible(true)}
        style={styles.promotionCard}
      >
        <View>
          <Image
            source={weekdayImages[selectedDay]}
            style={styles.image}
            contentFit="cover"
            accessibilityLabel={`Imagem das promoções de ${weekdays[selectedDay].name}`}
          />
          <View style={styles.kind}>
            <Text style={styles.kindText}>{t('weeklyDeals')}</Text>
          </View>
          <View style={styles.mapButton}>
            <Text style={styles.mapButtonIcon}>⌖</Text>
            <Text style={styles.mapButtonText}>{t('viewMapShort')}</Text>
          </View>
        </View>
        <View style={styles.cardCopy}>
          <Text style={styles.neighborhood}>
            Florianópolis · {selectedDay === today ? 'Hoje' : weekdays[selectedDay].name}
          </Text>
          <Text style={styles.cardTitle}>{t('supermarketDeals')}</Text>
          <Text style={styles.summary}>{promotion.title}: {promotion.items}</Text>
          <Text style={styles.details}>{t('locateMarkets')}</Text>
        </View>
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weekdays}
      >
        {weekdays.map((day, index) => (
          <Pressable
            key={day.name}
            accessibilityRole="button"
            accessibilityState={{ selected: selectedDay === index }}
            onPress={() => setSelectedDay(index)}
            style={[styles.dayChip, selectedDay === index && styles.selectedDayChip]}
          >
            <Text style={[styles.dayChipText, selectedDay === index && styles.selectedDayChipText]}>
              {day.short}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <View>
            <Image
              source={item.image}
              style={styles.image}
              contentFit="cover"
              accessibilityLabel={`Foto ilustrativa de ${item.neighborhood}`}
            />
            <View style={styles.kind}>
              <Text style={styles.kindText}>{item.kind}</Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Abrir mapa de ${item.neighborhood}`}
              onPress={() => openMap(item)}
              style={styles.mapButton}
            >
              <Text style={styles.mapButtonIcon}>⌖</Text>
              <Text style={styles.mapButtonText}>{t('map')}</Text>
            </Pressable>
          </View>
          <View style={styles.cardCopy}>
            <Text style={styles.neighborhood}>{item.neighborhood} · Florianópolis</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.summary}>{item.summary}</Text>
            <Text style={styles.details}>{item.details}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
      <Modal
        visible={promotionMapVisible}
        animationType="slide"
        onRequestClose={() => setPromotionMapVisible(false)}
      >
        <SafeAreaView style={styles.mapModal}>
          <View style={styles.mapHeader}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fechar mapa de supermercados"
              onPress={() => setPromotionMapVisible(false)}
              style={styles.backButton}
            >
              <Text style={styles.backText}>{t('back')}</Text>
            </Pressable>
            <Text style={styles.mapHeaderTitle}>{t('supermarkets')}</Text>
          </View>

          <ScrollView contentContainerStyle={styles.mapContent}>
            <View style={styles.promotionBanner}>
              <Text style={styles.promotionDay}>{weekdays[selectedDay].name}</Text>
              <Text style={styles.promotionBannerText}>
                {promotion.title}: {promotion.items}
              </Text>
            </View>

            <View style={styles.mapCanvas}>
              <Text style={styles.mapLabelNorth}>{t('northIsland')}</Text>
              <View style={[styles.mapRoad, styles.mapRoadOne]} />
              <View style={[styles.mapRoad, styles.mapRoadTwo]} />
              <View style={[styles.mapRoad, styles.mapRoadThree]} />
              <Text style={styles.mapLabelCenter}>{t('center')}</Text>
              <Text style={styles.mapLabelSouth}>{t('southIsland')}</Text>

              {supermarkets.map((store) => (
                <View key={store.id} style={[styles.storePinWrap, { left: store.left, top: store.top }]}>
                  {hoveredStore === store.id && (
                    <View style={styles.storeTooltip}>
                      <Text style={styles.storeTooltipTitle}>{store.name}</Text>
                      <Text style={styles.storeTooltipText}>{store.neighborhood}</Text>
                      <Text style={styles.storeTooltipPromo}>{store.promotions}</Text>
                    </View>
                  )}
                  <Pressable
                    accessibilityRole="link"
                    accessibilityLabel={`Abrir a loja ${store.name}`}
                    onHoverIn={() => setHoveredStore(store.id)}
                    onHoverOut={() => setHoveredStore(null)}
                    onPress={() => openStore(store)}
                    style={({ pressed }) => [styles.storePin, pressed && styles.storePinPressed]}
                  >
                    <Text style={styles.storePinText}>S</Text>
                  </Pressable>
                </View>
              ))}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  'https://www.google.com/maps/search/supermercados/@-27.5954,-48.5480,12z'
                )
              }
              style={styles.googleMapsButton}
            >
              <Text style={styles.googleMapsButtonText}>{t('openFullMap')}</Text>
            </Pressable>

            <Text style={styles.mapDisclaimer}>
              Supermercados e promoções são exemplos ilustrativos. Consulte a loja antes de comprar.
            </Text>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    padding: 24,
    paddingBottom: 40,
    gap: 16,
    backgroundColor: '#F4F8FA',
  },
  eyebrow: { color: '#005B96', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  title: { color: '#12304A', fontSize: 32, lineHeight: 38, fontWeight: '800' },
  description: { color: '#587080', fontSize: 16, lineHeight: 25 },
  notice: { backgroundColor: '#FFF5D9', borderRadius: 12, padding: 14 },
  noticeText: { color: '#665B36', fontSize: 13, lineHeight: 20 },
  promotionCard: {
    overflow: 'hidden',
    borderRadius: 18,
    backgroundColor: '#E8F2F7',
    borderWidth: 2,
    borderColor: '#005B96',
  },
  weekdays: { gap: 8, paddingVertical: 2 },
  dayChip: {
    minWidth: 48,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#D8E5EC',
    backgroundColor: '#FFF',
  },
  selectedDayChip: { backgroundColor: '#12304A', borderColor: '#12304A' },
  dayChipText: { color: '#587080', fontSize: 13, fontWeight: '700' },
  selectedDayChipText: { color: '#FFF' },
  card: {
    overflow: 'hidden',
    borderRadius: 18,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D8E5EC',
  },
  image: { width: '100%', height: 190, backgroundColor: '#DCEFF7' },
  kind: {
    position: 'absolute',
    left: 14,
    top: 14,
    backgroundColor: '#FFF',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  kindText: { color: '#005B96', fontSize: 11, fontWeight: '800' },
  mapButton: {
    position: 'absolute',
    right: 14,
    top: 14,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#005B96',
    borderRadius: 22,
    paddingHorizontal: 12,
  },
  mapButtonIcon: { color: '#FFF', fontSize: 18, lineHeight: 20 },
  mapButtonText: { color: '#FFF', fontSize: 12, fontWeight: '800' },
  cardCopy: { padding: 18, gap: 9 },
  neighborhood: { color: '#005B96', fontSize: 11, fontWeight: '700' },
  cardTitle: { color: '#12304A', fontSize: 20, lineHeight: 27, fontWeight: '800' },
  summary: { color: '#587080', fontSize: 14, lineHeight: 22 },
  details: { color: '#245675', fontSize: 13, lineHeight: 20, fontWeight: '700', marginTop: 3 },
  mapModal: { flex: 1, backgroundColor: '#F4F8FA' },
  mapHeader: {
    minHeight: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D8E5EC',
    backgroundColor: '#FFF',
  },
  backButton: { minHeight: 44, justifyContent: 'center' },
  backText: { color: '#005B96', fontSize: 15, fontWeight: '700' },
  mapHeaderTitle: { flex: 1, color: '#12304A', fontSize: 16, fontWeight: '800', textAlign: 'right' },
  mapContent: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    padding: 16,
    gap: 14,
  },
  promotionBanner: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D8E5EC',
    padding: 14,
  },
  promotionDay: { color: '#005B96', fontSize: 12, fontWeight: '800', marginBottom: 5 },
  promotionBannerText: { color: '#245675', fontSize: 14, lineHeight: 21 },
  mapCanvas: {
    height: 420,
    overflow: 'hidden',
    borderRadius: 18,
    backgroundColor: '#D7E5D8',
    borderWidth: 1,
    borderColor: '#BCCDBE',
  },
  mapRoad: {
    position: 'absolute',
    height: 8,
    width: '130%',
    backgroundColor: '#F8F1DA',
    borderRadius: 4,
  },
  mapRoadOne: { left: '-15%', top: '32%', transform: [{ rotate: '18deg' }] },
  mapRoadTwo: { left: '-10%', top: '55%', transform: [{ rotate: '-12deg' }] },
  mapRoadThree: { left: '12%', top: '74%', transform: [{ rotate: '32deg' }] },
  mapLabelNorth: {
    position: 'absolute',
    left: 18,
    top: 18,
    color: '#738A77',
    fontSize: 10,
    fontWeight: '800',
  },
  mapLabelCenter: {
    position: 'absolute',
    left: '42%',
    top: '48%',
    color: '#738A77',
    fontSize: 11,
    fontWeight: '800',
  },
  mapLabelSouth: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    color: '#738A77',
    fontSize: 10,
    fontWeight: '800',
  },
  storePinWrap: {
    position: 'absolute',
    alignItems: 'center',
  },
  storePin: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#005B96',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  storePinPressed: { backgroundColor: '#12304A' },
  storePinText: { color: '#FFF', fontSize: 14, fontWeight: '900' },
  storeTooltip: {
    position: 'absolute',
    zIndex: 10,
    bottom: 52,
    width: 210,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#12304A',
  },
  storeTooltipTitle: { color: '#FFF', fontSize: 13, fontWeight: '800' },
  storeTooltipText: { color: '#B9D2E0', fontSize: 11, marginTop: 3 },
  storeTooltipPromo: { color: '#E8B9C1', fontSize: 12, lineHeight: 18, marginTop: 5 },
  googleMapsButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#005B96',
  },
  googleMapsButtonText: { color: '#FFF', fontSize: 14, fontWeight: '800' },
  mapDisclaimer: { color: '#587080', fontSize: 12, lineHeight: 18, textAlign: 'center' },
});
