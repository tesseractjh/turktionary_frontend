import { Color } from '@emotion/react';
import styled from '@emotion/styled';
import { border } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

interface ButtonProps extends Props {
  onClick: () => void;
  color?: keyof Color;
}

const Container = styled.li`
  width: 100%;
  border-top: ${border()} ${({ theme }) => theme.color.BORDER};

  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY_LIGHT};
  }
`;

const MenuButton = styled.button<{ color: keyof Color }>`
  width: 100%;
  height: ${pxToRem(48)};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ color, theme }) => theme.color[color]};
`;

function Button({ onClick, color, children }: ButtonProps) {
  return (
    <Container>
      <MenuButton type="button" color={color ?? 'BLACK'} onClick={onClick}>
        {children}
      </MenuButton>
    </Container>
  );
}

export default Button;
