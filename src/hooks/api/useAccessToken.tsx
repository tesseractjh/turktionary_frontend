import userAPI from '@api/user';
import useAPI from '@hooks/api/useAPI';

function useAccessToken() {
  const { data } = useAPI('getAccessToken', userAPI.getAccessToken, {
    staleTime: 60 * 60 * 1000,
    refetchInterval: 55 * 60 * 1000
  });
  return data?.accessToken;
}

export default useAccessToken;
