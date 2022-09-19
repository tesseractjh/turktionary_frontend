import styled from '@emotion/styled';
import vocaAPI from '@api/voca';
import useAPI from '@hooks/useAPI';

const TotalCountContainer = styled.p`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-align: center;

  & strong {
    font-weight: 700;
    color: ${({ theme }) => theme.color.BROWN_DARK};
  }

  & .fallback {
    color: transparent;
  }
`;

function VocaCounter({ pathname }: { pathname: string }) {
  const { data } = useAPI(['totalVocaCount'], vocaAPI.getTotalVocaCount, {
    staleTime: 10 * 1000
  });

  const lang = pathname.split('/')[1];
  const count =
    data?.count.reduce(
      (acc, { lang_name, count }) => {
        acc[lang_name] = count;
        return acc;
      },
      {
        '': data?.count.reduce((acc, { count }) => acc + count, 0) ?? 0
      } as Record<string, number>
    ) ?? {};

  return (
    <TotalCountContainer>
      {
        <>
          지금까지 총 <strong>{count[lang] ?? 0}</strong>
          개의 어휘가 등록되었습니다.
        </>
      }
    </TotalCountContainer>
  );
}

export default VocaCounter;
