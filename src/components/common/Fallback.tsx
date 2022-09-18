import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import Logo from '@components/common/Logo';
import Spinner from '@components/common/Spinner';
import { keyframes } from '@emotion/react';

const Animation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div`
  ${flex()}
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.WHITE};
  animation: ${Animation} 0.3s ease-in-out;
`;

function Fallback() {
  return (
    <Container>
      <Logo disableLink />
      <Spinner />
    </Container>
  );
}

export default Fallback;
