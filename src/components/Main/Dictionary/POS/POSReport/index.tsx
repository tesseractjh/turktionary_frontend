import { Link, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import posAPI from '@api/pos';
import useAPI from '@hooks/useAPI';
import useLanguage from '@hooks/useLanguage';
import useLogin from '@hooks/useLogin';
import pxToRem from '@utils/pxToRem';
import DictContentContainer from '@components/common/DictContentContainer';
import Form from '../../Form';
import SubmitButton from '@components/common/SubmitButton';
import usePOSReportSubmit from '@hooks/usePOSReportSubmit';

const Text = styled.p`
  padding-left: ${pxToRem(10)};
  margin-bottom: ${pxToRem(10)};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const Label = styled.span`
  margin-right: ${pxToRem(10)};
  font-size: ${({ theme }) => theme.fontSize.md};
`;

const UserName = styled(Link)`
  font-weight: 600;
  color: ${({ theme }) => theme.color.TEAL_DARK};
`;

const Target = styled(Link)`
  padding: ${pxToRem(4, 6)};
  margin-left: ${pxToRem(10)};
  border-radius: ${pxToRem(4)};
  background-color: ${({ theme }) => theme.color.BROWN_DARK};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.WHITE};
`;

function POSReport() {
  const isAllowed = useLogin(-1);
  const { langId, langName } = useLanguage();
  const { posId } = useParams();
  const { data } = useAPI(['posReport', posId], posAPI.getPos, {
    staleTime: 60 * 60 * 1000
  });

  if (!isAllowed) {
    return null;
  }

  return (
    <DictContentContainer title="신고하기" headerColor="RED">
      <Text>
        <Label>신고 대상:</Label>
        <UserName to={`/mypage?user=${data?.pos.user_name}`}>
          {data?.pos.user_name}
        </UserName>
        {`님이 작성한 ${langName} 품사`}
        <Target to={`/${langId}/pos/edit/${data?.pos.pos_order}`}>
          {data?.pos.pos_name}
        </Target>
      </Text>
      <Form
        id={`pos-${posId}-report-text`}
        label="신고 사유"
        maxLength={500}
        placeholder="신고 사유를 작성해주세요."
        showLength
        isTextarea
      />
      <SubmitButton useClickHandler={usePOSReportSubmit} />
    </DictContentContainer>
  );
}

export default POSReport;
