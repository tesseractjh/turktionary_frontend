import { Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import Logo from '@components/common/Logo';

const Container = styled.div`
  ${flex('flex-start')}
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: ${pxToRem(80, 0, 40)};
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
