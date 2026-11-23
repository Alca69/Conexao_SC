import { useWindowDimensions } from 'react-native';

export type Layout = {
  width: number;
  /** >= 768 */
  isTablet: boolean;
  /** >= 1100 */
  isDesktop: boolean;
  /** Largura máxima do conteúdo */
  maxWidth: number;
  /** Padding horizontal da página */
  gutter: number;
  /** Colunas para grades de cartões */
  columns: 1 | 2 | 3;
  /** Largura útil do conteúdo */
  contentWidth: number;
};

export function useLayout(): Layout {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isDesktop = width >= 1100;
  const gutter = isDesktop ? 32 : isTablet ? 28 : width >= 400 ? 20 : 16;
  const maxWidth = isDesktop ? 1120 : isTablet ? 860 : 640;
  const columns: 1 | 2 | 3 = isDesktop ? 3 : isTablet ? 2 : 1;
  const contentWidth = Math.min(width, maxWidth) - gutter * 2;
  return { width, isTablet, isDesktop, maxWidth, gutter, columns, contentWidth };
}
