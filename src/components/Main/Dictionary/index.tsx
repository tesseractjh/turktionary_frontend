import SearchBar from '@components/common/SearchBar';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

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
`;

const ContentContainer = styled.div``;

const contents = {
  ALL: {
    title: '튀르크어'
  },
  TR: {
    title: '터키어'
  },
  AZ: {
    title: '아제르바이잔어'
  },
  UZ: {
    title: '우즈베크어'
  },
  KZ: {
    title: '카자흐어'
  },
  TM: {
    title: '투르크멘어'
  },
  KG: {
    title: '키르기스어'
  }
};

function Dictionary({ type }: DictionaryProps) {
  return (
    <>
      <SearchBarContainer>
        <Title>
          {contents[type].title}
          <span>{type === 'ALL' ? ' 통합사전' : ' 사전'}</span>
        </Title>
        <SearchBar />
      </SearchBarContainer>
      <ContentContainer></ContentContainer>
    </>
  );
}

export default Dictionary;
