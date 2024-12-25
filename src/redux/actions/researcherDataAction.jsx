import { UPDATE_RESEARCHER_PROFILE } from "../types";

export const updateResearcherProfile = (researcherProfileData) => ({
  type: UPDATE_RESEARCHER_PROFILE,
  payload: researcherProfileData,
});
