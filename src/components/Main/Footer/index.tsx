import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import pxToRem from '@utils/pxToRem';
import { border, flex } from '@styles/minxin';
import LicenseIcon from '@assets/images/by-sa.svg';
import Logo from '@components/common/Logo';

const Container = styled.footer`
  ${flex('space-between')}
  flex-direction: column;
  height: ${pxToRem(100)};
  padding: ${pxToRem(20, 0)};
  border-top: ${border()} ${({ theme }) => theme.color.BORDER};
  background-color: ${({ theme }) => theme.color.WHITE};
  text-align: center;
`;

const LinkList = styled.ul`
  ${flex()};
  gap: ${pxToRem(20)};
`;

const LicenseLink = styled.a`
  display: inline-block;
  width: ${pxToRem(80)};
  height: ${pxToRem(28)};
  & svg {
    width: 100%;
    height: 100%;
  }
`;

const DocsLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.color.BLACK};

  &:hover {
    color: ${({ theme }) => theme.color.TEAL_DARK};
    text-decoration: underline;
  }
`;

const Bottom = styled.div`
  ${flex()};
  gap: ${pxToRem(20)};
`;

const links = [
  {
    name: '이용약관',
    route: '/docs/이용약관'
  },
  {
    name: '개인정보 처리방침',
    route: '/docs/개인정보_처리방침'
  }
];

function Footer() {
  return (
    <Container>
      <LinkList>
        {links.map(({ name, route }) => (
          <li key={name}>
            <DocsLink to={route}>{name}</DocsLink>
          </li>
        ))}
      </LinkList>
      <Bottom>
        <Logo />
        <LicenseLink href="https://creativecommons.org/licenses/by-sa/3.0/deed.ko">
          <LicenseIcon viewBox="0 0 120 42" />
        </LicenseLink>
      </Bottom>
    </Container>
  );
}

export default Footer;
