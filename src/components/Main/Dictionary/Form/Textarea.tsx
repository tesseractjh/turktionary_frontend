import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { RecoilState, useRecoilState } from 'recoil';
import { Color } from '@emotion/react';
import styled from '@emotion/styled';
import { dictFormState } from '@recoil/dict';
import { border } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

interface TextareaProps {
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

const StyledTextarea = styled.textarea<{
  formColor?: [keyof Color, keyof Color];
}>`
  display: inline-block;
  overflow: hidden;
  width: 100%;
  padding: ${pxToRem(10)};
  border: ${({ formColor, theme }) =>
    border() + theme.color[formColor?.[0] ?? 'BROWN']};
  border-radius: ${pxToRem(6)};
  font-size: ${({ theme }) => theme.fontSize.sm};
  resize: none;

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
  bottom: ${pxToRem(16)};
  right: ${pxToRem(20)};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.BROWN};
`;

function Textarea({
  id,
  maxLength,
  color,
  noPadding,
  placeholder,
  showLength
}: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [state, setState] = useRecoilState(dictFormState(id));

  const handleChange = useCallback(
    ({ currentTarget: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
      setState(value);
      if (ref.current) {
        ref.current.style.height = 'auto';
        ref.current.style.height = `${ref.current.scrollHeight + 30}px`;
      }
    },
    []
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight + 30}px`;
    }
  }, [ref]);

  return (
    <Container noPadding={noPadding}>
      <StyledTextarea
        ref={ref}
        id={id}
        formColor={color}
        maxLength={maxLength}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        value={state}
        onChange={handleChange}
      />
      {showLength ? <Length>{`${state.length}/${maxLength}`}</Length> : null}
    </Container>
  );
}

export default Textarea;
