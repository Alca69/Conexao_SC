import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

export default function NotFoundScreen() {
  const theme = useTheme();
  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.content}>
        <ThemedText type="subtitle" accessibilityRole="header">Página não encontrada</ThemedText>
        <ThemedText themeColor="textSecondary">
          Este endereço não está disponível no Conexão SC.
        </ThemedText>
        <Link href="/" replace style={[styles.link, { color: theme.accent }]}>Voltar para as notícias</Link>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', padding: 24, gap: 24, width: '100%', maxWidth: 640, alignSelf: 'center' },
  link: { color: '#005B96', fontSize: 16, fontWeight: '700', paddingVertical: 16 },
});
