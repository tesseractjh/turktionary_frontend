import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import { dictFormListState, dictFormState } from '@recoil/dict';
import pxToRem from '@utils/pxToRem';
import Button from '@components/common/Button';
import { Label } from '../../../Form';
import POSSelection from '../../../Form/POSSelection';

const Container = styled.div`
  padding: ${pxToRem(10)};
`;

const FormContainer = styled.div`
  ${flex('flex-start')}
  gap: ${pxToRem(20)};
  margin-top: ${pxToRem(10)};
`;

function AddPOS() {
  const id = 'voca-pos';
  const [selectedPOS, setSelectedPOS] = useRecoilState<Model.POS | null>(
    dictFormState(id)
  );
  const setPOSList = useSetRecoilState<Model.POS[]>(dictFormListState(id));

  const handleClick = () => {
    setPOSList((state) => {
      if (
        !selectedPOS ||
        state.find(({ pos_id }) => pos_id === selectedPOS.pos_id)
      ) {
        return state;
      }
      return [...state, selectedPOS];
    });
    setSelectedPOS(null);
  };

  return (
    <Container>
      <Label>뜻 · 예문</Label>
      <FormContainer>
        <POSSelection id={id} />
        <Button
          type="sm"
          backgroundColor="BROWN_DARK"
          backgroundColorHover="BROWN"
          disabled={!selectedPOS}
          onClick={handleClick}
        >
          품사 추가
        </Button>
      </FormContainer>
    </Container>
  );
}

export default AddPOS;
