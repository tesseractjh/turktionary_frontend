import { QueryClient, QueryKey, useQueryClient } from '@tanstack/react-query';
import { CustomError } from '@utils/customError';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ExtraQueryOptions {
  useBoundary?: boolean;
  useAlert?: boolean;
}

interface HandleError {
  queryKey?: QueryKey;
  API: (...args: any) => Promise<any>;
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
  '013': '중복된 데이터입니다!',
  '999': '서버와의 연결이 끊어졌습니다!'
};

const defaultError = (error: AxiosError) => {
  const { code } = error;
  if (code === 'ERR_NETWORK') {
    return { code: '999', message: errorMap['999'] };
  }
  return { code: '000', message: errorMap['000'] };
};

function useHandleError() {
  const [redirect, setRedirect] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate(redirect);
    }
  }, [redirect]);

  return ({ queryKey, API, options }: HandleError) =>
    async (params: MutationParams) => {
      try {
        const res = queryKey
          ? await API(...queryKey.slice(1))
          : await API(params);
        const { accessToken } = res;
        if (accessToken) {
          queryClient.setQueryData(['getAccessToken'], accessToken);
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
        }
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
          queryClient.setQueryData(['getAccessToken'], '');
          axios.defaults.headers.common['Authorization'] = '';
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
}

export default useHandleError;
