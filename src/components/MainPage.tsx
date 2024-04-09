import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { Box, Flex } from "@chakra-ui/react";

function MainPage() {
  return (
    <>
      <Flex pos="relative" direction="column" minH="100vh">
        <Header />
        <Box flex={1} h="100%">
          <Outlet />
        </Box>
        <Footer />
      </Flex>
    </>
  );
}

export default MainPage;
