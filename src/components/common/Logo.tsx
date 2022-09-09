import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import LogoIcon from '@assets/images/star-and-crescent-solid.svg';

interface LogoProps {
  disableLink?: boolean;
  useHref?: boolean;
  className?: string;
}

const Container = styled.h1`
  text-align: center;
`;

const LinkDisabledContainer = styled.h1`
  font-weight: 700;
  font-size: ${pxToRem(56)};
  text-align: center;

  & svg {
    width: ${pxToRem(40)};
    height: ${pxToRem(40)};
    margin-right: ${pxToRem(20)};
  }
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

function Logo({ disableLink = false, useHref = false, className }: LogoProps) {
  if (disableLink) {
    return (
      <LinkDisabledContainer className={className}>
        <LogoIcon />
        Turktionary
      </LinkDisabledContainer>
    );
  }

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
