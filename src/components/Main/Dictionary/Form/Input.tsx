import { ChangeEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { Color } from '@emotion/react';
import styled from '@emotion/styled';
import { dictFormState } from '@recoil/dict';
import { border } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

interface InputProps {
  id: string;
  maxLength: number;
  color?: [keyof Color, keyof Color];
  placeholder?: string;
  showLength?: boolean;
}

const Container = styled.div`
  position: relative;
  margin: ${pxToRem(10, 0)};
`;

const StyledInput = styled.input<{ formColor?: [keyof Color, keyof Color] }>`
  display: inline-block;
  width: 100%;
  padding: ${pxToRem(10, 64, 10, 10)};
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

function Input({ id, maxLength, color, placeholder, showLength }: InputProps) {
  const [state, setState] = useRecoilState(dictFormState(id));

  const handleChange = useCallback(
    ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
      setState(value);
    },
    []
  );

  return (
    <Container>
      <StyledInput
        id={id}
        type="text"
        formColor={color}
        maxLength={maxLength}
        placeholder={placeholder}
        spellCheck={false}
        value={state}
        onChange={handleChange}
      />
      {showLength ? <Length>{`${state.length}/${maxLength}`}</Length> : null}
    </Container>
  );
}

export default Input;
