import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import UserIcon from '@assets/images/user-solid.svg';
import LoginIcon from '@assets/images/arrow-right-to-bracket-solid.svg';
import InnerContainer from '@components/common/InnerContainer';
import Logo from '@components/common/Logo';
import MenuButton from './MenuButton';
import { useEffect, useState } from 'react';
import useAPI from '@hooks/useAPI';
import userAPI from '@api/user';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '@recoil/user';

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
  gap: ${pxToRem(20)};
`;

function Header() {
  const accessToken = useRecoilValue(accessTokenState);
  const [userData, setUserData] = useState<Pick<
    Model.User,
    'user_name' | 'user_exp'
  > | null>(null);
  const api = useAPI();

  useEffect(() => {
    if (accessToken) {
      (async () => {
        await api(userAPI.getHeaderUserInfo(), (userData) => {
          setUserData(userData);
        })();
      })();
    }
  }, [accessToken]);

  return (
    <Container>
      <InnerContainer>
        <Content>
          <Logo />
          <HeaderMenu role="menu">
            {userData ? (
              <MenuButton text="내 정보">
                <UserIcon />
              </MenuButton>
            ) : (
              <MenuButton text="로그인">
                <LoginIcon />
              </MenuButton>
            )}
          </HeaderMenu>
        </Content>
      </InnerContainer>
    </Container>
  );
}

export default Header;
