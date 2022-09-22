import { Link } from 'react-router-dom';
import { Color } from '@emotion/react';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import MenuIcon from '@assets/images/ellipsis-vertical-solid.svg';

interface EllipsisMenuProps {
  param: number;
}

const Container = styled.div`
  align-self: flex-start;
  position: relative;
  margin-left: ${pxToRem(20)};
  text-align: right;

  &:hover {
    width: ${pxToRem(80)};
  }

  &:hover > div {
    display: block;
  }

  &:hover svg {
    fill: ${({ theme }) => theme.color.GRAY};
  }
`;

const Ellipsis = styled.span`
  display: inline-block;
  width: ${pxToRem(20)};
  height: ${pxToRem(20)};

  & svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.color.BORDER};
  }
`;

const Hover = styled.div`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: ${pxToRem(80)};
  height: ${pxToRem(30)};
  background-color: transparent;
`;

const Menu = styled.div`
  display: none;
  position: absolute;
  top: ${pxToRem(30)};
  right: 0;
  z-index: 10;
  width: ${pxToRem(80)};
  background-color: ${({ theme }) => theme.color.WHITE};
  box-shadow: 0 2px 5px rgb(0 0 0 / 17%);
`;

const MenuButton = styled(Link)<{ textcolor?: keyof Color }>`
  display: inline-block;
  width: 100%;
  height: ${pxToRem(40)};
  padding: ${pxToRem(10)};
  background-color: ${({ theme }) => theme.color.WHITE};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ textcolor, theme }) => theme.color[textcolor ?? 'BLACK']};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.color.BORDER};
  }
`;

function EllipsisMenu({ param }: EllipsisMenuProps) {
  return (
    <Container>
      <Ellipsis>
        <MenuIcon />
      </Ellipsis>
      <Hover />
      <Menu>
        <MenuButton to={`edit/${param}`}>편집</MenuButton>
        <MenuButton to={`report/${param}`} textcolor="RED">
          신고
        </MenuButton>
      </Menu>
    </Container>
  );
}

export default EllipsisMenu;
