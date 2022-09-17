import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { Color } from '@emotion/react';
import { border, flex } from '@styles/minxin';
import { searchInputState } from '@recoil/search/atoms';
import pxToRem from '@utils/pxToRem';
import GlassIcon from '@assets/images/magnifying-glass-solid.svg';

interface SearchBarProps {
  id?: string;
  color?: keyof Color;
}

const Container = styled.div<{ color?: keyof Color }>`
  display: flex;
  height: ${pxToRem(50)};
  border: ${border(3)} ${({ color, theme }) => theme.color[color ?? 'BROWN']};
  background-color: ${({ color, theme }) => theme.color[color ?? 'BROWN']};

  @media ${({ theme }) => theme.media.tablet} {
    height: ${pxToRem(40)};
  }
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  padding: ${pxToRem(6, 10)};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.BLACK};

  &:focus::placeholder {
    color: transparent;
  }
`;

const SearchButton = styled.button<{ color?: keyof Color }>`
  ${flex()}
  width: ${pxToRem(44)};
  background-color: ${({ color, theme }) => theme.color[color ?? 'BROWN']};
  & svg {
    width: ${pxToRem(24)};
    height: ${pxToRem(24)};
    fill: ${({ theme }) => theme.color.WHITE};
  }
`;

function SearchInput() {
  const [searchInput, setSearchInput] = useRecoilState(searchInputState);

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(target.value);
    },
    []
  );
  return (
    <Input
      value={searchInput}
      maxLength={255}
      placeholder="검색할 단어를 입력하세요."
      onChange={handleChange}
      spellCheck={false}
    />
  );
}

function SearchBar({ id, color }: SearchBarProps) {
  return (
    <Container id={id} color={color}>
      <SearchInput />
      <SearchButton type="button" color={color}>
        <GlassIcon />
      </SearchButton>
    </Container>
  );
}

export default SearchBar;
