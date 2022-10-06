import posAPI from '@api/pos';
import { dictFormPrevState, dictFormState } from '@recoil/dict';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilCallback } from 'recoil';
import useLanguage from '../../useLanguage';
import useMutationAPI from '../useMutationAPI';
import useMutationOnSuccess from '../useMutationOnSuccess';

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
  const navigate = useNavigate();
  const onSuccess = useMutationOnSuccess<Model.POS[]>();

  const { mutate: createPOS, mutateAsync: createPOSAsync } = useMutationAPI(
    posAPI.createPos
  );

  const { mutate: updatePOS, mutateAsync: updatePOSAsync } = useMutationAPI(
    posAPI.updatePos
  );

  const handleClick = useRecoilCallback(
    ({ snapshot, reset }) =>
      async () => {
        const posNameState = dictFormState(`${langId}-pos-name`);
        const posTextState = dictFormState(`${langId}-pos-text`);
        const prevPosIdState = dictFormPrevState(`${langId}-pos-id`);
        const prevPosNameState = dictFormPrevState(`${langId}-pos-name`);
        const prevPosTextState = dictFormPrevState(`${langId}-pos-text`);

        const unsafePosName = await snapshot.getPromise(posNameState);
        const unsafePosText = await snapshot.getPromise(posTextState);
        const prevPosId = await snapshot.getPromise(prevPosIdState);
        const prevPosName = await snapshot.getPromise(prevPosNameState);
        const prevPosText = await snapshot.getPromise(prevPosTextState);

        const [isValid, errorMsg, newPosName, newPosText] = validateForm(
          unsafePosName,
          unsafePosText,
          prevPosName,
          prevPosText
        );

        if (!isValid) {
          alert(errorMsg);
          return;
        }

        if (isCreate) {
          createPOS(
            { body: { langId, posName: newPosName, posText: newPosText } },
            {
              onSuccess: async (data, variables) => {
                await onSuccess(data, variables, createPOSAsync, () => {
                  reset(posNameState);
                  reset(posTextState);
                  alert('정상적으로 제출되었습니다!');
                  navigate(`/${langId}/pos`);
                });
              }
            }
          );
        } else {
          updatePOS(
            {
              body: {
                posId: prevPosId,
                posName: newPosName,
                posText: newPosText
              }
            },
            {
              onSuccess: async (data, variables) => {
                await onSuccess(data, variables, updatePOSAsync, () => {
                  reset(posNameState);
                  reset(posTextState);
                  alert('정상적으로 제출되었습니다!');
                  navigate(`/${langId}/pos`);
                });
              }
            }
          );
        }
      },
    [isCreate]
  );

  return handleClick;
}

export default usePOSSubmit;
