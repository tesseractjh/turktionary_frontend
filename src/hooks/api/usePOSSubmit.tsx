import posAPI from '@api/pos';
import { dictFormPrevState, dictFormState } from '@recoil/dict';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilCallback } from 'recoil';
import useLanguage from '../useLanguage';
import useMutationAPI from './useMutationAPI';

interface UsePOSSumbitProps {
  isCreate?: boolean;
}

const validateForm = (
  posName: string,
  posText: string,
  prevPosName: string,
  prevPosText: string
) => {
  const safePosName = posName.trim().slice(0, 20);
  const safePosText = posText.trim().slice(0, 255);
  let isValid = true;
  let errorMsg = '';

  if (posName === prevPosName && posText === prevPosText) {
    isValid = false;
    errorMsg = '변동된 내용이 없습니다!';
  }

  if (!safePosName) {
    isValid = false;
    errorMsg = '품사 이름을 입력해주세요!';
  }

  return [isValid, errorMsg, safePosName, safePosText];
};

function usePOSSubmit({ isCreate }: UsePOSSumbitProps) {
  const { langId } = useLanguage();
  const { posOrder } = useParams();
  const navigate = useNavigate();

  const { mutate: createPOS } = useMutationAPI(posAPI.createPos);

  const handleClick = useRecoilCallback(
    ({ snapshot, reset }) =>
      async () => {
        const posNameState = dictFormState(`${langId}-pos-name`);
        const posTextState = dictFormState(`${langId}-pos-text`);
        const prevPosNameState = dictFormPrevState(`${langId}-pos-name`);
        const prevPosTextState = dictFormPrevState(`${langId}-pos-text`);

        const unsafePosName = await snapshot.getPromise(posNameState);
        const unsafePosText = await snapshot.getPromise(posTextState);
        const prevPosName = await snapshot.getPromise(prevPosNameState);
        const prevPosText = await snapshot.getPromise(prevPosTextState);

        const [isValid, errorMsg, posName, posText] = validateForm(
          unsafePosName,
          unsafePosText,
          prevPosName,
          prevPosText
        );

        if (!isValid) {
          alert(errorMsg);
          return;
        }

        const body = isCreate
          ? { langId, posName, posText }
          : { langId, posName, posText, posOrder };

        createPOS(
          { body },
          {
            onSuccess: (data) => {
              if (!data) {
                return;
              }
              reset(posNameState);
              reset(posTextState);
              alert('정상적으로 제출되었습니다!');
              navigate(`/${langId}/pos`);
            }
          }
        );
      },
    [isCreate]
  );

  return handleClick;
}

export default usePOSSubmit;
