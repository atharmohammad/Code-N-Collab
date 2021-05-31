import axios from 'axios';
import {useContext} from 'react'
import {AuthContext} from '../context/auth-context';


const getToken = ()=>{
  if(localStorage.getItem("userData"))
    return `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`;

  return "";
}

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers:{
    "Authorization" : getToken()
  }
})

export default instance
