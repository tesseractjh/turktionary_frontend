import { useRecoilCallback } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { dictFormState } from '@recoil/dict';
import posAPI from '@api/pos';
import useLanguage from '@hooks/useLanguage';
import useMutationAPI from '@hooks/useMutationAPI';
import pxToRem from '@utils/pxToRem';
import Button from '@components/common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import useAlertBeforeLeave from '@hooks/useAlertBeforeLeave';

interface SubmitButtonProps {
  isCreate: boolean;
}

const ButtonContainer = styled.div`
  padding-right: ${pxToRem(10)};
  margin-top: ${pxToRem(30)};
  text-align: right;
`;

const validateForm = (posName: string, posText: string) => {
  const safePosName = posName.trim().slice(0, 20);
  const safePosText = posText.trim().slice(0, 255);
  const isValid = !!safePosName;
  return [isValid, safePosName, safePosText];
};

function SubmitButton({ isCreate }: SubmitButtonProps) {
  useAlertBeforeLeave();

  const { langId } = useLanguage();
  const queryClient = useQueryClient();
  const { posOrder } = useParams();
  const navigate = useNavigate();
  const { mutate: createPOS } = useMutationAPI(posAPI.createPos);

  const handleClick = useRecoilCallback(
    ({ snapshot, reset }) =>
      async () => {
        const posNameState = dictFormState(`${langId}-pos-name`);
        const posTextState = dictFormState(`${langId}-pos-text`);
        const unsafePosName = await snapshot.getPromise(posNameState);
        const unsafePosText = await snapshot.getPromise(posTextState);

        const [isValid, posName, posText] = validateForm(
          unsafePosName,
          unsafePosText
        );

        if (!isValid) {
          alert('품사 이름을 입력해주세요!');
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
