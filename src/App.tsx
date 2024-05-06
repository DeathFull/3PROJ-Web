import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import {ChakraProvider } from "@chakra-ui/react";
import AuthPage from "./components/AuthPage.tsx";
import Home from "./components/Home.tsx";
import AuthPageInscription from "./components/AuthPageInscription.tsx";

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
        path: "inscription",
        element: <AuthPageInscription />,
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
        <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
