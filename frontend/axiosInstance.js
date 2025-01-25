import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/', 
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response; 
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized. Please log in.');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
