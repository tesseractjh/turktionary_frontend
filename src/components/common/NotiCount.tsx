import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

interface NotiCountProps {
  count: number;
}

const Container = styled.span<{ isAboveHundred: boolean }>`
  ${flex('center', 'center', true)}
  position: absolute;
  top: ${pxToRem(2)};
  right: ${pxToRem(2)};
  width: fit-content;
  min-width: ${pxToRem(14)};
  height: ${pxToRem(14)};
  padding: ${({ isAboveHundred }) =>
    isAboveHundred ? pxToRem(4) : pxToRem(3)};
  border-radius: ${pxToRem(14)};
  background-color: ${({ theme }) => theme.color.RED};
  font-size: ${({ theme }) => theme.fontSize.custom('xs', -4)};
  color: ${({ theme }) => theme.color.WHITE};
`;

function NotiCount({ count }: NotiCountProps) {
  const isAboveHundred = count >= 100;
  if (count) {
    return (
      <Container isAboveHundred={isAboveHundred} className="noti-count">
        {isAboveHundred ? '99+' : count}
      </Container>
    );
  }
  return null;
}

export default NotiCount;
