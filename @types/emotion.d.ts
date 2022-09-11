import '@emotion/react';
import { lightColor, media, fontSize } from '@styles/theme';

declare module '@emotion/react' {
  type Color = typeof lightColor;
  type FontSize = typeof fontSize;
  type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  interface Theme {
    color: Color;
    fontSize: FontSize;
  }
}
