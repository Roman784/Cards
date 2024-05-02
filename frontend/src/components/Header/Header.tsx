import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/userSlice";

import UserType from "../../Types/UserType";

import logo from "/logo.svg"
import "./Header.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header() {
  const user = useSelector<any, UserType>(state => state.user);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <div className="logo-container">
            <img src={logo} alt="WebCards" width="40px" />
            <Navbar.Brand as={Link} to="/">WebCards</Navbar.Brand>
          </div>

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

              {user.isLogin && <Nav.Link onClick={logout}>Log out</Nav.Link>}
              {!user.isLogin && <Nav.Link as={Link} to="/signup">Sign up</Nav.Link>}
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}