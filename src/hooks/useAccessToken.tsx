import userAPI from '@api/user';
import useAPI from '@hooks/useAPI';

function useAccessToken() {
  const { data } = useAPI('getAccessToken', userAPI.getAccessToken, {
    refetchInterval: 55 * 60 * 1000
  });
  return data?.accessToken;
}

export default useAccessToken;
