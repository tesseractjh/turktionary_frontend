import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import InnerContainer from '@components/common/InnerContainer';
import MenuButton from './MenuButton';
import { useRecoilValue } from 'recoil';
import { searchBarPositionState } from '@recoil/search';

const Container = styled.div<{ isHidden: boolean }>`
  position: fixed;
  top: ${pxToRem(60)};
  width: 100%;
  height: ${pxToRem(40)};
  border-bottom: ${border()} ${({ theme }) => theme.color.BORDER};
  background-color: ${({ theme }) => theme.color.WHITE};

  @media ${({ theme }) => theme.media.tablet} {
    ${({ isHidden }) => (isHidden ? 'display: none;' : '')}
  }

  @media ${({ theme }) => theme.media.mobile} {
    top: ${pxToRem(48)};
    height: ${pxToRem(32)};
  }
`;

const ScrollWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
  ${flex('flex-start')}
  gap: ${pxToRem(20)};
  width: 100%;
  height: ${pxToRem(40)};

  @media ${({ theme }) => theme.media.mobile} {
    height: ${pxToRem(32)};
  }
`;

function MenuList() {
  const searchBarPosition = useRecoilValue(searchBarPositionState);

  return (
    <Container isHidden={searchBarPosition === 'header'}>
      <InnerContainer>
        <ScrollWrapper>
          <List>
            <MenuButton route="/">통합사전</MenuButton>
            <MenuButton route="/turkish">터키어</MenuButton>
            <MenuButton route="/azerbaijani">아제르바이잔어</MenuButton>
            <MenuButton route="/uzbek">우즈베크어</MenuButton>
            <MenuButton route="/kazakh">카자흐어</MenuButton>
            <MenuButton route="/turkmen">투르크멘어</MenuButton>
            <MenuButton route="/kyrgyz">키르기스어</MenuButton>
          </List>
        </ScrollWrapper>
      </InnerContainer>
    </Container>
  );
}

export default MenuList;
