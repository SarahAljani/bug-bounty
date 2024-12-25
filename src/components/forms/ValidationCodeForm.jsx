import { useForm, yupResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { TextInput, Button } from "@mantine/core";
import * as yup from "yup";
import PropTypes from "prop-types"; // Import prop-types for validation
import "../../styles/LoginRegister.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { TbSquareArrowLeft } from "react-icons/tb";
import { validationCode } from "../../api/apiResetPassword";
import { useContext, useState } from "react";
import { LoginRegisterContext } from "../../App";
const ValidationCodeForm = () => {
  const { loginRegister, setLoginRegister } = useContext(LoginRegisterContext);
  const [uuid, setUuid] = useState(null);
  const location = useLocation();
  const email = location.state?.email;
  // ------form vlidation
  const schema = yup.object().shape({
    code: yup
      .string()
      .required("Code is required")
      .matches(/^\d+$/, "The code must contain only digits") // Only digits allowed
      .length(4, "The verification code must be exactly 4 digits"), // Must be exactly 4 digits long
  });

  // Mantine form with Yup validation resolver
  const form = useForm({
    initialValues: {
      code: "",
    },
    validate: yupResolver(schema), // Use yupResolver to connect Yup schema to Mantine form
  });
  const navigate = useNavigate();
  // Responsive styling
  const isLargeScreen = useMediaQuery("(min-width: 500px)");
  const inputStyles = {
    input: {
      textAlign: "right",
      borderRadius: "8px",
    },
  };
  //     dispatch(updateLoggedIn(true));
  const formStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const inputFieldStyle = {
    width: "100%",
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const data = {
      email: email,
      otp: `${values.code}`,
    };
    console.log("Email:", email); // Check email value before sending the request
    try {
      const response = await validationCode(data);
      const uuid = response.data.data.uuid; // Get UUID directly from the response
      setUuid(uuid);
      console.log(uuid);
      navigate(`reset-password/${uuid}`, {
        state: { email },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    setLoginRegister("register");
  };

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <div
        style={{
          padding: isLargeScreen ? "20px 80px" : "20px 10px",
          display: "flex",
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
            إدخال رمز التحقق{" "}
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
            يرجى تفقد البريد الإلكتروني ومن ثم إدخال الرمز المؤلف من 4 خانات{" "}
          </h4>
        </div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="formBlock" dir="rtl">
            <div className="formFields" style={formStyles}>
              <TextInput
                mt="sm"
                placeholder="البريد أدخل الرمز *"
                {...form.getInputProps("code")}
                styles={inputStyles}
                style={inputFieldStyle}
                rightSection={
                  <TbSquareArrowLeft
                    aria-label="Clear input"
                    color="#b6b6b6"
                    size={17}
                  />
                }
                error={form.errors.code}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: "25px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              columnGap: "10px",
              position: "relative",
            }}
          >
            <Button
              color="rgba(178, 18, 34, 1)"
              style={{
                width: "145px",
                borderRadius: "8px",
                fontSize: "20",
                fontWeight: "800",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              رجوع{" "}
            </Button>

            <Button
              type="submit"
              style={{
                width: "145px",
                borderRadius: "8px",
                fontSize: "20",
                fontWeight: "800",
              }}
              variant="outline"
              color="rgba(178, 18, 34, 1)"
              size="sm"
              onClick={handleToggle}
            >
              إرسال رمز{" "}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add prop validation with PropTypes
ValidationCodeForm.propTypes = {
  setLoginRegister: PropTypes.func.isRequired,
};

export default ValidationCodeForm;
