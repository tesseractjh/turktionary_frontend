import { Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import Logo from '@components/common/Logo';

const Container = styled.div`
  padding: ${pxToRem(80, 0)};

  & > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

function Join() {
  const { pathname } = useLocation();

  return (
    <Container>
      <Logo useHref={pathname === '/join/success'} />
      <Outlet />
    </Container>
  );
}

export default Join;
