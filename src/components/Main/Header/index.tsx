import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import UserIcon from '@assets/images/user-solid.svg';
import LoginIcon from '@assets/images/arrow-right-to-bracket-solid.svg';
import InnerContainer from '@components/common/InnerContainer';
import Logo from '@components/common/Logo';
import MenuButton from './MenuButton';

interface HeaderProps {
  user: Partial<Model.User>;
}

const Container = styled.nav`
  height: ${pxToRem(60)};
  background-color: ${({ theme }) => theme.color.TEAL};

  @media ${({ theme }) => theme.media.mobile} {
    height: ${pxToRem(48)};
  }
`;

const Content = styled.div`
  ${flex('space-between')}
  height: ${pxToRem(60)};

  @media ${({ theme }) => theme.media.mobile} {
    height: ${pxToRem(48)};
  }
`;

const HeaderMenu = styled.ul`
  ${flex('flex-end')}
  gap: ${pxToRem(20)};
`;

function Header({ user }: HeaderProps) {
  return (
    <Container>
      <InnerContainer>
        <Content>
          <Logo />
          <HeaderMenu role="menu">
            {user.user_name ? (
              <MenuButton text="내 정보">
                <UserIcon />
              </MenuButton>
            ) : (
              <MenuButton text="로그인" route="/login" useAnchor>
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
