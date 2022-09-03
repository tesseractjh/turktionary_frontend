import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { joinResultState } from '@recoil/join';
import pxToRem from '@utils/pxToRem';
import InnerContainer from '@components/common/InnerContainer';
import Button from '@components/common/Button';
import Message from './Message';

const Container = styled.div`
  width: 100%;
  margin-top: ${pxToRem(80)};
  text-align: center;
`;

const Title = styled.h2`
  margin-top: ${pxToRem(20)};
  font-weight: 700;
  font-size: ${pxToRem(28)};
  text-align: center;
`;

const Paragraph = styled.p`
  width: 100%;
  margin: ${pxToRem(40)} auto;
  font-size: ${pxToRem(16)};
  line-height: 1.5;
  text-align: center;
`;

const Anchor = styled.a`
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: ${pxToRem(10)};
`;

function JoinSuccess() {
  const result = useRecoilValue(joinResultState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!result) {
      navigate('/');
    }
  }, [result]);

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
        <Button width={200} padding={0} backgroundColorHover="BROWN">
          <Anchor href="/">홈으로</Anchor>
        </Button>
      </InnerContainer>
    </Container>
  );
}

export default JoinSuccess;
