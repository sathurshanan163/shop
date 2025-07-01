import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/auth';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header = () => {
  const { user_info } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logout_handler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
              </Nav.Link>
              {user_info ? (
                <>
                  <NavDropdown title={user_info.name} id="username">
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logout_handler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser /> Login
                </Nav.Link>
              )}
              {user_info && user_info.is_admin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item as={Link} to="/admin/products">
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/orders">
                    Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/users">
                    Users
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
