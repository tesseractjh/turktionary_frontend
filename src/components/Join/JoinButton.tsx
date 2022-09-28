import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  joinCheckboxState,
  joinResultState,
  joinTextState,
  joinTextValidationState
} from '@recoil/join';
import userAPI from '@api/user';
import Button from '@components/common/Button';
import useMutationAPI from '@hooks/api/useMutationAPI';

function JoinButton() {
  const nickname = useRecoilValue(joinTextState('nickname'));
  const isNicknameValid = useRecoilValue(joinTextValidationState('nickname'));
  const email = useRecoilValue(joinTextState('email'));
  const isEmailValid = useRecoilValue(joinTextValidationState('email'));
  const agreement = useRecoilValue(joinCheckboxState('termsOfUse'));
  const setJoinResult = useSetRecoilState(joinResultState);
  const navigate = useNavigate();

  const { mutate: join } = useMutationAPI(userAPI.updateUser);

  const isValid = isNicknameValid && isEmailValid && agreement;

  const handleClick = async () => {
    if (!isValid) {
      return;
    }
    join(
      { body: { nickname, email } },
      {
        onSuccess: () => {
          setJoinResult(true);
          navigate('/join/success');
        }
      }
    );
  };

  return (
    <Button
      type="lg"
      stretchWidth
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
