import { useState } from 'react';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import LogoIcon from '@assets/images/star-and-crescent-solid.svg';
import UserIcon from '@assets/images/user-solid.svg';
import InnerContainer from '@components/common/InnerContainer';
import MenuButton from './MenuButton';
import { Link } from 'react-router-dom';

const Container = styled.nav`
  height: ${pxToRem(60)};
  background-color: ${({ theme }) => theme.color.TEAL};
`;

const Content = styled.div`
  ${flex('space-between')}
  height: ${pxToRem(60)};
`;

const Logo = styled(Link)`
  font-weight: 600;
  font-size: ${pxToRem(28)};

  & svg {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
    margin-right: ${pxToRem(10)};
  }
`;

const HeaderMenu = styled.ul`
  ${flex('flex-end')}
`;

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <Container>
      <InnerContainer>
        <Content>
          <h1>
            <Logo to="/">
              <LogoIcon />
              Turktionary
            </Logo>
          </h1>
          <HeaderMenu role="menu">
            <MenuButton text={isLoggedIn ? '로그아웃' : '로그인'}>
              <UserIcon />
            </MenuButton>
          </HeaderMenu>
        </Content>
      </InnerContainer>
    </Container>
  );
}

export default Header;
