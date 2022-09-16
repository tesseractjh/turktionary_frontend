import {
  QueryFunction,
  QueryKey,
  UseQueryOptions
} from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import useHandleError, { ExtraQueryOptions } from './useHandleError';

function useAPI<T>(
  queryKey: string | QueryKey,
  API: (...args: any) => Promise<T>,
  options?: UseQueryOptions<T> & ExtraQueryOptions
) {
  const handleError = useHandleError();
  return useQuery<T>(
    typeof queryKey === 'string' ? [queryKey] : [...queryKey],
    handleError({
      queryKey: typeof queryKey === 'string' ? [queryKey] : [...queryKey],
      API,
      options: {
        useBoundary: options?.useBoundary ?? false,
        useAlert: options?.useAlert ?? true
      }
    }) as QueryFunction<T, QueryKey>,
    {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
      ...options
    }
  );
}

export default useAPI;
