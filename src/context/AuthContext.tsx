import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api/ApiConfig.tsx";

interface AuthContextType {
  token: string;
  isLogged: () => boolean;

  setToken(token: string): unknown;
}

const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
  isLogged: () => false,
});

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState("");
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken !== null) {
      const tokenData = JSON.parse(localToken);
      if (tokenData) setToken(tokenData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  function isLogged() {
    return token !== "";
  }

  const navigate = useNavigate();
  const request = instance.get("users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (
    !location.pathname.startsWith("/dashboard") &&
    location.pathname !== "/" &&
    location.pathname !== "/about"
  ) {
    request.then((response) => {
      if (response.status === 200) {
        navigate("/dashboard");
      }
    });
  }

  return (
    <AuthContext.Provider value={{ token, setToken, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
