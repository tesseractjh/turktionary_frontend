import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import { dictFormCountState, meaningListState } from '@recoil/dict';
import pxToRem from '@utils/pxToRem';
import Button from '@components/common/Button';
import { Label } from '../../../Form';
import Meaning from './Meaning';

interface POSProps {
  pos: Model.POS;
}

const Container = styled.div`
  padding: ${pxToRem(10)};

  &:not(:last-of-type) {
    margin-bottom: ${pxToRem(30)};
  }

  & > label {
    margin-left: ${pxToRem(10)};
  }
`;

const LabelWrapper = styled.div`
  ${flex()};
`;

const MiddleLine = styled.hr`
  flex: 1;
  height: ${pxToRem(1)};
  margin: ${pxToRem(0, 0, 0, 20)};
  border: none;
  background-color: ${({ theme }) => theme.color.GRAY_LIGHT};
`;

const MeaningList = styled.ol`
  margin-top: ${pxToRem(10)};
`;

const ButtonWrapper = styled.div`
  margin: ${pxToRem(30, 10, 0, 70)};
`;

function POS({ pos }: POSProps) {
  const { pos_id, pos_name } = pos;
  const id = `voca-pos-${pos_id}`;
  const [meaningCount, setMeaningCount] = useRecoilState(
    dictFormCountState(id)
  );
  const setMeaningList = useSetRecoilState(meaningListState(id));
  const meaningListRef = useRef<HTMLOListElement>(null);

  const handleClick = () => {
    setMeaningCount((state) => state + 1);
  };

  const handleDelete = useCallback(
    (order: number) => () => {
      setMeaningList(['DELETE', order]);
    },
    []
  );

  const handleSwitch = useCallback(
    (order: number) => () => {
      setMeaningList(['SWITCH', order]);
    },
    []
  );

  useEffect(() => {
    if (!meaningCount) {
      setMeaningCount(1);
    }
  }, [meaningCount]);

  return (
    <Container>
      <LabelWrapper>
        <Label fontSize="sm" fontSizeMobile="xs">
          {pos_name}
        </Label>
        <MiddleLine />
      </LabelWrapper>
      <MeaningList ref={meaningListRef}>
        {[...Array(meaningCount)].map((_, index) => (
          <Meaning
            key={`${id}-${index}`}
            id={id}
            order={index + 1}
            meaningListRef={meaningListRef}
            handleDelete={handleDelete}
            handleSwitch={handleSwitch}
          />
        ))}
      </MeaningList>
      <ButtonWrapper>
        <Button
          type="xs"
          backgroundColorHover="BROWN"
          stretchWidth
          onClick={handleClick}
        >
          뜻 추가
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

export default POS;
