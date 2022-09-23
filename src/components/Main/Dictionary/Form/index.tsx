import { Color } from '@emotion/react';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import Input from './Input';
import Textarea from './Textarea';

interface InputProps {
  id: string;
  label: string;
  maxLength: number;
  isTextarea?: boolean;
  color?: [keyof Color, keyof Color];
  placeholder?: string;
  showLength?: boolean;
}

const Container = styled.div`
  position: relative;
  padding: ${pxToRem(10)};
`;

const Label = styled.label`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.md};

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

function Form({
  id,
  label,
  isTextarea,
  color,
  maxLength,
  placeholder,
  showLength = false
}: InputProps) {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      {isTextarea ? (
        <Textarea
          id={id}
          color={color}
          maxLength={maxLength}
          placeholder={placeholder}
          showLength={showLength}
        />
      ) : (
        <Input
          id={id}
          color={color}
          maxLength={maxLength}
          placeholder={placeholder}
          showLength={showLength}
        />
      )}
    </Container>
  );
}

export default Form;
