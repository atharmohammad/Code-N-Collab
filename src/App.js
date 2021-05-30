import React, { useState, useCallback,useEffect } from "react";
import { BrowserRouter} from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import CustomRoutes from "./CustomRoutes/CustomRoutes";
import "./App.css";

const App = (props) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = useCallback((user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('userData',JSON.stringify({user,token}))
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('userData')
  }, []);

 useEffect(()=>{
   const storedData = JSON.parse(localStorage.getItem('userData'));
   if(storedData && storedData.token){
     setUser(storedData.user);
     setToken(storedData.token);
   }
 },[login])
  
 return (
    <AuthContext.Provider value={{ isLoggedIn:!!token , login, logout,user,token }}>
      <BrowserRouter>
        <CustomRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
