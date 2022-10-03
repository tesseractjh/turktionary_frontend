import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilCallback } from 'recoil';
import { dictFormState } from '@recoil/dict';
import posAPI from '@api/pos';
import useLanguage from '../useLanguage';
import useMutationAPI from './useMutationAPI';
import useMutationOnSuccess from './useMutationOnSuccess';

const validateForm = (reportText: string) => {
  const safeReportText = reportText.trim().slice(0, 500);
  const isValid = !!safeReportText;
  const errorMsg = '품사 이름을 입력해주세요!';

  return [isValid, errorMsg, safeReportText];
};

function usePOSReportSubmit() {
  const { langId } = useLanguage();
  const { posId } = useParams();
  const navigate = useNavigate();
  const onSuccess = useMutationOnSuccess<Model.POS[]>();

  const { mutate: createPOSReport, mutateAsync: createPOSReportAsync } =
    useMutationAPI(posAPI.createPosReport);

  const handleClick = useRecoilCallback(
    ({ snapshot, reset }) =>
      async () => {
        const posReportTextState = dictFormState(`pos-${posId}-report-text`);
        const unsafeReportText = await snapshot.getPromise(posReportTextState);

        const [isValid, errorMsg, reportText] = validateForm(unsafeReportText);

        if (!isValid) {
          alert(errorMsg);
          return;
        }

        const body = {
          vocaPropertyName: 'pos',
          reportTargetId: posId,
          reportText
        };

        createPOSReport(
          { body },
          {
            onSuccess: async (data, variables) => {
              await onSuccess(data, variables, createPOSReportAsync, () => {
                reset(posReportTextState);
                alert('정상적으로 제출되었습니다!');
                navigate(`/${langId}/pos`);
              });
            }
          }
        );
      },
    []
  );

  return handleClick;
}

export default usePOSReportSubmit;
