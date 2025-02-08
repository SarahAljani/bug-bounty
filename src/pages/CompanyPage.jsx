import { useEffect, useState } from "react"; // Import React here
import { useLocation } from "react-router-dom";
import { Building, Users, World } from "tabler-icons-react";
import { Button, Loader } from "@mantine/core";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import { FaRegBookmark, FaBookmark } from "react-icons/fa6"; // Import both icons
import companyImage from "../assets/companyImage.jpg";
import "../styles/companyPage.css";
import ProductTable from "../components/tables/ProductTable";
import { apiCompanyDetails } from "../api/researcherHomePage";

const CompanyPage = () => {
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const uuid = location.state?.uuid;
  const [savedCompanies, setSavedCompanies] = useState([]);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setLoading(true); // Start loading
      try {
        const response = await apiCompanyDetails(uuid);
        const companyData = response.data.data["company-data"];
        setUser(companyData);
        setProducts(response.data.data["company-data"].products); // Set products directly from the fetched data
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // End loading whether successful or not
      }
    };
    fetchCompanyDetails();
  }, [uuid]); // Make sure uuid is included in the dependency array
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

  return (
    <div className="containercp">
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <Loader color="red" size="xl" type="bars" />
        </div>
      ) : (
        <>
          <div className="company-details-containercp" dir="rtl">
            <div className="detailscp">
              <div className="details-headercp">
                <div className="titleLogocp">
                  <img className="cardLogocp" src={user.logo} alt={user.name} />
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
              <p>{user.description}</p>
              <div className="demInfoscp" dir="rtl">
                <div className="InfosCildscp">
                  <World className="iconInfoscp" />
                  <h4>{user.domain}</h4>
                </div>
                <div className="InfosCildscp">
                  <Users className="iconInfoscp" />
                  {user.employess_count}
                </div>
                <div className="InfosCildscp">
                  <Building className="iconInfoscp" />
                  {user.type}
                </div>
              </div>
              <div className="buttonscp">
                <Button
                  color="rgba(178, 18, 34, 1)"
                  style={btnStyle}
                  onClick={() => {
                    const link = user.domain.startsWith("http")
                      ? user.domain
                      : `https://${user.domain}`;
                    window.open(link, "_blank", "noopener,noreferrer");
                  }}
                >
                  {"زيارة الموقع"}{" "}
                  <HiMiniArrowTopRightOnSquare
                    className="btnIconcp"
                    style={{
                      transform: " scaleX(-1) rotate(-360deg)",
                      width: "19px",
                      height: "19px",
                      marginRight: "10px",
                    }}
                  />
                </Button>
              </div>
            </div>
            <div className="company-image">
              <img src={companyImage} alt={user.name} className="ci" />
            </div>
          </div>
          <ProductTable products={products || []} />
        </>
      )}
    </div>
  );
};

export default CompanyPage;
