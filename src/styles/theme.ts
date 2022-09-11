import { Size } from '@emotion/react';
import pxToRem from '@utils/pxToRem';

export const lightColor = {
  BLACK: '#000000',
  WHITE: '#ffffff',
  BORDER: '#e6e6e6',
  TEAL: '#cee5d0',
  BEIGE: '#f3f0d7',
  BROWN: '#e0c097',
  RED: '#ff7878',
  GOOGLE_BLACK: '#0000008a',
  KAKAO_BLACK: '#000000d9',
  KAKAO_YELLOW: '#fee500',
  TEAL_DARK: '#5ca862',
  BROWN_DARK: '#ad7833'
};

export const darkColor = {
  BLACK: '#000000',
  WHITE: '#ffffff',
  BORDER: '#e6e6e6',
  TEAL: '#cee5d0',
  BEIGE: '#f3f0d7',
  BROWN: '#e0c097',
  RED: '#ff7878',
  GOOGLE_BLACK: '#0000008a',
  KAKAO_BLACK: '#000000d9',
  KAKAO_YELLOW: '#fee500',
  TEAL_DARK: '#5ca862',
  BROWN_DARK: '#ad7833'
};

export const fontSize: Record<Size, string> & {
  custom: (size: Size, variation: number, multiply?: boolean) => string;
} = {
  xs: pxToRem(14),
  sm: pxToRem(16),
  md: pxToRem(20),
  lg: pxToRem(28),
  xl: pxToRem(36),
  custom(size: Size, variation: number, multiply?: boolean) {
    const originalSize = Number(this[size].slice(0, -3));
    const variationSize = Number(pxToRem(variation).slice(0, -3));
    return `${
      multiply ? originalSize * variation : originalSize + variationSize
    }rem`;
  }
};

const lightTheme = {
  color: lightColor,
  fontSize
};

const darkTheme = {
  color: darkColor,
  fontSize
};

const themeGroup: ThemeGroup = {
  LIGHT: lightTheme,
  DARK: darkTheme
};

export default themeGroup;
