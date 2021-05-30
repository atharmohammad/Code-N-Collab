import axios from 'axios';
import {useContext} from 'react'
import {AuthContext} from '../context/auth-context';


const instance = axios.create({
  baseURL: 'http://localhost:8080/',

})

export default instance
