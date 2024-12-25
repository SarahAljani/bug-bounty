import { axiosInstance } from "./axiosInstance";

export const apiResearcherHomePage = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/researcher/home`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};
export const apiCompanyDetails = (uuid) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/researcher/company/${uuid}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const apiReport = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/researcher/add-reports-researcher`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const apiResearcherDescoveredBugs = (pageNumber) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/researcher/reports-researcher?page=${pageNumber}`)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const apiResearcherProfile = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/researcher/profile`)
      .then((res) => resolve(res.data.data.researcher))
      .catch((err) => reject(err));
  });
};
export const apiResearcherUpdateProfile = (data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/researcher/profile`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
export const apiReportRating = (data,uuid) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`/company/all_report/rate/${uuid}`, data)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};