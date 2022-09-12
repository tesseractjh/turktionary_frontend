import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';

const Container = styled.div`
  max-width: ${pxToRem(1200)};
  padding: ${pxToRem(0, 40)};
  margin: 0 auto;

  @media ${({ theme }) => theme.media.tablet} {
    padding: ${pxToRem(0, 20)};
  }
`;

function InnerContainer({ children }: Props) {
  return <Container>{children}</Container>;
}

export default InnerContainer;
