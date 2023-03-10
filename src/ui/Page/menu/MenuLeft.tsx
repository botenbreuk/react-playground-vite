import { NavLink as RRNavLink } from 'react-router-dom';
import { Button, Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
import { Icon } from '../../index';
import Logo from '../../Logo/Logo';

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function MenuLeft(props: Props) {
  const { isOpen, toggle } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <Col md={2} className="menu-left">
      <Icon
        type="bi-x"
        className="close-button"
        color="#244e9b"
        onClick={toggle}
      />

      <Container fluid>
        <Row className="bg-light">
          <Col xs={12} className="p-3 d-flex justify-content-center">
            <Logo height={100} />
          </Col>
        </Row>
        <Row className="mt-5">
          <Nav vertical className="text-end" pills>
            <NavItem>
              <NavLink to="/" tag={RRNavLink} exact>
                {'Home '}
                <span className="badge bg-danger rounded-pill">42</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/cards" tag={RRNavLink} exact>
                Cards example
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/cards/big" tag={RRNavLink} exact>
                Card Big example
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/shuffle" tag={RRNavLink} exact>
                Shuffle
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/dnd" tag={RRNavLink} exact>
                Drag and Drop
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/dnd-sort" tag={RRNavLink} exact>
                Drag and Drop - sort
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink disabled to="disabled" tag={RRNavLink} exact>
                Disabled Link
              </NavLink>
            </NavItem>
          </Nav>
        </Row>
        <Row>
          <div className="footer">
            <Button color="link" className="text-white p-0">
              About
            </Button>
            <Button color="link" className="text-white p-0">
              Contact
            </Button>
          </div>
        </Row>
      </Container>
    </Col>
  );
}
