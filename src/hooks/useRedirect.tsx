import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useRedirect(
  condition: boolean,
  options?: { path?: string; onBefore: () => void }
) {
  const navigate = useNavigate();
  useEffect(() => {
    if (condition) {
      if (options?.onBefore) {
        options?.onBefore();
      }
      navigate(options?.path ?? '/');
    }
  }, []);
}

export default useRedirect;
