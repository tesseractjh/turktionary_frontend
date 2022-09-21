import { useRecoilCallback } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { dictFormState } from '@recoil/dict';
import posAPI from '@api/pos';
import useLanguage from '@hooks/useLanguage';
import useMutationAPI from '@hooks/useMutationAPI';
import pxToRem from '@utils/pxToRem';
import Button from '@components/common/Button';
import { useNavigate } from 'react-router-dom';
import useAlertBeforeLeave from '@hooks/useAlertBeforeLeave';

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

function SubmitButton() {
  useAlertBeforeLeave();

  const { langId } = useLanguage();
  const queryClient = useQueryClient();
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

        createPOS(
          {
            body: {
              langId,
              posName,
              posText
            }
          },
          {
            onSuccess: () => {
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
    []
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
