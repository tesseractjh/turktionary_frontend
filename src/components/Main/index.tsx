import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { joinResultState } from '@recoil/join';
import pxToRem from '@utils/pxToRem';
import useAccessToken from '@hooks/api/useAccessToken';
import withAsyncBoundary from '@hoc/withErrorBoundaryAndSuspense';
import Deferred from '@components/common/Defered';
import Fallback from '@components/common/Fallback';
import Header from './Header';
import MenuList from './MenuList';

const Fixed = styled.header`
  position: relative;
  z-index: 10;
  height: ${pxToRem(100)};

  @media ${({ theme }) => theme.media.mobile} {
    height: ${pxToRem(80)};
  }
`;

function Main() {
  const setJoinResult = useSetRecoilState(joinResultState);
  useAccessToken();

  useEffect(() => {
    setJoinResult(false);
  }, []);

  return (
    <>
      <Fixed id="header">
        <Header />
        <MenuList />
      </Fixed>
      <Outlet />
    </>
  );
}

export default withAsyncBoundary(Main, {
  SuspenseFallback: (
    <Deferred delay={300}>
      <Fallback />
    </Deferred>
  )
});
