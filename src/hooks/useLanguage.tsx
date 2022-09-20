import LANG from '@constants/language';
import { useLocation } from 'react-router-dom';

function useLanguage() {
  const { pathname } = useLocation();
  const langId = pathname.split('/')[1];
  const langName = Object.entries(LANG).find(([, { id }]) => id === langId)?.[1]
    .name;

  return { langId, langName };
}

export default useLanguage;
