import { Children, type PropsWithChildren } from 'react';
import { View } from 'react-native';

import { useLayout } from '@/hooks/use-layout';

/** Grade responsiva: 1 coluna no celular, 2 no tablet e 3 no desktop. */
export function ResponsiveGrid({ children, gap = 16, columns }: PropsWithChildren<{ gap?: number; columns?: number }>) {
  const layout = useLayout();
  const cols = columns ?? layout.columns;
  const itemWidth = cols === 1 ? layout.contentWidth : Math.floor((layout.contentWidth - gap * (cols - 1)) / cols);

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap, width: '100%' }}>
      {Children.toArray(children).map((child, index) => (
        <View key={index} style={{ width: itemWidth }}>{child}</View>
      ))}
    </View>
  );
}
