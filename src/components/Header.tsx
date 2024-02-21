import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext.tsx";
import { useContext } from "react";

function Header() {
  const { isLogged } = useContext(AuthContext);

  console.log(isLogged());

  return (
    <Navbar data-bs-theme={"dark"} bg={"dark"} className={"p-3 mb-2"}>
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="#home">
            <FontAwesomeIcon icon={faHome} /> Home
          </Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Nav.Link href="../login">Connexion</Nav.Link>
          <Nav.Link href="../register">Inscription</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
