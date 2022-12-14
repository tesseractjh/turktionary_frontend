import React from 'react';
import { color } from '@styles/theme';
import { Theme } from '@emotion/react';
import LANG from '@constants/language';

declare global {
  type ThemeName = 'LIGHT' | 'DARK';
  type DictionaryType = keyof typeof LANG;
  type ButtonSize = 'small' | 'medium' | 'big';
  type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  type ErrorCode = `${Digit}${Digit}${Digit}`;
  type ErrorResponse = {
    code: ErrorCode;
    message: string;
    redirect?: string;
    clearAccessToken?: boolean;
  };
  type MutationParams = {
    query?: Record<string, any>;
    body?: any;
  };

  interface ThemeGroup {
    LIGHT: Theme;
    DARK: Theme;
  }

  interface Props {
    children?: React.ReactNode | React.ReactNode[];
    className?: string;
  }
}

export {};
