import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { joinResultState } from '@recoil/join';
import useToken from '@hooks/useToken';
import pxToRem from '@utils/pxToRem';
import Header from '@components/Header';
import MenuList from '@components/MenuList';
import InnerContainer from '@components/common/InnerContainer';

const Container = styled.section`
  padding: ${pxToRem(80, 0)};
`;

function Main() {
  const setJoinResult = useSetRecoilState(joinResultState);

  useEffect(() => {
    setJoinResult(false);
  }, []);

  useToken();

  return (
    <>
      <Header />
      <MenuList />
      <Container>
        <InnerContainer>
          <Outlet />
        </InnerContainer>
      </Container>
    </>
  );
}

export default Main;
