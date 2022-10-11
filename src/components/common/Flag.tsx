import TurkeyFlagIcon from '@assets/images/flags/turkey.svg';
import AzerbaijanFlagIcon from '@assets/images/flags/azerbaijan.svg';
import UzbekistanFlagIcon from '@assets/images/flags/uzbekistan.svg';
import KazakhstanFlagIcon from '@assets/images/flags/kazakhstan.svg';
import TurkmenistanFlagIcon from '@assets/images/flags/turkmenistan.svg';
import KyrgyzstanFlagIcon from '@assets/images/flags/kyrgyzstan.svg';

interface FlagProps {
  nation: Exclude<DictionaryType, 'ALL'>;
}

function Flag({ nation }: FlagProps) {
  switch (nation) {
    case 'TR':
      return <TurkeyFlagIcon viewBox="0 0 32 24" />;
    case 'AZ':
      return <AzerbaijanFlagIcon viewBox="0 0 32 24" />;
    case 'UZ':
      return <UzbekistanFlagIcon viewBox="0 0 32 24" />;
    case 'KZ':
      return <KazakhstanFlagIcon viewBox="0 0 32 24" />;
    case 'TM':
      return <TurkmenistanFlagIcon viewBox="0 0 32 24" />;
    case 'KG':
      return <KyrgyzstanFlagIcon viewBox="0 0 32 24" />;
    default:
      return null;
  }
}

export default Flag;
