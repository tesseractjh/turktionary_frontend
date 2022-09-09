import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';

const Container = styled.div`
  position: relative;
  width: ${pxToRem(100)};
  height: ${pxToRem(100)};
  background-color: ${({ theme }) => theme.color.WHITE};
`;

const spinnerAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const SpinnerQuarter = styled.div<{ delay?: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${pxToRem(50)};
  height: ${pxToRem(50)};
  border: 10px solid;
  border-color: ${({ theme }) => theme.color.TEAL_DARK} transparent transparent
    transparent;
  border-radius: 50%;
  animation: ${spinnerAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  animation-delay: ${({ delay }) => delay ?? 0}s;
`;

function Spinner() {
  return (
    <Container>
      <SpinnerQuarter delay={-0.4} />
      <SpinnerQuarter delay={-0.3} />
      <SpinnerQuarter delay={-0.2} />
      <SpinnerQuarter delay={-0.1} />
      <SpinnerQuarter />
    </Container>
  );
}

export default Spinner;
