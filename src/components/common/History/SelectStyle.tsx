import { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

interface SelectStyleProps {
  historyStyle: string;
  setHistoryStyle: React.Dispatch<React.SetStateAction<string>>;
}

const Container = styled.div`
  ${flex('flex-start')}
  flex-wrap: wrap;
  gap: ${pxToRem(20)};
`;

const RadioButton = styled.input`
  margin-right: ${pxToRem(10)};

  &:hover + label {
    color: ${({ theme }) => theme.color.BROWN_DARK};
  }
`;

const Label = styled.label`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.sm};
  user-select: none;
`;

function SelectStyle({ historyStyle, setHistoryStyle }: SelectStyleProps) {
  const handleChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const { value } = currentTarget;
    setHistoryStyle(value);
  };

  return (
    <Container>
      <div>
        <RadioButton
          id="radio-history-style-edit"
          type="radio"
          name="history-style"
          value="edit"
          checked={historyStyle === 'edit'}
          onChange={handleChange}
        />
        <Label htmlFor="radio-history-style-edit">편집 내용 한 번에 보기</Label>
      </div>
      <div>
        <RadioButton
          id="radio-history-style-category"
          type="radio"
          name="history-style"
          value="category"
          checked={historyStyle === 'category'}
          onChange={handleChange}
        />
        <Label htmlFor="radio-history-style-category">항목별로 보기</Label>
      </div>
    </Container>
  );
}

export default SelectStyle;
