import "../index.css";
import "../styles/header.css";
import { useSelector } from "react-redux";
// import PrimaryButton from "./Buttons/PrimaryButton";
// import SecondaryButton from "./Buttons/SecondaryButton";
import logoIcon from "../assets/icon.svg";
import ImageProfile from "./images/ImageProfile";
import Notification from "./lotties/Notification";
import NavSection from "./navTaps/NavSection.jsx";
const Header = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const status = parseInt(
    useSelector((state) => state.auth.status),
    10
  );
  console.log(loggedIn === true && (status === 0 || status === 1));
  // console.log("nnnnnnnnuuuuuuuulllllllll");
  // console.log(typeof loggedIn, loggedIn + "log"); // Should log: boolean true
  // console.log(typeof status, status + "stat");
  // console.log(status);
  const profileStyle = {
    width: "35px",
    height: "35px",
  };
  return (
    <div className="header">
      <div className="headerTop">
        {loggedIn == true && (status === 0 || status === 1) ? (
          <div
            style={{
              display: "flex",
              columnGap: "20px",
              alignItems: "center",
            }}
          >
            <a href={status === 0 ? "/researcher-profile" : "/company-profile"}>
              <ImageProfile profileStyle={profileStyle} />
            </a>
            <Notification />
          </div>
        ) : (
          <div className="login-register-btn">
            {/* <SecondaryButton>دخول</SecondaryButton>
            <PrimaryButton>سجل مجّاناً</PrimaryButton> */}
          </div>
        )}
        <div className="logoNav">
          {loggedIn == true && (status == 0 || status == 1) ? (
            <NavSection />
          ) : (
            <></>
          )}
          <div className="logo-div">
            <img className="logo" src={logoIcon} alt="logoIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
