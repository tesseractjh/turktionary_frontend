import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import BellIcon from '@assets/images/bell-solid.svg';
import UserIcon from '@assets/images/user-solid.svg';
import LoginIcon from '@assets/images/arrow-right-to-bracket-solid.svg';
import InnerContainer from '@components/common/InnerContainer';
import Logo from '@components/common/Logo';
import NotiCount from '@components/common/NotiCount';
import MenuButton from './MenuButton';
import Notification from './Notification';

interface HeaderProps {
  user: Model.User;
  notification: Model.Notification;
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
  position: relative;
  height: ${pxToRem(60)};

  @media ${({ theme }) => theme.media.mobile} {
    height: ${pxToRem(48)};
  }
`;

const HeaderMenu = styled.ul`
  ${flex('flex-end')}
  gap: ${pxToRem(10)};
`;

const handleDocumentClick =
  (
    className: string,
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  ({ target }: MouseEvent) => {
    if (!(target as Element).closest(`.${className}`)) {
      setState(true);
    }
  };

function Header({ user, notification }: HeaderProps) {
  const [isNotiHidden, setIsNotiHidden] = useState(true);

  const handleNotiClick = useCallback(() => {
    setIsNotiHidden((state) => !state);
  }, []);

  const handleNotiClose = useCallback(
    handleDocumentClick('popup-notification', setIsNotiHidden),
    []
  );

  return (
    <Container>
      <InnerContainer>
        <Content>
          <Logo />
          <HeaderMenu role="menu">
            {user?.user.user_name ? (
              <>
                <MenuButton
                  id="btn-notification-popup"
                  className="popup-notification"
                  text="알림"
                  onClick={handleNotiClick}
                  aria-haspopup="true"
                  aria-controls="popup-notification"
                >
                  <BellIcon />
                  <NotiCount count={notification?.notification.length} />
                </MenuButton>
                <MenuButton text="내 정보">
                  <UserIcon />
                </MenuButton>
              </>
            ) : (
              <MenuButton text="로그인" route="/login" useAnchor>
                <LoginIcon />
              </MenuButton>
            )}
          </HeaderMenu>
          <Notification
            notifications={notification?.notification ?? []}
            handleDocumentClick={handleNotiClose}
            setHidden={setIsNotiHidden}
            hidden={isNotiHidden}
          />
        </Content>
      </InnerContainer>
    </Container>
  );
}

export default Header;
