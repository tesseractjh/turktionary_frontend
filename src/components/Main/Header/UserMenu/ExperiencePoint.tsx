import styled from '@emotion/styled';
import { border } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

interface ExperiencePointProps {
  totalExp: number;
  curRequirement: number;
  prevRequirement: number;
}

const Container = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: ${pxToRem(30)};
  margin-top: ${pxToRem(10)};
  border: ${border()} ${({ theme }) => theme.color.TEAL_DARK};
  border-radius: ${pxToRem(4)};
  background-color: ${({ theme }) => theme.color.TEAL};
`;

const Bar = styled.div<{ ratio: number }>`
  width: ${({ ratio }) => ratio * 100}%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.TEAL_DARK};
`;

const Percent = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.TEAL_DARK};
  text-align: center;
  mix-blend-mode: difference;
`;

function ExperiencePoint({
  totalExp,
  prevRequirement,
  curRequirement
}: ExperiencePointProps) {
  const ratio =
    (totalExp - prevRequirement) / (curRequirement - prevRequirement);
  return (
    <Container>
      <Bar ratio={ratio} />
      <Percent>{`${totalExp}/${curRequirement} (${Math.floor(
        ratio * 100
      )}%)`}</Percent>
    </Container>
  );
}

export default ExperiencePoint;
