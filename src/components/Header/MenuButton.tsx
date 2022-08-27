import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import { Link } from 'react-router-dom';

interface MenuButtonProps extends Props {
  text: string;
}

const Button = styled(Link)`
  ${flex()}
  flex-direction: column;

  & svg {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
  }
`;

const Text = styled.span`
  margin-top: ${pxToRem(6)};
  font-size: ${pxToRem(12)};
`;

function MenuButton({ text, children }: MenuButtonProps) {
  return (
    <li role="menuitem">
      <Button to="/login">
        {children}
        <Text>{text}</Text>
      </Button>
    </li>
  );
}

export default MenuButton;
