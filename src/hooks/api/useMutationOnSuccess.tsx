import axios from 'axios';
import { UseMutateAsyncFunction, useQueryClient } from '@tanstack/react-query';

function useMutationOnSuccess<T>() {
  const queryClient = useQueryClient();

  return async (
    data: ResultData<T>,
    variables: MutationParams,
    mutateAsync: UseMutateAsyncFunction<ResultData<T>, unknown, MutationParams>,
    onSuccess: (data: T) => void
  ) => {
    if (!data) {
      return;
    }

    let resultData = data;

    if (data.refreshAccessToken) {
      await queryClient.invalidateQueries(['accessToken']);
      const newToken = queryClient.getQueryData<{ accessToken: string }>([
        'accessToken'
      ]);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${newToken?.accessToken}`;
      resultData = await mutateAsync(variables);
    }

    onSuccess(resultData);
  };
}

export default useMutationOnSuccess;
