import { Link } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppFooter } from '@/components/app-footer';
import { elevation, Fonts, Radius } from '@/constants/theme';
import { useLayout } from '@/hooks/use-layout';
import { useTheme } from '@/hooks/use-theme';

const sections = [
  {
    title: 'Quem somos',
    text: 'O Conexão SC é um projeto de comunicação que reúne, em um só lugar, notícias e orientações úteis para imigrantes que vivem em Santa Catarina: documentação, moradia, finanças, trabalho, educação e vida em comunidade. Nossa missão é oferecer informação clara, acessível e em mais de um idioma.',
  },
  {
    title: 'Compromisso editorial',
    text: 'Buscamos linguagem simples, fontes identificadas e foco no dia a dia de quem chegou há pouco ao estado. Quando uma informação depender de prazos ou regras oficiais, indicamos a fonte para consulta. Não substituímos o atendimento de órgãos públicos nem aconselhamento jurídico.',
  },
  {
    title: 'Política de correções',
    text: 'Erros serão corrigidos de forma visível, com indicação da alteração e da data. Para solicitar uma correção, entre em contato pelos canais abaixo informando a matéria e o trecho em questão.',
  },
  {
    title: 'Privacidade',
    text: 'Esta versão do aplicativo é somente para leitura: não há login, cadastro nem coleta de dados pessoais. Ao abrir links externos, valem as políticas dos sites visitados.',
  },
];

export default function AboutScreen() {
  const c = useTheme();
  const l = useLayout();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        content: { width: '100%', maxWidth: 760, alignSelf: 'center', paddingHorizontal: l.gutter, paddingTop: l.isTablet ? 44 : 28, paddingBottom: 56, gap: 20 },
        eyebrow: { color: c.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
        title: { fontFamily: Fonts.serif, color: c.text, fontSize: l.isTablet ? 40 : 30, fontWeight: '800', letterSpacing: -0.8 },
        demo: { backgroundColor: c.warningBg, borderColor: c.warningBorder, borderWidth: 1, borderRadius: Radius.md, padding: 14 },
        demoText: { color: c.warningText, fontSize: 13, lineHeight: 20 },
        section: { gap: 8, paddingTop: 18, borderTopWidth: 1, borderTopColor: c.border },
        sectionTitle: { fontFamily: Fonts.serif, color: c.text, fontSize: 22, fontWeight: '800', letterSpacing: -0.3 },
        text: { fontFamily: Fonts.serif, color: c.text, fontSize: 16, lineHeight: 27 },
        masthead: { backgroundColor: c.surface, borderRadius: Radius.lg, borderWidth: 1, borderColor: c.border, padding: 20, gap: 10, ...elevation(c, 1) },
        row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' },
        rowLabel: { color: c.textMuted, fontSize: 12, fontWeight: '700', letterSpacing: 0.6 },
        rowValue: { color: c.text, fontSize: 14, fontWeight: '600' },
        link: { color: c.accent, fontSize: 16, fontWeight: '700', paddingVertical: 8 },
      }),
    [c, l.gutter, l.isTablet]
  );

  return (
    <ScrollView style={{ backgroundColor: c.background }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.content}>
      <Text style={styles.eyebrow}>CONEXÃO SC · INSTITUCIONAL</Text>
      <Text style={styles.title} accessibilityRole="header">Sobre e expediente</Text>
      <View style={styles.demo}>
        <Text style={styles.demoText}>
          Esta é uma versão de demonstração (MVP). As notícias das páginas principais são fictícias e as fotos são ilustrativas; autores, nomes e horários exibidos são exemplos.
        </Text>
      </View>

      {sections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">{section.title}</Text>
          <Text style={styles.text}>{section.text}</Text>
        </View>
      ))}

      <View style={styles.masthead}>
        <Text style={styles.sectionTitle} accessibilityRole="header">Expediente</Text>
        <View style={styles.row}><Text style={styles.rowLabel}>PROJETO</Text><Text style={styles.rowValue}>Conexão SC</Text></View>
        <View style={styles.row}><Text style={styles.rowLabel}>EDIÇÃO</Text><Text style={styles.rowValue}>Digital · Santa Catarina</Text></View>
        <View style={styles.row}><Text style={styles.rowLabel}>IDIOMAS</Text><Text style={styles.rowValue}>Português, Español, English</Text></View>
        <View style={styles.row}><Text style={styles.rowLabel}>CONTATO</Text><Text style={styles.rowValue}>contato@conexaosc.example</Text></View>
      </View>

      <Link href="/" style={styles.link}>← Voltar para as notícias</Link>
      </View>
      <AppFooter />
    </ScrollView>
  );
}
