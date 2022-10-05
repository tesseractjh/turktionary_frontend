import styled from '@emotion/styled';
import useLanguage from '@hooks/useLanguage';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import { Link } from 'react-router-dom';

interface CoreInfoProps {
  headword: string;
  vocaOrder: number;
  vocaInfo: Model.VocaInfo;
}

const Container = styled.div`
  width: 100%;
  min-height: ${pxToRem(100)};
  padding: ${pxToRem(20)};
  margin: ${pxToRem(10, 0)};
  background-color: ${({ theme }) => theme.color.WHITE};
  box-shadow: 0 5px 16px rgb(0 0 0 / 17%);
`;

const Top = styled.div`
  padding-bottom: ${pxToRem(10)};
  margin-bottom: ${pxToRem(10)};
  border-bottom: ${border()} ${({ theme }) => theme.color.BROWN};
`;

const Headword = styled.strong`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.xl};

  & sup {
    margin-left: ${pxToRem(4)};
    font-size: ${({ theme }) => theme.fontSize.sm};
    vertical-align: super;
  }
`;

const Meaning = styled.div`
  ${flex('flex-start')}
  flex-wrap: wrap;
  gap: ${pxToRem(16, 24)};
  margin-bottom: ${pxToRem(20)};
  font-size: ${({ theme }) => theme.fontSize.md};
`;

const Bottom = styled.div`
  ${flex('flex-start', 'flex-start')}
  flex-wrap: wrap;
  gap: ${pxToRem(20)};
`;

const VocaList = styled.div`
  flex: 1 0 ${pxToRem(250)};
  ${flex('flex-start')}
`;

const VocaListTitle = styled.strong`
  flex-shrink: 0;
  align-self: flex-start;
  padding-right: ${pxToRem(10)};
  margin-right: ${pxToRem(20)};
  border-right: ${border(2)} ${({ theme }) => theme.color.BROWN};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const VocaWrapper = styled.div`
  ${flex('flex-start')}
  flex-wrap: wrap;
  gap: ${pxToRem(12, 20)};
`;

const Voca = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:hover {
    color: ${({ theme }) => theme.color.BROWN_DARK};
    text-decoration: underline;
  }
`;

function CoreInfo({ headword, vocaOrder, vocaInfo }: CoreInfoProps) {
  const { langId } = useLanguage();
  const { is_unique, meanings, synonyms, antonyms, cognates } = vocaInfo;

  return (
    <Container>
      <Top>
        <Headword>
          {headword}
          {is_unique ? null : <sup>{vocaOrder}</sup>}
        </Headword>
      </Top>
      <Meaning>
        {meanings.map(({ meanings }, index) => (
          <span key={`meaning-summary-${index}`}>{`${index + 1}. ${
            meanings[0].meaning_text
          }`}</span>
        ))}
      </Meaning>
      <Bottom>
        {synonyms ? (
          <VocaList>
            <VocaListTitle>유의어</VocaListTitle>
            <VocaWrapper>
              {synonyms?.map(({ voca_id, headword, voca_order }) => (
                <Voca
                  key={`synonym-${voca_id}`}
                  to={`/${langId}/voca?word=${headword}&order=${voca_order}`}
                >
                  {headword}
                </Voca>
              ))}
            </VocaWrapper>
          </VocaList>
        ) : null}
        {antonyms ? (
          <VocaList>
            <VocaListTitle>반의어</VocaListTitle>
            <VocaWrapper>
              {antonyms?.map(({ voca_id, headword, voca_order }) => (
                <Voca
                  key={`antonym-${voca_id}`}
                  to={`/${langId}/voca?word=${headword}&order=${voca_order}`}
                >
                  {headword}
                </Voca>
              ))}
            </VocaWrapper>
          </VocaList>
        ) : null}
        {cognates ? (
          <VocaList>
            <VocaListTitle>동원어</VocaListTitle>
            <VocaWrapper>
              {cognates?.map(({ voca_id, lang_name, headword, voca_order }) => (
                <Voca
                  key={`cognate-${voca_id}`}
                  to={`/${lang_name}/voca?word=${headword}&order=${voca_order}`}
                >
                  {headword}
                </Voca>
              ))}
            </VocaWrapper>
          </VocaList>
        ) : null}
      </Bottom>
    </Container>
  );
}

export default CoreInfo;
