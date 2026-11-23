import { Image } from 'expo-image';
import type { ImageSource } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppFooter } from '@/components/app-footer';
import { ArticleSheet } from '@/components/article-sheet';
import { ResponsiveGrid } from '@/components/responsive-grid';
import { createCommonStyles } from '@/components/ui/common-styles';
import { elevation, Radius, type Palette } from '@/constants/theme';
import { useLayout, type Layout } from '@/hooks/use-layout';
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

const itemBodies: Record<string, string> = {
  'planejamento-moradia': 'Mudar-se para uma nova cidade começa por entender como cada bairro funciona no dia a dia. Antes de decidir, vale comparar o tempo de deslocamento até o trabalho ou a escola, a oferta de transporte público, a proximidade de mercados, farmácias e unidades de saúde e o custo médio do aluguel.\n\nUma boa prática é visitar a região em horários diferentes, conversar com moradores e consultar mais de uma fonte de anúncios. Este conteúdo é um guia ilustrativo, criado apenas para demonstração.',
  'adaptacao-ilha': 'Relatos imaginários de pessoas que chegaram à Ilha mostram que a adaptação costuma ser mais leve quando há vizinhança acolhedora, informação clara sobre serviços e um primeiro contato com a comunidade local.\n\nGrupos de bairro, associações de moradores e eventos culturais aparecem nessas histórias como boas portas de entrada. O texto é fictício e serve apenas para demonstrar o formato de uma matéria.',
  'kitnet-trindade': 'Oferta ilustrativa de kitnet mobiliada na Trindade, região próxima à universidade, com mobiliário básico e linhas de ônibus nas proximidades. O valor indicado é de R$ 1.800 por mês.\n\nAo analisar uma oferta real, confira o contrato, o valor de condomínio e taxas, a forma de garantia exigida e peça sempre a vistoria do imóvel. Este anúncio é fictício e não representa um imóvel disponível.',
  'apartamento-campeche': 'Apartamento de exemplo com 2 quartos no Campeche, a poucos minutos de mercados e da praia, pensado para famílias. O valor indicado é de R$ 2.900 por mês.\n\nEm anúncios reais, pergunte sobre documentos exigidos de quem aluga, reajuste anual e responsabilidade por reparos. Este anúncio é fictício e não representa um imóvel disponível.',
  'quarto-saco-dos-limões': 'Oferta simulada de quarto compartilhado no Saco dos Limões, em área residencial com acesso ao Centro e ao transporte público. O valor indicado é de R$ 950 por mês.\n\nAo dividir moradia, combine por escrito as regras da casa, a divisão das contas e o que acontece ao encerrar o acordo. Este anúncio é fictício e não representa um imóvel disponível.',
};

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
  const layout = useLayout();
  const styles = useMemo(() => createStyles(theme, layout), [theme, layout]);
  const today = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedItem, setSelectedItem] = useState<HousingItem | null>(null);
  const [promotionMapVisible, setPromotionMapVisible] = useState(false);
  const [hoveredStore, setHoveredStore] = useState<string | null>(null);

  const mapUrl = (item: HousingItem) => {
    const query = item.latitude && item.longitude
      ? `${item.latitude},${item.longitude}`
      : `${item.neighborhood}, Florianópolis, Santa Catarina`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };

  const openMap = async (item: HousingItem) => {
    await WebBrowser.openBrowserAsync(mapUrl(item));
  };

  const openStore = async (store: Supermarket) => {
    await WebBrowser.openBrowserAsync(store.url);
  };

  const promotion = promotionsByDay[selectedDay];

  return (
    <>
    <ScrollView style={{ backgroundColor: theme.background }} contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.content}>
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
        <View style={styles.promotionMediaWrap}>
          <Image
            source={weekdayImages[selectedDay]}
            style={[styles.image, layout.isTablet && { flex: 1, minHeight: 240 }]}
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
        <View style={styles.promotionCopy}>
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

      <ResponsiveGrid>
      {items.map((item) => (
        <View key={item.id} style={[styles.card, { flexGrow: 1 }]}>
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
          </View>
          <View style={styles.cardCopy}>
            <Text style={styles.neighborhood}>{item.neighborhood === 'Florianópolis' ? 'Florianópolis · Santa Catarina' : `${item.neighborhood} · Florianópolis`}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.summary}>{item.summary}</Text>
            <Text style={styles.details}>{item.details}</Text>
          </View>
          {/* Camada clicável do card; o botão Mapa é irmão dela (evita <button> aninhado no web). */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Ler: ${item.title}`}
            onPress={() => setSelectedItem(item)}
            style={({ pressed }) => [StyleSheet.absoluteFill, { zIndex: 1 }, pressed && { backgroundColor: theme.backgroundSelected, opacity: 0.25 }]}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Abrir mapa de ${item.neighborhood}`}
            onPress={() => openMap(item)}
            style={[styles.mapButton, { zIndex: 2 }]}
          >
            <Text style={styles.mapButtonIcon}>⌖</Text>
            <Text style={styles.mapButtonText}>{t('map')}</Text>
          </Pressable>
        </View>
      ))}
      </ResponsiveGrid>
    </View>
    <AppFooter />
    </ScrollView>
      <ArticleSheet
        visible={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        articleKey={selectedItem?.id}
        backLabel={`← ${t('navHousing')}`}
        closeLabel={t('close')}
        image={selectedItem?.image}
        tags={selectedItem ? [selectedItem.kind, selectedItem.neighborhood] : []}
        eyebrow={selectedItem ? `${selectedItem.neighborhood.toUpperCase()} · FLORIANÓPOLIS` : undefined}
        title={selectedItem?.title}
        summary={selectedItem?.summary}
        byline="Conexão SC"
        meta={selectedItem?.details}
        notice={t('readerDisclaimer')}
        body={selectedItem ? itemBodies[selectedItem.id] : undefined}
        source={selectedItem ? { url: mapUrl(selectedItem), label: `⌖ ${t('map')} · ${selectedItem.neighborhood}` } : undefined}
        relatedTitle={t('keepReading')}
        related={items.filter((item) => item.id !== selectedItem?.id).slice(0, 3).map((item) => ({ id: item.id, title: item.title, image: item.image, tag: item.kind }))}
        onSelectRelated={(id) => setSelectedItem(items.find((item) => item.id === id) ?? null)}
      />
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

const createStyles = (c: Palette, l: Layout) => ({
  ...createCommonStyles(c, l),
  ...StyleSheet.create({
    promotionCard: { overflow: 'hidden', borderRadius: Radius.lg, backgroundColor: c.brandSoft, borderWidth: 1.5, borderColor: c.brand, flexDirection: l.isTablet ? 'row' : 'column', ...elevation(c, 1) },
    promotionMediaWrap: { width: l.isTablet ? '45%' : '100%' },
    promotionCopy: { flex: 1, padding: l.isTablet ? 28 : 18, gap: 10, justifyContent: 'center' },
    weekdays: { gap: 8, paddingVertical: 2 },
    dayChip: { minWidth: 52, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: Radius.pill, borderWidth: 1, borderColor: c.border, backgroundColor: c.surface, paddingHorizontal: 14 },
    selectedDayChip: { backgroundColor: c.brand, borderColor: c.brand },
    dayChipText: { color: c.textSecondary, fontSize: 13, fontWeight: '700' },
    selectedDayChipText: { color: c.onBrand },
    kind: { position: 'absolute', left: 14, top: 14, backgroundColor: c.surface, borderRadius: Radius.sm, paddingHorizontal: 10, paddingVertical: 6 },
    kindText: { color: c.accent, fontSize: 11, fontWeight: '800' },
    mapButton: { position: 'absolute', right: 14, top: 14, minHeight: 40, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: c.brand, borderRadius: Radius.pill, paddingHorizontal: 14 },
    mapButtonIcon: { color: c.onBrand, fontSize: 18, lineHeight: 20 },
    mapButtonText: { color: c.onBrand, fontSize: 12, fontWeight: '800' },
    neighborhood: { color: c.accent, fontSize: 11, fontWeight: '700' },
    details: { color: c.text, fontSize: 13, lineHeight: 20, fontWeight: '700', marginTop: 3 },
    mapModal: { flex: 1, backgroundColor: c.background },
    mapHeader: { minHeight: 64, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, borderBottomColor: c.border, backgroundColor: c.surface },
    mapHeaderTitle: { flex: 1, color: c.text, fontSize: 16, fontWeight: '800', textAlign: 'right' },
    mapContent: { width: '100%', maxWidth: 820, alignSelf: 'center', padding: l.isTablet ? 28 : 16, gap: 14 },
    promotionBanner: { backgroundColor: c.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: c.border, padding: 14 },
    promotionDay: { color: c.accent, fontSize: 12, fontWeight: '800', marginBottom: 5 },
    promotionBannerText: { color: c.text, fontSize: 14, lineHeight: 21 },
    mapCanvas: { height: l.isTablet ? 500 : 420, overflow: 'hidden', borderRadius: Radius.lg, backgroundColor: c.mapLand, borderWidth: 1, borderColor: c.mapLandBorder },
    mapRoad: { position: 'absolute', height: 8, width: '130%', backgroundColor: c.mapRoad, borderRadius: 4 },
    mapRoadOne: { left: '-15%', top: '32%', transform: [{ rotate: '18deg' }] },
    mapRoadTwo: { left: '-10%', top: '55%', transform: [{ rotate: '-12deg' }] },
    mapRoadThree: { left: '12%', top: '74%', transform: [{ rotate: '32deg' }] },
    mapLabelNorth: { position: 'absolute', left: 18, top: 18, color: c.mapLabel, fontSize: 10, fontWeight: '800' },
    mapLabelCenter: { position: 'absolute', left: '42%', top: '48%', color: c.mapLabel, fontSize: 11, fontWeight: '800' },
    mapLabelSouth: { position: 'absolute', right: 18, bottom: 18, color: c.mapLabel, fontSize: 10, fontWeight: '800' },
    storePinWrap: { position: 'absolute', alignItems: 'center' },
    storePin: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: c.brand, borderWidth: 3, borderColor: c.surface },
    storePinPressed: { backgroundColor: c.inverseSurface },
    storePinText: { color: c.onBrand, fontSize: 14, fontWeight: '900' },
    storeTooltip: { position: 'absolute', zIndex: 10, bottom: 52, width: 210, borderRadius: Radius.md, padding: 10, backgroundColor: c.inverseSurface },
    storeTooltipTitle: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
    storeTooltipText: { color: '#B9CCDC', fontSize: 11, marginTop: 3 },
    storeTooltipPromo: { color: '#F2B8C1', fontSize: 12, lineHeight: 18, marginTop: 5 },
    googleMapsButton: { minHeight: 50, alignItems: 'center', justifyContent: 'center', borderRadius: Radius.md, backgroundColor: c.brand },
    googleMapsButtonText: { color: c.onBrand, fontSize: 14, fontWeight: '800' },
    mapDisclaimer: { color: c.textMuted, fontSize: 12, lineHeight: 18, textAlign: 'center' },
  }),
});
