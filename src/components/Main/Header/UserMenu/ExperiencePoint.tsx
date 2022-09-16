import styled from '@emotion/styled';
import { border } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

interface ExperiencePointProps {
  totalExp: number;
  exp: number;
  requirement: number;
}

const Container = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: ${pxToRem(30)};
  margin-top: ${pxToRem(6)};
  border: ${border()} ${({ theme }) => theme.color.BROWN_DARK};
  border-radius: ${pxToRem(4)};
  background-color: ${({ theme }) => theme.color.BEIGE};
`;

const Bar = styled.div<{ ratio: number }>`
  width: ${({ ratio }) => ratio * 100}%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.BROWN_DARK};
`;

const Percent = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.BROWN_DARK};
  mix-blend-mode: difference;
`;

function ExperiencePoint({ exp, requirement }: ExperiencePointProps) {
  return (
    <Container>
      <Bar ratio={exp / requirement} />
      <Percent>{`${exp}/${requirement} (${Math.floor(
        (exp / requirement) * 100
      )}%)`}</Percent>
    </Container>
  );
}

export default ExperiencePoint;
