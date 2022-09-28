import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { border } from '@styles/minxin';
import { joinInputTimerId, joinTextState } from '@recoil/join';
import userAPI from '@api/user';
import useAPI from '@hooks/api/useAPI';
import useVerifyRefreshToken from '@hooks/api/useVerifyRefreshToken';
import useRedirect from '@hooks/useRedirect';
import debounce from '@utils/debounce';
import pxToRem from '@utils/pxToRem';
import { emailValidation } from '@utils/validation';
import JoinButton from './JoinButton';
import JoinCheckbox from './JoinCheckbox';
import JoinText from './JoinText';

const Container = styled.div`
  position: relative;
  width: ${pxToRem(500)};
  padding: ${pxToRem(40, 30)};
  margin-top: ${pxToRem(40)};
  border: ${border()} ${({ theme }) => theme.color.BROWN_DARK};
  border-radius: ${pxToRem(10)};

  @media ${({ theme }) => theme.media.tablet} {
    width: ${pxToRem(450)};
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: ${pxToRem(350)};
    padding: ${pxToRem(30, 24)};
    & input::placeholder {
      color: transparent;
    }
  }

  @media ${({ theme }) => theme.media.galaxyFold} {
    width: ${pxToRem(260)};
    padding: 0;
    border: none;
    & input::placeholder {
      color: transparent;
    }
  }
`;

const Title = styled.h2`
  margin-bottom: ${pxToRem(30)};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-align: center;

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

function NickNameInput() {
  const nickname = useRecoilValue(joinTextState('nickname'));
  const [timerId, setTimerId] = useRecoilState(joinInputTimerId);
  const { refetch } = useAPI(
    ['getHasUserName', { nickname }],
    userAPI.getHasUserName,
    { enabled: false }
  );

  const handleChange = useCallback(
    (
        setState: SetterOrUpdater<string>,
        setValidation: React.Dispatch<React.SetStateAction<boolean>>,
        setStatus: React.Dispatch<React.SetStateAction<string>>
      ) =>
      ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
        const { value } = currentTarget;
        const nickname = value.slice(0, 20);
        setState(nickname);
        if (nickname.match(/[^a-zA-ZÀ-ž\u0370-\u03FF\u0400-\u04FFㄱ-힣0-9]/)) {
          setStatus('SPECIAL_LETTERS');
          setValidation(false);
          return;
        }

        if (nickname.length < 4) {
          setStatus('NONE');
          setValidation(false);
          return;
        }

        if (nickname.match(/^\d/)) {
          setStatus('STARTS_WITH_NUMBER');
          setValidation(false);
          return;
        }

        debounce(
          timerId,
          setTimerId,
          async () => {
            const { data } = await refetch();
            if (data) {
              const { hasDuplicate } = data;
              if (hasDuplicate) {
                setStatus('DUPLICATE_NICKNAME');
                setValidation(false);
              } else {
                setStatus('VALID_NICKNAME');
                setValidation(true);
              }
            }
          },
          350
        )();
      },
    [timerId]
  );

  return (
    <JoinText
      param="nickname"
      label="닉네임"
      handleChange={handleChange}
      placeholder="한글, 로마자, 키릴문자, 숫자로 4~20자 이내"
      maxLength={20}
      showLength
    />
  );
}

function EmailInput() {
  const [email, setEmail] = useState('');
  const { data } = useAPI(['getUserEmail'], userAPI.getUserEmail);

  useEffect(() => {
    if (data) {
      const { email } = data;
      setEmail(email);
    }
  }, [data]);

  const handleChange = useCallback(
    (
        setState: SetterOrUpdater<string>,
        setValidation: React.Dispatch<React.SetStateAction<boolean>>,
        setStatus: React.Dispatch<React.SetStateAction<string>>
      ) =>
      ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
        const { value } = currentTarget;
        const email = value.slice(0, 255);
        setState(email);
        if (email.length >= 6) {
          if (
            email.match(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ) {
            setStatus('VALID_EMAIL');
            setValidation(true);
          } else {
            setStatus('INVALID_EMAIL');
            setValidation(false);
          }
        } else {
          setStatus('NONE');
          setValidation(false);
        }
      },
    []
  );

  return (
    <JoinText
      param="email"
      label="이메일"
      handleChange={handleChange}
      maxLength={255}
      defaultValue={email}
      defaultValueValidation={emailValidation}
    />
  );
}

function JoinForm() {
  const isLoggedIn = useVerifyRefreshToken();
  useRedirect(isLoggedIn);

  if (isLoggedIn) {
    return null;
  }

  return (
    <Container>
      <Title>회원가입</Title>
      <NickNameInput />
      <EmailInput />
      <JoinCheckbox
        param="termsOfUse"
        label="약관동의"
        text="이용약관에 동의"
      />
      <JoinButton />
    </Container>
  );
}

export default JoinForm;
