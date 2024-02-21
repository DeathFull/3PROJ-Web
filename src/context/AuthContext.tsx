import { createContext, ReactNode, useEffect, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLogged: () => Boolean(),
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

  return (
    <AuthContext.Provider value={{ token, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
