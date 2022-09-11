import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';

interface JoinFormProps extends Props {
  htmlFor: string;
  label: string;
}

const Container = styled.div`
  position: relative;
  padding: ${pxToRem(10)};
`;

const Label = styled.label`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

function JoinInput({ htmlFor, label, children }: JoinFormProps) {
  return (
    <Container>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </Container>
  );
}

export default JoinInput;
