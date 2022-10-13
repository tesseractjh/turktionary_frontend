import { Color, Size } from '@emotion/react';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import { RecoilState } from 'recoil';
import Input from './Input';
import Textarea from './Textarea';

interface InputProps {
  id: string;
  maxLength: number;
  label?: string;
  labelFontSize?: Size;
  labelFontSizeMobile?: Size;
  isTextarea?: boolean;
  color?: [keyof Color, keyof Color];
  noPadding?: boolean;
  placeholder?: string;
  showLength?: boolean;
}

const Container = styled.div<{ noPadding?: boolean }>`
  position: relative;
  padding: ${({ noPadding }) => (noPadding ? 0 : pxToRem(10))};
`;

export const Label = styled.label<{ fontSize?: Size; fontSizeMobile?: Size }>`
  font-weight: 600;
  font-size: ${({ fontSize, theme }) => theme.fontSize[fontSize ?? 'md']};

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ fontSizeMobile, theme }) =>
      theme.fontSize[fontSizeMobile ?? 'sm']};
  }
`;

function Form({
  id,
  label,
  labelFontSize,
  labelFontSizeMobile,
  isTextarea,
  color,
  maxLength,
  noPadding,
  placeholder,
  showLength = false
}: InputProps) {
  return (
    <Container noPadding={noPadding}>
      {label ? (
        <Label
          htmlFor={id}
          fontSize={labelFontSize}
          fontSizeMobile={labelFontSizeMobile}
        >
          {label}
        </Label>
      ) : null}
      {isTextarea ? (
        <Textarea
          id={id}
          color={color}
          maxLength={maxLength}
          noPadding={noPadding}
          placeholder={placeholder}
          showLength={showLength}
        />
      ) : (
        <Input
          id={id}
          color={color}
          maxLength={maxLength}
          noPadding={noPadding}
          placeholder={placeholder}
          showLength={showLength}
        />
      )}
    </Container>
  );
}

export default Form;
