import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import Example from './Example';

interface MeaningProps {
  index: number;
  meaning: Model.MeaningList['meanings'][number];
}

const Container = styled.li``;

const MeaningText = styled.p`
  margin-bottom: ${pxToRem(10)};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

function Meaning({ index, meaning }: MeaningProps) {
  const { meaning_id, meaning_text, examples } = meaning;
  return (
    <Container>
      <MeaningText>{`${index}. ${meaning_text}`}</MeaningText>
      {examples ? (
        <ol>
          {examples?.map((example) => (
            <Example key={`example-${example}`} example={example} />
          ))}
        </ol>
      ) : null}
    </Container>
  );
}

export default Meaning;
