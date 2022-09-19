import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import LANG from '@constants/language';
import SearchBar from '@components/common/SearchBar';
import InnerContainer from '@components/common/InnerContainer';
import VocaCounter from './VocaCounter';

interface DictionaryProps {
  type: DictionaryType;
}

const SearchContainer = styled.section`
  padding-top: ${pxToRem(20)};
  padding-bottom: ${pxToRem(80)};
  border-bottom: ${border()} ${({ theme }) => theme.color.BORDER};

  @media ${({ theme }) => theme.media.tablet} {
    padding-bottom: ${pxToRem(60)};
  }

  @media ${({ theme }) => theme.media.mobile} {
    padding-bottom: ${pxToRem(40)};
  }
`;

const TopMenu = styled.nav`
  ${flex('flex-end')}
  gap: ${pxToRem(10)};
  height: ${pxToRem(30)};
  margin-bottom: ${pxToRem(40)};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.BROWN};
`;

const TopMenuButton = styled(Link)`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.BLACK};

  &:hover {
    color: ${({ theme }) => theme.color.BROWN_DARK};
  }
`;

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

const ContentContainer = styled.div`
  padding: ${pxToRem(80, 0)};
  background-color: ${({ theme }) => theme.color.GRAY_LIGHT};
`;

function Dictionary({ type }: DictionaryProps) {
  const { pathname } = useLocation();

  return (
    <>
      <SearchContainer>
        <InnerContainer>
          <TopMenu>
            <TopMenuButton to={`/edit${pathname}`}>단어 등록</TopMenuButton>|
            <TopMenuButton to={`/pos${pathname}`}>품사 목록</TopMenuButton>
          </TopMenu>
          <SearchBarContainer>
            <Title>
              {LANG[type].title}
              <span>{type === 'ALL' ? ' 통합사전' : ' 사전'}</span>
            </Title>
            <SearchBarWrapper>
              <SearchBar id="search-dictionary" />
            </SearchBarWrapper>
          </SearchBarContainer>
        </InnerContainer>
      </SearchContainer>
      <ContentContainer>
        <VocaCounter pathname={pathname} />
      </ContentContainer>
    </>
  );
}

export default Dictionary;
