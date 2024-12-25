import { useEffect, useState } from "react";
import LoginRegister from "./LoginRegister";
import ResearchersHomePage from "./Researchers/ResearchersHomePage";
import CompaniesHomePage from "./Companies/CompaniesHomePage";

const Home = () => {
  // Initialize token and status directly from localStorage
  
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [status, setStatus] = useState(localStorage.getItem("status"));

  // Handle one-time page refresh using sessionStorage
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");

    // Reload the page if it hasn't been refreshed yet
    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true");
      window.location.reload(); // This will cause a one-time reload
    } else {
      // If the page has already been reloaded, update the token and status
      setToken(localStorage.getItem("token"));
      setStatus(localStorage.getItem("status"));
    }
  }, []); // Run once when the component mounts

  return (
    <div
      className="h"
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      {token ? (
        parseInt(status) === 0 ? (
          <ResearchersHomePage />
        ) : (
          <CompaniesHomePage />
        )
      ) : (
        <LoginRegister />
      )}
    </div>
  );
};

export default Home;
