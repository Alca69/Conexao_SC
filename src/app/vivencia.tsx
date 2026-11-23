import { Image } from 'expo-image';
import type { ImageSource } from 'expo-image';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { AppFooter } from '@/components/app-footer';
import { ArticleSheet } from '@/components/article-sheet';
import { ResponsiveGrid } from '@/components/responsive-grid';
import { createCommonStyles } from '@/components/ui/common-styles';
import { useLayout } from '@/hooks/use-layout';
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
  const layout = useLayout();
  const styles = useMemo(() => createCommonStyles(theme, layout), [theme, layout]);
  const [selected, setSelected] = useState<LifeArticle | null>(null);

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator>
        <View style={styles.content}>
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

        <ResponsiveGrid>
        {articles.map((article) => (
          <Pressable
            key={article.id}
            accessibilityRole="button"
            accessibilityLabel={`Ler notícia: ${article.title}`}
            onPress={() => setSelected(article)}
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
        </ResponsiveGrid>
        </View>
        <AppFooter />
      </ScrollView>

      <ArticleSheet
        visible={selected !== null}
        onClose={() => setSelected(null)}
        articleKey={selected?.id}
        backLabel={`← ${t('navLife')}`}
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
        source={selected?.sourceUrl ? { url: selected.sourceUrl, label: selected.sourceLabel ?? 'Acessar fonte oficial' } : undefined}
        relatedTitle={t('keepReading')}
        related={articles.filter((item) => item.id !== selected?.id).slice(0, 3).map((item) => ({ id: item.id, title: item.title, image: item.image, tag: item.category }))}
        onSelectRelated={(id) => setSelected(articles.find((item) => item.id === id) ?? null)}
      />
    </View>
  );
}


