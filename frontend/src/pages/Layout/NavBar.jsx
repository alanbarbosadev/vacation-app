import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  getCurrentUser,
  getRole,
  getUserAuthenticated,
  signOutUser,
} from "../../services/auth";
import LoginContext from "../../services/logincontext";
import Button from "react-bootstrap/Button";

export default function NavBar() {
  const { isLoggedIn } = useContext(LoginContext);

  const logoutClicked = () => {
    signOutUser();
    window.location.href = "/";
  };

  return (
    <Navbar expand="lg" className="bg-light">
      <Container>
        <Navbar.Brand href="/">VacationsApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {getUserAuthenticated() && (
              <>
                {!(getRole() == "IS_ADMIN") && (
                  <Nav.Link href="/register-vacation">
                    Solicitar Férias
                  </Nav.Link>
                )}
                <Nav.Link href="/vacations">
                  {getRole() == "IS_ADMIN"
                    ? "Listar Férias"
                    : "Minhas Solicitações"}
                </Nav.Link>
                {getRole() == "IS_ADMIN" && (
                  <Nav.Link href="/users">Administrar Permissões</Nav.Link>
                )}
              </>
            )}
          </Nav>
          <div className="ms-auto">
            {isLoggedIn ? (
              <NavDropdown
                title={`Olá, ${getCurrentUser()}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={logoutClicked}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/auth/signin">
                <Button className="btn btn-success">Fazer login</Button>
              </Nav.Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
