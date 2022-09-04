import { Color } from '@emotion/react';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import { MouseEventHandler } from 'react';

interface StyledButtonProps {
  width?: number | string;
  padding?: number | string | Array<number>;
  border?: [number, keyof Color];
  borderRadius?: number | string;
  backgroundColor?: keyof Color;
  fontSize?: number | string;
  color?: keyof Color;
  backgroundColorHover?: keyof Color;
  colorHover?: keyof Color;
  href?: string;
}

interface ButtonProps extends Props, StyledButtonProps {
  useAnchor?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled.button<StyledButtonProps>`
  ${flex('center', 'center', true)}
  ${({
    width,
    padding,
    border,
    borderRadius,
    backgroundColor,
    fontSize,
    color,
    backgroundColorHover,
    colorHover,
    theme
  }) => `
    width: ${typeof width === 'string' ? width : pxToRem(width ?? 120)};
    padding: ${
      typeof padding === 'string'
        ? padding
        : Array.isArray(padding)
        ? pxToRem(...padding)
        : pxToRem(padding ?? 8)
    };
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
    font-size: ${
      typeof fontSize === 'string' ? fontSize : pxToRem(fontSize ?? 20)
    };
    color: ${theme.color[color ?? 'WHITE']};
    text-align: center;
    line-height: ${pxToRem(30)};

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
  width,
  padding,
  border,
  borderRadius,
  backgroundColor,
  fontSize,
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
      width={width}
      padding={padding}
      border={border}
      borderRadius={borderRadius}
      color={color}
      backgroundColor={backgroundColor}
      colorHover={colorHover}
      backgroundColorHover={backgroundColorHover}
      fontSize={fontSize}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
