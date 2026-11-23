import { router, usePathname } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { elevation, Radius, type Palette } from '@/constants/theme';
import { useLayout } from '@/hooks/use-layout';
import { useLanguage, useTheme } from '@/hooks/use-theme';

/** Largura a partir da qual o destaque fica no próprio cabeçalho (ver app-header). */
export const INLINE_NAV_BREAKPOINT = 1080;

/**
 * Botão flutuante "Regularize-se": em celulares e tablets o cabeçalho só mostra o menu hambúrguer,
 * então a principal ação para quem acabou de chegar fica sempre ao alcance do polegar.
 */
export function LegalizeFab() {
  const c = useTheme();
  const layout = useLayout();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { t } = useLanguage();
  const styles = useMemo(() => createStyles(c), [c]);
  const [dismissed, setDismissed] = useState(false);
  const [enter] = useState(() => new Animated.Value(0));

  const visible = layout.width < INLINE_NAV_BREAKPOINT && pathname !== '/imigracao' && !dismissed;

  useEffect(() => {
    if (!visible) {
      enter.setValue(0);
      return;
    }
    const animation = Animated.timing(enter, { toValue: 1, duration: 420, delay: 900, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [visible, enter]);

  if (!visible) return null;

  return (
    <View pointerEvents="box-none" style={[styles.wrap, { bottom: Math.max(insets.bottom, 12) + 8 }]}>
      <Animated.View style={[styles.pill, { opacity: enter, transform: [{ translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }] }]}>
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`${t('navDocs')}: ${t('navDocsDescription')}`}
          onPress={() => router.navigate('/imigracao')}
          style={({ pressed }) => [styles.main, pressed && { opacity: 0.85 }]}
        >
          <View style={styles.icon}><Text style={styles.iconText}>✓</Text></View>
          <View style={styles.copy}>
            <Text style={styles.title}>{t('navDocs')}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>{t('navDocsDescription')}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel={t('close')} onPress={() => setDismissed(true)} style={styles.dismiss}>
          <Text style={styles.dismissText}>×</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const createStyles = (c: Palette) =>
  StyleSheet.create({
    wrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center', paddingHorizontal: 16, zIndex: 40 },
    pill: { flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: 440, backgroundColor: c.brand, borderRadius: Radius.pill, ...elevation(c, 2) },
    main: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 56, paddingLeft: 10, paddingRight: 8 },
    icon: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
    iconText: { color: c.onBrand, fontSize: 16, fontWeight: '800' },
    copy: { flex: 1 },
    title: { color: c.onBrand, fontSize: 15, fontWeight: '800' },
    subtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 1 },
    arrow: { color: c.onBrand, fontSize: 20, fontWeight: '700' },
    dismiss: { width: 44, height: 56, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: 'rgba(255,255,255,0.25)' },
    dismissText: { color: 'rgba(255,255,255,0.85)', fontSize: 22, lineHeight: 24 },
  });
