import { useRecoilValue } from 'recoil';
import { dictFormListState } from '@recoil/dict';
import useLanguage from '@hooks/useLanguage';
import AddPOS from './AddPOS';
import POS from './POS';

function Meanings() {
  const { langId } = useLanguage();
  const posList = useRecoilValue(
    dictFormListState(`${langId}-voca-selected-pos`)
  );

  return (
    <>
      <AddPOS />
      {posList.map((pos) => (
        <POS key={pos.pos_id} pos={pos} />
      ))}
    </>
  );
}

export default Meanings;
