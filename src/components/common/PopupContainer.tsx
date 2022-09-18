import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import ArrowIcon from '@assets/images/angle-up-solid.svg';
import { useCallback, useEffect } from 'react';

interface PopupContainerProps extends Props {
  id: string;
  className: string;
  role: string;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  handleDocumentClick: (event: MouseEvent) => void;
  topContent: React.ReactNode | React.ReactNode[];
  width?: number;
  bottomHeight?: number;
}

const Container = styled.div<{ width?: number; hidden: boolean }>`
  ${flex('center', 'stretch')}
  ${({ hidden }) => (hidden ? 'display: none;' : '')}
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: ${pxToRem(64)};
  right: 0;
  z-index: 10;
  width: ${({ width }) => pxToRem(width ?? 360)};
  max-height: ${pxToRem(400)};
  border: ${border()} ${({ theme }) => theme.color.BORDER};
  border-radius: ${pxToRem(10)};
  box-shadow: 0 7px 20px rgb(0 0 0 / 17%);
  background-color: ${({ theme }) => theme.color.WHITE};

  @media ${({ theme }) => theme.media.tablet} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    max-height: none;
    height: 100vh;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
`;

const Top = styled.div`
  ${flex('center')}
  position: relative;
  height: ${pxToRem(36)};
  padding: ${pxToRem(0, 20)};
  background-color: ${({ theme }) => theme.color.TEAL_DARK};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.WHITE};

  @media ${({ theme }) => theme.media.tablet} {
    height: ${pxToRem(48)};
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

const Bottom = styled.div<{ bottomHeight?: number }>`
  overflow-x: none;
  overflow-y: auto;
  height: ${({ bottomHeight }) => pxToRem(bottomHeight ?? 364)};

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: ${({ theme }) => theme.color.GRAY};
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.BORDER};
  }

  @media ${({ theme }) => theme.media.tablet} {
    flex: 1;
  }
`;

const BackButton = styled.button`
  display: none;
  position: absolute;
  top: 50%;
  left: ${pxToRem(12)};
  transform: translateY(-50%);
  width: ${pxToRem(24)};
  height: ${pxToRem(24)};

  & svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.color.WHITE};
  }

  @media ${({ theme }) => theme.media.tablet} {
    display: inline;
  }
`;

function PopupContainer({
  id,
  className,
  role,
  width,
  bottomHeight,
  hidden,
  setHidden,
  handleDocumentClick,
  topContent,
  children
}: PopupContainerProps) {
  const handleClick = useCallback(() => {
    setHidden(true);
  }, []);

  useEffect(() => {
    const root = document.querySelector('html');
    if (hidden) {
      document.removeEventListener('click', handleDocumentClick);
      root?.classList.remove('full-screen');
    } else {
      document.addEventListener('click', handleDocumentClick);
      root?.classList.add('full-screen');
    }
  }, [hidden]);

  return (
    <Container
      id={id}
      className={className}
      role={role}
      width={width}
      hidden={hidden}
    >
      <Top>
        <BackButton onClick={handleClick}>
          <ArrowIcon transform="rotate(270)" />
        </BackButton>
        {topContent}
      </Top>
      <Bottom bottomHeight={bottomHeight}>{children}</Bottom>
    </Container>
  );
}

export default PopupContainer;
