import React from 'react';
import { color } from '@styles/theme';
import { Theme } from '@emotion/react';

declare global {
  type ThemeName = 'LIGHT' | 'DARK';
  type DictionaryType = 'ALL' | 'TR' | 'AZ' | 'UZ' | 'KZ' | 'TM' | 'KG';
  type ButtonSize = 'small' | 'medium' | 'big';

  interface ThemeGroup {
    LIGHT: Theme;
    DARK: Theme;
  }

  interface Props {
    children?: React.ReactNode | React.ReactNode[];
  }
}

export {};
