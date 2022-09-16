import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

const PopupContainer = styled.div<{ hidden: boolean }>`
  ${flex('center', 'stretch')}
  ${({ hidden }) => (hidden ? 'display: none;' : '')}
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: ${pxToRem(64)};
  right: 0;
  z-index: 10;
  width: ${pxToRem(360)};
  max-height: ${pxToRem(400)};
  border: ${border()} ${({ theme }) => theme.color.BORDER};
  border-radius: ${pxToRem(10)};
  box-shadow: 0 7px 20px rgb(0 0 0 / 17%);
  background-color: ${({ theme }) => theme.color.WHITE};
`;

export default PopupContainer;
