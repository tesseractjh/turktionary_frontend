import { Color } from '@emotion/react';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import { MouseEventHandler } from 'react';

interface StyledButtonProps {
  width?: number | string;
  padding?: number | string;
  borderRadius?: number | string;
  color?: keyof Color;
  backgroundColor?: keyof Color;
  colorHover?: keyof Color;
  backgroundColorHover?: keyof Color;
  fontSize?: number | string;
}

interface ButtonProps extends Props, StyledButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled.button<StyledButtonProps>`
  ${({
    width,
    padding,
    borderRadius,
    backgroundColor,
    fontSize,
    color,
    backgroundColorHover,
    colorHover,
    theme
  }) => `
    width: ${typeof width === 'string' ? width : pxToRem(width ?? 120)};
    padding: ${typeof padding === 'string' ? padding : pxToRem(padding ?? 8)};
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
  borderRadius,
  backgroundColor,
  fontSize,
  color,
  backgroundColorHover,
  colorHover,
  onClick,
  children
}: ButtonProps) {
  return (
    <StyledButton
      type="button"
      width={width}
      padding={padding}
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
