import { QueryFunction, QueryKey } from '@tanstack/react-query';

function useQueryFunction<T>(
  queryKey: QueryKey,
  API: (...args: any) => Promise<T>
) {
  const queryFunction = (async () => {
    const res = await API({
      ...(queryKey[1] as Record<string, unknown>)
    });
    return res;
  }) as QueryFunction<T, QueryKey>;
  return queryFunction;
}

export default useQueryFunction;
