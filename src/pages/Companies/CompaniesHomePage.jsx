import { useEffect, useState } from "react";
import "../../styles/cardResearcher.css";
import { Button } from "@mantine/core";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6"; // Import both icons
import { useNavigate } from "react-router-dom";
import { CiStar } from "react-icons/ci";
// import { DonutChart } from "@mantine/charts";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDispatch, useSelector } from "react-redux";
import { apiCompanyHomePage } from "../../api/companyHomePage";
import { fetchResearchers } from "../../redux/actions/usersActions";
import {
  updateCountAccept,
  updateCountPending,
} from "./../../redux/actions/chartsAction";
import SearchComponent from "../../components/home/SearchComponent";
// import "@mantine/charts/styles.css";
const CompaniesHomePage = () => {
  const [savedCompanies, setSavedCompanies] = useState([]); // Track saved companies
  const researchers = useSelector((state) => state.researchers.researchers);
  const accept = useSelector((state) => state.charts.accept);
  const pending = useSelector((state) => state.charts.pending);
  const dispatch = useDispatch();
  const [filteredUsers, setFilteredUsers] = useState([]); // For displaying filtered users
  const [filtered, setFiltered] = useState([]); // For holding temporary filtered users before applying
  const navigate = useNavigate();

  const handleNavigate = (uuid) => {
    navigate(`/company-home/researcher-page/${uuid}`, {
      state: { uuid },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await apiCompanyHomePage();
        dispatch(fetchResearchers(responseData.data.researchers));
        dispatch(updateCountPending(responseData.data.count_pending));
        dispatch(updateCountAccept(responseData.data.count_accept));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [dispatch]);
  useEffect(() => {
    setFilteredUsers(researchers);
    setFiltered(researchers);
  }, [researchers]);

  useEffect(() => {
    setFilteredUsers(filtered);
  }, [filtered]);
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
    <div className="mainDiv">
      <div className="chartsDiv">
        <h4
          style={{
            fontWeight: "700",
            fontSize: "20px",
            color: "rgba(32, 32, 32, 1)",
          }}
        >
          إحصائية الثغرات
        </h4>
        <h6
          style={{
            fontWeight: "400",
            fontSize: "17px",
            color: "#6e6e6e",
            marginBottom: "-60px",
            display: "flex",
            flexFlow: "row-reverse",
          }}
        >
          <>{accept + pending}</>
          <span style={{ marginRight: "5px" }}> ثغرة </span>
        </h6>
        {/* <DonutChart
          size={188}
          thickness={30}
          data={data}
          paddingAngle={2}
          cornerRadius={5}
        /> */}

        <PieChart
          series={[
            {
              data: [
                { id: 0, value: pending, label: "Pending" },
                { id: 1, value: accept, label: "Accept" },
              ],
              innerRadius: 26,
              outerRadius: 80,
              paddingAngle: 5,
              cornerRadius: 7,
              startAngle: -45,
              endAngle: 225,
              cx: 150,
              cy: 150,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
        />
      </div>
      <div
        className="search-filter-container"
        style={{
          marginTop: "20px",
          display: "flex",
          columnGap: "10px",
          width: "100%",
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
        <SearchComponent
          companies={researchers}
          setFilteredUsers={setFilteredUsers}
          filteredUsers={filteredUsers}
          filtered={filtered}
          setFiltered={setFiltered}
        />
      </div>
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
            marginTop: "20px",
            color: "rgba(29, 29, 27, 1)",
            fontFamily: "Zain",
            fontWeight: "900",
            fontSize: "24px",
          }}
        >
          الباحثين الأمنيين{" "}
        </h2>
        {/* Render Filtered Users */}
        <div>
          {filteredUsers.length > 0 ? (
            <div className="researcherCardsContainer">
              {filteredUsers.map((user) => (
                <div className="researcherCard" key={user.uuid}>
                  <div className="cardHeader">
                    <div className="cardTitleLogo">
                      <img
                        className="cardImage"
                        src={user.image}
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
                  <div className="domain" dir="rtl">
                    <CiStar style={{ width: "16px", height: "16px" }} />
                    <h4>5.0 / {user.points}</h4>
                  </div>
                  <p>{user.description}</p>
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

export default CompaniesHomePage;
