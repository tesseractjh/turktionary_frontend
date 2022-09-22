import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { dictFormPrevState, dictFormState } from '@recoil/dict';
import posAPI from '@api/pos';
import useLanguage from '@hooks/useLanguage';
import useLogin from '@hooks/useLogin';
import useAPI from '@hooks/useAPI';
import useRedirect from '@hooks/useRedirect';
import DictContentContainer from '@components/common/DictContentContainer';
import History from '@components/Main/Dictionary/POS/POSEdit/History';
import Form from '../../Form';
import SubmitButton from './SubmitButton';

interface POSEditProps {
  isCreate?: boolean;
}

function POSEdit({ isCreate }: POSEditProps) {
  const { langId, langName } = useLanguage();
  const isAllowed = useLogin(-1);
  const { posOrder } = useParams();
  const redirect = useRedirect(false, {
    path: -1,
    onBefore: () => {
      alert('존재하지 않는 데이터입니다!');
    }
  });
  const setPosName = useSetRecoilState(dictFormState(`${langId}-pos-name`));
  const setPosText = useSetRecoilState(dictFormState(`${langId}-pos-text`));
  const setPrevPosName = useSetRecoilState(
    dictFormPrevState(`${langId}-pos-name`)
  );
  const setPrevPosText = useSetRecoilState(
    dictFormPrevState(`${langId}-pos-text`)
  );

  const { data } = useAPI(
    ['posByLangAndName', langId, posOrder],
    posAPI.getPosByLangAndName,
    {
      enabled: isAllowed && !isCreate
    }
  );

  useEffect(() => {
    if (isCreate) {
      setPosName('');
      setPosText('');
      setPrevPosName('');
      setPrevPosText('');
    } else {
      const { pos_name: posName, pos_text: posText } = data?.pos ?? {};
      if (posName) {
        setPosName(posName as string);
        setPosText(posText as string);
        setPrevPosName(posName as string);
        setPrevPosText(posText as string);
      } else {
        redirect();
      }
    }
  }, [data]);

  if (!isAllowed) {
    return null;
  }

  return (
    <>
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
        <SubmitButton isCreate={!!isCreate} />
      </DictContentContainer>
      {isCreate ? null : <History />}
    </>
  );
}

export default POSEdit;
