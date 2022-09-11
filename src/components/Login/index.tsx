import Button from '@components/common/Button';
import Logo from '@components/common/Logo';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import GoogleIcon from '@assets/images/google.svg';
import KakaoIcon from '@assets/images/kakao.png';
import { Color } from '@emotion/react';
import useRedirect from '@hooks/useRedirect';
import useVerifyRefreshToken from '@hooks/useVerifyRefreshToken';

interface LoginButtonProps extends Props {
  provider: 'google' | 'kakao';
  icon: React.ReactNode;
  backgroundColor: keyof Color;
  color: keyof Color;
  fontFamily: string;
  href: string;
}

const Container = styled.div`
  padding: ${pxToRem(80, 0, 40)};

  & > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

const LoginContainer = styled.div`
  width: ${pxToRem(400)};
  padding: ${pxToRem(40, 30)};
  margin-top: ${pxToRem(40)};
  border: ${border()} ${({ theme }) => theme.color.BROWN_DARK};
  border-radius: ${pxToRem(10)};
`;

const Title = styled.h2`
  margin: ${pxToRem(30, 0, 50)};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-align: center;
`;

const ButtonItem = styled.li<{ fontFamily: string }>`
  ${flex('center')};
  position: relative;
  width: fit-content;
  margin: ${pxToRem(0, 'auto', 20)};

  & strong {
    flex: 1;
    padding-left: ${pxToRem(14)};
    font-family: ${({ fontFamily }) => fontFamily};
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSize.xs};
    text-align: center;
  }
`;

const ButtonInnerWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`;

const IconWrapper = styled.span`
  display: inline-block;
  overflow: hidden;
  position: relative;
  width: ${pxToRem(38)};
  height: ${pxToRem(38)};

  & svg,
  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const { API_URL } = process.env;

function LoginButton({
  provider,
  icon,
  color,
  backgroundColor,
  fontFamily,
  href,
  children
}: LoginButtonProps) {
  return (
    <ButtonItem fontFamily={fontFamily}>
      <Button
        type="login"
        backgroundColor={backgroundColor}
        color={color}
        border={[1, provider === 'google' ? 'BORDER' : 'KAKAO_YELLOW']}
        borderRadius={12}
        href={href}
        useAnchor
      >
        <ButtonInnerWrapper>
          <IconWrapper>{icon}</IconWrapper>
          <strong>{children}</strong>
        </ButtonInnerWrapper>
      </Button>
    </ButtonItem>
  );
}

function Login() {
  const isLoggedIn = useVerifyRefreshToken();
  useRedirect(isLoggedIn);

  if (isLoggedIn) {
    return null;
  }

  return (
    <Container>
      <Logo />
      <LoginContainer>
        <Title>로그인</Title>
        <ul>
          <LoginButton
            provider="google"
            icon={<GoogleIcon viewBox="0 0 46 46" />}
            backgroundColor="WHITE"
            color="GOOGLE_BLACK"
            href={`${API_URL}/auth/google`}
            fontFamily="Rotobo, sans-serif"
          >
            Google 계정으로 로그인
          </LoginButton>
          <LoginButton
            provider="kakao"
            icon={<img src={KakaoIcon} width="18" height="17" />}
            backgroundColor="KAKAO_YELLOW"
            color="KAKAO_BLACK"
            fontFamily={`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`}
            href={`${API_URL}/auth/kakao`}
          >
            카카오 로그인
          </LoginButton>
        </ul>
      </LoginContainer>
    </Container>
  );
}

export default Login;
