import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState
} from 'react';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import { dictFormState } from '@recoil/dict';
import pxToRem from '@utils/pxToRem';

interface SelectBoxProps {
  id: string;
  selectionList: string[];
  placeholder?: string;
  handleChange?: (selected: string) => void;
}
const Container = styled.div`
  position: relative;
  user-select: none;
`;

const Selected = styled.button`
  ${flex('space-between')}
  min-width: ${pxToRem(200)};
  padding: ${pxToRem(10)};
  margin-right: ${pxToRem(10)};
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

const Arrow = styled.span`
  margin-left: ${pxToRem(10)};
  font-size: ${({ theme }) => theme.fontSize.custom('xs', -4)};
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
  handleChange
}: SelectBoxProps) {
  const [hidden, setHidden] = useState(true);
  const [state, setState] = useRecoilState(dictFormState(id));
  const itemClassName = `${id}-item`;

  const handleClick = useCallback(() => {
    if (hidden) {
      setHidden(false);
      document.addEventListener('click', handleDocumentClick);
    } else {
      setHidden(true);
      document.removeEventListener('click', handleDocumentClick);
    }
  }, [hidden]);

  const handleDocumentClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    ({ target }) => {
      const targetElement = target as HTMLElement;

      if (targetElement.id === id) {
        return;
      }

      if (targetElement.classList.contains(itemClassName)) {
        const { textContent } = targetElement;
        setState(textContent ?? '');
        if (handleChange) {
          handleChange(textContent ?? '');
        }
      }

      setHidden(true);
      document.removeEventListener('click', handleDocumentClick);
    },
    [hidden]
  ) as () => void;

  useEffect(() => {
    if (!state) {
      setState(placeholder ?? '');
    }
  }, [state]);

  return (
    <Container>
      <Selected
        id={id}
        type="button"
        role="combobox"
        aria-expanded={!hidden}
        aria-haspopup="listbox"
        onClick={handleClick}
      >
        {state}
        <Arrow>{hidden ? '▼' : '▲'}</Arrow>
      </Selected>

      {hidden ? null : (
        <SelectionList role="listbox">
          {selectionList.map((selection) => (
            <SelectionItem
              key={selection}
              className={itemClassName}
              role="option"
            >
              {selection}
            </SelectionItem>
          ))}
        </SelectionList>
      )}
    </Container>
  );
}

export default SelectBox;
