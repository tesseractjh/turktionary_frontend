import { ChangeEvent, useCallback } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import { Color } from '@emotion/react';
import styled from '@emotion/styled';
import { dictFormState } from '@recoil/dict';
import { border } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

interface InputProps {
  id: string;
  maxLength: number;
  color?: [keyof Color, keyof Color];
  noPadding?: boolean;
  placeholder?: string;
  showLength?: boolean;
}

const Container = styled.div<{ noPadding?: boolean }>`
  position: relative;
  margin: ${({ noPadding }) => (noPadding ? 0 : pxToRem(10, 0))};
`;

const StyledInput = styled.input<{
  formColor?: [keyof Color, keyof Color];
  showLength?: boolean;
}>`
  display: inline-block;
  width: 100%;
  padding: ${({ showLength }) => pxToRem(10, showLength ? 72 : 10, 10, 10)};
  border: ${({ formColor, theme }) =>
    border() + theme.color[formColor?.[0] ?? 'BROWN']};
  border-radius: ${pxToRem(6)};
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:focus {
    border-color: ${({ formColor, theme }) =>
      theme.color[formColor?.[1] ?? 'BROWN_DARK']};

    & ~ .join-input-length {
      color: ${({ formColor, theme }) =>
        theme.color[formColor?.[1] ?? 'BROWN_DARK']};
    }
  }

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const Length = styled.span`
  display: inline-block;
  position: absolute;
  top: 50%;
  right: ${pxToRem(20)};
  transform: translateY(-50%);
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.BROWN};
`;

function Input({
  id,
  maxLength,
  color,
  noPadding,
  placeholder,
  showLength
}: InputProps) {
  const [state, setState] = useRecoilState(dictFormState(id));

  const handleChange = useCallback(
    ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
      setState(value);
    },
    []
  );

  return (
    <Container noPadding={noPadding}>
      <StyledInput
        id={id}
        type="text"
        formColor={color}
        maxLength={maxLength}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        value={state}
        onChange={handleChange}
        showLength={showLength}
      />
      {showLength ? <Length>{`${state.length}/${maxLength}`}</Length> : null}
    </Container>
  );
}

export default Input;
