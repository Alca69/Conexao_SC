import { Image } from 'expo-image';
import type { ImageSource } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage, useTheme } from '@/hooks/use-theme';

type LifeArticle = {
  id: string;
  category: string;
  location: string;
  title: string;
  summary: string;
  body: string;
  date: string;
  image: ImageSource;
  imageCredit: string;
  sourceUrl?: string;
  sourceLabel?: string;
};

const articles: LifeArticle[] = [
  {
    id: 'craft-beer',
    category: 'Cultura e gastronomia',
    location: 'Beira-Mar Continental · Florianópolis',
    title: 'Floripa Craft Beer reuniu cervejarias e shows na Grande Florianópolis',
    summary: 'A 8ª edição do festival levou dezenas de rótulos, gastronomia e atividades para toda a família.',
    date: '25 e 26 de outubro de 2025',
    image: require('@/assets/images/news/beira-mar.jpg'),
    imageCredit: 'Eduardo Zmievski / Unsplash',
    sourceUrl: 'https://sctd.com.br/geral/craft-beer-festival-floripa-reune-25-cervejarias-e-250-rotulos-na-beira-mar-continental/',
    sourceLabel: 'Abrir matéria sobre o evento',
    body: 'Em outubro de 2025, a Beira-Mar Continental recebeu a 8ª edição do Floripa Craft Beer. O festival reuniu cervejarias artesanais de Santa Catarina e de outros estados, além de chope, drinks, food trucks e apresentações musicais.\n\nA programação foi pensada para público adulto, mas também incluiu área de lazer, gastronomia e outras atrações familiares. Para quem chegou recentemente a Florianópolis, eventos como este podem ser uma maneira de conhecer a cidade e conversar com moradores de diferentes bairros.',
  },
  {
    id: 'tanabata',
    category: 'Cultura japonesa',
    location: 'Jardim Botânico · Florianópolis',
    title: 'Tanabata Matsuri celebrou cultura japonesa no Jardim Botânico',
    summary: 'Festival gratuito reuniu música, gastronomia, origami, artes marciais e tradições japonesas.',
    date: '11 e 12 de julho de 2026',
    image: require('../../images/Jardim-Botanico-2_SITE-q8oux4mrmlm6ofu1bw8gy3uffo3vnf5tu0cwctaehk.jpg'),
    imageCredit: 'Imagem fornecida pelo projeto',
    sourceUrl: 'https://floripa.com/programe-se/x-tanabata-matsuri-leva-cultura-gastronomia-e-tradicoes-japonesas-ao-jardim-botanico/',
    sourceLabel: 'Consultar a programação',
    body: 'O Tanabata Matsuri levou manifestações da cultura japonesa ao Jardim Botânico de Florianópolis em julho de 2026. A programação incluiu apresentações de taikô, dança, karaokê, artes marciais, cerimônia do chá e oficinas como origami e caligrafia.\n\nA entrada foi gratuita e a proposta acolheu públicos de todas as idades. A história do festival está ligada à lenda japonesa de dois amantes separados pela Via Láctea que se encontram uma vez por ano. É uma oportunidade de conhecer tradições, experimentar culinária e se aproximar da comunidade nipo-catarinense.',
  },
  {
    id: 'idiomas',
    category: 'Educação e idiomas',
    location: 'Florianópolis',
    title: 'Professora de idiomas também ensina português para migrantes',
    summary: 'Aulas personalizadas podem ajudar no trabalho, nos estudos e na adaptação à vida em Santa Catarina.',
    date: 'Informação atualizada em 2026',
    image: require('@/assets/images/news/idiomas.jpg'),
    imageCredit: 'Unsplash',
    sourceUrl: 'https://personnaliteidiomas.com.br/',
    sourceLabel: 'Conhecer a escola de idiomas',
    body: 'Em Florianópolis, escolas de idiomas oferecem aulas personalizadas de inglês, espanhol, francês e português para estrangeiros. Essa combinação permite que migrantes pratiquem o português necessário para transporte, comércio, trabalho e participação na comunidade, ao mesmo tempo em que usam outros idiomas já conhecidos como apoio.\n\nUma professora ou professor pode adaptar o conteúdo aos objetivos de cada pessoa. Entre os temas estão cidadania, entrevistas de emprego, viagens, conversas do dia a dia e preparação para processos acadêmicos ou profissionais.',
  },
  {
    id: 'esportes-ufsc',
    category: 'Esportes e saúde',
    location: 'Centro de Desportos · UFSC',
    title: 'UFSC abriu inscrições para esportes com vagas à comunidade',
    summary: 'A universidade ofereceu basquete, futsal e handebol gratuitos ou com vagas abertas ao público.',
    date: 'Inscrições de 11 a 21 de agosto de 2025',
    image: require('@/assets/images/news/ufsc.jpg'),
    imageCredit: 'Mateus Mendonça / Agecom UFSC',
    sourceUrl: 'https://sesporte.ufsc.br/2025/08/07/inscricoes-para-atividades-esportivas-2025-2-edital-complementar-0052025declsecarte/',
    sourceLabel: 'Consultar o edital da UFSC',
    body: 'Em agosto de 2025, a UFSC divulgou inscrições para atividades esportivas complementares do segundo semestre. Foram oferecidas vagas em basquete feminino e masculino, futsal feminino e handebol feminino e masculino no Centro de Desportos.\n\nAs atividades eram gratuitas e abertas à comunidade interna e externa da universidade. As vagas foram distribuídas conforme o acesso e a finalização das inscrições pelo formulário oficial. Antes de participar de uma nova edição, consulte sempre o edital vigente, os horários e os requisitos.',
  },
];

export default function DailyLifeScreen() {
  const theme = useTheme();
  const { t } = useLanguage();
  const [selected, setSelected] = useState<LifeArticle | null>(null);

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { backgroundColor: theme.background }]} showsVerticalScrollIndicator>
        <Text style={styles.eyebrow}>{t('lifeEyebrow')}</Text>
        <Text style={styles.title} accessibilityRole="header">{t('lifeTitle')}</Text>
        <Text style={styles.description}>
          {t('lifeDescription')}
        </Text>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>{t('checkBefore')}</Text>
          <Text style={styles.noticeText}>
            {t('datesMayChange')}
          </Text>
        </View>

        {articles.map((article) => (
          <Pressable
            key={article.id}
            accessibilityRole="button"
            accessibilityLabel={`Ler notícia: ${article.title}`}
            onPress={() => setSelected(article)}
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
            </View>
            <View style={styles.cardCopy}>
              <Text style={styles.location}>{article.location}</Text>
              <Text style={styles.cardTitle}>{article.title}</Text>
              <Text style={styles.summary}>{article.summary}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.date}>{article.date}</Text>
                <Text style={styles.read}>{t('read')} →</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <Modal visible={selected !== null} animationType="slide" onRequestClose={() => setSelected(null)}>
        <SafeAreaView style={styles.reader}>
          <View style={styles.readerHeader}>
            <Pressable onPress={() => setSelected(null)} accessibilityRole="button" accessibilityLabel="Voltar para Vivência" style={styles.backButton}>
              <Text style={styles.backText}>← {t('navLife')}</Text>
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
              {selected.sourceUrl && (
                <Pressable
                  accessibilityRole="link"
                  onPress={() => selected.sourceUrl && WebBrowser.openBrowserAsync(selected.sourceUrl)}
                  style={styles.sourceButton}
                >
                  <Text style={styles.sourceButtonText}>{selected.sourceLabel ?? 'Acessar fonte oficial'} ↗</Text>
                </Pressable>
              )}
            </ScrollView>
          )}
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
});
