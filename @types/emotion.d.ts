import '@emotion/react';
import { lightColor, media, fontSize } from '@styles/theme';

declare module '@emotion/react' {
  type Color = typeof lightColor;
  type Media = typeof media;
  type FontSize = typeof fontSize;
  type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  interface Theme {
    color: Color;
    media: Media;
    fontSize: FontSize;
  }
}
