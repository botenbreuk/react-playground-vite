import { ReactNode, useState } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Col,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavItem,
  NavLink,
  Row
} from 'reactstrap';
import { Icon } from '../index';
import Logo from '../Logo/Logo';
import MenuLeft from './menu/MenuLeft';
import MenuRight from './menu/MenuRight';

interface Props {
  title?: string;
  filterBar?: ReactNode;
  children?: ReactNode | ReactNode[];
  scrollToTop?: boolean;
}

export default function Page(props: Props) {
  const { title, filterBar, children, scrollToTop = false } = props;

  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <Container fluid>
      <Row>
        <MenuLeft isOpen={isOpen} toggle={toggle} />
        <Col xs={isOpen ? 10 : 12} className="min-vh-100 p-0 bg-dark">
          <div className="navbars">
            <Navbar className="m-0 bg-light">
              {!isOpen && (
                <NavbarBrand>
                  <Row>
                    <Col>
                      <Icon type="bi-list" color="#244e9b" onClick={toggle} />
                    </Col>
                    <Col>
                      <Logo height={40} />
                    </Col>
                  </Row>
                </NavbarBrand>
              )}
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
            {filterBar && (
              <div className="filter-bar bg-light">{filterBar}</div>
            )}
          </div>
          <div className="main-content">{children}</div>
          {scrollToTop && (
            <Icon
              className="scroll-to-top"
              type="bi-arrow-up-circle-fill"
              color="white"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}
