import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function MainPage() {
  return (
    <>
      <Flex pos="relative" direction="column" minH="100vh">
        <Header />
        <Flex justify={"center"} direction={"column"} flex={1}>
          <Outlet />
        </Flex>
        <Footer />
      </Flex>
    </>
  );
}

export default MainPage;
