import styled from '@emotion/styled';
import { border } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import { ChangeEventHandler } from 'react';

interface InputProps {
  id: string;
  value: string;
  disabled: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClick: () => void;
}

const StyledInput = styled.input`
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

function Input({ id, value, disabled, onChange, onClick }: InputProps) {
  return (
    <StyledInput
      id={id}
      value={value}
      maxLength={255}
      placeholder="표제어 검색"
      spellCheck={false}
      disabled={disabled}
      onChange={onChange}
      onClick={onClick}
    />
  );
}

export default Input;
