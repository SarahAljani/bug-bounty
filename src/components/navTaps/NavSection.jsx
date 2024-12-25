import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom"; // Import useLocation for getting current path
import "../../styles/navSection.css";
import { useSelector } from "react-redux";
const NavSection = () => {
  const status = parseInt(useSelector((state) => state.auth.status));
  const [activeTab, setActiveTab] = useState(1); // Initialize state for active tab
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const sidebarRef = useRef(null); // Ref for sidebar
  const burgerIconRef = useRef(null); // Ref for burger icon

  const location = useLocation(); // Get the current path

  useEffect(() => {
    // Check the current path and set the active tab accordingly
    if (
      location.pathname === "/reasercher-home" ||
      location.pathname === "/company-home"
    ) {
      setActiveTab(1);
    } else if (
      location.pathname === "/descovered-bugs" ||
      location.pathname === "/company-descovered-bugs"
    ) {
      setActiveTab(2);
    }
  }, [location.pathname]); // Run the effect when the pathname changes

  // Show the sidebar with sliding effect
  const showSideBar = () => {
    setIsSidebarVisible(true);
    gsap.fromTo(
      sidebarRef.current,
      { x: "100%" }, // Initial position (off-screen to the right)
      { x: "0%", duration: 0.6, ease: "power3.out" } // Slide in
    );

    // Transition burger icon to close icon
    gsap.to(burgerIconRef.current, {
      rotate: 360,
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  // Close the sidebar with sliding effect
  const closeSideBar = () => {
    gsap
      .fromTo(
        sidebarRef.current,
        { x: "0%" }, // Current position (on-screen)
        { x: "100%", duration: 0.6, ease: "power3.in" } // Slide out
      )
      .then(() => setIsSidebarVisible(false));

    // Transition close icon back to burger icon
    gsap.to(burgerIconRef.current, {
      rotate: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  return (
    <div className="header__nav__section">
      <div className="nav">
        {/* .........nav bar full large screen ------- */}
        <ul
          className="side__bar"
          ref={sidebarRef}
          style={{ display: isSidebarVisible ? "flex" : "none" }}
        >
          {/* Tab 1 */}
          <li className="nav__item">
            <a
              className={`nav__link ${activeTab === 1 ? "active" : ""}`}
              href={status === 0 ? "/reasercher-home" : "/company-home"}
              onClick={() => setActiveTab(1)}
            >
              الصفحة الرئيسية
            </a>
          </li>
          {/* Tab 2 */}
          <li className="nav__item">
            <a
              className={`nav__link ${activeTab === 2 ? "active" : ""}`}
              href={
                status === 0 ? "/descovered-bugs" : "/company-descovered-bugs"
              }
              onClick={() => setActiveTab(2)}
            >
              الثغرات المكتشفة
            </a>
          </li>
        </ul>

        {/* .........nav bar full small screen ------- */}
        <ul className="nav__list">
          {/* Burger icon */}
          {isSidebarVisible === false ? (
            <li className="burger" ref={burgerIconRef} onClick={showSideBar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="rgba(178, 18, 34, 1)"
              >
                <path d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h640q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z" />
              </svg>
            </li>
          ) : (
            // Close icon
            <li className="close" ref={burgerIconRef} onClick={closeSideBar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="rgba(178, 18, 34, 1)"
              >
                <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
              </svg>
            </li>
          )}

          {/* Same links here */}
          <li className="nav__item">
            <a
              className={`nav__link ${activeTab === 1 ? "active" : ""}`}
              href={status === 0 ? "/reasercher-home" : "/company-home"}
              onClick={() => setActiveTab(1)}
            >
              الصفحة الرئيسية
            </a>
          </li>
          <li className="nav__item">
            <a
              className={`nav__link ${activeTab === 2 ? "active" : ""}`}
              href={
                status === 0 ? "/descovered-bugs" : "/company-descovered-bugs"
              }
              onClick={() => setActiveTab(2)}
            >
              الثغرات المكتشفة
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavSection;
