import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import PopupContainer from '@components/common/styledComponents/PopupContainer';
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
}

const Top = styled.div`
  ${flex('flex-start')}
  height: ${pxToRem(36)};
  padding: ${pxToRem(0, 10)};
  background-color: ${({ theme }) => theme.color.BROWN_DARK};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.WHITE};
`;

const Bottom = styled.div`
  ${flex('space-between', 'stretch')}
  flex-direction: column;
  height: ${pxToRem(214)};
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
  color: ${({ theme }) => theme.color.BROWN_DARK};
`;

const TotalExperience = styled.span`
  display: inline-block;
  width: 100%;
  margin-top: ${pxToRem(10)};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

function UserMenu({ user, handleDocumentClick, hidden }: UserMenuProps) {
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

  useEffect(() => {
    if (hidden) {
      document.removeEventListener('click', handleDocumentClick);
    } else {
      document.addEventListener('click', handleDocumentClick);
    }
  }, [hidden]);

  return (
    <PopupContainer
      id="popup-user"
      hidden={hidden}
      className="popup-user"
      role="menu"
      aria-labelledby="btn-user-popup"
    >
      <Top>내 정보</Top>
      <Bottom>
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
      </Bottom>
    </PopupContainer>
  );
}

export default UserMenu;
