import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import PopupContainer from '@components/common/PopupContainer';
import { useCallback, useEffect } from 'react';
import getLevelAndExp from '@utils/getLevelAndExp';
import ExperiencePoint from './ExperiencePoint';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import useMutationAPI from '@hooks/useMutationAPI';
import userAPI from '@api/user';

interface UserMenuProps {
  user: Model.UserTable;
  handleDocumentClick: (event: MouseEvent) => void;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const Wrapper = styled.div`
  ${flex('space-between', 'stretcth')}
  flex-direction: column;
  height: 100%;
`;

const Info = styled.div`
  padding: ${pxToRem(16, 20)};
`;

const Level = styled.span`
  margin-right: ${pxToRem(20)};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.md};
`;

const Nickname = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.TEAL_DARK};
`;

const TotalExperience = styled.span`
  display: inline-block;
  width: 100%;
  margin-top: ${pxToRem(10)};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

function UserMenu({
  user,
  handleDocumentClick,
  hidden,
  setHidden
}: UserMenuProps) {
  const [level, prevRequirement, curRequirement] = getLevelAndExp(
    user.user_exp
  );
  const navigate = useNavigate();
  const { mutate: logout } = useMutationAPI(userAPI.logout);

  const handleMyPageClick = useCallback(() => {
    navigate(`/mypage?user=${encodeURIComponent(user.user_name)}`);
  }, [user]);

  const handleLogoutClick = useCallback(() => {
    logout(
      {},
      {
        onSuccess: () => navigate(0)
      }
    );
  }, []);

  return (
    <PopupContainer
      id="popup-user"
      className="popup-user"
      role="menu"
      width={300}
      bottomHeight={214}
      hidden={hidden}
      setHidden={setHidden}
      handleDocumentClick={handleDocumentClick}
      aria-labelledby="btn-user-popup"
      topContent="내 정보"
    >
      <Wrapper>
        <Info>
          <Level>{`Lv.${level}`}</Level>
          <Nickname>{user.user_name}</Nickname>
          <TotalExperience>{`전체 경험치: ${user.user_exp}`}</TotalExperience>
          <ExperiencePoint
            totalExp={user.user_exp}
            exp={user.user_exp - prevRequirement}
            requirement={curRequirement - prevRequirement}
          />
        </Info>
        <ul>
          <Button onClick={handleMyPageClick}>마이페이지</Button>
          <Button onClick={handleLogoutClick} color="RED">
            로그아웃
          </Button>
        </ul>
      </Wrapper>
    </PopupContainer>
  );
}

export default UserMenu;
