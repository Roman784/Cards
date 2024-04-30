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

          <Navbar.Brand href="#home">WebCards</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link href="#board">Board</Nav.Link>
              
              <NavDropdown title="Modules" id="collapsible-nav-dropdown">
								<NavDropdown.Item href="#modules/add">Add</NavDropdown.Item>
                <NavDropdown.Item href="#modules/my">My</NavDropdown.Item>
                <NavDropdown.Item href="#modules/saved">Saved</NavDropdown.Item>
              </NavDropdown>

            </Nav>

            <Nav>
              <Nav.Link href="#profile">Profile</Nav.Link>
							<Nav.Link href="#logout">Log out</Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}