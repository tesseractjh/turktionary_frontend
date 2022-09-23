import styled from '@emotion/styled';
import useAlertBeforeLeave from '@hooks/useAlertBeforeLeave';
import pxToRem from '@utils/pxToRem';
import Button from '@components/common/Button';

interface SubmitButtonProps extends Record<string, unknown> {
  useClickHandler: (params: Record<string, unknown>) => () => unknown;
}

const ButtonContainer = styled.div`
  padding-right: ${pxToRem(10)};
  margin-top: ${pxToRem(30)};
  text-align: right;

  @media ${({ theme }) => theme.media.tablet} {
    margin-top: ${pxToRem(20)};
  }

  @media ${({ theme }) => theme.media.mobile} {
    margin-top: ${pxToRem(10)};
  }
`;

function SubmitButton({ useClickHandler, ...restProps }: SubmitButtonProps) {
  useAlertBeforeLeave();
  const handleClick = useClickHandler({ ...restProps });

  return (
    <ButtonContainer>
      <Button type="sm" backgroundColorHover="BROWN" onClick={handleClick}>
        제출
      </Button>
    </ButtonContainer>
  );
}

export default SubmitButton;
