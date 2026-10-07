import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export function SectionPlaceholder({ title, description, topics }: { title: string; description: string; topics: string[] }) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
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
  content: { width: '100%', maxWidth: 640, alignSelf: 'center', padding: 24, gap: 20, flexGrow: 1, backgroundColor: '#F4F6F5' },
  eyebrow: { color: '#146D5C', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  title: { color: '#122B32', fontSize: 32, fontWeight: '800' },
  description: { color: '#627478', fontSize: 16, lineHeight: 25 },
  card: { backgroundColor: '#FFF', borderRadius: 18, padding: 24, gap: 16, borderWidth: 1, borderColor: '#E6EAE9' },
  cardTitle: { color: '#122B32', fontSize: 21, fontWeight: '700' },
  copy: { color: '#627478', fontSize: 15, lineHeight: 23 },
  topic: { color: '#33494E', fontSize: 16, lineHeight: 24 },
  link: { color: '#146D5C', fontSize: 16, fontWeight: '700', paddingVertical: 16 },
});
