import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import posAPI from '@api/pos';
import useAPI from '@hooks/useAPI';
import getDateString from '@utils/getDateString';
import getLevelAndExp from '@utils/getLevelAndExp';
import pxToRem from '@utils/pxToRem';
import Diff from './Diff';

interface LogProps {
  langId: string;
  posOrder: string;
  pos: Model.POSHistory['pos'][number];
  index: number;
}

const Container = styled.div``;

const LogText = styled.div`
  ${flex('space-between')}
  max-width: ${pxToRem(450)};
  min-width: ${pxToRem(400)};
  margin-bottom: ${pxToRem(16)};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const CompareButton = styled.button`
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
`;

const Time = styled.time`
  padding-right: ${pxToRem(10)};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const UserLevel = styled.span`
  padding: ${pxToRem(0, 10)};
  border-left: ${border(2)} ${({ theme }) => theme.color.BROWN};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const UserName = styled(Link)`
  font-weight: 600;
  color: ${({ theme }) => theme.color.TEAL_DARK};
`;

function Log({ langId, posOrder, pos, index }: LogProps) {
  const { user_exp, user_name, pos_id, created_time } = pos;
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useAPI(
    ['posHistoryDiff', langId, posOrder, pos_id],
    posAPI.getPosHistoryDiff,
    { enabled: isOpen, staleTime: Infinity }
  );

  const handleClick = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  return (
    <Container>
      <LogText>
        <span>
          <CompareButton type="button" onClick={handleClick}>
            {isOpen ? '숨기기' : '비교'}
          </CompareButton>
          <Time>{getDateString(created_time).dateString}</Time>
        </span>
        <span>
          <UserLevel>{`Lv ${getLevelAndExp(user_exp)[0]}`}</UserLevel>
          <UserName to={`/mypage?user=${user_name}`}>{user_name}</UserName>
        </span>
      </LogText>
      {isOpen && data ? (
        <>
          <Diff
            title="품사 이름"
            prev={data?.pos[1]?.pos_name ?? ''}
            cur={data?.pos[0]?.pos_name ?? ''}
            index={index}
          />
          <Diff
            title="품사 설명"
            prev={data?.pos[1]?.pos_text ?? ''}
            cur={data?.pos[0]?.pos_text ?? ''}
            index={index}
          />
        </>
      ) : null}
    </Container>
  );
}

export default Log;
