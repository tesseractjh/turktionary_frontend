import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  joinCheckboxState,
  joinResultState,
  joinTextState,
  joinTextValidationState
} from '@recoil/join';
import { accessTokenState } from '@recoil/user';
import userAPI from '@api/user';
import useAPI from '@hooks/useAPI';
import Button from '@components/common/Button';

function JoinButton() {
  const nickname = useRecoilValue(joinTextState('nickname'));
  const isNicknameValid = useRecoilValue(joinTextValidationState('nickname'));
  const email = useRecoilValue(joinTextState('email'));
  const isEmailValid = useRecoilValue(joinTextValidationState('email'));
  const agreement = useRecoilValue(joinCheckboxState('termsOfUse'));
  const setJoinResult = useSetRecoilState(joinResultState);
  const setAccessToken = useSetRecoilState(accessTokenState);
  const { refetch } = useAPI<{ accessToken: string }>(
    ['createUser', nickname, email],
    userAPI.updateUser,
    { enabled: false }
  );
  const navigate = useNavigate();

  const isValid = isNicknameValid && isEmailValid && agreement;

  const handleClick = async () => {
    if (!isValid) {
      return;
    }
    const { data } = await refetch();
    if (data) {
      const { accessToken } = data;
      setAccessToken(accessToken);
      setJoinResult(true);
      navigate('/join/success');
    }
  };

  return (
    <Button
      width={'100%'}
      backgroundColor={isValid ? 'TEAL_DARK' : 'BORDER'}
      backgroundColorHover={isValid ? 'TEAL' : undefined}
      colorHover={isValid ? 'TEAL_DARK' : undefined}
      onClick={handleClick}
    >
      가입하기
    </Button>
  );
}

export default JoinButton;
