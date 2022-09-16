import {
  MutationFunction,
  useMutation,
  UseMutationOptions
} from '@tanstack/react-query';
import useHandleError, { ExtraQueryOptions } from '@hooks/useHandleError';

function useMutationAPI<T>(
  API: (...args: any) => Promise<T>,
  options?: UseMutationOptions<T> & ExtraQueryOptions
) {
  const handleError = useHandleError();
  return useMutation<T, unknown, MutationParams>(
    handleError({
      API,
      options: {
        useBoundary: options?.useBoundary ?? false,
        useAlert: options?.useAlert ?? true
      }
    })
  );
}

export default useMutationAPI;
