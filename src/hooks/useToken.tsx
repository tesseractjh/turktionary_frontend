import { useCallback, useEffect } from 'react';
import userAPI from '@api/user';
import useSetAccessToken from '@hooks/useSetAccessToken';
import useAPI from './useAPI';

const useToken = () => {
  const api = useAPI();
  const setAccessToken = useSetAccessToken();

  const initiateAccessToken = useCallback(async () => {
    await api(userAPI.getAccessToken(), ({ accessToken }) => {
      if (accessToken) {
        setAccessToken(accessToken);
      }
    })();
  }, []);

  useEffect(() => {
    initiateAccessToken();
  }, []);
};

export default useToken;
