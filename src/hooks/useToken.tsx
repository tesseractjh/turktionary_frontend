import { useEffect } from 'react';
import userAPI from '@api/user';
import useSetAccessToken from '@hooks/useSetAccessToken';
import useAPI from './useAPI';

const useToken = () => {
  const api = useAPI();
  const setAccessToken = useSetAccessToken();

  useEffect(() => {
    (async () => {
      await api(userAPI.getAccessToken(), ({ accessToken }) =>
        setAccessToken(accessToken)
      )();
    })();
  });
};

export default useToken;
