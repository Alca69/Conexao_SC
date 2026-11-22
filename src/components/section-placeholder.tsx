import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/use-theme';

export function SectionPlaceholder({ title, description, topics }: { title: string; description: string; topics: string[] }) {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.content, { backgroundColor: theme.background }]}>
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

const styles = StyleSheet.create({
  content: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 24, gap: 20, flexGrow: 1, backgroundColor: '#F4F8FA' },
  eyebrow: { color: '#005B96', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  title: { color: '#12304A', fontSize: 32, fontWeight: '800' },
  description: { color: '#587080', fontSize: 16, lineHeight: 25 },
  card: { backgroundColor: '#FFF', borderRadius: 18, padding: 24, gap: 16, borderWidth: 1, borderColor: '#D8E5EC' },
  cardTitle: { color: '#12304A', fontSize: 21, fontWeight: '700' },
  copy: { color: '#587080', fontSize: 15, lineHeight: 23 },
  topic: { color: '#245675', fontSize: 16, lineHeight: 24 },
  link: { color: '#005B96', fontSize: 16, fontWeight: '700', paddingVertical: 16 },
});
