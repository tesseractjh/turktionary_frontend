import { useState } from 'react';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import UserIcon from '@assets/images/user-solid.svg';
import InnerContainer from '@components/common/InnerContainer';
import Logo from '@components/common/Logo';
import MenuButton from './MenuButton';

const Container = styled.nav`
  height: ${pxToRem(60)};
  background-color: ${({ theme }) => theme.color.TEAL};
`;

const Content = styled.div`
  ${flex('space-between')}
  height: ${pxToRem(60)};
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
          <Logo />
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
