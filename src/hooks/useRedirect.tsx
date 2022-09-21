import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useRedirect(
  condition: boolean,
  options?: { path?: string | number; onBefore?: () => void }
) {
  const navigate = useNavigate();
  const redirect = (condition: boolean) => () => {
    if (condition) {
      if (options?.onBefore) {
        options?.onBefore();
      }
      if (typeof options?.path === 'number') {
        navigate(options?.path);
      } else {
        navigate(options?.path ?? '/');
      }
    }
  };

  useEffect(() => {
    redirect(condition)();
  }, []);

  return redirect(true);
}

export default useRedirect;
