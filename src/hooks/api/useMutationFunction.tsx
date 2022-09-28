import { MutationFunction } from '@tanstack/react-query';

function useMutationFunction<T>(API: (...args: any) => Promise<T>) {
  const queryFunction = (async (params) => {
    const res = await API(params);
    return res;
  }) as MutationFunction<T, MutationParams>;
  return queryFunction;
}

export default useMutationFunction;
