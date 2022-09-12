import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { joinResultState } from '@recoil/join';
import useRedirect from '@hooks/useRedirect';
import pxToRem from '@utils/pxToRem';
import InnerContainer from '@components/common/InnerContainer';
import Button from '@components/common/Button';
import Message from './Message';

const Container = styled.div`
  width: 100%;
  margin-top: ${pxToRem(40)};
  text-align: center;

  @media ${({ theme }) => theme.media.mobile} {
    margin-top: ${pxToRem(24)};
  }
`;

const Title = styled.h2`
  margin-top: ${pxToRem(40)};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.lg};
  text-align: center;

  @media ${({ theme }) => theme.media.mobile} {
    margin-top: ${pxToRem(24)};
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

const Paragraph = styled.p`
  width: 100%;
  padding: ${pxToRem(0, 20)};
  margin: ${pxToRem(40, 'auto')};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: 1.5;
  text-align: center;

  @media ${({ theme }) => theme.media.mobile} {
    margin: ${pxToRem(24, 'auto')};
  }
`;

function JoinSuccess() {
  const result = useRecoilValue(joinResultState);
  useRedirect(!result);

  if (!result) {
    return null;
  }

  return (
    <Container>
      <InnerContainer>
        <Message />
        <Title>환영합니다!</Title>
        <Paragraph>
          귀하는 이제 Turktionary 기여자의 일원으로서 튀르크어 사전을 편집하실
          수 있습니다.
          <br />더 나은 Turktionary를 위해 귀하의 지식을 기꺼이 공유해주실 것을
          기대하며 미리 감사드립니다.
        </Paragraph>
        <Button type="lg" backgroundColorHover="BROWN" href="/" useAnchor>
          홈으로
        </Button>
      </InnerContainer>
    </Container>
  );
}

export default JoinSuccess;
