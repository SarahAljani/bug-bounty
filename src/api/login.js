import axios from "axios";
import { axiosInstance } from "./axiosInstance";

const base_url = import.meta.env.VITE_API_URL;
export const login = (data, url) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${url}`, data)
      .then((res) => {
        resolve(res);
        console.log(res.data.data.token);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("loggedIn", true);
      })
      .catch((err) => reject(err));
  });
};
