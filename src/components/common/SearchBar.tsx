import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import GlassIcon from '@assets/images/magnifying-glass-solid.svg';

const Container = styled.div`
  min-width: ${pxToRem(240)};
  max-width: ${pxToRem(550)};
  width: calc(100vw - ${pxToRem(40)});
  margin-top: ${pxToRem(20)};
`;

const Wrapper = styled.div`
  display: flex;
  height: 50px;
  border: ${border(3)} ${({ theme }) => theme.color.BROWN};
  background-color: ${({ theme }) => theme.color.BROWN};
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

const SearchButton = styled.button`
  ${flex()}
  width: ${pxToRem(44)};
  background-color: ${({ theme }) => theme.color.BROWN};
  & svg {
    width: ${pxToRem(24)};
    height: ${pxToRem(24)};
    fill: ${({ theme }) => theme.color.WHITE};
  }
`;

function SearchBar() {
  return (
    <Container>
      <Wrapper>
        <Input maxLength={255} placeholder="검색할 단어를 입력하세요." />
        <SearchButton type="button">
          <GlassIcon />
        </SearchButton>
      </Wrapper>
    </Container>
  );
}

export default SearchBar;
