import { useSearchParams } from 'react-router-dom';

function useQueryParams() {
  const [params] = useSearchParams();
  return Object.fromEntries(params.entries());
}

export default useQueryParams;
