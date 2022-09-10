import { useEffect, useState } from 'react';
import userAPI from '@api/user';
import useSetAccessToken from '@hooks/useSetAccessToken';
import useAPI from './useAPI';

const useToken = () => {
  const [user, setUser] = useState({ user_name: '', user_exp: 0 });
  const setAccessToken = useSetAccessToken();
  const { refetch } = useAPI('getHeaderUserInfo', userAPI.getHeaderUserInfo, {
    enabled: false
  });

  useEffect(() => {
    (async () => {
      const { data } = await refetch();
      if (data) {
        const { accessToken, user } = data;
        setAccessToken(accessToken);
        setUser(user);
      }
    })();
  }, []);

  return user;
};

export default useToken;
