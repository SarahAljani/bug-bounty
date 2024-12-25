import { UPDATE_COMPANY_PROFILE } from "../types";

export const updateCompanyProfile = (companyProfileData) => ({
  type: UPDATE_COMPANY_PROFILE,
  payload: companyProfileData,
});
