import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Keyframes, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import { searchBarPositionState } from '@recoil/search';
import pxToRem from '@utils/pxToRem';
import GlobeIcon from '@assets/images/globe-solid.svg';
import BellIcon from '@assets/images/bell-solid.svg';
import UserIcon from '@assets/images/user-solid.svg';
import LoginIcon from '@assets/images/arrow-right-to-bracket-solid.svg';
import InnerContainer from '@components/common/InnerContainer';
import Logo from '@components/common/Logo';
import NotiCount from '@components/common/NotiCount';
import SearchBar from '@components/common/SearchBar';
import MenuButton from './MenuButton';
import Notification from './Notification';
import UserMenu from './UserMenu';
import LangMenu from './LangMenu';
import useAPI from '@hooks/api/useAPI';
import userAPI from '@api/user';
import notificationAPI from '@api/notification';
import useAccessToken from '@hooks/api/useAccessToken';

const mountAnimation = keyframes`
  0% {
    transform: translateY(${pxToRem(50)});
  }
  100% {
    transform: translateY(0);
  }
`;

const unmountAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(${pxToRem(50)});
  }
`;

const Container = styled.nav`
  position: fixed;
  z-index: 10;
  width: 100%;
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

const SearchBarWrapper = styled.div<{ animation: Keyframes }>`
  overflow: hidden;
  max-width: 50%;
  width: 100%;

  & > div {
    animation: ${({ animation }) => animation} 0.2s ease-in-out;

    @media ${({ theme }) => theme.media.tablet} {
      animation: none;
    }
  }

  @media ${({ theme }) => theme.media.tablet} {
    position: fixed;
    top: ${pxToRem(60)};
    left: 0;
    max-width: none;
    width: 100vw;
    padding: ${pxToRem(4, 20)};
    border-bottom: ${border()} ${({ theme }) => theme.color.BORDER};
    background-color: ${({ theme }) => theme.color.TEAL};
  }

  @media ${({ theme }) => theme.media.mobile} {
    top: ${pxToRem(48)};
  }
`;

const Menu = styled.ul`
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

function HeaderMenu() {
  const [isLangHidden, setIsLangHidden] = useState(true);
  const [isNotiHidden, setIsNotiHidden] = useState(true);
  const [isUserHidden, setIsUserHidden] = useState(true);
  const searchBarPosition = useRecoilValue(searchBarPositionState);

  const accessToken = useAccessToken();
  const { data: user } = useAPI(
    'getHeaderUserInfo',
    userAPI.getHeaderUserInfo,
    { enabled: !!accessToken }
  );
  const { data: notification } = useAPI(
    'getNotification',
    notificationAPI.getNotification,
    {
      enabled: !!accessToken,
      refetchInterval: 5 * 60 * 1000
    }
  );

  const handleLangClick = useCallback(() => {
    setIsLangHidden((state) => !state);
  }, []);

  const handleNotiClick = useCallback(() => {
    setIsNotiHidden((state) => !state);
  }, []);

  const handleUserClick = useCallback(() => {
    setIsUserHidden((state) => !state);
  }, []);

  const handleLangClose = useCallback(
    handleDocumentClick('popup-dict-lang', setIsLangHidden),
    []
  );

  const handleNotiClose = useCallback(
    handleDocumentClick('popup-notification', setIsNotiHidden),
    []
  );

  const handleUserClose = useCallback(
    handleDocumentClick('popup-user', setIsUserHidden),
    []
  );

  return (
    <Menu role="menu">
      {user?.user.user_name ? (
        <>
          {searchBarPosition === 'header' ? (
            <MenuButton
              id="btn-dict-lang-popup"
              className="popup-dict-lang"
              text="사전"
              onClick={handleLangClick}
              aria-haspopup="true"
              aria-controls="popup-dict-lang"
              exceptOnPC
            >
              <GlobeIcon />
            </MenuButton>
          ) : null}
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
          <MenuButton
            id="btn-user-popup"
            className="popup-user"
            text="내 정보"
            onClick={handleUserClick}
            aria-haspopup="true"
            aria-controls="popup-user"
          >
            <UserIcon />
          </MenuButton>
          <LangMenu
            handleDocumentClick={handleLangClose}
            hidden={isLangHidden}
            setHidden={setIsLangHidden}
          />
          <Notification
            notifications={notification?.notification ?? []}
            handleDocumentClick={handleNotiClose}
            hidden={isNotiHidden}
            setHidden={setIsNotiHidden}
          />
          <UserMenu
            user={user?.user}
            handleDocumentClick={handleUserClose}
            hidden={isUserHidden}
            setHidden={setIsUserHidden}
          />
        </>
      ) : (
        <MenuButton text="로그인" route="/login" useAnchor>
          <LoginIcon />
        </MenuButton>
      )}
    </Menu>
  );
}

function HeaderSearchBar() {
  const [animation, setAnimation] = useState(mountAnimation);
  const [position, setPosition] = useState('content');
  const setPositionAtom = useSetRecoilState(searchBarPositionState);

  useEffect(() => {
    const searchContent = document.querySelector('#search-dictionary');
    const header = document.querySelector('#header');

    let handleScroll: () => void;
    let headerTimer: NodeJS.Timeout | null = null;
    let contentTimer: NodeJS.Timeout | null = null;

    if (searchContent && header) {
      handleScroll = () => {
        const { top, height } = searchContent.getBoundingClientRect();
        const { height: headerHeight } = header.getBoundingClientRect();
        if (top + height <= headerHeight) {
          if (position === 'content') {
            setAnimation(mountAnimation);
            setPosition('header');
            if (headerTimer) {
              clearTimeout(headerTimer);
              headerTimer = null;
            }
            headerTimer = setTimeout(() => {
              const input = header.querySelector(
                '#search-header input'
              ) as HTMLInputElement;
              input.blur();
              input.focus();
            }, 200);
          }
        } else {
          if (position === 'header') {
            if (!contentTimer) {
              setAnimation(unmountAnimation);
              contentTimer = setTimeout(() => {
                setPosition('content');
                contentTimer = null;
              }, 200);
            }
            const input = searchContent.querySelector(
              'input'
            ) as HTMLInputElement;
            input.blur();
            input.focus();
          }
        }
      };
      document.addEventListener('scroll', handleScroll);
    }

    setPositionAtom(position);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [position]);

  return position === 'header' ? (
    <SearchBarWrapper animation={animation}>
      <SearchBar id="search-header" color="TEAL_DARK" />
    </SearchBarWrapper>
  ) : null;
}

function Header() {
  return (
    <Container>
      <InnerContainer>
        <Content>
          <Logo />
          <HeaderSearchBar />
          <HeaderMenu />
        </Content>
      </InnerContainer>
    </Container>
  );
}

export default Header;
