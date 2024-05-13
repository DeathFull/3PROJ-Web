import HeaderLogin from "./HeaderLogin.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {Box, Flex} from "@chakra-ui/react";
import {Outlet, useLocation} from "react-router-dom";

function MainPage() {
    const location = useLocation();

    if (location.pathname === "/login" || location.pathname === "/inscription") {
        return (
            <>
                <Flex pos="relative" direction="column" minH="100vh">
                    <HeaderLogin/>
                    <Flex justify={"center"} direction={"column"} flex={1}>
                        <Outlet/>
                    </Flex>
                    <Footer/>
                </Flex>
            </>
        );
    } else {
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
                        <Header/>
                        <Flex justify={"center"} direction={"column"} flex={1}>
                            <Outlet/>
                        </Flex>
                        <Footer/>
                    </Flex>
                </Box>
            </>
        );
    }
}

export default MainPage;
