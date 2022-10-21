import styled from '@emotion/styled';
import { border } from '@styles/minxin';
import useLogin from '@hooks/api/useLogin';
import useLanguage from '@hooks/useLanguage';
import useVocaSubmit from '@hooks/api/submit/useVocaSubmit';
import pxToRem from '@utils/pxToRem';
import DictContentContainer from '@components/common/DictContentContainer';
import SubmitButton from '@components/common/SubmitButton';
import Form from '../../Form';
import VocaSelection from '../../Form/VocaSelection';
import Meanings from './Meanings';

interface VocaEditProps {
  isCreate?: boolean;
}

const Wrapper = styled.div`
  &:not(:last-of-type) {
    padding-bottom: ${pxToRem(20)};
    margin-bottom: ${pxToRem(20)};
    border-bottom: ${border()} ${({ theme }) => theme.color.GRAY};
  }
`;

function VocaEdit({ isCreate }: VocaEditProps) {
  const { langId, langName } = useLanguage();
  const isLoggedIn = useLogin(-1);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <DictContentContainer
        title={`${langName} 어휘 ${isCreate ? '추가' : '편집'}`}
      >
        <Wrapper>
          <Form
            id={`${langId}-voca-headword`}
            label="표제어"
            maxLength={50}
            placeholder="사전에 등재될 표제어를 입력해주세요."
            showLength
          />
          <VocaSelection id="synonym" label="유의어" />
          <VocaSelection id="antonym" label="반의어" />
          <VocaSelection id="cognate" label="동원어" findAll />
        </Wrapper>
        <Wrapper>
          <Meanings />
        </Wrapper>
        <Wrapper>
          <Form
            id={`${langId}-voca-etymology`}
            label="어원"
            maxLength={255}
            placeholder="표제어의 어원에 대한 설명을 입력해주세요."
            isTextarea
            showLength
          />
        </Wrapper>
        <SubmitButton useClickHandler={useVocaSubmit} isCreate={!!isCreate} />
      </DictContentContainer>
    </>
  );
}

export default VocaEdit;
