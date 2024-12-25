import axios from "axios";

const base_url = import.meta.env.VITE_API_URL;
import { axiosInstance } from "./axiosInstance";

export const researcherRegister = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/researcher/register`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const researcherRegisterCode = (uuid, code) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/researcher/register/${uuid}`, { code: code })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
