import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { Box, ChakraProvider } from "@chakra-ui/react";
import AuthPage from "./components/AuthPage.tsx";
import Home from "./components/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <MainPage />
      </AuthContextProvider>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <div>About</div>,
      },
      {
        path: "contact",
        element: <div>Contact</div>,
      },
      {
        path: "login",
        element: <AuthPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ChakraProvider resetCSS={false}>
      <Box
        w="100vw"
        h="100vh"
        bgImage="url('/NavBar.png')"
        bgSize="contain"
        bgPosition="top right"
        bgRepeat="no-repeat"
      >
        <RouterProvider router={router} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
