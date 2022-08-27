import { css, Color, Theme } from '@emotion/react';
import pxToRem from '@utils/pxToRem';

export const flex = (
  justifyContent?: string | null,
  alignItems?: string | null
) => css`
  display: flex;
  justify-content: ${justifyContent ?? 'center'};
  align-items: ${alignItems ?? 'center'};
`;

export const border = (width?: number | string | null, style?: string | null) =>
  `${pxToRem(width ?? 1)} ${style ?? 'solid'}`;
