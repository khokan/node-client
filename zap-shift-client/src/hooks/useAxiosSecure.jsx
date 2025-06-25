import axios from "axios";
import React from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_NODE_SERVER_URL}`,
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
