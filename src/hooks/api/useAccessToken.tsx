import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import userAPI from '@api/user';

function useAccessToken() {
  const { data } = useQuery(['accessToken'], userAPI.getAccessToken, {
    staleTime: 60 * 60 * 1000,
    refetchInterval: 55 * 60 * 1000,
    onSuccess: (data) => {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.accessToken}`;
    }
  });

  return data?.accessToken;
}

export default useAccessToken;
