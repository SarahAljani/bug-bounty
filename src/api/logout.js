import axios from "axios";
import { axiosInstance } from "./axiosInstance";

const base_url = import.meta.env.VITE_API_URL;
export const logout = (url) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
