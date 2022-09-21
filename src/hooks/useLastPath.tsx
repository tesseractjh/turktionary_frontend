import { useLocation } from 'react-router-dom';

function useLastPath() {
  const { pathname } = useLocation();
  const paths = pathname.split('/');
  return paths[paths.length - 1];
}

export default useLastPath;
