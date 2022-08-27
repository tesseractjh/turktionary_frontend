import React from 'react';
import { color } from '@styles/theme';
import { Theme } from '@emotion/react';

declare global {
  interface Props {
    children?: React.ReactNode | React.ReactNode[];
  }

  type ThemeName = 'LIGHT' | 'DARK';

  interface ThemeGroup {
    LIGHT: Theme;
    DARK: Theme;
  }

  type DictionaryType = 'ALL' | 'TR' | 'AZ' | 'UZ' | 'KZ' | 'TM' | 'KG';
}

export {};
