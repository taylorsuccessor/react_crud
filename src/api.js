import axios from "axios";
import config from "./config";

const api = axios.create({
  baseURL: `${config.apiBaseUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchAndStoreToken = async () => {
  try {
  const response = await axios.post(`${config.apiBaseUrl}/auth/get-token`, {
    email: "admin@gmail.com",
    password: "admin",
    device_name: "react",
  });
  const { token } = response.data;
  localStorage.setItem("token", token); // Store the token in local storage
  return token;
  } catch (error) {
    console.error('Failed to fetch token:', error);
    throw error; // Rethrow the error to handle it in the interceptor
  }
};

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token"); // Retrieve the token from local storage
    if (!token || token == "undefined") {
      token = await fetchAndStoreToken();
    }
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
