import { Image } from 'expo-image';
import type { ImageSource } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const [selected, setSelected] = useState<PublicArticle | null>(null);
  const [upaMapVisible, setUpaMapVisible] = useState(false);

  const openInMaps = async (upa: UPA) => {
    await WebBrowser.openBrowserAsync(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${upa.name}, ${upa.address}, Florianópolis, Santa Catarina`)}`
    );
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { backgroundColor: theme.background }]} showsVerticalScrollIndicator>
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

        {articles.map((article) => (
          <Pressable
            key={article.id}
            accessibilityRole="button"
            accessibilityLabel={`Ler notícia: ${article.title}`}
            onPress={() => article.id === 'upa' ? setUpaMapVisible(true) : setSelected(article)}
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
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
      </ScrollView>

      <Modal visible={selected !== null} animationType="slide" onRequestClose={() => setSelected(null)}>
        <SafeAreaView style={styles.reader}>
          <View style={styles.readerHeader}>
            <Pressable onPress={() => setSelected(null)} accessibilityRole="button" accessibilityLabel="Voltar para Vida pública" style={styles.backButton}>
              <Text style={styles.backText}>← {t('navPublic')}</Text>
            </Pressable>
            <Text style={styles.readerLabel}>CONEXÃO SC</Text>
          </View>
          {selected && (
            <ScrollView contentContainerStyle={styles.readerContent}>
              <Image source={selected.image} style={styles.readerImage} contentFit="cover" accessibilityLabel="Foto ilustrativa da notícia" />
              <Text style={styles.imageCredit}>{t('imageCredit')}: {selected.imageCredit}</Text>
              <Text style={styles.eyebrow}>{selected.category.toUpperCase()} · {selected.location}</Text>
              <Text style={styles.readerTitle} accessibilityRole="header">{selected.title}</Text>
              <Text style={styles.readerSummary}>{selected.summary}</Text>
              <Text style={styles.readerDate}>{selected.date}</Text>
              <Text style={styles.body}>{selected.body}</Text>
              <Pressable
                accessibilityRole="link"
                onPress={() => WebBrowser.openBrowserAsync(selected.sourceUrl)}
                style={styles.sourceButton}
              >
                <Text style={styles.sourceButtonText}>{selected.sourceLabel} ↗</Text>
              </Pressable>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>

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

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F8FA' },
  content: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 24, paddingBottom: 40, gap: 16 },
  eyebrow: { color: '#005B96', fontSize: 10, lineHeight: 16, fontWeight: '800', letterSpacing: 1.2 },
  title: { color: '#12304A', fontSize: 32, lineHeight: 38, fontWeight: '800' },
  description: { color: '#587080', fontSize: 16, lineHeight: 25 },
  notice: { backgroundColor: '#FFF5D9', borderRadius: 12, padding: 14, gap: 4 },
  noticeTitle: { color: '#665B36', fontSize: 13, fontWeight: '800' },
  noticeText: { color: '#665B36', fontSize: 13, lineHeight: 20 },
  card: { overflow: 'hidden', borderRadius: 18, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#D8E5EC' },
  pressed: { opacity: 0.82 },
  image: { width: '100%', height: 190, backgroundColor: '#DCEFF7' },
  categoryBadge: { position: 'absolute', left: 14, bottom: 14, backgroundColor: '#FFF', borderRadius: 7, paddingHorizontal: 10, paddingVertical: 7 },
  categoryText: { color: '#005B96', fontSize: 11, fontWeight: '800' },
  mapBadge: { position: 'absolute', right: 14, top: 14, backgroundColor: '#005B96', borderRadius: 20, paddingHorizontal: 12, minHeight: 36, justifyContent: 'center' },
  mapBadgeText: { color: '#FFF', fontSize: 11, fontWeight: '800' },
  cardCopy: { padding: 18, gap: 9 },
  location: { color: '#005B96', fontSize: 11, fontWeight: '700' },
  cardTitle: { color: '#12304A', fontSize: 20, lineHeight: 27, fontWeight: '800' },
  summary: { color: '#587080', fontSize: 14, lineHeight: 22 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 3 },
  date: { flex: 1, color: '#587080', fontSize: 11, lineHeight: 18 },
  read: { color: '#005B96', fontSize: 12, fontWeight: '800' },
  reader: { flex: 1, backgroundColor: '#FFF' },
  readerHeader: { minHeight: 60, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#D8E5EC' },
  backButton: { minHeight: 44, justifyContent: 'center' },
  backText: { color: '#005B96', fontSize: 16, fontWeight: '700' },
  readerLabel: { color: '#587080', fontSize: 10, letterSpacing: 1 },
  readerContent: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 22, paddingBottom: 40, gap: 16 },
  readerImage: { width: '100%', height: 220, borderRadius: 16, backgroundColor: '#DCEFF7' },
  imageCredit: { color: '#587080', fontSize: 10, lineHeight: 16 },
  readerTitle: { color: '#12304A', fontSize: 30, lineHeight: 38, fontWeight: '800' },
  readerSummary: { color: '#587080', fontSize: 17, lineHeight: 26 },
  readerDate: { color: '#587080', fontSize: 12 },
  body: { color: '#245675', fontSize: 17, lineHeight: 29 },
  sourceButton: { minHeight: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#005B96', paddingHorizontal: 16 },
  sourceButtonText: { color: '#FFF', fontSize: 14, fontWeight: '800', textAlign: 'center' },
  mapCanvas: { height: 420, borderRadius: 18, overflow: 'hidden', backgroundColor: '#DCEFF7', borderWidth: 1, borderColor: '#B9D2E0' },
  mapNorth: { position: 'absolute', right: 12, top: 12, color: '#587080', fontSize: 9, fontWeight: '800' },
  mapSouth: { position: 'absolute', right: 12, bottom: 12, color: '#587080', fontSize: 9, fontWeight: '800' },
  mapRoad: { position: 'absolute', height: 8, width: '140%', backgroundColor: '#FFFFFF', borderRadius: 4 },
  mapRoadOne: { left: '-20%', top: '32%', transform: [{ rotate: '18deg' }] },
  mapRoadTwo: { left: '-20%', top: '62%', transform: [{ rotate: '-14deg' }] },
  upaPinWrap: { position: 'absolute', alignItems: 'center', width: 210, marginLeft: -105 },
  upaPin: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#C6283D', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#FFF' },
  upaPinText: { color: '#FFF', fontSize: 11, fontWeight: '900' },
  upaTooltip: { width: 190, marginTop: 6, borderRadius: 10, backgroundColor: '#12304A', padding: 9, alignItems: 'center' },
  upaName: { color: '#FFF', fontSize: 11, fontWeight: '800', textAlign: 'center' },
  upaAddress: { color: '#B9D2E0', fontSize: 9, lineHeight: 13, textAlign: 'center', marginTop: 3 },
  upaPhone: { color: '#E8B9C1', fontSize: 10, marginTop: 3 },
});
