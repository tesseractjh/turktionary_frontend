import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { dictFormListState, dictFormState } from '@recoil/dict';
import useLanguage from '@hooks/useLanguage';
import useAPIWithToken from '@hooks/api/useAPIWithToken';
import posAPI from '@api/pos';
import SelectBox from '@components/common/SelectBox';

interface POSSelectionProps {
  id: string;
}

function POSSelection({ id }: POSSelectionProps) {
  const { langId } = useLanguage();
  const placeholder = '품사 선택';
  const setSelectedPOS = useSetRecoilState<Model.POS>(dictFormState(id));
  const setPosList = useSetRecoilState(dictFormListState(`${langId}-voca-pos`));

  const { data } = useAPIWithToken(
    ['posSelection', { langId }],
    posAPI.getPosList
  );

  const handleItemClick = (pos: Model.POS) => () => {
    setSelectedPOS(pos);
  };

  const selectionListCallback = useCallback(
    (Item: (props: any) => JSX.Element, props?: Record<string, any>) =>
      (selection: Model.POS) => {
        const { pos_id, pos_name } = selection;
        return (
          <Item {...props} key={pos_id} onClick={handleItemClick(selection)}>
            {pos_name}
          </Item>
        );
      },
    []
  );

  useEffect(() => {
    if (data) {
      setPosList(data.map(({ pos_id }) => pos_id));
    }
  }, [data]);

  return (
    <SelectBox
      id={id}
      placeholder={placeholder}
      selectionList={data ?? []}
      selectionListCallback={selectionListCallback}
    />
  );
}

export default POSSelection;
