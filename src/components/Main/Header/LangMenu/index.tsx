import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import LANG from '@constants/language';
import PopupContainer from '@components/common/PopupContainer';

interface LangMenuProps {
  handleDocumentClick: (event: MouseEvent) => void;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.ul``;

const ButtonWrapper = styled.li`
  width: 100%;
  border-bottom: ${border()} ${({ theme }) => theme.color.BORDER};

  &:hover {
    background-color: ${({ theme }) => theme.color.GRAY_LIGHT};
  }
`;

const Button = styled(Link)`
  ${flex('center', 'center', true)}
  width: 100%;
  height: ${pxToRem(48)};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.md};
`;

function LangMenu({ handleDocumentClick, hidden, setHidden }: LangMenuProps) {
  const handleClick = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PopupContainer
      id="popup-notification"
      className="popup-notification"
      role="menu"
      hidden={hidden}
      setHidden={setHidden}
      handleDocumentClick={handleDocumentClick}
      aria-labelledby="btn-notification-popup"
      topContent={'사전 선택'}
    >
      <Container>
        {Object.entries(LANG).map(([type, { id, name }]) => {
          if (type === 'ALL') {
            return (
              <ButtonWrapper key={type}>
                <Button to="/" onClick={handleClick}>
                  통합사전
                </Button>
              </ButtonWrapper>
            );
          }
          return (
            <ButtonWrapper key={type}>
              <Button to={`/${id}`} onClick={handleClick}>
                {name}
              </Button>
            </ButtonWrapper>
          );
        })}
      </Container>
    </PopupContainer>
  );
}

export default LangMenu;
