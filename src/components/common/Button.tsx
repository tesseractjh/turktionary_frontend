import { Color, Size } from '@emotion/react';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import { MouseEventHandler } from 'react';

type ButtonSize = Size | 'login';

interface StyledButtonProps {
  buttonType: ButtonSize;
  stretchWidth?: boolean;
  border?: [number, keyof Color];
  borderRadius?: number | string;
  backgroundColor?: keyof Color;
  color?: keyof Color;
  backgroundColorHover?: keyof Color;
  colorHover?: keyof Color;
  href?: string;
}

interface ButtonProps extends Props, Omit<StyledButtonProps, 'buttonType'> {
  type: ButtonSize;
  useAnchor?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const buttons: Record<
  ButtonSize,
  { width: string; height: string; fontSize: Size }
> = {
  xs: {
    width: pxToRem(200),
    height: pxToRem(48),
    fontSize: 'md'
  },
  sm: {
    width: pxToRem(200),
    height: pxToRem(48),
    fontSize: 'md'
  },
  md: {
    width: pxToRem(200),
    height: pxToRem(48),
    fontSize: 'md'
  },
  lg: {
    width: pxToRem(200),
    height: pxToRem(48),
    fontSize: 'md'
  },
  xl: {
    width: pxToRem(200),
    height: pxToRem(48),
    fontSize: 'md'
  },
  login: {
    width: pxToRem(300),
    height: pxToRem(40),
    fontSize: 'md'
  }
};

const StyledButton = styled.button<StyledButtonProps>`
  ${flex('center', 'center', true)}
  ${({
    buttonType,
    stretchWidth,
    border,
    borderRadius,
    backgroundColor,
    color,
    backgroundColorHover,
    colorHover,
    theme
  }) => `
    width: ${stretchWidth ? '100%' : buttons[buttonType].width};
    height: ${buttons[buttonType].height};
    ${
      border
        ? `border: ${pxToRem(border[0])} solid ${theme.color[border[1]]};`
        : ''
    }
    border-radius: ${
      typeof borderRadius === 'string'
        ? borderRadius
        : pxToRem(borderRadius ?? 6)
    };
    background-color: ${theme.color[backgroundColor ?? 'BROWN_DARK']};
    font-size: ${theme.fontSize[buttons[buttonType].fontSize]};
    color: ${theme.color[color ?? 'WHITE']};
    text-align: center;

    &:hover {
      ${
        backgroundColorHover
          ? `background-color: ${theme.color[backgroundColorHover]};`
          : ''
      }
      ${colorHover ? `color: ${theme.color[colorHover]};` : ''}
    }
  `}
`;

function Button({
  type,
  stretchWidth,
  border,
  borderRadius,
  backgroundColor,
  color,
  backgroundColorHover,
  colorHover,
  onClick,
  href,
  useAnchor,
  children
}: ButtonProps) {
  return (
    <StyledButton
      type={useAnchor ? undefined : 'button'}
      as={useAnchor ? 'a' : 'button'}
      href={useAnchor ? href : undefined}
      buttonType={type}
      stretchWidth={stretchWidth}
      border={border}
      borderRadius={borderRadius}
      color={color}
      backgroundColor={backgroundColor}
      colorHover={colorHover}
      backgroundColorHover={backgroundColorHover}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
