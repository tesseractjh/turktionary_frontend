import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import LANG from '@constants/language';
import SearchBar from '@components/common/SearchBar';

interface DictionaryProps {
  type: DictionaryType;
}

const SearchBarContainer = styled.div`
  & > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.custom('lg', 4)};
  text-align: center;
  color: ${({ theme }) => theme.color.BROWN_DARK};

  & span {
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSize.custom('lg', 2)};
    color: ${({ theme }) => theme.color.BLACK};
  }

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.lg};

    & span {
      font-size: ${({ theme }) => theme.fontSize.custom('lg', -2)};
    }
  }
`;

const SearchBarWrapper = styled.div`
  min-width: ${pxToRem(240)};
  max-width: ${pxToRem(550)};
  width: 100%;
  margin-top: ${pxToRem(20)};
`;

const ContentContainer = styled.div``;

function Dictionary({ type }: DictionaryProps) {
  return (
    <>
      <SearchBarContainer>
        <Title>
          {LANG[type].title}
          <span>{type === 'ALL' ? ' 통합사전' : ' 사전'}</span>
        </Title>
        <SearchBarWrapper>
          <SearchBar id="search-dictionary" />
        </SearchBarWrapper>
      </SearchBarContainer>
      <ContentContainer></ContentContainer>
    </>
  );
}

export default Dictionary;
