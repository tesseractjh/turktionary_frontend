import { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { QueryKey } from '@tanstack/react-query';
import styled from '@emotion/styled';
import useAPIWithToken from '@hooks/api/useAPIWithToken';
import withAsyncBoundary from '@hoc/withErrorBoundaryAndSuspense';
import pxToRem from '@utils/pxToRem';
import DictContentContainer from '@components/common/DictContentContainer';
import Log from './Log';
import SelectStyle from './SelectStyle';
import SelectCategories from './SelectCategories';

interface HistoryProps {
  title: string;
  historyQueryKeys: QueryKey;
  diffQueryKey: string;
  historyApi: (...args: any) => Promise<ResultData<any>>;
  diffApi: (...args: any) => Promise<ResultData<any>>;
  dataNormalizer: (data: any, isCategory?: boolean) => Model.History[];
  categoryTitles: Record<string, any>;
}

const SelectContainer = styled.div`
  margin-bottom: ${pxToRem(20)};
`;

function History({
  title,
  historyQueryKeys,
  diffQueryKey,
  historyApi,
  diffApi,
  dataNormalizer,
  categoryTitles
}: HistoryProps) {
  const [historyStyle, setHistoryStyle] = useState(
    localStorage.getItem('historyStyle') ?? 'edit'
  );
  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, boolean>
  >(
    JSON.parse(
      localStorage.getItem('selectedCategories') ??
        JSON.stringify(
          Object.keys(categoryTitles).reduce((acc, title) => {
            acc[title] = true;
            return acc;
          }, {} as Record<string, boolean>)
        )
    )
  );
  const [isCategory, setIsCategory] = useState(historyStyle === 'cagetory');

  const { data } = useAPIWithToken(
    isCategory
      ? [
          historyQueryKeys[0],
          {
            ...(historyQueryKeys[1] as Record<string, any>),
            categories: selectedCategories
          }
        ]
      : historyQueryKeys,
    historyApi,
    { staleTime: 60 * 1000 }
  );

  const logs = dataNormalizer(data ?? []);

  useEffect(() => {
    localStorage.setItem('historyStyle', historyStyle);
  }, [historyStyle]);

  useEffect(() => {
    localStorage.setItem(
      'selectedCategories',
      JSON.stringify(selectedCategories)
    );
  }, [selectedCategories]);

  useLayoutEffect(() => {
    setIsCategory(historyStyle === 'category');
  }, [historyStyle]);

  return (
    <DictContentContainer title={title} headerColor="BEIGE">
      <SelectContainer>
        <SelectStyle
          historyStyle={historyStyle}
          setHistoryStyle={setHistoryStyle}
        />
        {isCategory ? (
          <SelectCategories
            categoryTitles={categoryTitles}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        ) : null}
      </SelectContainer>
      {logs?.map((log, index) => {
        return (
          <Suspense key={`${log.log_id}-${log.log_name}`}>
            <Log
              log={log}
              categoryTitles={categoryTitles}
              diffQueryKey={diffQueryKey}
              diffApi={diffApi}
              index={index}
              isCategory={isCategory}
            />
          </Suspense>
        );
      })}
    </DictContentContainer>
  );
}

export default withAsyncBoundary<HistoryProps>(History, {
  SuspenseFallback: ({ title }: { title: string }) => (
    <DictContentContainer title={title} headerColor="BEIGE" isLoading />
  )
});
