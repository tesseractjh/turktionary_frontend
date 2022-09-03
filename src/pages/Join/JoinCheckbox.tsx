import { ChangeEvent, useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import { joinCheckboxState } from '@recoil/join';
import CheckIcon from '@assets/images/check-solid.svg';
import ArrowIcon from '@assets/images/angle-up-solid.svg';
import pxToRem from '@utils/pxToRem';
import JoinInput from './JoinInput';

interface JoinCheckboxProps {
  param: string;
  label: string;
  text: string;
}

const CheckboxWrapper = styled.div`
  ${flex()}
  position: relative;
  margin: ${pxToRem(10, 0)};
`;

const Checkbox = styled.input<{ isChecked: boolean }>`
  appearance: none;
  width: 24px;
  height: 24px;
  margin: 0;
  border: ${border()} ${({ theme }) => theme.color.BROWN};
  border-radius: ${pxToRem(4)};

  &:hover {
    border-color: ${({ theme }) => theme.color.BROWN_DARK};
  }

  & + svg {
    display: none;
    position: absolute;
    top: 50%;
    left: ${pxToRem(12)};
    transform: translate(-50%, -50%);
    width: 18px;
    height: 18px;
    fill: ${({ theme }) => theme.color.TEAL_DARK};
    pointer-events: none;
  }

  ${({ isChecked, theme }) =>
    isChecked
      ? `
    border-color: ${theme.color.TEAL_DARK};

    &:hover {
      border-color: ${theme.color.TEAL_DARK};
    }

    & + svg {
      display: inline;
    }
  `
      : ''}
`;

const CheckboxDesc = styled.label`
  padding-right: ${pxToRem(20)};
  margin-left: ${pxToRem(10)};
  margin-right: auto;
  font-size: ${pxToRem(16)};
`;

const FoldButton = styled.button<{ isFolded: boolean }>`
  width: ${pxToRem(20)};
  height: ${pxToRem(20)};

  & svg {
    width: 100%;
    height: 100%;
    transition: all 0.2s;
    transform: rotate(180deg);
    ${({ isFolded }) => (isFolded ? '' : 'transform: rotate(0);')}
  }
`;

const TextareaWrapper = styled.div<{ height: number }>`
  overflow: hidden;
  height: ${({ height }) => pxToRem(height)};
  transition: height 0.3s;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: ${pxToRem(200)};
  padding: ${pxToRem(10)};
  border-top: ${border()} ${({ theme }) => theme.color.BROWN};
  border-bottom: ${border()} ${({ theme }) => theme.color.BROWN};
  resize: none;
`;

function JoinCheckbox({ param, label, text }: JoinCheckboxProps) {
  const [isFolded, setIsFolded] = useState(true);
  const [height, setHeight] = useState(0);
  const [state, setState] = useRecoilState(joinCheckboxState(param));
  const id = `join-input-${param}`;

  const handleChange = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      const { checked } = currentTarget;
      setState(checked);
    },
    []
  );

  const handleFold = useCallback(() => {
    if (isFolded) {
      setHeight(200);
    } else {
      setHeight(0);
    }
    setIsFolded((prev) => !prev);
  }, [isFolded]);

  return (
    <JoinInput htmlFor={id} label={label}>
      <CheckboxWrapper>
        <Checkbox
          id={id}
          type="checkbox"
          isChecked={state}
          onChange={handleChange}
        />
        <CheckIcon />
        <CheckboxDesc htmlFor={id}>{text}</CheckboxDesc>
        <FoldButton type="button" isFolded={isFolded} onClick={handleFold}>
          <ArrowIcon />
        </FoldButton>
      </CheckboxWrapper>
      <TextareaWrapper height={height}>
        <Textarea defaultValue="이용약관" readOnly />
      </TextareaWrapper>
    </JoinInput>
  );
}

export default JoinCheckbox;
