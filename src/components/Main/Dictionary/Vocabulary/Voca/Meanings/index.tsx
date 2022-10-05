import DictContentContainer from '@components/common/DictContentContainer';
import MeaningList from './MeaningList';

interface MeaningsProps {
  meanings: Model.MeaningList[];
}

function Meanings({ meanings }: MeaningsProps) {
  return (
    <DictContentContainer hideHeader>
      {meanings?.map((meaningList) => (
        <MeaningList
          key={`meaning-pos-${meaningList.pos_name}`}
          meaningList={meaningList}
        />
      ))}
    </DictContentContainer>
  );
}

export default Meanings;
