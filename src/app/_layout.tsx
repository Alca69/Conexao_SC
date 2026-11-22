import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app-header';
import { AppThemeProvider, useTheme } from '@/hooks/use-theme';

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootLayoutContent />
    </AppThemeProvider>
  );
}

function RootLayoutContent() {
  const theme = useTheme();

  return (
    <ThemeProvider value={DefaultTheme}>
      <SafeAreaView style={[styles.screen, { backgroundColor: theme.background }]}>
        <AppHeader />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }}>
          <Stack.Screen name="index" options={{ title: 'Conexão SC | Notícias' }} />
          <Stack.Screen name="financas-moradia" options={{ title: 'Finanças & Moradia' }} />
          <Stack.Screen name="vivencia" options={{ title: 'Vivência' }} />
          <Stack.Screen name="documentacao" options={{ title: 'Vida pública' }} />
          <Stack.Screen name="+not-found" options={{ title: 'Página não encontrada' }} />
        </Stack>
        <StatusBar style={theme.inverseSurface === '#081A2A' ? 'light' : 'dark'} />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#F4F8FA' } });
