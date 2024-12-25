import { useForm, yupResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { TextInput, Button } from "@mantine/core";
import { Mail } from "tabler-icons-react";
import * as yup from "yup";
import PropTypes from "prop-types"; // Import prop-types for validation
import "../../styles/LoginRegister.module.css";
import { useNavigate } from "react-router-dom";
import { emailToValidate } from "../../api/apiResetPassword";
const EmailForCodeVarificationForm = () => {
  // ------form vlidation
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  // Mantine form with Yup validation resolver
  const form = useForm({
    initialValues: {
      email: "",
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
    const email = values.email;
    try {
      const response = emailToValidate(email);
    } catch (error) {
      console.log(error);
    }
    navigate(`validation-code`, {
      state: { email },
    });
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
            إعادة تعيين كلمة المرور{" "}
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
            يرجى إدخال البريد الإلكتروني لإعادة تعيين كلمة المرور{" "}
          </h4>
        </div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="formBlock" dir="rtl">
            <div className="formFields" style={formStyles}>
              <TextInput
                mt="sm"
                placeholder="البريد الإلكتروني"
                {...form.getInputProps("email")}
                styles={inputStyles}
                style={inputFieldStyle}
                rightSection={
                  <Mail aria-label="Clear input" color="#b6b6b6" size={17} />
                }
                error={form.errors.email}
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
              type="submit" // Set the button type to "submit"
              style={{
                width: "145px",
                borderRadius: "8px",
                fontSize: "20",
                fontWeight: "800",
              }}
              variant="outline"
              color="rgba(178, 18, 34, 1)"
              size="sm"
            >
              إرسال رمز
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add prop validation with PropTypes
EmailForCodeVarificationForm.propTypes = {
  setLoginRegister: PropTypes.func.isRequired,
};

export default EmailForCodeVarificationForm;
