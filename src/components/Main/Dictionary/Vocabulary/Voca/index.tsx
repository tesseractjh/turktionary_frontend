import vocaAPI from '@api/voca';
import DictContentContainer from '@components/common/DictContentContainer';
import useAPI from '@hooks/api/useAPI';
import useLanguage from '@hooks/useLanguage';
import useQueryParams from '@hooks/useQueryParams';
import { useSearchParams } from 'react-router-dom';
import CoreInfo from './CoreInfo';

function Voca() {
  const { langId } = useLanguage();
  const { word: headword, order: vocaOrder } = useQueryParams();
  const { data } = useAPI(
    ['vocaInfo', { langId, headword, vocaOrder: Number(vocaOrder) }],
    vocaAPI.getVocaInfo
  );

  if (!data) {
    return (
      <DictContentContainer hideHeader>
        검색 결과가 존재하지 않습니다
      </DictContentContainer>
    );
  }

  return (
    <>
      <CoreInfo
        headword={headword}
        vocaOrder={Number(vocaOrder)}
        vocaInfo={data}
      />
      <DictContentContainer hideHeader></DictContentContainer>
    </>
  );
}

export default Voca;
