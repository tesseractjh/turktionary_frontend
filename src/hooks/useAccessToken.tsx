import userAPI from '@api/user';
import useAPI from '@hooks/useAPI';

function useAccessToken() {
  const {
    data: { accessToken }
  } = useAPI('getAccessToken', userAPI.getAccessToken, {
    refetchInterval: 55 * 60 * 1000
  });
  return accessToken;
}

export default useAccessToken;
