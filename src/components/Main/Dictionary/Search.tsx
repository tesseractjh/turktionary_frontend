import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import LANG from '@constants/language';
import InnerContainer from '@components/common/InnerContainer';
import SearchBar from '@components/common/SearchBar';

interface SearchProps {
  type: DictionaryType;
}

const SearchContainer = styled.section<{ isSearch: boolean }>`
  padding-top: ${pxToRem(20)};
  padding-bottom: ${pxToRem(80)};
  border-bottom: ${border()} ${({ theme }) => theme.color.BORDER};
  background-color: ${({ theme }) => theme.color.WHITE};

  @media ${({ theme }) => theme.media.tablet} {
    padding-bottom: ${pxToRem(60)};
  }

  @media ${({ theme }) => theme.media.mobile} {
    padding-bottom: ${pxToRem(40)};
  }

  ${({ isSearch, theme }) =>
    isSearch
      ? `
      padding: ${pxToRem(10)};

      @media ${theme.media.tablet} {
        padding: ${pxToRem(10)};
      }
    `
      : ''}
`;

const TopMenu = styled.nav<{ isSearch?: boolean }>`
  ${flex('flex-end')}
  gap: ${pxToRem(10)};
  height: ${pxToRem(30)};
  margin-bottom: ${pxToRem(40)};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.BROWN};

  ${({ isSearch }) => (isSearch ? `margin-bottom: ${pxToRem(10)};` : '')}
`;

const TopMenuButton = styled(Link)`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.BLACK};

  &:hover {
    font-weight: 500;
    color: ${({ theme }) => theme.color.BROWN_DARK};
    text-decoration: underline;
  }

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const MenuButtonText = styled.strong<{ isSelected: boolean }>`
  ${({ isSelected, theme }) =>
    isSelected
      ? `
        font-weight: 500;
        color: ${theme.color.BROWN_DARK};
      `
      : ''}
`;

const SearchBarContainer = styled.div`
  & > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Title = styled.h2`
  position: relative;
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

const SearchBarWrapper = styled.div<{ isSearch: boolean }>`
  min-width: ${pxToRem(240)};
  max-width: ${pxToRem(550)};
  width: 100%;
  margin-top: ${pxToRem(20)};

  ${({ isSearch }) => (isSearch ? `margin-top: ${pxToRem(10)};` : '')}
`;

const searchPaths = ['search', 'voca'];

function Search({ type }: SearchProps) {
  const { pathname } = useLocation();
  const reversedPaths = pathname.split('/').reverse();
  const lastPath = reversedPaths[0];
  const isSearch = searchPaths.includes(lastPath);
  const isAll = type === 'ALL';

  return (
    <SearchContainer isSearch={isSearch}>
      <InnerContainer>
        <TopMenu isSearch={isSearch}>
          {isAll ? null : (
            <>
              <TopMenuButton to="voca/create">
                <MenuButtonText
                  isSelected={
                    lastPath === 'create' && reversedPaths[1] === 'voca'
                  }
                >
                  단어 추가
                </MenuButtonText>
              </TopMenuButton>
              |
              <TopMenuButton to="pos">
                <MenuButtonText isSelected={lastPath === 'pos'}>
                  품사 목록
                </MenuButtonText>
              </TopMenuButton>
            </>
          )}
        </TopMenu>
        <SearchBarContainer>
          <Title>
            {LANG[type].name}
            <span>{isAll ? ' 통합사전' : ' 사전'}</span>
          </Title>
          <SearchBarWrapper isSearch={isSearch}>
            <SearchBar id="search-dictionary" />
          </SearchBarWrapper>
        </SearchBarContainer>
      </InnerContainer>
    </SearchContainer>
  );
}

export default Search;
