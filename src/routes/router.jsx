import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../components/Header";
import ResearchersHomePage from "./../pages/Researchers/ResearchersHomePage";
import Tap3 from "./../pages/Tap3";
import Tap4 from "./../pages/Tap4";
import ValidationCodeForm from "../components/forms/ValidationCodeForm";
import EmailForCodeVarificationForm from "../components/forms/EmailForCodeVarificationForm";
import ResetPassword from "../components/forms/ResetPassword";
import RegisterCodeForm from "../components/forms/RegisterCodeForm";
import CompanyPage from "../pages/CompanyPage";
import DescoveredBugs from "../pages/DescoveredBugs";
import ResearcherProfilePage from "../pages/Researchers/ResearcherProfilePage";
import CompaniesProfilePage from "../pages/Companies/CompaniesProfilePage";
import CompaniesDecoveredBugs from "../pages/CompaniesDecoveredBugs";
import CompaniesHomePage from "../pages/Companies/CompaniesHomePage";
import ResearcherPage from "../pages/ResearcherPage";
import ProductsPage from "../pages/Companies/ProductsPage";
import Footer from "../components/Footer";
const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          minHeight: " 100vh",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        <Header />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      { index: true, element: <Home /> },
      {
        path: "email-code-varification",
        element: <EmailForCodeVarificationForm />,
      },
      {
        path: "email-code-varification/validation-code",
        element: <ValidationCodeForm />,
      },
      {
        path: "email-code-varification/validation-code/reset-password/:uuid",
        element: <ResetPassword />,
      },
      {
        path: "register-code/:uuid",
        element: <RegisterCodeForm />,
      },
      { path: "reasercher-home", element: <ResearchersHomePage /> },
      {
        path: "reasercher-home/company-page/:userId",
        element: <CompanyPage />,
      },
      { path: "descovered-bugs", element: <DescoveredBugs /> },
      { path: "researcher-profile", element: <ResearcherProfilePage /> },
      // ,,,,,,,,,,,,,
      { path: "company-home", element: <CompaniesHomePage /> },
      {
        path: "company-home/researcher-page/:userId",
        element: <ResearcherPage />,
      },
      { path: "company-descovered-bugs", element: <CompaniesDecoveredBugs /> },
      { path: "company-products", element: <ProductsPage /> },
      { path: "company-profile", element: <CompaniesProfilePage /> },
      { path: "tap3", element: <Tap3 /> },
      { path: "tap4", element: <Tap4 /> },
    ],
  },
]);

export default Router;
