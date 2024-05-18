import HeaderLogin from "./HeaderLogin.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {Box, Center, Flex, VStack} from "@chakra-ui/react";
import {Outlet, useLocation} from "react-router-dom";
import DashboardHeader from "./dashboard/DashboardHeader.tsx";
import DashboardSidebarLink from "./dashboard/DashboardSidebarLink.tsx";
import {FiGlobe, FiHome, FiSettings, FiMessageCircle } from "react-icons/fi";

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
                        <Header/>
                        <Flex justify={"center"} direction={"column"} flex={1}>
                            <Outlet/>
                        </Flex>
                        <Footer/>
                    </Flex>
                </Box>
            </>
        );
    } else {
        return (
            <>
                <Flex pos="relative" direction="column" minH="100vh">
                    {location.pathname.startsWith("/dashboard") ? (
                        <>
                            <DashboardHeader/>
                            <Flex flex={1} minW={"100%"}>
                                <Box w={"20%"} bg={"#d17d00"}>
                                    <Center>
                                        <VStack>
                                            <DashboardSidebarLink name={"Accueil"} icon={FiHome}/>
                                            <DashboardSidebarLink
                                                name={"Groupes"}
                                                icon={FiGlobe}
                                                location={"/groups"}
                                            />
                                            <DashboardSidebarLink
                                                name={"Conversation"}
                                                icon={FiMessageCircle}
                                                location={"/message"}
                                            />
                                            <DashboardSidebarLink
                                            name={"Paramètres"}
                                            icon={FiSettings}
                                            location={"/settings"}
                                            />
                                        </VStack>
                                    </Center>
                                </Box>
                                <Outlet/>
                            </Flex>
                        </>
                    ) : (
                        <>
                            <HeaderLogin/>
                            <Flex flex={1} h="100%">
                                <Outlet/>
                            </Flex>
                        </>
                    )}
                </Flex>
            </>
        );
    }
}

export default MainPage;
