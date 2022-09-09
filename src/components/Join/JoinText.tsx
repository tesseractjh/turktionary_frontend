import { memo, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { Color } from '@emotion/react';
import { border } from '@styles/minxin';
import { joinTextState, joinTextValidationState } from '@recoil/join';
import pxToRem from '@utils/pxToRem';
import JoinInput from './JoinInput';

interface JoinTextProps {
  param: string;
  label: string;
  handleChange: Function;
  placeholder?: string;
  maxLength?: number;
  defaultValue?: string;
  defaultValueValidation?: (defaultValue: string) => boolean;
  showLength?: boolean;
}

const Input = styled.input<{ color: keyof Color }>`
  display: inline-block;
  width: 100%;
  padding: ${pxToRem(10, 10)};
  margin: ${pxToRem(10, 0)};
  border: ${border()} ${({ theme }) => theme.color.BROWN};
  border-radius: ${pxToRem(6)};
  font-size: ${pxToRem(14)};

  &:focus {
    border-color: ${({ theme }) => theme.color.BROWN_DARK};

    & ~ .join-input-length {
      color: ${({ theme }) => theme.color.BROWN_DARK};
    }
  }

  ${({ color, theme }) =>
    color === 'BLACK'
      ? ''
      : `
    border-color: ${theme.color[color]};

    &:focus {
      border-color: ${theme.color[color]};
    }

    & ~ .join-input-length, &:focus ~ .join-input-length {
      color: ${theme.color[color]};
    }
  `}
`;

const Status = styled.p<{ color: keyof Color }>`
  height: ${pxToRem(20)};
  font-weight: 500;
  font-size: ${pxToRem(14)};
  color: ${({ theme, color }) => theme.color[color]};
`;

const Length = styled.span`
  display: inline-block;
  position: absolute;
  top: ${pxToRem(47)};
  right: ${pxToRem(20)};
  font-size: ${pxToRem(14)};
  color: ${({ theme }) => theme.color.BROWN};
`;

const statusList: Record<string, { text: string; color: keyof Color }> = {
  NONE: {
    text: '',
    color: 'BLACK'
  },
  SPECIAL_LETTERS: {
    text: '한글, 로마자, 키릴문자를 제외한 문자는 사용할 수 없습니다!',
    color: 'RED'
  },
  STARTS_WITH_NUMBER: {
    text: '닉네임의 맨 앞에 숫자를 사용할 수 없습니다!',
    color: 'RED'
  },
  DUPLICATE_NICKNAME: {
    text: '이미 존재하는 닉네임입니다!',
    color: 'RED'
  },
  VALID_NICKNAME: {
    text: '사용 가능한 닉네임입니다',
    color: 'TEAL_DARK'
  },
  INVALID_EMAIL: {
    text: '이메일 형식이 올바르지 않습니다!',
    color: 'RED'
  },
  VALID_EMAIL: {
    text: '사용 가능한 이메일입니다',
    color: 'TEAL_DARK'
  }
};

function JoinText({
  param,
  label,
  handleChange,
  placeholder,
  maxLength,
  defaultValue,
  defaultValueValidation,
  showLength = false
}: JoinTextProps) {
  const [status, setStatus] = useState<keyof typeof statusList>('NONE');
  const [state, setState] = useRecoilState(joinTextState(param));
  const setValidation = useSetRecoilState(joinTextValidationState(param));
  const id = `join-input-${param}`;

  useEffect(() => {
    if (
      defaultValue &&
      defaultValueValidation &&
      defaultValueValidation(defaultValue)
    ) {
      setState(defaultValue);
      setValidation(true);
      setStatus(`VALID_${param.toUpperCase()}`);
    }
  }, [defaultValue]);

  return (
    <JoinInput htmlFor={id} label={label}>
      <Input
        id={id}
        type="text"
        spellCheck={false}
        color={statusList[status].color}
        placeholder={placeholder}
        maxLength={maxLength}
        value={state}
        onChange={handleChange(setState, setValidation, setStatus)}
      />
      <Status color={statusList[status].color}>
        {statusList[status].text}
      </Status>
      {showLength ? (
        <Length className="join-input-length">{state.length}/20</Length>
      ) : null}
    </JoinInput>
  );
}

export default memo(JoinText);
