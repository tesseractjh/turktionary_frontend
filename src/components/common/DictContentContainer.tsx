import { Color, css } from '@emotion/react';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import Deferred from './Defered';
import Spinner from './Spinner';

interface DictContentContainerProps extends Props {
  title: string;
  buttons?: React.ReactNode | React.ReactNode[];
  headerColor?: keyof Color;
  isLoading?: boolean;
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

  @media ${({ theme }) => theme.media.mobile} {
    padding: ${pxToRem(10, 16)};
  }
`;

const Title = styled.h3`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.BLACK};

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const Content = styled.div<{ isLoading?: boolean }>`
  padding: ${pxToRem(20)};
  font-size: ${({ theme }) => theme.fontSize.sm};
  ${({ isLoading }) => (isLoading ? flex() : '')}
  ${({ isLoading, theme }) =>
    isLoading
      ? `
      width: 100%;
      height: 100%;
      background-color: ${theme.color.GRAY_LIGHT};

      & > div {
        background-color: transparent;
      }
    `
      : ''}
    
  @media ${({ theme }) => theme.media.mobile} {
    padding: ${pxToRem(10)};
  }
`;

function DictContentContainer({
  title,
  buttons,
  headerColor,
  isLoading,
  children
}: DictContentContainerProps) {
  return (
    <Container>
      <Header headerColor={headerColor}>
        <Title>{title}</Title>
        {buttons ?? null}
      </Header>
      <Content isLoading={isLoading}>
        {isLoading ? (
          <Deferred delay={200}>
            <Spinner />
          </Deferred>
        ) : (
          children
        )}
      </Content>
    </Container>
  );
}

export default DictContentContainer;