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
import { Radius, type Palette } from '@/constants/theme';
import { useLayout, type Layout } from '@/hooks/use-layout';
import { useLanguage, useTheme } from '@/hooks/use-theme';

type PublicArticle = {
  id: string;
  category: string;
  location: string;
  title: string;
  summary: string;
  body: string;
  date: string;
  image: ImageSource;
  imageCredit: string;
  sourceUrl: string;
  sourceLabel: string;
};

type UPA = {
  id: string;
  name: string;
  address: string;
  phone: string;
  left: `${number}%`;
  top: `${number}%`;
};

const upas: UPA[] = [
  {
    id: 'norte',
    name: 'UPA Norte da Ilha',
    address: 'Rodovia Francisco Faustino Martins, s/n - Canasvieiras',
    phone: '(48) 3261-0624',
    left: '68%',
    top: '18%',
  },
  {
    id: 'continente',
    name: 'UPA Continente',
    address: 'Rua Gualberto Senna, 300 - Jardim Atlântico',
    phone: '(48) 3380-6785',
    left: '28%',
    top: '46%',
  },
  {
    id: 'sul',
    name: 'UPA Sul da Ilha',
    address: 'Avenida Deputado Diomício Freitas, 3393 - Carianos',
    phone: '(48) 3239-1701',
    left: '56%',
    top: '78%',
  },
];

const articles: PublicArticle[] = [
  {
    id: 'concurso-pmf',
    category: 'Concursos públicos',
    location: 'Prefeitura de Florianópolis',
    title: 'Prefeitura abriu concurso para cargos da administração municipal',
    summary: 'O edital do concurso público seleciona profissionais para mais de 45 áreas da cidade.',
    date: 'Edital 025/2025',
    image: require('@/assets/images/news/cidade.jpg'),
    imageCredit: 'Banco de imagens ilustrativo',
    sourceUrl: 'https://2025cppmf.fepese.org.br/',
    sourceLabel: 'Consultar o concurso da PMF',
    body: 'A Prefeitura Municipal de Florianópolis publicou um concurso público destinado ao provimento de cargos e à formação de cadastro reserva no quadro civil da administração municipal. O certame reúne oportunidades em áreas como saúde, educação, assistência social, engenharia, tecnologia e serviços operacionais.\n\nAs vagas foram distribuídas entre diferentes níveis de escolaridade e seguem as regras do edital da FEPESE. Consulte o portal oficial para conferir cargos, requisitos, prazos, salários, resultados e convocação.',
  },
  {
    id: 'processo-pmf',
    category: 'Processos seletivos',
    location: 'Prefeitura de Florianópolis',
    title: 'Processos seletivos 2026 atendem necessidades temporárias da Prefeitura',
    summary: 'A Prefeitura mantém editais temporários para contratação por necessidade excepcional de interesse público.',
    date: 'Editais 001/2026 e 002/2026',
    image: require('@/assets/images/news/trabalho.jpg'),
    imageCredit: 'Banco de imagens ilustrativo',
    sourceUrl: 'https://servicos.floripa.sc.gov.br/atendimento/servico-info/664',
    sourceLabel: 'Ver canais e editais da Prefeitura',
    body: 'Além dos concursos de provimento efetivo, a Prefeitura de Florianópolis divulga processos seletivos temporários para atender necessidades excepcionais de interesse público. Os editais podem envolver contratação por prazo determinado e incluem etapas próprias de inscrição e seleção.\n\nOs candidatos devem verificar vagas, requisitos, prazos, documentos e datas diretamente nos canais oficiais da Prefeitura. Informações antigas ou resultantes de processos já encerrados não devem ser usadas como orientação atual.',
  },
  {
    id: 'upa',
    category: 'Saúde pública',
    location: 'Florianópolis',
    title: 'UPAs atendem urgências em três regiões da cidade',
    summary: 'Conheça as unidades Norte, Sul e Continente e abra o endereço de cada uma no Google Maps.',
    date: 'Atendimento diário, 24 horas',
    image: require('@/assets/images/news/cidade.jpg'),
    imageCredit: 'Banco de imagens ilustrativo',
    sourceUrl: 'https://portal.pmf.sc.gov.br/entidades/saude/index.php?cms=unidades+de+pronto+atendimento',
    sourceLabel: 'Consultar a rede pública de saúde',
    body: 'Florianópolis conta com UPAs que oferecem atendimento público de urgência e emergência pelo Sistema Único de Saúde. As unidades do Norte da Ilha, Sul da Ilha e Continente atendem diariamente, inclusive nos finais de semana e feriados.\n\nA UPA não substitui a emergência em casos graves. Em situações de risco imediato, procure o hospital ou contate o serviço público de emergência. Toque no mapa desta notícia para abrir a localização de cada unidade no Google Maps.',
  },
  {
    id: 'ongs',
    category: 'Organizações sociais',
    location: 'Grande Florianópolis',
    title: 'Organizações da sociedade civil apoiam migrantes e comunidades',
    summary: 'ONGs e coletivos oferecem acolhimento, educação, integração profissional e apoio a direitos.',
    date: 'Informação atualizada',
    image: require('../../images/beira-mar-continental-1024x582.png'),
    imageCredit: 'Imagem fornecida pelo projeto',
    sourceUrl: 'https://circulosdehospitalidade.org/',
    sourceLabel: 'Conhecer a Círculos de Hospitalidade',
    body: 'Organizações sem fins lucrativos fazem parte da rede de acolhimento da Grande Florianópolis. Entre elas estão a Círculos de Hospitalidade e o Instituto Padre Vilson Groh, que apoiam pessoas migrantes, refugiadas, jovens e famílias em situação de vulnerabilidade.\n\nOs serviços podem incluir acolhimento, integração, cursos de português, preparação para o trabalho, orientação comunitária, educação e formação profissional. Os projetos e canais de atendimento podem mudar ao longo do ano; consulte sempre a página oficial da organização antes de procurar atendimento.',
  },
];

export default function PublicLifeScreen() {
  const theme = useTheme();
  const { t } = useLanguage();
  const layout = useLayout();
  const styles = useMemo(() => createStyles(theme, layout), [theme, layout]);
  const [selected, setSelected] = useState<PublicArticle | null>(null);
  const [upaMapVisible, setUpaMapVisible] = useState(false);

  const openInMaps = async (upa: UPA) => {
    await WebBrowser.openBrowserAsync(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${upa.name}, ${upa.address}, Florianópolis, Santa Catarina`)}`
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator>
        <View style={styles.content}>
        <Text style={styles.eyebrow}>{t('publicEyebrow')}</Text>
        <Text style={styles.title} accessibilityRole="header">{t('publicTitle')}</Text>
        <Text style={styles.description}>
          Informações para acompanhar oportunidades públicas, serviços de urgência e organizações de apoio.
        </Text>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>{t('consultOfficial')}</Text>
          <Text style={styles.noticeText}>
            Prazos, vagas e horários podem mudar. Os links levam às fontes públicas correspondentes.
          </Text>
        </View>

        <ResponsiveGrid>
        {articles.map((article) => (
          <Pressable
            key={article.id}
            accessibilityRole="button"
            accessibilityLabel={`Ler notícia: ${article.title}`}
            onPress={() => article.id === 'upa' ? setUpaMapVisible(true) : setSelected(article)}
            style={({ pressed }) => [styles.card, { flexGrow: 1 }, pressed && styles.pressed]}
          >
            <View>
              <Image
                source={article.image}
                style={styles.image}
                contentFit="cover"
                accessibilityLabel={`Foto ilustrativa de ${article.category}`}
              />
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{article.category}</Text>
              </View>
              {article.id === 'upa' && (
                <View style={styles.mapBadge}>
                  <Text style={styles.mapBadgeText}>⌖ {t('viewMap')}</Text>
                </View>
              )}
            </View>
            <View style={styles.cardCopy}>
              <Text style={styles.location}>{article.location}</Text>
              <Text style={styles.cardTitle}>{article.title}</Text>
              <Text style={styles.summary}>{article.summary}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.date}>{article.date}</Text>
                <Text style={styles.read}>{article.id === 'upa' ? 'Abrir mapa →' : 'Ler →'}</Text>
              </View>
            </View>
          </Pressable>
        ))}
        </ResponsiveGrid>
        </View>
        <AppFooter />
      </ScrollView>

      <ArticleSheet
        visible={selected !== null}
        onClose={() => setSelected(null)}
        articleKey={selected?.id}
        backLabel={`← ${t('navPublic')}`}
        closeLabel={t('close')}
        image={selected?.image}
        imageCredit={selected?.imageCredit}
        imageCreditLabel={t('imageCredit')}
        tags={selected ? [selected.category] : []}
        eyebrow={selected ? selected.location.toUpperCase() : undefined}
        title={selected?.title}
        summary={selected?.summary}
        byline="Conexão SC"
        meta={selected?.date}
        body={selected?.body}
        source={selected ? { url: selected.sourceUrl, label: selected.sourceLabel } : undefined}
        relatedTitle={t('keepReading')}
        related={articles.filter((item) => item.id !== selected?.id && item.id !== 'upa').slice(0, 3).map((item) => ({ id: item.id, title: item.title, image: item.image, tag: item.category }))}
        onSelectRelated={(id) => setSelected(articles.find((item) => item.id === id) ?? null)}
      />

      <Modal visible={upaMapVisible} animationType="slide" onRequestClose={() => setUpaMapVisible(false)}>
        <SafeAreaView style={styles.reader}>
          <View style={styles.readerHeader}>
            <Pressable onPress={() => setUpaMapVisible(false)} accessibilityRole="button" accessibilityLabel="Fechar mapa das UPAs" style={styles.backButton}>
              <Text style={styles.backText}>{t('back')}</Text>
            </Pressable>
            <Text style={styles.readerLabel}>{t('locateUpa').toUpperCase()} · FLORIANÓPOLIS</Text>
          </View>
          <ScrollView contentContainerStyle={styles.readerContent}>
            <Text style={styles.readerTitle} accessibilityRole="header">{t('locateUpa')}</Text>
            <Text style={styles.readerSummary}>
              Toque em uma unidade para abrir o endereço no Google Maps.
            </Text>

            <View style={styles.mapCanvas}>
              <Text style={styles.mapNorth}>{t('northIsland')}</Text>
              <Text style={styles.mapSouth}>{t('southIsland')}</Text>
              <View style={[styles.mapRoad, styles.mapRoadOne]} />
              <View style={[styles.mapRoad, styles.mapRoadTwo]} />

              {upas.map((upa) => (
                <View key={upa.id} style={[styles.upaPinWrap, { left: upa.left, top: upa.top }]}>
                  <Pressable
                    accessibilityRole="link"
                    accessibilityLabel={`Abrir ${upa.name} no Google Maps`}
                    onPress={() => openInMaps(upa)}
                    style={styles.upaPin}
                  >
                    <Text style={styles.upaPinText}>UPA</Text>
                  </Pressable>
                  <View style={styles.upaTooltip}>
                    <Text style={styles.upaName}>{upa.name}</Text>
                    <Text style={styles.upaAddress}>{upa.address}</Text>
                    <Text style={styles.upaPhone}>{upa.phone}</Text>
                  </View>
                </View>
              ))}
            </View>

            <Pressable
              accessibilityRole="link"
              onPress={() => WebBrowser.openBrowserAsync('https://www.google.com/maps/search/UPA/@-27.5954,-48.5480,12z')}
              style={styles.sourceButton}
            >
              <Text style={styles.sourceButtonText}>{t('openAllUpas')} ↗</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const createStyles = (c: Palette, l: Layout) => ({
  ...createCommonStyles(c, l),
  ...StyleSheet.create({
    mapCanvas: { height: l.isTablet ? 480 : 420, borderRadius: Radius.lg, overflow: 'hidden', backgroundColor: c.mapLand, borderWidth: 1, borderColor: c.mapLandBorder },
    mapNorth: { position: 'absolute', right: 12, top: 12, color: c.mapLabel, fontSize: 9, fontWeight: '800' },
    mapSouth: { position: 'absolute', right: 12, bottom: 12, color: c.mapLabel, fontSize: 9, fontWeight: '800' },
    mapRoad: { position: 'absolute', height: 8, width: '140%', backgroundColor: c.mapRoad, borderRadius: 4 },
    mapRoadOne: { left: '-20%', top: '32%', transform: [{ rotate: '18deg' }] },
    mapRoadTwo: { left: '-20%', top: '62%', transform: [{ rotate: '-14deg' }] },
    upaPinWrap: { position: 'absolute', alignItems: 'center', width: 210, marginLeft: -105 },
    upaPin: { width: 52, height: 52, borderRadius: 26, backgroundColor: c.danger, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: c.surface },
    upaPinText: { color: c.onDanger, fontSize: 11, fontWeight: '900' },
    upaTooltip: { width: 190, marginTop: 6, borderRadius: Radius.md, backgroundColor: c.inverseSurface, padding: 9, alignItems: 'center' },
    upaName: { color: '#FFFFFF', fontSize: 11, fontWeight: '800', textAlign: 'center' },
    upaAddress: { color: '#B9CCDC', fontSize: 9, lineHeight: 13, textAlign: 'center', marginTop: 3 },
    upaPhone: { color: '#F2B8C1', fontSize: 10, marginTop: 3 },
  }),
});
