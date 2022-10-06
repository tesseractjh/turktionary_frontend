import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { dictFormPrevState, dictFormState } from '@recoil/dict';
import posAPI from '@api/pos';
import useLanguage from '@hooks/useLanguage';
import useLogin from '@hooks/api/useLogin';
import useRedirect from '@hooks/useRedirect';
import usePOSSubmit from '@hooks/api/submit/usePOSSubmit';
import useAPIWithToken from '@hooks/api/useAPIWithToken';
import DictContentContainer from '@components/common/DictContentContainer';
import History from '@components/Main/Dictionary/POS/POSEdit/History';
import SubmitButton from '@components/common/SubmitButton';
import Form from '../../Form';

interface POSEditProps {
  isCreate?: boolean;
}

function POSEdit({ isCreate }: POSEditProps) {
  const { langId, langName } = useLanguage();
  const isLoggedIn = useLogin(-1);
  const { posName } = useParams();
  const redirect = useRedirect(false, {
    path: -1,
    onBefore: () => {
      alert('존재하지 않는 페이지입니다!');
    }
  });
  const setPosName = useSetRecoilState(dictFormState(`${langId}-pos-name`));
  const setPosText = useSetRecoilState(dictFormState(`${langId}-pos-text`));
  const setPrevPosId = useSetRecoilState(dictFormPrevState(`${langId}-pos-id`));
  const setPrevPosName = useSetRecoilState(
    dictFormPrevState(`${langId}-pos-name`)
  );
  const setPrevPosText = useSetRecoilState(
    dictFormPrevState(`${langId}-pos-text`)
  );

  const { data } = useAPIWithToken(
    ['posByLangAndName', { langId, posName }],
    posAPI.getPosByLangAndName,
    { enabled: !isCreate }
  );

  useEffect(() => {
    if (isCreate) {
      setPosName('');
      setPosText('');
      setPrevPosId('');
      setPrevPosName('');
      setPrevPosText('');
    } else {
      const {
        pos_name: posName,
        pos_text: posText,
        pos_id: posId
      } = data ?? {};
      if (posId) {
        setPosName(posName as string);
        setPosText(posText as string);
        setPrevPosId(posId.toString());
        setPrevPosName(posName as string);
        setPrevPosText(posText as string);
      } else if (!data?.refreshAccessToken) {
        redirect();
      }
    }
  }, [data]);

  if (!isLoggedIn) {
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
        <SubmitButton useClickHandler={usePOSSubmit} isCreate={!!isCreate} />
      </DictContentContainer>
      {isCreate ? null : <History />}
    </>
  );
}

export default POSEdit;
