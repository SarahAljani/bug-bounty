import { useContext, useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Button, Text, Loader } from "@mantine/core";
import { Mail } from "tabler-icons-react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateLoggedIn } from "../../redux/actions/aurhActions";
import "../../styles/LoginRegister.module.css";
import { useNavigate } from "react-router-dom";
import { LoginRegisterContext } from "../../App";
import { login } from "./../../api/login";

const LoginForm = ({ url }) => {
  const [loading, setLoading] = useState(false);

  const { loginRegister, setLoginRegister } = useContext(LoginRegisterContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Mantine form for capturing input
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (!value ? "Email is required" : null),
      password: (value) => (!value ? "Password is required" : null),
    },
  });

  // State to manage error message
  const [formError, setFormError] = useState("");

  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true); // Start loading
    try {
      const data = {
        email: values.email,
        password: values.password,
      };
      const response = await login(data, url);
      if (response.data.data.token) {
        if (response.data.data.company) {
          const companyData = response.data.data.company;
          dispatch(updateLoggedIn(true));
          localStorage.setItem("status", 1);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("currentUser", JSON.stringify(companyData));
          // setCurrentUser(companyData);
          window.location.reload();
        } else if (response.data.data.researcher) {
          const researcherData = response.data.data.researcher;
          dispatch(updateLoggedIn(true));
          localStorage.setItem("status", 0);
          localStorage.setItem("currentUser", JSON.stringify(researcherData));
          navigate("/");
          // setCurrentUser(researcherData);
          window.location.reload();
        }
      } else {
        console.log("No token found in the response.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false); // End loading whether successful or not
    }
  };
  const handleToggle = () => {
    setLoginRegister("register");
  };
  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="formBlock" dir="rtl">
          <div
            className="formFields"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <TextInput
              mt="sm"
              placeholder="البريد الإلكتروني"
              {...form.getInputProps("email")}
              styles={{
                input: { textAlign: "right", borderRadius: "8px" },
              }}
              style={{ width: "100%" }}
              rightSection={
                <Mail aria-label="Clear input" color="#b6b6b6" size={17} />
              }
            />
            <PasswordInput
              mt="sm"
              placeholder="كلمة المرور"
              {...form.getInputProps("password")}
              styles={{
                input: { textAlign: "right", borderRadius: "8px" },
              }}
              style={{ width: "100%" }}
            />
            <a
              className="resetpass"
              href="/email-code-varification"
              style={{
                marginTop: "10px",
                marginRight: "10px",
                color: "#222222",
                fontSize: "13px",
                fontWeight: "800",
                textAlign: "right",
                width: "100%",
              }}
            >
              إعادة تعيين كلمة المرور
            </a>
          </div>
        </div>

        {/* Display form-level error message at the bottom of the form */}
        {formError && (
          <Text color="red" align="center" style={{ marginTop: "10px" }}>
            {formError}
          </Text>
        )}

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
            style={{
              width: "150px",
              borderRadius: "8px",
              fontSize: "20",
              fontWeight: "800",
            }}
            variant="outline"
            color="rgba(178, 18, 34, 1)"
            size="sm"
            onClick={handleToggle}
          >
            إنشاء حساب جديد
          </Button>
          <Button
            type="submit"
            color="rgba(178, 18, 34, 1)"
            style={{
              width: "150px",
              borderRadius: "8px",
              fontSize: "20",
              fontWeight: "800",
            }}
          >
            {loading ? (
              <Loader color="rgba(255, 255, 255, 1)" type="dots" />
            ) : (
              "تسجيل الدخول"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

// Add prop validation with PropTypes
LoginForm.propTypes = {
  setLoginRegister: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default LoginForm;
