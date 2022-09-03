import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { css } from '@emotion/react';
import {
  joinCheckboxState,
  joinResultState,
  joinTextState,
  joinTextValidationState
} from '@recoil/join';
import Button from '@components/common/Button';
import { accessTokenState } from '@recoil/user';
import useAPI from '@hooks/useAPI';
import userAPI from '@api/user';

function JoinButton() {
  const nickname = useRecoilValue(joinTextState('nickname'));
  const isNicknameValid = useRecoilValue(joinTextValidationState('nickname'));
  const email = useRecoilValue(joinTextState('email'));
  const isEmailValid = useRecoilValue(joinTextValidationState('email'));
  const agreement = useRecoilValue(joinCheckboxState('termsOfUse'));
  const setJoinResult = useSetRecoilState(joinResultState);
  const setAccessToken = useSetRecoilState(accessTokenState);
  const api = useAPI();
  const navigate = useNavigate();

  const isValid = isNicknameValid && isEmailValid && agreement;

  const handleClick = async () => {
    if (!isValid) {
      return;
    }
    await api(userAPI.updateUser(nickname, email), ({ accessToken }) => {
      if (accessToken) {
        setAccessToken(accessToken);
        setJoinResult(true);
        navigate('/join/success');
      }
    })();
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
