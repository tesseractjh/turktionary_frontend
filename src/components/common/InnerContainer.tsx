import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';

interface InnerContainerProps extends Props {
  mobileNoPadding?: boolean;
}

const Container = styled.div<{ mobileNoPadding?: boolean }>`
  max-width: ${pxToRem(1200)};
  padding: ${pxToRem(0, 40)};
  margin: 0 auto;

  @media ${({ theme }) => theme.media.tablet} {
    padding: ${pxToRem(0, 20)};
  }

  ${({ mobileNoPadding, theme }) =>
    mobileNoPadding
      ? `
    @media ${theme.media.mobile} {
      padding: 0;
    }
    `
      : ''}
`;

function InnerContainer({ mobileNoPadding, children }: InnerContainerProps) {
  return <Container mobileNoPadding={mobileNoPadding}>{children}</Container>;
}

export default InnerContainer;
