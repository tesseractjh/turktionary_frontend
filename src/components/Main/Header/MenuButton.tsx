import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { flex } from '@styles/minxin';
import pxToRem from '@utils/pxToRem';

interface MenuButtonProps extends Props {
  text: string;
  route?: string;
  useAnchor?: boolean;
  onClick?: () => void;
}

const Container = styled.li`
  ${flex()}
  width: ${pxToRem(52)};
  height: ${pxToRem(52)};
  border-radius: ${pxToRem(8)};
  &:hover {
    background-color: ${({ theme }) => theme.color.TEAL_DARK};
    & * {
      color: ${({ theme }) => theme.color.WHITE};
      fill: ${({ theme }) => theme.color.WHITE};
    }
    & .noti-count {
      background-color: ${({ theme }) => theme.color.TEAL};
      color: ${({ theme }) => theme.color.BLACK};
    }
  }

  @media ${({ theme }) => theme.media.mobile} {
    width: ${pxToRem(36)};
    height: ${pxToRem(36)};
  }
`;

const Button = styled.button`
  ${flex()}
  flex-direction: column;
  position: relative;

  width: 100%;
  height: 100%;

  & svg {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
  }
`;

const LinkButton = styled(Link)`
  ${flex()}
  flex-direction: column;
  position: relative;

  & svg {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
  }
`;

const Anchor = styled.a`
  ${flex('center', 'center', true)}
  flex-direction: column;
  position: relative;

  & svg {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
  }
`;

const Text = styled.span`
  margin-top: ${pxToRem(6)};
  font-size: ${({ theme }) => theme.fontSize.custom('xs', -2)};

  @media ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

function MenuButton({
  text,
  route,
  useAnchor,
  onClick,
  children
}: MenuButtonProps) {
  if (route) {
    if (useAnchor) {
      return (
        <Container role="menuitem">
          <Anchor href={route}>
            {children}
            <Text>{text}</Text>
          </Anchor>
        </Container>
      );
    }

    return (
      <Container role="menuitem">
        <LinkButton to={route}>
          {children}
          <Text>{text}</Text>
        </LinkButton>
      </Container>
    );
  }

  return (
    <Container role="menuitem">
      <Button onClick={onClick}>
        {children}
        <Text>{text}</Text>
      </Button>
    </Container>
  );
}

export default MenuButton;
