import DictContentContainer from '@components/common/DictContentContainer';
import useLogin from '@hooks/api/useLogin';
import useLanguage from '@hooks/useLanguage';
import Form from '../../Form';
import VocaSelection from '../../Form/VocaSelection';

interface VocaEditProps {
  isCreate?: boolean;
}

function VocaEdit({ isCreate }: VocaEditProps) {
  const { langId, langName } = useLanguage();
  const isLoggedIn = useLogin(-1);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <DictContentContainer
      title={`${langName} 어휘 ${isCreate ? '추가' : '편집'}`}
    >
      <Form
        id={`${langId}-voca-headword`}
        label="표제어"
        maxLength={255}
        placeholder="사전에 등재될 표제어를 입력해주세요."
      />
      <VocaSelection id="synonym" label="유의어" />
      <VocaSelection id="antonym" label="반의어" />
      <VocaSelection id="cognate" label="동원어" findAll />
      <div style={{ marginBottom: 500 }}></div>
    </DictContentContainer>
  );
}

export default VocaEdit;
