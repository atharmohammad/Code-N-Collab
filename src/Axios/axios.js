import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.0.106:8080/'
})

export default instance
