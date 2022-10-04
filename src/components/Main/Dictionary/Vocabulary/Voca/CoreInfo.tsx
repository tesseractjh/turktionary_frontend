import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

const Container = styled.div`
  width: 100%;
  min-height: ${pxToRem(100)};
  padding: ${pxToRem(20)};
  margin-bottom: ${pxToRem(10, 0)};
  background-color: ${({ theme }) => theme.color.WHITE};
  box-shadow: 0 5px 16px rgb(0 0 0 / 17%);
`;

const Top = styled.div`
  padding-bottom: ${pxToRem(10)};
  border-bottom: ${border()} ${({ theme }) => theme.color.BROWN};
`;

const Voca = styled.strong`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

function CoreInfo() {
  return (
    <Container>
      <Top>
        <Voca>Талдыққорған</Voca>
      </Top>
    </Container>
  );
}

export default CoreInfo;
