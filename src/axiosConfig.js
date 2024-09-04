import axios from "axios";
import { API_BASE_URL } from "./constants/constants";

// Create an instance of Axios
const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const token = JSON.parse(localStorage.getItem("token"));

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    // Modify the request config here, such as adding headers
    if (token) {
      config.headers.authorization = token;
    }
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  },
  (error) => {
    // Do something with the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Do something with the response data
    return response;
  },
  (error) => {
    // Do something with the response error
    return Promise.reject(error);
  }
);

export default instance;
