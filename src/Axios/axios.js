import axios from 'axios';

const fetchClient = () => {
  const defaultOptions = {
    baseURL: 'http://localhost:8080/',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    let token = null
    if(localStorage.getItem("userData")){
      token = `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`;
    }
    config.headers.Authorization = token;
    return config;
  });

  return instance;
};

export default fetchClient();
