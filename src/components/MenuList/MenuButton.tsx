import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import { Link, useLocation } from 'react-router-dom';

interface MenuButtonProps extends Props {
  route: string;
}

const Container = styled.li<{ isSelected: boolean }>`
  ${flex()};
  position: relative;
  height: 100%;

  ${({ isSelected, theme }) =>
    isSelected
      ? `
      & > * {
        color: ${theme.color.TEAL_DARK};
      }

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: ${pxToRem(3)};
        background-color: ${theme.color.TEAL_DARK};
      }
    `
      : ''}
`;

const Button = styled(Link)`
  padding: ${pxToRem(0, 4)};
  font-size: ${pxToRem(14)};
  color: ${({ theme }) => theme.color.BLACK};
  line-height: 1;

  &:hover {
    color: ${({ theme }) => theme.color.TEAL_DARK};
  }
`;

function MenuButton({ route, children }: MenuButtonProps) {
  const { pathname } = useLocation();

  return (
    <Container isSelected={pathname === route}>
      <Button to={route}>{children}</Button>
    </Container>
  );
}

export default MenuButton;
