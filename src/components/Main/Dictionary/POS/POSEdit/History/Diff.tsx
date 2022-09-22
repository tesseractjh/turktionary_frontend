import diff from 'fast-diff';
import styled from '@emotion/styled';
import { border } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

interface DiffProps {
  title: string;
  prev: string;
  cur: string;
  index: number;
}

const Compare = styled.p`
  padding: ${pxToRem(10)};
  margin-bottom: ${pxToRem(20)};
  border: ${border()} ${({ theme }) => theme.color.BROWN};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const Added = styled.span`
  background-color: ${({ theme }) => theme.color.TEAL};
`;

const Removed = styled.span`
  background-color: ${({ theme }) => theme.color.RED};
  color: ${({ theme }) => theme.color.GRAY};
`;

const Title = styled.span`
  display: inline-block;
  width: 100%;
  margin-bottom: ${pxToRem(10)};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

function Diff({ title, prev, cur, index }: DiffProps) {
  const result = diff(prev, cur);

  if (result.every(([compare]) => compare === diff.EQUAL)) {
    return null;
  }

  return (
    <Compare>
      <Title>{title}</Title>
      {result.map(([compare, text], idx) => {
        switch (compare) {
          case diff.INSERT:
            return (
              <Added key={`compare-pos-history${index}-added-${idx}`}>
                {text}
              </Added>
            );
          case diff.DELETE:
            return (
              <Removed key={`compare-pos-history${index}-removed-${idx}`}>
                {text}
              </Removed>
            );
          default:
            return text;
        }
      })}
    </Compare>
  );
}

export default Diff;
