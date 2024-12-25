import axios from "axios";

const base_url = import.meta.env.VITE_API_URL;

export const companyRegister = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${base_url}/company/register`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
