import styled from '@emotion/styled';
import vocaAPI from '@api/voca';
import useAPI from '@hooks/api/useAPI';
import pxToRem from '@utils/pxToRem';

const TotalCountContainer = styled.p`
  padding: ${pxToRem(70, 0)};
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

  @media ${({ theme }) => theme.media.laptop} {
    padding: ${pxToRem(60, 0)};
    font-size: ${({ theme }) => theme.fontSize.lg};
  }

  @media ${({ theme }) => theme.media.tablet} {
    padding: ${pxToRem(40, 0)};
    font-size: ${({ theme }) => theme.fontSize.md};
  }

  @media ${({ theme }) => theme.media.mobile} {
    padding: ${pxToRem(30, 0)};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

function VocaCounter({ pathname }: { pathname: string }) {
  const { data } = useAPI(['totalVocaCount'], vocaAPI.getTotalVocaCount, {
    staleTime: 30 * 60 * 1000
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
          지금까지 총 <strong>{(count[lang] ?? 0).toLocaleString()}</strong>
          개의 어휘가 등록되었습니다.
        </>
      }
    </TotalCountContainer>
  );
}

export default VocaCounter;
