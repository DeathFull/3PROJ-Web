import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import AuthPage from "./components/AuthPage.tsx";
import Home from "./components/Home.tsx";
import DashboardHome from "./components/dashboard/DashboardHome.tsx";
import AuthPageInscription from "./components/AuthPageInscription.tsx";
import AboutPage from "./components/AboutPage.tsx";

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
        element: <AboutPage />,
      },
      {
        path: "inscription",
        element: <AuthPageInscription />,
      },
      {
        path: "login",
        element: <AuthPage />,
      },
      {
        path: "dashboard",
        element: <DashboardHome />,
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
