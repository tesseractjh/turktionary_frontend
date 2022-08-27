import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';

const Container = styled.div`
  max-width: ${pxToRem(1200)};
  margin: 0 auto;
`;

function InnerContainer({ children }: Props) {
  return <Container>{children}</Container>;
}

export default InnerContainer;
