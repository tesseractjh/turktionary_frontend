import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import Meaning from './Meaning';

interface MeaningListProps {
  meaningList: Model.MeaningList;
}

const Container = styled.div`
  margin-bottom: ${pxToRem(20)};
`;

const POS = styled.strong`
  display: inline-block;
  width: 100%;
  margin-bottom: ${pxToRem(10)};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

function MeaningList({ meaningList }: MeaningListProps) {
  const { pos_name, meanings } = meaningList;
  return (
    <Container>
      <POS>{pos_name}</POS>
      <ol>
        {meanings.map((meaning, index) => (
          <Meaning
            key={`meaning-${meaning.meaning_id}`}
            index={index + 1}
            meaning={meaning}
          />
        ))}
      </ol>
    </Container>
  );
}

export default MeaningList;
