import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import useToken from '@hooks/useToken';
import pxToRem from '@utils/pxToRem';
import Header from '@components/Header';
import MenuList from '@components/MenuList';
import InnerContainer from '@components/common/InnerContainer';

const Container = styled.section`
  padding: ${pxToRem(80, 0)};
`;

function Main() {
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
