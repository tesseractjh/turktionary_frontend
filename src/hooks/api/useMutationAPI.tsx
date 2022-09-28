import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import useMutationFunction from './useMutationFunction';
import useOnError from './useOnError';

function useMutationAPI<T>(
  API: (...args: any) => Promise<ResultData<T>>,
  options?: UseMutationOptions<ResultData<T>, unknown, MutationParams> &
    ExtraOptions
) {
  const mutationFn = useMutationFunction(API);
  const onError = useOnError({
    useAlert: options?.useAlert ?? true,
    ...options
  });

  return useMutation<ResultData<T>, unknown, MutationParams>(mutationFn, {
    ...options,
    onError
  });
}

export default useMutationAPI;
