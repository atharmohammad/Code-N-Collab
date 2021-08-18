import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { SnackbarProvider } from "notistack";
import axios from "./Axios/axios";
import { AuthContext } from "./context/auth-context";
import CustomRoutes from "./CustomRoutes/CustomRoutes";
import "./App.css";

const App = (props) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  //Login Callback to set token 
  const login = useCallback((user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("userData", JSON.stringify({ user, token }));
  }, []);

  //Logout Callback to remove token
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

  //Activate the server as soon as user loads the application
  useEffect(async()=>{
    try {
      await axios.get("/");
    } catch (e) {
      try {
        await axios.get("/");
      } catch (e) {
        alert(
          "There might be some problem 😟!\n Please reload this page\nor Try again after sometimes"
        );
      }
    }
  },[])

  if (!loaded) return <></>;

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, login, logout, user, token, loaded }}
    >
      <BrowserRouter>
        <SnackbarProvider>
          <CustomRoutes />
        </SnackbarProvider>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
