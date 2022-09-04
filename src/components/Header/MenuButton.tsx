import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';
import { Link } from 'react-router-dom';

interface MenuButtonProps extends Props {
  text: string;
  route?: string;
  onClick?: () => void;
}

const Button = styled.button`
  ${flex()}
  flex-direction: column;

  & svg {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
  }
`;

const LinkButton = styled(Link)`
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

function MenuButton({ text, route, onClick, children }: MenuButtonProps) {
  if (route) {
    return (
      <li role="menuitem">
        <LinkButton to={route}>
          {children}
          <Text>{text}</Text>
        </LinkButton>
      </li>
    );
  }

  return (
    <li role="menuitem">
      <Button onClick={onClick}>
        {children}
        <Text>{text}</Text>
      </Button>
    </li>
  );
}

export default MenuButton;
