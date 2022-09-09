import userAPI from '@api/user';
import useAPI from './useAPI';

function useVerifyRefreshToken() {
  const { data } = useAPI('getIsLoggedIn', userAPI.getIsLoggedIn);
  return data?.isLoggedIn;
}

export default useVerifyRefreshToken;
