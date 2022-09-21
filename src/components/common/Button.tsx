import { Color, Media, Size } from '@emotion/react';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import { MouseEventHandler } from 'react';

type ButtonSize = Size | 'login';
type ButtonStyle = {
  width?: string;
  height: string;
  fontSize?: Size;
};

const windows = ['desktop', 'laptop', 'tablet', 'mobile', 'galaxyFold'];

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
  { [K in typeof windows[number]]: ButtonStyle }
> = {
  xs: {
    desktop: {
      width: pxToRem(200),
      height: pxToRem(48),
      fontSize: 'md'
    }
  },
  sm: {
    desktop: {
      width: pxToRem(150),
      height: pxToRem(36),
      fontSize: 'md'
    },
    tablet: {
      width: pxToRem(120),
      height: pxToRem(30),
      fontSize: 'sm'
    }
  },
  md: {
    desktop: {
      width: pxToRem(200),
      height: pxToRem(48),
      fontSize: 'md'
    }
  },
  lg: {
    desktop: {
      width: pxToRem(200),
      height: pxToRem(48),
      fontSize: 'md'
    }
  },
  xl: {
    desktop: {
      width: pxToRem(200),
      height: pxToRem(48),
      fontSize: 'md'
    }
  },
  login: {
    desktop: {
      width: pxToRem(300),
      height: pxToRem(40)
    },
    mobile: {
      width: pxToRem(240),
      height: pxToRem(40)
    }
  }
};

const StyledButton = styled.button<StyledButtonProps>`
  ${flex('center', 'center', true)}
  ${({
    buttonType: type,
    stretchWidth,
    border,
    borderRadius,
    backgroundColor,
    color,
    backgroundColorHover,
    colorHover,
    theme
  }) => `
    width: ${stretchWidth ? '100%' : buttons[type].desktop.width};
    height: ${buttons[type].desktop.height};
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
    font-size: ${theme.fontSize[buttons[type].desktop?.fontSize ?? 'md']};
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

    ${windows
      .slice(1)
      .map((media) => {
        const style = buttons[type][media];
        if (!style) {
          return '';
        }
        return `
      @media ${theme.media[media as keyof Media]} {
        width: ${stretchWidth ? '100%' : style.width};
        height: ${style.height};
        ${style.fontSize ? `font-size: ${theme.fontSize[style.fontSize]};` : ''}
      }`;
      })
      .join('')}
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
