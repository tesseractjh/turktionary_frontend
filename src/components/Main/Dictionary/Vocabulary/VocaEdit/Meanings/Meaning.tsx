import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import TrashIcon from '@assets/images/trash-solid.svg';
import SwitchIcon from '@assets/images/repeat-solid.svg';
import Form from '@components/Main/Dictionary/Form';
import ExampleList from './ExampleList';
import mouseHandler from './mouseHandler';

interface MeaningProps {
  id: string;
  order: number;
  meaningListRef: React.RefObject<HTMLOListElement>;
  handleDelete: (order: number) => () => void;
  handleSwitch: (order: number) => () => void;
}

export const SwitchButtonAnimation = keyframes`
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(450deg);
  }
`;

export const Container = styled.li<{ isFirst: boolean }>`
  position: relative;
  padding: ${pxToRem(10)};
  ${({ isFirst }) => (isFirst ? '' : `margin-top: ${pxToRem(30)};`)}

  &.switch-target {
    outline: ${border(2, 'dashed')} ${({ theme }) => theme.color.BROWN_LIGHT};
  }

  &.switch-target.focused {
    outline: ${border(2, 'dashed')} ${({ theme }) => theme.color.BROWN_DARK};
  }
`;

const MeaningContainer = styled.div`
  ${flex()}
  margin-bottom: ${pxToRem(10)};

  & > div {
    flex: 1;
  }
`;

const DeleteButton = styled.button`
  width: 16px;
  height: 16px;

  & svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.color.BROWN};

    &:hover {
      fill: ${({ theme }) => theme.color.RED};
    }
  }
`;

const Order = styled.span`
  min-width: ${pxToRem(28)};
  margin-right: ${pxToRem(12)};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-align: right;
`;

export const SwitchButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: ${pxToRem(-30)};
  width: calc(100% - ${pxToRem(60)});
  height: ${pxToRem(30)};
  padding: ${pxToRem(7, 0)};
  text-align: center;
`;

export const SwitchButton = styled.button`
  transform: rotate(90deg);
  width: ${pxToRem(16)};
  height: ${pxToRem(16)};

  & svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.color.BROWN};

    &:hover {
      fill: ${({ theme }) => theme.color.BROWN_DARK};
    }
  }

  &:hover {
    animation: ${SwitchButtonAnimation} 1s 0.2s infinite;
  }
`;

function Meaning({
  id,
  order,
  meaningListRef,
  handleDelete,
  handleSwitch
}: MeaningProps) {
  const isFirst = order === 1;

  const handleMouseDown = mouseHandler(
    !isFirst,
    order,
    meaningListRef.current,
    {
      add: ['focused']
    }
  );

  const handleMouseUp = mouseHandler(!isFirst, order, meaningListRef.current, {
    remove: ['focused']
  });

  const handleMouseOver = mouseHandler(
    !isFirst,
    order,
    meaningListRef.current,
    {
      add: ['switch-target']
    }
  );

  const handleMouseOut = mouseHandler(!isFirst, order, meaningListRef.current, {
    remove: ['switch-target', 'focused']
  });

  return (
    <Container isFirst={isFirst}>
      <MeaningContainer>
        <DeleteButton type="button" onClick={handleDelete(order)}>
          <TrashIcon />
          <span className="sr-only">뜻 삭제</span>
        </DeleteButton>
        <Order>{`${order}.`}</Order>
        <Form
          id={`${id}-meaning-${order}`}
          maxLength={100}
          noPadding
          showLength
        />
      </MeaningContainer>
      <ExampleList id={`${id}-meaning-${order}`} />
      {isFirst ? null : (
        <SwitchButtonWrapper>
          <SwitchButton
            type="button"
            onClick={handleSwitch(order)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <SwitchIcon />
            <span className="sr-only">뜻 순서 교체</span>
          </SwitchButton>
        </SwitchButtonWrapper>
      )}
    </Container>
  );
}

export default Meaning;
