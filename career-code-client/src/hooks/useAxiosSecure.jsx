import axios from "axios";
import React from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_NODE_SERVER_URL}`,
});
const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
    return config;
  });

  //response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.status === 401 || error.status === 403) {
        signOutUser()
          .then(() => {
            console.log("signout use for status 401");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default useAxiosSecure;
