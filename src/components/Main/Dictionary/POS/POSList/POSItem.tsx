import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import useLanguage from '@hooks/useLanguage';
import pxToRem from '@utils/pxToRem';
import MenuIcon from '@assets/images/ellipsis-vertical-solid.svg';
import { Color } from '@emotion/react';

interface POSItemProps {
  title: string;
  text: string;
  examples: string[];
  exampleOrders: number[];
}

const Container = styled.li`
  ${flex()};
  padding-bottom: ${pxToRem(10)};
  margin-bottom: ${pxToRem(20)};
  border-bottom: ${border()} ${({ theme }) => theme.color.BORDER};
`;

const Content = styled.div`
  flex-grow: 1;
  width: 100%;
`;

const ButtonContainer = styled.div`
  align-self: flex-start;
  position: relative;
  margin-left: ${pxToRem(20)};
  text-align: right;

  &:hover {
    width: ${pxToRem(80)};
  }

  &:hover > div {
    display: block;
  }

  &:hover svg {
    fill: ${({ theme }) => theme.color.GRAY};
  }
`;

const Ellipsis = styled.span`
  display: inline-block;
  width: ${pxToRem(20)};
  height: ${pxToRem(20)};

  & svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.color.BORDER};
  }
`;

const Hover = styled.div`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: ${pxToRem(80)};
  height: ${pxToRem(30)};
  background-color: transparent;
`;

const Menu = styled.div`
  display: none;
  position: absolute;
  top: ${pxToRem(30)};
  right: 0;
  z-index: 10;
  width: ${pxToRem(80)};
  background-color: ${({ theme }) => theme.color.WHITE};
  box-shadow: 0 2px 5px rgb(0 0 0 / 17%);
`;

const MenuButton = styled.button<{ textColor?: keyof Color }>`
  width: 100%;
  height: ${pxToRem(40)};
  padding: ${pxToRem(10)};
  background-color: ${({ theme }) => theme.color.WHITE};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ textColor, theme }) => theme.color[textColor ?? 'BLACK']};
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.color.BORDER};
  }
`;

const Title = styled.h4`
  margin-bottom: ${pxToRem(20)};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const ExampleList = styled.ul`
  ${flex('flex-start')}
  flex-wrap: wrap;
  gap: ${pxToRem(16)};
  margin-top: ${pxToRem(20)};
`;

const Example = styled(Link)`
  padding: ${pxToRem(4, 6)};
  border-radius: ${pxToRem(4)};
  background-color: ${({ theme }) => theme.color.BROWN_DARK};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.WHITE};

  & sup {
    font-size: ${({ theme }) => theme.fontSize.custom('xs', -2)};
    vertical-align: super;
  }
`;

function POSItem({ title, text, examples, exampleOrders }: POSItemProps) {
  const { langId } = useLanguage();

  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        {text ? <Text>{text}</Text> : null}
        {examples.length ? (
          <ExampleList>
            {examples.map((example, index) => {
              const order =
                (exampleOrders[index] ?? 0) > 1 ? exampleOrders[index] : '';
              return (
                <Example
                  key={example + order}
                  to={`/${langId}/dict?keyword=${encodeURIComponent(
                    example + order
                  )}`}
                >
                  {example}
                  <sup>{order}</sup>
                </Example>
              );
            })}
          </ExampleList>
        ) : null}
      </Content>
      <ButtonContainer>
        <Ellipsis>
          <MenuIcon />
        </Ellipsis>
        <Hover />
        <Menu>
          <MenuButton type="button">편집</MenuButton>
          <MenuButton type="button" textColor="RED">
            신고
          </MenuButton>
        </Menu>
      </ButtonContainer>
    </Container>
  );
}

export default POSItem;
