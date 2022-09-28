import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import posAPI from '@api/pos';
import useAPI from '@hooks/api/useAPI';
import getDateString from '@utils/getDateString';
import getLevelAndExp from '@utils/getLevelAndExp';
import pxToRem from '@utils/pxToRem';
import Diff from './Diff';
import useAPIWithToken from '@hooks/api/useAPIWithToken';

interface LogProps {
  langId: string;
  posOrder: string;
  pos: Model.POSHistoryList['pos'][number];
  index: number;
}

const Container = styled.div``;

const LogText = styled.div`
  ${flex('space-between')}
  max-width: ${pxToRem(450)};
  margin-bottom: ${pxToRem(16)};
  font-size: ${({ theme }) => theme.fontSize.sm};

  @media ${({ theme }) => theme.media.mobile} {
    flex-wrap: wrap;
  }
`;

const Wrapper = styled.span`
  ${flex('center', 'center', true)};
`;

const CompareButton = styled.button`
  flex-shrink: 0;
  padding-right: ${pxToRem(20)};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.BROWN_DARK};

  &:hover {
    text-decoration: underline;
  }

  &::before {
    content: '';
    display: inline-block;
    width: ${pxToRem(8)};
    height: ${pxToRem(8)};
    margin-right: ${pxToRem(10)};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.BROWN};
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: ${pxToRem(75)};
    padding-right: ${pxToRem(10)};
  }
`;

const Time = styled.time`
  padding-right: ${pxToRem(10)};
  font-size: ${({ theme }) => theme.fontSize.xs};

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.custom('xs', -2)};
  }
`;

const User = styled.span`
  border-left: ${border(2)} ${({ theme }) => theme.color.BROWN};

  @media ${({ theme }) => theme.media.mobile} {
    width: 100%;
    padding-left: ${pxToRem(75)};
    margin-top: ${pxToRem(10)};
    border: none;
  }
`;

const UserLevel = styled.span`
  padding: ${pxToRem(0, 10)};
  font-size: ${({ theme }) => theme.fontSize.xs};

  @media ${({ theme }) => theme.media.mobile} {
    padding-left: 0;
  }
`;

const UserName = styled(Link)`
  font-weight: 600;
  color: ${({ theme }) => theme.color.TEAL_DARK};
`;

function Log({ langId, posOrder, pos, index }: LogProps) {
  const { user_exp, user_name, pos_id, created_time } = pos;
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useAPIWithToken(
    ['posHistoryDiff', { langId, posOrder, posId: pos_id }],
    posAPI.getPosHistoryDiff,
    { enabled: isOpen, staleTime: Infinity }
  );

  const handleClick = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  return (
    <Container>
      <LogText>
        <Wrapper>
          <CompareButton type="button" onClick={handleClick}>
            {isOpen ? '숨기기' : '비교'}
          </CompareButton>
          <Time>{getDateString(created_time).dateString}</Time>
        </Wrapper>
        <User>
          <UserLevel>{`Lv ${getLevelAndExp(user_exp)[0]}`}</UserLevel>
          <UserName to={`/mypage?user=${user_name}`}>{user_name}</UserName>
        </User>
      </LogText>
      {isOpen && data ? (
        <>
          <Diff
            title="품사 이름"
            prev={data?.pos?.[1]?.pos_name ?? ''}
            cur={data?.pos?.[0]?.pos_name ?? ''}
            index={index}
          />
          <Diff
            title="품사 설명"
            prev={data?.pos?.[1]?.pos_text ?? ''}
            cur={data?.pos?.[0]?.pos_text ?? ''}
            index={index}
          />
        </>
      ) : null}
    </Container>
  );
}

export default Log;
