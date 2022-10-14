import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import posAPI from '@api/pos';
import useLanguage from '@hooks/useLanguage';
import useAPIWithToken from '@hooks/api/useAPIWithToken';
import withAsyncBoundary from '@hoc/withErrorBoundaryAndSuspense';
import DictContentContainer from '@components/common/DictContentContainer';
import Log from './Log';

function History() {
  const { langId } = useLanguage();
  const { posName } = useParams();

  const { data } = useAPIWithToken(
    ['posHistory', { langId, posName }],
    posAPI.getPosHistory
  );

  return (
    <DictContentContainer title="최근 편집 기록" headerColor="BEIGE">
      {data?.map((posLog, index) => {
        return (
          <Suspense key={posLog.pos_log_id}>
            <Log langId={langId} posLog={posLog} index={index} />
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
