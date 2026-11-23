import { Link } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { elevation, Fonts, Radius } from '@/constants/theme';
import { useLayout } from '@/hooks/use-layout';
import { useTheme } from '@/hooks/use-theme';

export function SectionPlaceholder({ title, description, topics }: { title: string; description: string; topics: string[] }) {
  const c = useTheme();
  const l = useLayout();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: l.gutter, paddingTop: 32, gap: 20, flexGrow: 1 },
        eyebrow: { color: c.accent, fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
        title: { fontFamily: Fonts.serif, color: c.text, fontSize: l.isTablet ? 38 : 30, fontWeight: '800', letterSpacing: -0.8 },
        description: { color: c.textSecondary, fontSize: 16, lineHeight: 25 },
        card: { backgroundColor: c.surface, borderRadius: Radius.lg, padding: 24, gap: 14, borderWidth: 1, borderColor: c.border, ...elevation(c, 1) },
        cardTitle: { color: c.text, fontSize: 20, fontWeight: '800' },
        copy: { color: c.textSecondary, fontSize: 15, lineHeight: 23 },
        topic: { color: c.text, fontSize: 16, lineHeight: 24 },
        link: { color: c.accent, fontSize: 16, fontWeight: '700', paddingVertical: 16 },
      }),
    [c, l.gutter, l.isTablet]
  );

  return (
    <ScrollView style={{ backgroundColor: c.background }} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>CONEXÃO SC · INFORMAÇÃO QUE ACOLHE</Text>
      <Text style={styles.title} accessibilityRole="header">{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Em breve por aqui</Text>
        <Text style={styles.copy}>Esta seção está em preparação. Confira os assuntos previstos:</Text>
        {topics.map((topic) => <Text key={topic} style={styles.topic}>• {topic}</Text>)}
      </View>
      <Link href="/" style={styles.link}>← Voltar para as notícias</Link>
    </ScrollView>
  );
}
