import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

API.interceptors.request.use((config) => {
  // keep manually passed token if it already exists
  if (!config.headers.token) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
  }

  return config;
});

export default API;