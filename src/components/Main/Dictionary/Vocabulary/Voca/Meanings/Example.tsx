import styled from '@emotion/styled';
import { border } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

interface ExampleProps {
  example: Model.Example;
}

const Container = styled.li`
  padding-left: ${pxToRem(10)};
  margin: ${pxToRem(0, 0, 20, 20)};
  border-left: ${border(4)} ${({ theme }) => theme.color.BEIGE};
  color: ${({ theme }) => theme.color.GRAY_DARK};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Text = styled.p`
  margin-bottom: ${pxToRem(4)};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const Translation = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

function Example({ example }: ExampleProps) {
  const { example_text, example_translation } = example;
  return (
    <Container>
      <Text>{example_text}</Text>
      <Translation>{example_translation}</Translation>
    </Container>
  );
}

export default Example;
