import "../styles/footer.css";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="footer">
      <div className="rights">
        <h6>Bug Bounty Syria 2024</h6>
        <FaRegCopyright />
      </div>
      <div className="navMedia">
        <div className="navFooter">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="media">
          <a href="#">
            <CiFacebook className="footerIcons" />
          </a>
          <a href="#">
            <FaInstagram className="footerIcons" />
          </a>
          <a href="#">
            <CiLinkedin className="footerIcons" />
          </a>
          <a href="#">
            <FaXTwitter className="footerIcons" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
