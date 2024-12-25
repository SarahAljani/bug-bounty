import { useEffect, useState } from "react"; // Import React here
import { useLocation } from "react-router-dom";
import { Button } from "@mantine/core";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6"; // Import both icons
import "../styles/companyPage.css";
import { UploadReport } from "../components/modals/UploadReport";
import { CiStar } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import AcceptedBugsTable from "../components/tables/AcceptedBugsTable";
import { apiResearcherDetails } from "../api/companyHomePage";
import { AddRatingModal } from "../components/modals/AddRatingModal";
const ResearcherPage = () => {
  const [opened, setOpened] = useState(false);
  const location = useLocation();
  const uuid = location.state?.uuid;
  const [user, setUser] = useState({});
  const [acceptedBugs, setAcceptedBugs] = useState([]);

  const [savedCompanies, setSavedCompanies] = useState([]);
  const [open, setOpen] = useState(false); // UseState correctly
  useEffect(() => {
    const fetchResearcherDetails = async () => {
      try {
        const response = await apiResearcherDetails(uuid);
        setUser(response.data.data.researcher);
        setAcceptedBugs(response.data.data.accepted_reports);
      } catch (err) {
        console.log(err);
      }
    };
    fetchResearcherDetails();
  }, []);

  // Toggle save functionality
  const handleSave = (index) => {
    setSavedCompanies((prevSavedCompanies) => {
      if (prevSavedCompanies.includes(index)) {
        return prevSavedCompanies.filter((savedIndex) => savedIndex !== index);
      } else {
        return [...prevSavedCompanies, index];
      }
    });
  };

  // ---styling
  const btnStyle = {
    width: "40%",
    borderRadius: "8px",
    fontSize: "17px",
    fontWeight: "700",
  };
  const handleRating = async (value) => {
    const data = {
      rate: value,
    };
    try {
      const response = await apiReportRating(data, uuid);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="containercp">
      <div className="company-details-containercp" dir="rtl">
        <div className="detailsrp">
          <div className="details-headercp">
            <div className="titleLogocp">
              <img className="cardLogorp" src={user.image} alt={user.name} />
              <h4 className="userName">{user.name}</h4>
            </div>
            {savedCompanies.includes(user.uuid) ? (
              <FaBookmark
                className="iconcp"
                onClick={() => handleSave(user.uuid)}
              />
            ) : (
              <FaRegBookmark
                className="iconcp"
                onClick={() => handleSave(user.uuid)}
              />
            )}
          </div>
          <p style={{ textAlign: "right !important" }}>{user.description}</p>
          <div className="demInfoscp" dir="rtl">
            <div className="InfosCildscp" style={{ alignItems: "center" }}>
              <CiStar className="iconInfoscp" />
              <h4
                style={{ fontSize: "24px", fontWeight: "700", margin: "0px" }}
              >
                5.0 / {user.points}
              </h4>
            </div>
          </div>
          <div className="buttonscp">
            <Button
              color="rgba(178, 18, 34, 1)"
              style={btnStyle}
              //   onClick={() => {
              //     const link = user.domain.startsWith("http")
              //       ? user.domain
              //       : `https://${user.domain}`;
              //     window.open(link, "_blank", "noopener,noreferrer");
              //   }}
            >
              تواصل مباشر{" "}
              <FiPhone
                className="btnIconcp"
                style={{
                  transform: " scaleX(-1) rotate(-360deg)",
                  width: "19px",
                  height: "19px",
                  marginRight: "10px",
                }}
              />
            </Button>
            <Button
              variant="outline"
              color="rgba(178, 18, 34, 1)"
              style={btnStyle}
              onClick={() => setOpen(true)} // Fix button onClick
            >
              تقييم الباحث
              <CiStar
                className="btnIconcp"
                style={{ width: "28px", height: "28px", marginRight: "10px" }}
              />
            </Button>
            <AddRatingModal
              opened={opened}
              onClose={() => setOpened(false)}
              text="يرجى تغييم الثغرة من أصل 5 "
              count={5}
              mainText="تقييم الثغرة"
              handleRating={handleRating}
            />
            <UploadReport open={open} setOpen={setOpen} />
          </div>
        </div>
        <div className="company-image">
          <img src={user.imagePreview} alt={user.name} />
        </div>
      </div>
      {/* <ProductTable products={user.products} /> */}
      <AcceptedBugsTable acceptedBugs={acceptedBugs} />
    </div>
  );
};

export default ResearcherPage;
