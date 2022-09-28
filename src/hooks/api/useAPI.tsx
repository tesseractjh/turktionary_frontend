import { UseQueryOptions, useQuery, QueryKey } from '@tanstack/react-query';
import useOnError from './useOnError';
import useQueryFunction from './useQueryFunction';

function useAPI<T>(
  queryKey: QueryKey,
  API: (...args: any) => Promise<ResultData<T>>,
  options?: UseQueryOptions<ResultData<T>> & ExtraOptions
) {
  const queryFn = useQueryFunction(queryKey, API);
  const onError = useOnError({
    useAlert: options?.useAlert ?? true,
    ...options
  });

  return useQuery<ResultData<T>>(queryKey, queryFn, {
    ...options,
    onError
  });
}

export default useAPI;
