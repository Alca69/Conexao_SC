import { useMemo, useRef, useState, type ComponentRef, type PropsWithChildren } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { elevation, type Palette } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Carrossel horizontal de chips com setas de navegação (úteis com mouse) e
 * indicação de rolagem nas bordas. No celular continua funcionando por arraste.
 */
export function ChipScroller({ children, gap = 8, label }: PropsWithChildren<{ gap?: number; label?: string }>) {
  const c = useTheme();
  const styles = useMemo(() => createStyles(c), [c]);
  const ref = useRef<ComponentRef<typeof ScrollView>>(null);
  const [x, setX] = useState(0);
  const [viewW, setViewW] = useState(0);
  const [contentW, setContentW] = useState(0);

  const canLeft = x > 4;
  const canRight = contentW - viewW - x > 4;

  const scrollBy = (direction: 1 | -1) => {
    const target = Math.max(0, Math.min(contentW - viewW, x + direction * Math.max(160, viewW * 0.7)));
    ref.current?.scrollTo({ x: target, animated: true });
  };

  return (
    <View style={styles.wrap} onLayout={(e) => setViewW(e.nativeEvent.layout.width)} accessibilityLabel={label}>
      <ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e) => setX(e.nativeEvent.contentOffset.x)}
        onContentSizeChange={(w) => setContentW(w)}
        contentContainerStyle={{ gap, paddingVertical: 6, paddingHorizontal: 2 }}
      >
        {children}
      </ScrollView>
      {canLeft && (
        <Pressable accessibilityRole="button" accessibilityLabel="Rolar para a esquerda" onPress={() => scrollBy(-1)} style={({ pressed }) => [styles.arrow, styles.arrowLeft, pressed && styles.pressed]}>
          <Text style={styles.arrowText}>‹</Text>
        </Pressable>
      )}
      {canRight && (
        <Pressable accessibilityRole="button" accessibilityLabel="Rolar para a direita" onPress={() => scrollBy(1)} style={({ pressed }) => [styles.arrow, styles.arrowRight, pressed && styles.pressed]}>
          <Text style={styles.arrowText}>›</Text>
        </Pressable>
      )}
    </View>
  );
}

const createStyles = (c: Palette) =>
  StyleSheet.create({
    wrap: { width: '100%', position: 'relative', justifyContent: 'center' },
    arrow: { position: 'absolute', top: '50%', marginTop: -18, width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surfaceRaised, borderWidth: 1, borderColor: c.borderStrong, ...elevation(c, 1) },
    arrowLeft: { left: 0 },
    arrowRight: { right: 0 },
    arrowText: { color: c.text, fontSize: 24, lineHeight: 26, fontWeight: '600' },
    pressed: { opacity: 0.7 },
  });
