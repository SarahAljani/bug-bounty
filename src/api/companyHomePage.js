import { axiosInstance } from "./axiosInstance";

export const apiCompanyHomePage = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/company/home`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};
export const apiCompanyProfile = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/company/profile`)
      .then((res) => resolve(res.data.data.company))
      .catch((err) => reject(err));
  });
};
export const apiCompanyUpdateProfile = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/company/profile`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const apiCompanyUpdatePassword = (data, url) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const apiCompanyDescoveredBugs = (pageNumber) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/company/all_report?page=${pageNumber}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const apiCompanyProducts = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/company/all_product`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const apiCompanyAddProduct = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/company/add_product`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const apiCompanyDeleteProduct = (uuid) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/company/delete_product`, null, {
        params: { uuid }, // Pass the UUID as a query parameter
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const apiResearcherDetails = (uuid) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/company/researcher/${uuid}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const apiResearcherRating = (data, uuid) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/company/all_report/rate/${uuid}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};