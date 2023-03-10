import { useState } from 'react';
import { Button, Col, Container, Nav, NavItem, NavLink, Row } from 'reactstrap';
import useOutsideClick from '../../../hooks/useOutsideClick/useOutsideClick';
import { Icon } from '../../index';

export default function MenuRight() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(toggle);

  function toggle() {
    setIsOpen(!isOpen);
  }

  if (!isOpen) {
    return <RenderOpenButton toggle={toggle} />;
  }

  return (
    <>
      <RenderOpenButton toggle={toggle} />
      <div ref={ref} className="menu-right">
        <Container fluid>
          <Row>
            <Col xs={12} className="d-flex justify-content-end">
              <Icon
                type="bi-x"
                className="close-button"
                color="#ffffff"
                onClick={toggle}
              />
            </Col>
          </Row>
          <Row>
            <Nav vertical className="text-center" pills>
              <NavItem>
                <NavLink href="#">Change Password</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Settings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Logout</NavLink>
              </NavItem>
            </Nav>
          </Row>
        </Container>
      </div>
    </>
  );
}

function RenderOpenButton({ toggle }: { toggle: () => void }) {
  return (
    <Button color="danger" onClick={toggle}>
      <Icon
        type="bi-people-fill"
        className="menu-right-open-button"
        color="#fff"
      />
    </Button>
  );
}
