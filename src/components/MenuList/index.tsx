import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import InnerContainer from '@components/common/InnerContainer';
import MenuButton from './MenuButton';

const Container = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  height: ${pxToRem(40)};
  border-bottom: ${border()} ${({ theme }) => theme.color.BORDER};
  background-color: ${({ theme }) => theme.color.WHITE};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
  ${flex('flex-start')}
  gap: ${pxToRem(20)};
  min-width: ${pxToRem(767)};
  height: ${pxToRem(40)};
`;

function MenuList() {
  return (
    <Container>
      <InnerContainer>
        <List>
          <MenuButton route="/">통합사전</MenuButton>
          <MenuButton route="/turkish">터키어</MenuButton>
          <MenuButton route="/azerbaijani">아제르바이잔어</MenuButton>
          <MenuButton route="/uzbek">우즈베크어</MenuButton>
          <MenuButton route="/kazakh">카자흐어</MenuButton>
          <MenuButton route="/turkmen">투르크멘어</MenuButton>
          <MenuButton route="/kyrgyz">키르기스어</MenuButton>
        </List>
      </InnerContainer>
    </Container>
  );
}

export default MenuList;
