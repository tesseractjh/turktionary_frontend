import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import { Link } from 'react-router-dom';
import DictContentContainer from './DictContentContainer';

const LicenseLink = styled.a`
  font-weight: 500;
  color: ${({ theme }) => theme.color.BROWN_DARK};

  &:hover {
    text-decoration: underline;
  }
`;

const Sentence = styled.p`
  margin-bottom: ${pxToRem(10)};

  &:last-of-type {
    margin: 0;
  }

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

function License() {
  return (
    <DictContentContainer hideHeader>
      <Sentence>
        {'모든 사전 데이터는 '}
        <LicenseLink href="https://creativecommons.org/licenses/by-sa/3.0/deed.ko">
          CC-BY-SA 3.0
        </LicenseLink>
        에 따라 이용할 수 있습니다.
      </Sentence>
      <Sentence>
        Turktionary는 사용자 참여형 사전으로, 잘못된 정보가 포함되어 있을 수
        있습니다.
      </Sentence>
      <Sentence>
        작성된 문서의 저작권은 각 기여자에게 있으며, 이용약관에 위배되는 저술은
        운영진에 의해 삭제될 수 있습니다.
      </Sentence>
    </DictContentContainer>
  );
}

export default License;
