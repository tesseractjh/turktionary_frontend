import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import { dictFormState } from '@recoil/dict';
import pxToRem from '@utils/pxToRem';
import ArrowIcon from '@assets/images/angle-up-solid.svg';

interface SelectBoxProps {
  id: string;
  selectionList: any[];
  selectionListCallback: (
    ItemComponent: (props: any) => JSX.Element,
    props?: Record<string, any>
  ) => (selection: any) => React.ReactNode;
  placeholder?: string;
}
const Container = styled.div`
  position: relative;
  user-select: none;
`;

const Selected = styled.button`
  ${flex('space-between')}
  min-width: ${pxToRem(200)};
  padding: ${pxToRem(10)};
  border: ${border()} ${({ theme }) => theme.color.BROWN};
  background-color: ${({ theme }) => theme.color.WHITE};
  border-radius: ${pxToRem(6)};
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:hover {
    background-color: ${({ theme }) => theme.color.BEIGE};
  }

  @media ${({ theme }) => theme.media.tablet} {
    min-width: ${pxToRem(120)};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const Arrow = styled.span<{ isHidden: boolean }>`
  display: inline-block;
  width: ${pxToRem(12)};
  height: ${pxToRem(12)};
  margin-left: ${pxToRem(10)};
  font-size: ${({ theme }) => theme.fontSize.custom('xs', -4)};
  pointer-events: none;

  & svg {
    width: 100%;
    height: 100%;
    transform: rotate(${({ isHidden }) => (isHidden ? '180deg' : 0)});
  }
`;

const SelectionList = styled.ul`
  overflow-y: auto;
  position: absolute;
  top: calc(100% + ${pxToRem(10)});
  left: 0;
  z-index: 10;
  width: ${pxToRem(200)};
  max-height: ${pxToRem(150)};
  box-shadow: 0 5px 16px rgb(0 0 0 / 17%);

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
    width: ${pxToRem(120)};
  }
`;

const SelectionItem = styled.li`
  padding: ${pxToRem(10)};
  background-color: ${({ theme }) => theme.color.WHITE};
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:hover {
    background-color: ${({ theme }) => theme.color.BROWN};
    color: ${({ theme }) => theme.color.WHITE};
  }

  @media ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

function SelectBox({
  id,
  placeholder,
  selectionList,
  selectionListCallback
}: SelectBoxProps) {
  const [hidden, setHidden] = useState(true);
  const [selectedText, setSelectedText] = useState(placeholder);
  const state = useRecoilValue<Model.POS>(dictFormState(id));
  const itemClassName = `${id}-item`;

  const handleSelectedClick = () => {
    if (hidden) {
      setHidden(false);
      document.addEventListener('click', handleDocumentClick);
    } else {
      setHidden(true);
      document.removeEventListener('click', handleDocumentClick);
    }
  };

  const handleDocumentClick = useCallback<(evt: MouseEvent) => void>(
    ({ target }) => {
      if ((target as HTMLElement).id === id) {
        return;
      }
      setHidden(true);
      document.removeEventListener('click', handleDocumentClick);
    },
    [hidden]
  );

  useEffect(() => {
    if (!selectionList.length) {
      setHidden(true);
    }
  }, [selectionList]);

  useEffect(() => {
    setSelectedText(state?.pos_name ?? placeholder);
  }, [state]);

  return (
    <Container>
      <Selected
        id={id}
        type="button"
        role="combobox"
        aria-expanded={!hidden}
        aria-haspopup="listbox"
        onClick={handleSelectedClick}
      >
        {selectedText}
        <Arrow isHidden={hidden}>
          <ArrowIcon />
        </Arrow>
      </Selected>

      {hidden ? null : (
        <SelectionList role="listbox">
          {selectionList.map(
            selectionListCallback(
              SelectionItem as (props: any) => JSX.Element,
              {
                role: 'option',
                className: itemClassName
              }
            )
          )}
        </SelectionList>
      )}
    </Container>
  );
}

export default SelectBox;
