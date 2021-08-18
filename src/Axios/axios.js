import axios from 'axios';

const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BASE_URL,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  //Intercepting the request to add the auth token 
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
