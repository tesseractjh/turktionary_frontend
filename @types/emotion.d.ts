import '@emotion/react';

declare module '@emotion/react' {
  type Color =
    | 'BLACK'
    | 'WHITE'
    | 'BORDER'
    | 'TEAL'
    | 'BEIGE'
    | 'BROWN'
    | 'RED'
    | 'TEAL_DARK'
    | 'BROWN_DARK';

  interface Theme {
    color: Record<Color, string>;
  }
}
