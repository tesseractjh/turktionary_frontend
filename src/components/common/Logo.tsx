import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import LogoIcon from '@assets/images/star-and-crescent-solid.svg';

const LogoLink = styled(Link)`
  font-weight: 600;
  font-size: ${pxToRem(28)};

  & svg {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
    margin-right: ${pxToRem(10)};
  }
`;

function Logo() {
  return (
    <h1>
      <LogoLink to="/">
        <LogoIcon />
        Turktionary
      </LogoLink>
    </h1>
  );
}

export default Logo;
