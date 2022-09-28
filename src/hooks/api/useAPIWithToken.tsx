import { useEffect } from 'react';
import {
  QueryKey,
  useQueryClient,
  UseQueryOptions
} from '@tanstack/react-query';
import userAPI from '@api/user';
import useAccessToken from './useAccessToken';
import useAPI from './useAPI';

function useAPIWithToken<T>(
  queryKey: QueryKey,
  API: (...args: any) => Promise<ResultData<T>>,
  options?: UseQueryOptions<ResultData<T>> & ExtraOptions
) {
  const queryClient = useQueryClient();
  const accessToken = useAccessToken();
  const queryResult = useAPI<T>(
    queryKey.length < 2
      ? [...queryKey, {}, { accessToken }]
      : [...queryKey, { accessToken }],
    API,
    {
      ...options,
      enabled: (options?.enabled ?? true) && !!accessToken
    }
  );

  useEffect(() => {
    if (
      queryResult.data?.refreshAccessToken &&
      !userAPI.isAccessTokenFetching
    ) {
      userAPI.isAccessTokenFetching = true;
      (async () => {
        queryClient.cancelQueries({
          predicate: (query) => query.queryKey[0] !== 'accessToken'
        });
        await queryClient.invalidateQueries(['accessToken']);
        userAPI.isAccessTokenFetching = false;
      })();
    }
  }, [queryResult]);

  return queryResult;
}

export default useAPIWithToken;
