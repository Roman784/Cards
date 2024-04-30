import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header() {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>

          <Navbar.Brand as={Link} to="/">WebCards</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link as={Link} to="/board">Board</Nav.Link>
              
              <NavDropdown title="Modules" id="collapsible-nav-dropdown">
								<NavDropdown.Item as={Link} to="/modules/add">Add</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/modules/my">My</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/modules/saved">Saved</NavDropdown.Item>
              </NavDropdown>

            </Nav>

            <Nav>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
							<Nav.Link>Log out</Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}