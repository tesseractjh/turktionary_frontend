import userAPI from '@api/user';
import { accessTokenState, accessTokenTimerIdState } from '@recoil/user';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import useAPI from './useAPI';

const ACCESS_TOKEN_EXPIRY = 60 * 60 * 1000;

function useSetAccessToken() {
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setTimerId = useSetRecoilState(accessTokenTimerIdState);
  const api = useAPI();
  const output = (token: string) => {
    setAccessToken(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const timerId = setTimeout(async () => {
      await api(userAPI.getAccessToken(), (token) => output(token))();
    }, ACCESS_TOKEN_EXPIRY - 3 * 60 * 1000);
    setTimerId(timerId);
  };
  return output;
}

export default useSetAccessToken;
