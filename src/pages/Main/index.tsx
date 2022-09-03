import InnerContainer from '@components/common/InnerContainer';
import Header from '@components/Header';
import MenuList from '@components/MenuList';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import { Outlet } from 'react-router-dom';

const Container = styled.section`
  padding: ${pxToRem(80, 0)};
`;

function Main() {
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
