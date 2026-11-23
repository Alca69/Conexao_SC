import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/app-header';
import { LegalizeFab } from '@/components/legalize-fab';
import { AppThemeProvider, useIsDark, useTheme } from '@/hooks/use-theme';

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootLayoutContent />
    </AppThemeProvider>
  );
}

function RootLayoutContent() {
  const theme = useTheme();
  const isDark = useIsDark();

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={[styles.screen, { backgroundColor: theme.surface }]} edges={['top', 'left', 'right']}>
        <AppHeader />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }}>
          <Stack.Screen name="index" options={{ title: 'Conexão SC | Notícias' }} />
          <Stack.Screen name="imigracao" options={{ title: 'Documentos e regularização' }} />
          <Stack.Screen name="financas-moradia" options={{ title: 'Finanças & Moradia' }} />
          <Stack.Screen name="vivencia" options={{ title: 'Vivência' }} />
          <Stack.Screen name="documentacao" options={{ title: 'Vida pública' }} />
          <Stack.Screen name="sobre" options={{ title: 'Sobre e expediente' }} />
          <Stack.Screen name="+not-found" options={{ title: 'Página não encontrada' }} />
        </Stack>
        <LegalizeFab />
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1 } });
