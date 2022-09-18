import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import { searchBarPositionState } from '@recoil/search';
import pxToRem from '@utils/pxToRem';
import LANG from '@constants/language';
import InnerContainer from '@components/common/InnerContainer';
import MenuButton from './MenuButton';

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
            {Object.entries(LANG).map(([type, { id, title }]) => {
              if (type === 'ALL') {
                return (
                  <MenuButton key={type} route="/">
                    통합사전
                  </MenuButton>
                );
              }
              return (
                <MenuButton key={type} route={`/${id}`}>
                  {title}
                </MenuButton>
              );
            })}
          </List>
        </ScrollWrapper>
      </InnerContainer>
    </Container>
  );
}

export default MenuList;
