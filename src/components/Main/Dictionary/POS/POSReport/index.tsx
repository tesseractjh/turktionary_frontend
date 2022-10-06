import { Link, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import posAPI from '@api/pos';
import useLanguage from '@hooks/useLanguage';
import useLogin from '@hooks/api/useLogin';
import usePOSReportSubmit from '@hooks/api/submit/usePOSReportSubmit';
import useAPIWithToken from '@hooks/api/useAPIWithToken';
import pxToRem from '@utils/pxToRem';
import DictContentContainer from '@components/common/DictContentContainer';
import SubmitButton from '@components/common/SubmitButton';
import Form from '../../Form';

const Text = styled.p`
  ${flex('flex-start')}
  padding-left: ${pxToRem(10)};
  margin-bottom: ${pxToRem(10)};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.sm};

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const Label = styled.span`
  flex-shrink: 0;
  align-self: flex-start;
  margin-right: ${pxToRem(10)};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 1.5;

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const TargetInfo = styled.span`
  line-height: 1.5;
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

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

function POSReport() {
  const isLoggedIn = useLogin(-1);
  const { langId, langName } = useLanguage();
  const { posId } = useParams();
  const { data } = useAPIWithToken(
    ['posReport', { posId }],
    posAPI.getPosById,
    {
      staleTime: 60 * 60 * 1000
    }
  );

  if (!isLoggedIn || !data) {
    return null;
  }

  return (
    <DictContentContainer title="신고하기" headerColor="RED">
      <Text>
        <Label>신고 대상:</Label>
        <TargetInfo>
          <UserName to={`/mypage?user=${data.user_name}`}>
            {data.user_name}
          </UserName>
          {`님이 작성한 ${langName} 품사`}
          <Target to={`/${langId}/pos/edit/${data.pos_name}`}>
            {data.pos_name}
          </Target>
        </TargetInfo>
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
