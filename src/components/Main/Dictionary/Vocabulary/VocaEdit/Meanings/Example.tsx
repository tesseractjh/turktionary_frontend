import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import TrashIcon from '@assets/images/trash-solid.svg';
import SwitchIcon from '@assets/images/repeat-solid.svg';
import Form from '@components/Main/Dictionary/Form';
import { Container, SwitchButton, SwitchButtonWrapper } from './Meaning';
import mouseHandler from './mouseHandler';

interface ExampleProps {
  id: string;
  order: number;
  exampleListRef: React.RefObject<HTMLOListElement>;
  handleDelete: (order: number) => () => void;
  handleSwitch: (order: number) => () => void;
}

const ExampleContainer = styled.div`
  ${flex('flex-start', 'flex-start')}

  & > div {
    flex: 1;
  }
`;

const DeleteButton = styled.button`
  width: 16px;
  height: 16px;
  margin: ${pxToRem(1, 10, 0, 0)};

  & svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.color.BROWN};

    &:hover {
      fill: ${({ theme }) => theme.color.RED};
    }
  }
`;

const FormContainer = styled.div`
  ${flex('flex-start', 'stretch')}
  flex-direction: column;
  gap: ${pxToRem(10)};

  & label {
    display: inline-block;
    margin-bottom: ${pxToRem(10)};
  }
`;

function Example({
  id,
  order,
  exampleListRef,
  handleDelete,
  handleSwitch
}: ExampleProps) {
  const isFirst = order === 1;

  const handleMouseDown = mouseHandler(
    !isFirst,
    order,
    exampleListRef.current,
    {
      add: ['focused']
    }
  );

  const handleMouseUp = mouseHandler(!isFirst, order, exampleListRef.current, {
    remove: ['focused']
  });

  const handleMouseOver = mouseHandler(
    !isFirst,
    order,
    exampleListRef.current,
    {
      add: ['switch-target']
    }
  );

  const handleMouseOut = mouseHandler(!isFirst, order, exampleListRef.current, {
    remove: ['switch-target', 'focused']
  });

  return (
    <Container isFirst={isFirst}>
      <ExampleContainer>
        <DeleteButton type="button" onClick={handleDelete(order)}>
          <TrashIcon />
          <span className="sr-only">예문 삭제</span>
        </DeleteButton>
        <FormContainer>
          <Form
            id={`${id}-example-text-${order}`}
            maxLength={255}
            label="예문"
            labelFontSize="sm"
            labelFontSizeMobile="xs"
            isTextarea
            noPadding
            showLength
          />
          <Form
            id={`${id}-example-translation-${order}`}
            maxLength={255}
            label="해석"
            labelFontSize="sm"
            labelFontSizeMobile="xs"
            isTextarea
            noPadding
            showLength
          />
        </FormContainer>
      </ExampleContainer>
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
            <span className="sr-only">예문 순서 교체</span>
          </SwitchButton>
        </SwitchButtonWrapper>
      )}
    </Container>
  );
}

export default Example;
