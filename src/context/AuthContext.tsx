import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  setToken(token: string): unknown;
  getToken: () => string;
  isLogged: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
  getToken: () => "",
  setToken: () => {},
  isLogged: () => false,
});

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? JSON.parse(storedToken) : "";
  });

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  function isLogged() {
    return token !== "";
  }

  function getToken() {
    return token;
  }

  return (
      <AuthContext.Provider value={{ getToken, setToken, isLogged }}>
        {children}
      </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
