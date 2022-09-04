import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { accessTokenState } from '@recoil/user';

const errorMap: Partial<Record<ErrorCode, string>> = {
  '000': '알 수 없는 오류가 발생하였습니다!',
  '001': '로그인이 필요합니다!',
  '002': '자동 로그인 기간이 만료되어 로그아웃되었습니다!',
  '003': '회원가입 도중 오류가 발생하였습니다! 다시 시도해주세요.',
  '004': '회원가입 도중 오류가 발생하였습니다! 다시 시도해주세요.',
  '005': '유효하지 않은 값이 입력되었습니다! 다시 시도해주세요.',
  '006': '회원가입 도중 오류가 발생하였습니다! 다시 시도해주세요.',
  '999': '서버와의 연결이 끊어졌습니다!'
};

const defaultError = (error: AxiosError) => {
  const { code } = error;
  if (code === 'ERR_NETWORK') {
    return { code: '999', message: errorMap['999'] };
  }
  return { code: '000', message: errorMap['000'] };
};

function useAPI() {
  const setAccessToken = useSetRecoilState(accessTokenState);
  const navigate = useNavigate();
  return (
      API: Promise<any>,
      onResponse: (res: any) => void,
      onError?: (code: ErrorCode, message: string, redirect?: string) => void
    ) =>
    async () => {
      try {
        const res = await API;
        onResponse(res);
      } catch (error) {
        const { error: errorResponse } = ((error as AxiosError)?.response
          ?.data as { error: ErrorResponse }) ?? {
          error: defaultError(error as AxiosError)
        };
        const { code, message, redirect, clearAccessToken } = errorResponse;

        console.error(message);

        if (clearAccessToken) {
          setAccessToken('');
        }

        if (onError) {
          onError(code, message, redirect);
        }

        alert(errorMap[code]);

        if (redirect) {
          navigate(redirect);
        }
      }
    };
}

export default useAPI;
