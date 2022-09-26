import { useEffect } from 'react';
import { To, useNavigate } from 'react-router-dom';
import useAccessToken from './useAccessToken';

function useLogin(redirect?: To | number) {
  const accessToken = useAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      alert('로그인이 필요합니다!');
      if (typeof redirect === 'number') {
        navigate(redirect);
      } else {
        navigate(redirect ?? '/login');
      }
    }
  }, [accessToken]);

  return !!accessToken;
}

export default useLogin;
