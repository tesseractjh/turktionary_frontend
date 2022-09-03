import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import LogoIcon from '@assets/images/star-and-crescent-solid.svg';

interface LogoProps {
  useHref?: boolean;
  className?: string;
}

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
      <h1 className={className}>
        <LogoLink to="/">
          <LogoIcon />
          Turktionary
        </LogoLink>
      </h1>
    );
  }

  return (
    <h1 className={className}>
      <LogoAnchor href="/">
        <LogoIcon />
        Turktionary
      </LogoAnchor>
    </h1>
  );
}

export default Logo;
