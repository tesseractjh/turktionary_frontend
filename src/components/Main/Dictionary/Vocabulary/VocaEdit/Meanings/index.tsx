import { useRecoilValue } from 'recoil';
import { dictFormListState } from '@recoil/dict';
import AddPOS from './AddPOS';
import POS from './POS';

function Meanings() {
  const posList = useRecoilValue(dictFormListState('voca-pos'));

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
