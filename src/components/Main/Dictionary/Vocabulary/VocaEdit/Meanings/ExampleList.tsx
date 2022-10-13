import { useCallback, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { border } from '@styles/minxin';
import { dictFormCountState, exampleListState } from '@recoil/dict';
import pxToRem from '@utils/pxToRem';
import Button from '@components/common/Button';
import Example from './Example';

interface ExampleListProps {
  id: string;
}

const Container = styled.div`
  padding-left: ${pxToRem(20)};
  margin: ${pxToRem(0, 20, 0, 60)};
  border-left: ${border(3)} ${({ theme }) => theme.color.BEIGE};

  @media ${({ theme }) => theme.media.tablet} {
    padding-left: ${pxToRem(10)};
    margin: 0;
  }
`;

const List = styled.ol`
  margin-bottom: ${pxToRem(10)};
`;

function ExampleList({ id }: ExampleListProps) {
  const [exampleCount, setExampleCount] = useRecoilState(
    dictFormCountState(id)
  );
  const setExampleList = useSetRecoilState(exampleListState(id));
  const exampleListRef = useRef<HTMLOListElement>(null);

  const handleClick = () => {
    setExampleCount((state) => state + 1);
  };

  const handleDelete = useCallback(
    (order: number) => () => {
      setExampleList(['DELETE', order]);
    },
    []
  );

  const handleSwitch = useCallback(
    (order: number) => () => {
      setExampleList(['SWITCH', order]);
    },
    []
  );

  return (
    <Container>
      <List ref={exampleListRef}>
        {[...Array(exampleCount)].map((_, index) => (
          <Example
            key={`${id}-${index}`}
            id={id}
            order={index + 1}
            exampleListRef={exampleListRef}
            handleDelete={handleDelete}
            handleSwitch={handleSwitch}
          />
        ))}
      </List>
      <Button
        type="xs"
        border={[1, 'GRAY']}
        borderHover={[1, 'GRAY_DARK']}
        backgroundColor="GRAY_LIGHT"
        backgroundColorHover="BEIGE"
        color="BLACK"
        stretchWidth
        onClick={handleClick}
      >
        예문 추가
      </Button>
    </Container>
  );
}

export default ExampleList;
