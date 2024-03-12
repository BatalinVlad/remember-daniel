import React from "react";
import Home from "./pages/Home";

import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

import "./styles/global.scss";

const App = () => {
  const { login, logout, token, userName } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userName: userName,
        login: login,
        logout: logout,
      }}
    >
      <Home />
    </AuthContext.Provider>
  );
};

export default App;
