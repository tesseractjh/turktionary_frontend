import type { UseQueryOptions } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { accessTokenState } from '@recoil/user';

interface ExtraQueryOptions {
  useBoundary?: boolean;
  useAlert?: boolean;
}

interface HandleError {
  queryKey: string | any[];
  API: (...args: any) => Promise<any>;
  setAccessToken: SetterOrUpdater<string>;
  setRedirect: React.Dispatch<React.SetStateAction<string>>;
  options?: ExtraQueryOptions;
}

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

const handleError =
  ({ queryKey, API, setAccessToken, setRedirect, options }: HandleError) =>
  async () => {
    try {
      const res = await API(...queryKey.slice(1));
      return res;
    } catch (error) {
      if (options?.useBoundary) {
        throw error;
      }

      const { error: errorResponse } = ((error as AxiosError)?.response
        ?.data as {
        error: ErrorResponse;
      }) ?? {
        error: defaultError(error as AxiosError)
      };
      const { code, message, redirect, clearAccessToken } = errorResponse;

      console.error(message);

      if (clearAccessToken) {
        setAccessToken('');
      }

      if (options?.useAlert && errorMap[code]) {
        alert(errorMap[code]);
      }

      if (redirect) {
        setRedirect(redirect);
      }

      // mount 전에 navigate 할 수 없기 때문에
      // 만약 mount 전에 실행되었다면 window.location.href로 강제로 리디렉트
      if (redirect) {
        window.location.href = `${window.location.origin}${redirect}`;
      }

      return null;
    }
  };

function useAPI<T>(
  queryKey: string | string[],
  API: (...args: any) => Promise<T>,
  options?: UseQueryOptions<T> & ExtraQueryOptions
) {
  const [redirect, setRedirect] = useState('');
  const setAccessToken = useSetRecoilState(accessTokenState);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
    }
  }, [redirect]);

  return useQuery<T>(
    typeof queryKey === 'string' ? [queryKey] : [...queryKey],
    handleError({
      queryKey,
      API,
      setAccessToken,
      setRedirect,
      options: {
        useBoundary: options?.useBoundary ?? false,
        useAlert: options?.useAlert ?? true
      }
    }),
    {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
      ...options
    }
  );
}

export default useAPI;
