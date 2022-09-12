import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';

const Container = styled.div`
  position: relative;
  width: ${pxToRem(100)};
  height: ${pxToRem(100)};
  background-color: ${({ theme }) => theme.color.WHITE};

  @media ${({ theme }) => theme.media.tablet} {
    width: ${pxToRem(80)};
    height: ${pxToRem(80)};
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: ${pxToRem(60)};
    height: ${pxToRem(60)};
  }

  @media ${({ theme }) => theme.media.galaxyFold} {
    width: ${pxToRem(50)};
    height: ${pxToRem(50)};
  }
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
  width: 50%;
  height: 50%;
  border: ${pxToRem(10)} solid;
  border-color: ${({ theme }) => theme.color.TEAL_DARK} transparent transparent
    transparent;
  border-radius: 50%;
  animation: ${spinnerAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  animation-delay: ${({ delay }) => delay ?? 0}s;

  @media ${({ theme }) => theme.media.tablet} {
    border-width: ${pxToRem(8)};
  }

  @media ${({ theme }) => theme.media.mobile} {
    border-width: ${pxToRem(6)};
  }

  @media ${({ theme }) => theme.media.galaxyFold} {
    border-width: ${pxToRem(5)};
  }
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
