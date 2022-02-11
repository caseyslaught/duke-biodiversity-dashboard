import axios from "axios";

import { refreshToken } from "./auth";

const { REACT_APP_API_URL } = process.env;

export const PublicAPI = axios.create({
  baseURL: `${REACT_APP_API_URL}/`,
});

export const ProtectedAPI = axios.create({
  baseURL: `${REACT_APP_API_URL}/`,
});

ProtectedAPI.interceptors.request.use(
  (config) => {
    const currentUser = JSON.parse(window.localStorage.getItem("current_user"));
    if (currentUser) {
      config.headers["Authorization"] = "Bearer " + currentUser.accessToken;
    }
    return config;
  },
  (error) => {
    console.log(JSON.stringify(error));
    return Promise.reject(error);
  }
);

ProtectedAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const currentUser = await refreshToken();
      if (currentUser) {
        axios.defaults.headers.common["Authorization"] =
          "JWT " + currentUser.accessToken;
        return ProtectedAPI(originalRequest);
      }
    }

    window.localStorage.clear();
    return Promise.reject(error);
  }
);
