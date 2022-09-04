import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import LogoIcon from '@assets/images/star-and-crescent-solid.svg';

interface LogoProps {
  useHref?: boolean;
  className?: string;
}

const Container = styled.h1`
  text-align: center;
`;

const LogoLink = styled(Link)`
  font-weight: 600;
  font-size: ${pxToRem(28)};

  & svg {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
    margin-right: ${pxToRem(10)};
  }
`;

const LogoAnchor = styled.a`
  font-weight: 600;
  font-size: ${pxToRem(28)};

  & svg {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
    margin-right: ${pxToRem(10)};
  }
`;

function Logo({ useHref = false, className }: LogoProps) {
  if (useHref) {
    return (
      <Container className={className}>
        <LogoLink to="/">
          <LogoIcon />
          Turktionary
        </LogoLink>
      </Container>
    );
  }

  return (
    <Container className={className}>
      <LogoAnchor href="/">
        <LogoIcon />
        Turktionary
      </LogoAnchor>
    </Container>
  );
}

export default Logo;
