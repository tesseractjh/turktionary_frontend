import '@emotion/react';
import { lightColor } from '@styles/theme';

declare module '@emotion/react' {
  type Color = typeof lightColor;

  interface Theme {
    color: Color;
  }
}
