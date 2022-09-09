import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { accessTokenState, accessTokenTimerIdState } from '@recoil/user';
import userAPI from '@api/user';
import useAPI from '@hooks/useAPI';

const ACCESS_TOKEN_EXPIRY = 60 * 60 * 1000;

function useSetAccessToken() {
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setTimerId = useSetRecoilState(accessTokenTimerIdState);
  const { refetch } = useAPI<{ accessToken: string }>(
    'getAccessToken',
    userAPI.getAccessToken,
    { enabled: false, staleTime: 0, cacheTime: 60 * 60 * 1000 }
  );
  const output = (token: string) => {
    setAccessToken(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const timerId = setTimeout(async () => {
      const { data } = await refetch();
      if (data) {
        const { accessToken } = data;
        output(accessToken);
      }
    }, ACCESS_TOKEN_EXPIRY - 3 * 60 * 1000);
    setTimerId(timerId);
  };
  return output;
}

export default useSetAccessToken;
