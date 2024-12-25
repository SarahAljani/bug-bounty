import { axiosInstance } from "./axiosInstance";
export const emailToValidate = (email,url) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/researcher/forgetPassword`, { email: email })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const validationCode = (data,url) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/researcher/validateOtp`,data )
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const resetPassword = (data,url) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/researcher/resetPassword`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
