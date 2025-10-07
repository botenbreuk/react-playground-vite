import { NavLink as RRNavLink } from 'react-router';
import { Nav, NavItem, NavLink, Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import { Logo } from '../../Logo/Logo';
import { MenuRight } from './MenuRight';

type Props = {
  title?: string;
};

export function Header(props: Props) {
  const { title } = props;

  return (
    <Navbar className="m-0 bg-danger">
      <NavbarBrand />
      <NavbarText>{title}</NavbarText>
      <Nav>
        <NavItem>
          <Logo height={40} />
        </NavItem>
        <NavItem>
          <NavLink to="#" tag={RRNavLink}>
            Username
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="#" tag={RRNavLink}>
            Logged in company name
          </NavLink>
        </NavItem>
        <NavItem>
          <MenuRight />
        </NavItem>
      </Nav>
    </Navbar>
  );
}
