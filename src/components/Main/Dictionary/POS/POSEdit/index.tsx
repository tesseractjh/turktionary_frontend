import useLanguage from '@hooks/useLanguage';
import DictContentContainer from '@components/common/DictContentContainer';
import Form from '../../Form';
import SubmitButton from './SubmitButton';
import useLogin from '@hooks/useLogin';

interface POSEditProps {
  isCreate?: boolean;
}

function POSEdit({ isCreate }: POSEditProps) {
  const { langId, langName } = useLanguage();
  const isAllowed = useLogin(-1);

  if (!isAllowed) {
    return null;
  }

  return (
    <DictContentContainer
      title={`${langName} 품사 ${isCreate ? '추가' : '편집'}`}
    >
      <Form
        id={`${langId}-pos-name`}
        label="품사 이름"
        maxLength={20}
        placeholder="품사 이름"
        showLength
      />
      <Form
        id={`${langId}-pos-text`}
        label="품사 설명"
        maxLength={255}
        placeholder="품사의 정의에 대해 작성해주세요."
        showLength
        isTextarea
      />
      <SubmitButton />
    </DictContentContainer>
  );
}

export default POSEdit;
