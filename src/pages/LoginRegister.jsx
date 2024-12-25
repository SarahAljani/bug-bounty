import { Tabs } from "@mantine/core";
import { useContext, useState } from "react";
import styles from "../styles/LoginRegister.module.css"; // Import the CSS module
import LoginForm from "../components/forms/LoginForm";
import { useMediaQuery } from "@mantine/hooks";
import CompanyRegisterForm from "../components/forms/CompanyRegisterForm";
import ResearcherRegisterForm from "../components/forms/ResearcherRegisterForm";
import { LoginRegisterContext } from "../App";
const LoginRegister = () => {
  const isLargeScreen = useMediaQuery("(min-width: 900px)");
  const [defVal, setDefVal] = useState("reasercher");
  // const [loginRegister, setLoginRegister] = useState("login");
  const { loginRegister, setLoginRegister } = useContext(LoginRegisterContext);
  const style = {
    height: "35px",
    minWidth: "150px",
    position: "relative",
    margin: "10px 20px",
    borderBottom: "1px solid rgba(162, 168, 180, 1)",
    color: "black",
    fontFamily: "Zain",
    fontSize: "20px",
    fontWeight: "800",
    padding: "0",
  };
  const container_style = {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "start",
    alignItems: "flex-start" /* Ensure elements align at the top */,
    width: loginRegister === "login" ? (isLargeScreen ? "70%" : "90%") : "70%",
    height:
      "100vh" /* Ensure the parent container stretches full screen height */,
    columnGap: "40px",
  };
  return (
    <div className="styles.container" style={container_style}>
      {/* --------- register ---------- */}
      <div
        className="styles.main__form"
        style={{
          padding: isLargeScreen ? "30px 50px" : "20px 10px",
          display: "flex",
          width: isLargeScreen ? "70%" : "100%",
          flexDirection: "column",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px 0px #00000037 ",
          backgroundColor: "#fff",
        }}
      >
        <div className="welcoming">
          <h2
            className="sayHi"
            style={{
              color: "rgba(29, 29, 27, 1)",
              fontFamily: "Zain",
              fontWeight: "900",
              fontSize: "24px",
            }}
          >
            Bug Bounty مرحباً بك في
          </h2>
          <h4
            className="continue"
            style={{
              marginTop: "5px",
              marginBottom: "10px",
              color: "rgba(156, 163, 175, 1)",
              fontFamily: "Zain",
              fontWeight: "800 ",
              fontSize: "14px",
            }}
          >
            يرجى التسجيل للمتابعة
          </h4>
        </div>
        {/* loginRegister, setLoginRegister */}
        {loginRegister === "login" ? (
          <>
            <Tabs
              variant="unstyled"
              defaultValue={defVal}
              onTabChange={(value) => setDefVal(value)}
              style={{
                width: "100%",
                display: "inline-block",
              }}
            >
              <Tabs.List grow>
                <Tabs.Tab style={style} value="company" className={styles.tab}>
                  تسجيل الدخول كشركة{" "}
                </Tabs.Tab>
                <Tabs.Tab
                  style={style}
                  value="reasercher"
                  className={styles.tab}
                >
                  تسجيل الدخول كباحث أمني{" "}
                </Tabs.Tab>
              </Tabs.List>

              {/* Panels for each tab */}
              <Tabs.Panel value="reasercher" pt="xs">
                <LoginForm
                  loginRegister={loginRegister}
                  setLoginRegister={setLoginRegister}
                  url={`/researcher/login`}
                />
              </Tabs.Panel>

              <Tabs.Panel value="company" pt="xs">
                <LoginForm
                  loginRegister={loginRegister}
                  setLoginRegister={setLoginRegister}
                  url={`/company/login`}
                />
              </Tabs.Panel>
            </Tabs>
          </>
        ) : (
          <Tabs
            variant="unstyled"
            defaultValue={defVal}
            onTabChange={(value) => setDefVal(value)}
            style={{
              width: "100%",
              display: "inline-block",
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab style={style} value="company" className={styles.tab}>
                التسجيل كشركة جديدة
              </Tabs.Tab>
              <Tabs.Tab style={style} value="reasercher" className={styles.tab}>
                التسجيل كباحث أمني
              </Tabs.Tab>
            </Tabs.List>

            {/* Panels for each tab */}
            <Tabs.Panel value="reasercher" pt="xs">
              <ResearcherRegisterForm
                loginRegister={loginRegister}
                setLoginRegister={setLoginRegister}
              />
            </Tabs.Panel>

            <Tabs.Panel value="company" pt="xs">
              <CompanyRegisterForm
                loginRegister={loginRegister}
                setLoginRegister={setLoginRegister}
              />
            </Tabs.Panel>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
