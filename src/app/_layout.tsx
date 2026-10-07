import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app-header';

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <SafeAreaView style={styles.screen}>
        <AppHeader />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F4F6F5' } }}>
          <Stack.Screen name="index" options={{ title: 'Conexão SC | Notícias' }} />
          <Stack.Screen name="financas" options={{ title: 'Finanças' }} />
          <Stack.Screen name="moradia" options={{ title: 'Moradia' }} />
          <Stack.Screen name="documentacao" options={{ title: 'Documentação' }} />
          <Stack.Screen name="+not-found" options={{ title: 'Página não encontrada' }} />
        </Stack>
        <StatusBar style="dark" />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#FFFFFF' } });
