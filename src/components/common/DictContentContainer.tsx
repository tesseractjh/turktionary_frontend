import { Color } from '@emotion/react';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

interface DictContentContainerProps extends Props {
  title: string;
  buttons?: React.ReactNode | React.ReactNode[];
  headerColor?: keyof Color;
}

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  margin: ${pxToRem(10, 0)};
  border-radius: ${pxToRem(8)};
  background-color: ${({ theme }) => theme.color.WHITE};
  box-shadow: 0 5px 16px rgb(0 0 0 / 17%);
`;

const Header = styled.div<{ headerColor?: keyof Color }>`
  ${flex('space-between')}
  padding: ${pxToRem(10, 20)};
  background-color: ${({ headerColor, theme }) =>
    theme.color[headerColor ?? 'BROWN']};
`;

const Title = styled.h3`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.BLACK};
`;

const Content = styled.div`
  padding: ${pxToRem(20)};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

function DictContentContainer({
  title,
  buttons,
  headerColor,
  children
}: DictContentContainerProps) {
  return (
    <Container>
      <Header headerColor={headerColor}>
        <Title>{title}</Title>
        {buttons ? <div>{buttons}</div> : null}
      </Header>
      <Content>{children}</Content>
    </Container>
  );
}

export default DictContentContainer;
