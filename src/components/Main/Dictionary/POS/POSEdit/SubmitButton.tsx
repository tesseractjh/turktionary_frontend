import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilCallback } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { dictFormPrevState, dictFormState } from '@recoil/dict';
import posAPI from '@api/pos';
import useLanguage from '@hooks/useLanguage';
import useMutationAPI from '@hooks/useMutationAPI';
import useAlertBeforeLeave from '@hooks/useAlertBeforeLeave';
import pxToRem from '@utils/pxToRem';
import Button from '@components/common/Button';

interface SubmitButtonProps {
  isCreate: boolean;
}

const ButtonContainer = styled.div`
  padding-right: ${pxToRem(10)};
  margin-top: ${pxToRem(30)};
  text-align: right;
`;

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

function SubmitButton({ isCreate }: SubmitButtonProps) {
  useAlertBeforeLeave();

  const { langId } = useLanguage();
  const { posOrder } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
              queryClient.invalidateQueries([
                `${langId}-pos-name`,
                `${langId}-pos-text`
              ]);
              alert('정상적으로 제출되었습니다!');
              navigate(`/${langId}/pos`);
            }
          }
        );
      },
    [isCreate]
  );

  return (
    <ButtonContainer>
      <Button type="sm" backgroundColorHover="BROWN" onClick={handleClick}>
        제출
      </Button>
    </ButtonContainer>
  );
}

export default SubmitButton;
