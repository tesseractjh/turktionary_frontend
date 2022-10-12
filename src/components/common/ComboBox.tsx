import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import { dictFormListState, dictFormState } from '@recoil/dict';
import pxToRem from '@utils/pxToRem';

interface ComboBoxProps {
  id: string;
  inputState: string;
  selectionList: any[];
  selectionListCallback: (
    ItemComponent: (props: any) => JSX.Element,
    props?: Record<string, any>
  ) => (selection: any) => React.ReactNode;
  disabled?: boolean;
  placeholder?: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Container = styled.div`
  flex: 1;
  position: relative;
  user-select: none;
`;

const Input = styled.input`
  width: 100%;
  padding: ${pxToRem(10)};
  border: ${border()} ${({ theme }) => theme.color.BROWN};
  border-radius: ${pxToRem(6)};
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:disabled {
    background: ${({ theme }) => theme.color.GRAY_LIGHT};
  }

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const SelectionList = styled.ul`
  overflow-y: auto;
  position: absolute;
  top: calc(100% + ${pxToRem(8)});
  left: 0;
  z-index: 10;
  width: 100%;
  max-height: ${pxToRem(150)};
  border: ${border()} ${({ theme }) => theme.color.BROWN};
  box-shadow: 0 4px 12px rgb(0 0 0 / 30%);

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
`;

const SelectionItem = styled.li`
  ${flex('flex-start', 'center')}
  padding: ${pxToRem(10)};
  background-color: ${({ theme }) => theme.color.WHITE};
  font-size: ${({ theme }) => theme.fontSize.sm};

  & sup {
    font-size: ${({ theme }) => theme.fontSize.custom('xs', -2)};
    vertical-align: super;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.BROWN};
    color: ${({ theme }) => theme.color.WHITE};
  }

  @media ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xs};

    & sup {
      font-size: ${({ theme }) => theme.fontSize.custom('xs', -4)};
    }
  }
`;

function ComboBox({
  id,
  inputState,
  selectionList,
  selectionListCallback,
  disabled,
  placeholder,
  handleChange
}: ComboBoxProps) {
  const [hidden, setHidden] = useState(true);
  const setState = useSetRecoilState(dictFormListState(id));
  const setInputState = useSetRecoilState(dictFormState(id));
  const itemClassName = `${id}-item`;

  const handleInputClick = () => {
    if (hidden) {
      setHidden(false);
      document.addEventListener('click', handleDocumentClick);
    } else {
      setHidden(true);
      document.removeEventListener('click', handleDocumentClick);
    }
  };

  const handleItemClick =
    ({ lang_name, headword, voca_order }: Model.Voca) =>
    () => {
      setState((state) => {
        if (
          state.find(
            ({
              lang_name: prevLangName,
              headword: prevHeadword,
              voca_order: prevVocaOrder
            }) =>
              lang_name === prevLangName &&
              headword === prevHeadword &&
              voca_order === prevVocaOrder
          )
        ) {
          return state;
        }
        return [...state, { lang_name, headword, voca_order }];
      });
      setInputState('');
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
    if (selectionList.length) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  }, [selectionList]);

  useEffect(() => {
    if (hidden) {
      document.removeEventListener('click', handleDocumentClick);
    } else {
      document.addEventListener('click', handleDocumentClick);
    }
  }, [hidden]);

  return (
    <Container>
      <Input
        id={id}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        role="combobox"
        aria-expanded={!hidden}
        aria-haspopup="listbox"
        disabled={disabled}
        value={inputState}
        onClick={handleInputClick}
        onChange={handleChange}
      />
      {hidden || !selectionList.length ? null : (
        <SelectionList role="listbox">
          {(selectionList as Model.Voca[]).map(
            selectionListCallback(
              SelectionItem as (props: any) => JSX.Element,
              {
                className: itemClassName,
                handleClick: handleItemClick
              }
            )
          )}
        </SelectionList>
      )}
    </Container>
  );
}

export default ComboBox;
