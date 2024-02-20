import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

function MainPage() {
  return (
    <>
      <Container fluid className={"d-flex flex-column min-vh-100 p-0"}>
        <Header />
        <Container fluid className={"flex-grow-1"}>
          <Outlet />
        </Container>
        <Footer />
      </Container>
    </>
  );
}

export default MainPage;
