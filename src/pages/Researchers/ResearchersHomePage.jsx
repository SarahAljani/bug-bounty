import SearchComponent from "../../components/home/SearchComponent";
import FilterComponent from "../../components/home/FilterComponent";
import { useState, useEffect } from "react";
import "../../styles/cardCompany.css";
import { Building, Users, World } from "tabler-icons-react";
import { Button } from "@mantine/core";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6"; // Import both icons
import { useNavigate } from "react-router-dom";
import { apiResearcherHomePage } from "../../api/researcherHomePage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../redux/actions/usersActions";

const ResearchersHomePage = () => {
  const [savedCompanies, setSavedCompanies] = useState([]); // Track saved companies
  const [filteredUsers, setFilteredUsers] = useState([]); // For displaying filtered users
  const [filtered, setFiltered] = useState([]); // For holding temporary filtered users before applying
  const navigate = useNavigate();
  
  const companies = useSelector((state) => state.companies.companies);
  const dispatch = useDispatch();
  // Initialize filteredUsers with all companies data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await apiResearcherHomePage();
        dispatch(fetchCompanies(responseData.data.data.companies));
        console.log("company 1" + companies[1]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    setFilteredUsers(companies);
    setFiltered(companies);
  }, [companies]);

  useEffect(() => {
    setFilteredUsers(filtered);
  }, [filtered]);
  // ----------functions
  const handleNavigate = (uuid) => {
    navigate(`/reasercher-home/company-page/${parseInt(uuid)}`, {
      state: { uuid },
    });
  };
  // Toggle save functionality
  const handleSave = (userId) => {
    setSavedCompanies((prevSavedCompanies) => {
      if (prevSavedCompanies.includes(userId)) {
        return prevSavedCompanies.filter((savedIndex) => savedIndex !== userId); // Unsave the company
      } else {
        return [...prevSavedCompanies, userId]; // Save the company
      }
    });
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          rowGap: "20px",
        }}
      >
        <h2
          className="sayHi"
          style={{
            color: "rgba(29, 29, 27, 1)",
            fontFamily: "Zain",
            fontWeight: "900",
            fontSize: "28px",
            alignSelf: "end",
            textAlign: "right",
            marginRight: "70px",
          }}
        >
          اكتشف الفرص الآن!
        </h2>
        <div
          className="search-filter-container"
          style={{
            display: "flex",
            columnGap: "10px",
            width: "89%",
            alignItems: "flex-end",
            borderRadius: "12px",
            borderBottom: " 2px solid #CECCCC",
            backgroundColor: " #FFF",
            padding: "20px",
            boxShadow:
              "-1px -2px 3px 0px rgba(0, 0, 0, 0.21) inset, 1px 1px 2px 0px rgba(0, 0, 0, 0.22) inset, -1px -1px 4px 0px rgba(0, 0, 0, 0.19), 2px 15px 15px 0px rgba(0, 0, 0, 0.21)",
          }}
        >
          {/* Pass props to FilterComponent */}
          <FilterComponent
            setFilteredUsers={setFilteredUsers}
            filteredUsers={filteredUsers}
            filtered={filtered}
            setFiltered={setFiltered}
            companies={companies}
          />
          <SearchComponent
            companies={companies}
            setFilteredUsers={setFilteredUsers}
            filteredUsers={filteredUsers}
            filtered={filtered}
            setFiltered={setFiltered}
          />
        </div>
        <h2
          className="sayHi"
          style={{
            marginTop: "20px",
            color: "rgba(29, 29, 27, 1)",
            fontFamily: "Zain",
            fontWeight: "900",
            fontSize: "24px",
          }}
        >
          مجموعة الشركات الموجودة
        </h2>
        {/* Render Filtered Users */}
        <div>
          {filteredUsers.length > 0 ? (
            <div className="companyCardsContainer">
              {filteredUsers.map((user) => (
                <div className="companyCard" key={user.uuid}>
                  <div className="cardHeader">
                    <div className="cardTitleLogo">
                      <img
                        className="cardLogo"
                        src={user.logo}
                        alt={user.name}
                      />
                      <h4 className="userName">{user.name}</h4>
                    </div>
                    {/* Toggle between FaRegBookmark and FaBookmark */}
                    {savedCompanies.includes(user.uuid) ? (
                      <FaBookmark
                        className="icon"
                        onClick={() => handleSave(user.uuid)}
                      />
                    ) : (
                      <FaRegBookmark
                        className="icon"
                        onClick={() => handleSave(user.uuid)}
                      />
                    )}
                  </div>
                  <a className="domain" dir="rtl" href={user.domain}>
                    <World style={{ width: "16px", height: "16px" }} />
                    <h4>{user.domain}</h4>
                    <HiMiniArrowTopRightOnSquare
                      style={{
                        transform: " scaleX(-1) rotate(-360deg)",
                        width: "16px",
                        height: "16px",
                      }}
                    />
                  </a>
                  <p>{user.description}</p>
                  <div className="demInfos" dir="rtl">
                    <div className="InfosCilds">
                      <Users className="icon" />
                      {user.employess_count}
                    </div>
                    <div className="InfosCilds">
                      <Building className="icon" />
                      {user.type}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    color="rgba(178, 18, 34, 1)"
                    size="sm"
                    onClick={() => handleNavigate(user.uuid)}
                  >
                    قراءة المزيد
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchersHomePage;
