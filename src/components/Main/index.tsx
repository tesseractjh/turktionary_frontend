import React, { lazy, Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { joinResultState } from '@recoil/join';
import useLogin from '@hooks/useLogin';
import pxToRem from '@utils/pxToRem';
import withAsyncBoundary from '@hoc/withErrorBoundaryAndSuspense';
import Header from '@components/Main/Header';
import MenuList from '@components/Main/MenuList';
import InnerContainer from '@components/common/InnerContainer';

const Fixed = styled.header`
  position: relative;
  height: ${pxToRem(100)};

  @media ${({ theme }) => theme.media.mobile} {
    height: ${pxToRem(80)};
  }
`;

const Container = styled.section`
  padding: ${pxToRem(80, 0)};

  @media ${({ theme }) => theme.media.tablet} {
    padding: ${pxToRem(60, 0)};
  }

  @media ${({ theme }) => theme.media.mobile} {
    padding: ${pxToRem(40, 0)};
  }
`;

function SuspsenseFallback() {
  const Fallback = lazy<React.FC>(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(import('./Fallback')), 300)
      )
  );
  return (
    <Suspense>
      <Fallback />
    </Suspense>
  );
}

function Main() {
  const setJoinResult = useSetRecoilState(joinResultState);

  useEffect(() => {
    setJoinResult(false);
  }, []);

  const [user, notification] = useLogin();

  return (
    <>
      <Fixed>
        <Header user={user} notification={notification} />
        <MenuList />
      </Fixed>
      <Container>
        <InnerContainer>
          <Outlet />
        </InnerContainer>
      </Container>
    </>
  );
}

export default withAsyncBoundary(Main, {
  SuspenseFallback: <SuspsenseFallback />
});
