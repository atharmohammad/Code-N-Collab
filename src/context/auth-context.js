import React,{createContext} from 'react'

export const AuthContext = createContext({
    isLoggedIn: false,
    user:null,
    token:null, 
    loaded:false,
    login:()=>{},
    logout:()=>{},
});
