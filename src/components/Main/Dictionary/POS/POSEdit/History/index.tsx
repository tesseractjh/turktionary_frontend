import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import posAPI from '@api/pos';
import useAPI from '@hooks/api/useAPI';
import useLanguage from '@hooks/useLanguage';
import DictContentContainer from '@components/common/DictContentContainer';
import Log from './Log';
import withAsyncBoundary from '@hoc/withErrorBoundaryAndSuspense';
import Deferred from '@components/common/Deferred';
import useAPIWithToken from '@hooks/api/useAPIWithToken';

function History() {
  const { langId } = useLanguage();
  const { posOrder } = useParams();

  const { data } = useAPIWithToken(
    ['posHistory', { langId, posOrder }],
    posAPI.getPosHistory
  );

  return (
    <DictContentContainer title="최근 편집 기록" headerColor="BEIGE">
      {data?.pos?.map((pos, index) => {
        return (
          <Suspense key={pos.pos_id}>
            <Log
              langId={langId}
              posOrder={posOrder as string}
              pos={pos}
              index={index}
            />
          </Suspense>
        );
      })}
    </DictContentContainer>
  );
}

export default withAsyncBoundary(History, {
  SuspenseFallback: (
    <DictContentContainer
      title="최근 편집 기록"
      headerColor="BEIGE"
      isLoading
    />
  )
});
