import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import CustomRoutes from "./CustomRoutes/CustomRoutes";
import "./App.css";

const App = (props) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const login = useCallback((user, token) => {
    setUser(user);
    console.log("user", user);
    setToken(token);
    localStorage.setItem("userData", JSON.stringify({ user, token }));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      setUser(storedData.user);
      setToken(storedData.token);
    }
    setLoaded(true);
  }, [login]);

  if (!loaded) return <></>;

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, login, logout, user, token, loaded }}
    >
      <BrowserRouter>
        <CustomRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
