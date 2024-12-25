import { combineReducers, legacy_createStore as createStore } from "redux";
import researchersReducer from "./reducers/researchersReducer";
import authReducer from "./reducers/authReducer";
import companiesReducer from "./reducers/companiesReducer";
import chartsReducer from "./reducers/chartsReducer";
import companyDataReducer from "./reducers/companyDataReducer";
import productsReducer from "./reducers/productsReducer";
import researcherDataReducer from "./reducers/researcherDataReducer";
const rootReducer = combineReducers({
  researchers: researchersReducer,
  companies: companiesReducer,
  auth: authReducer,
  charts: chartsReducer,
  company: companyDataReducer,
  researcher: researcherDataReducer,
  products: productsReducer,
});
const store = createStore(rootReducer);
export default store;
