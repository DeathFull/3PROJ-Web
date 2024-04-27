import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import {AuthContextProvider} from "./context/AuthContext.tsx";
import {Box, Center, ChakraProvider, Flex} from "@chakra-ui/react";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthContextProvider>
                <MainPage/>
            </AuthContextProvider>
        ),
        children: [
            {
                path: "",
                element: (
                    <Flex align="center" justify="center" h={100}>
                        <Center>Home</Center>
                    </Flex>
                ),
            },
            {
                path: "about",
                element: <div>About</div>,
            },
            {
                path: "contact",
                element: <div>Contact</div>,
            },
        ],
    },
]);

function App() {
    return (
        <ChakraProvider resetCSS={false}>
            <Box w="100vw"
                 h="100vh"
                 bgImage="url('/NavBar.png')"
                 bgSize="contain"
                 bgPosition="top right"
                 bgRepeat="no-repeat">
                <RouterProvider router={router}/>
            </Box>
        </ChakraProvider>
    );
}

export default App;
