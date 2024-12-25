import { useForm, yupResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { PasswordInput, Button } from "@mantine/core";
import * as yup from "yup";
import PropTypes from "prop-types"; // Import prop-types for validation
import "../../styles/LoginRegister.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLoggedIn } from "../../redux/actions/aurhActions";
import { resetPassword } from "../../api/apiResetPassword";
import { login } from "../../api/login";
const ValidationCodeForm = () => {
  const location = useLocation();
  const email = location.state?.email;
  const {uuid} = useParams();
  console.log(uuid);
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
    password_ensure: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Mantine form with Yup validation resolver
  const form = useForm({
    initialValues: {
      password: "",
      password_ensure: "",
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
      "&:focus-within ": {
        border: " #rgba(178, 18, 34, 1) !important", // Set the border color on focus
      },
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
    const data = {
      uuid: uuid,
      password: values.password,
      password_confirmation: values.password_ensure,
    };
    console.log(uuid);
    const loginData = {
      email: email,
      password: values.password,
    };
    console.log("Email:", email); // Check email value before sending the request

    try {
      const response = await resetPassword(data);
      const researcherData = await login(loginData, `/researcher/login`);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(researcherData.data.data.researcher)
      );
      localStorage.setItem("loggedIn", true);
      navigate("/");
      localStorage.setItem("status", 0);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
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
            تغيير كلمة المرور{" "}
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
            يرجى إعادة تعيين كلمة المرور{" "}
          </h4>
        </div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className="formBlock" dir="rtl">
            <div className="formFields" style={formStyles}>
              <PasswordInput
                mt="sm"
                placeholder="أدخل كلمة المرور الجديدة *"
                {...form.getInputProps("password")}
                styles={inputStyles}
                style={inputFieldStyle}
              />
              <PasswordInput
                mt="sm"
                placeholder="قم بتأكيد كلمة المرور الجديدة *"
                {...form.getInputProps("password_ensure")}
                styles={inputStyles}
                style={inputFieldStyle}
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
              variant="outline"
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
              color="rgba(178, 18, 34, 1)"
              size="sm"
            >
              حفظ التغيرات{" "}
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
