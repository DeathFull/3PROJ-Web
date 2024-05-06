import HeaderLogin from "./HeaderLogin.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardHeader from "./dashboard/DashboardHeader.tsx";

function MainPage() {
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/about") {
    return (
      <>
        <Box
          w="100vw"
          h="100vh"
          bgImage="url('/NavBar.png')"
          bgSize="contain"
          bgPosition="top right"
          bgRepeat="no-repeat"
        >
          <Flex pos="relative" direction="column" minH="100vh">
            <Header />
            <Flex justify={"center"} direction={"column"} flex={1}>
              <Outlet />
            </Flex>
            <Footer />
          </Flex>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Flex pos="relative" direction="column" minH="100vh">
          {location.pathname.startsWith("/dashboard") ? (
            <DashboardHeader />
          ) : (
            <HeaderLogin />
          )}
          <Flex flex={1} h="100%">
            <Outlet />
          </Flex>
        </Flex>
      </>
    );
  }
}

export default MainPage;
