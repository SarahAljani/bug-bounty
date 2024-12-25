import { useForm, yupResolver } from "@mantine/form";
import { TextInput, PasswordInput, Checkbox, Button } from "@mantine/core";
import { User, Mail, Phone } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import * as yup from "yup";
import PropTypes from "prop-types"; // Import prop-types for validation
import { useNavigate } from "react-router-dom"; // Moved the import to the top
import "../../styles/LoginRegister.module.css";
import { researcherRegister } from "../../api/researcherRegister";
import { researchers } from "./../../data/researchers";
import { useContext } from "react";
import { LoginRegisterContext } from "../../App";

// Define the Yup validation schema
const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name should have at least 2 letters")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone number must be numeric")
    .required("Phone number is required"),
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
  termsOfService: yup
    .boolean()
    .oneOf([true], "You must accept the terms of service"),
});

const ResearcherRegisterForm = () => {
  const navigate = useNavigate(); // Initialize the navigation hook
  const { loginRegister, setLoginRegister } = useContext(LoginRegisterContext);
  // Mantine form with Yup validation resolver
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      termsOfService: false, // Added termsOfService default value
    },
    validate: yupResolver(schema), // Use yupResolver to connect Yup schema to Mantine form
  });

  // Responsive styling
  const isLargeScreen = useMediaQuery("(min-width: 900px)");

  const inputStyles = {
    input: {
      textAlign: "right",
      borderRadius: "8px",
    },
  };

  const formStyles = {
    display: "flex",
    flexWrap: "wrap",
    columnGap: "16px",
  };

  const inputFieldStyle = {
    width: isLargeScreen ? "calc(50% - 8px)" : "100%",
  };

  // Handle form submission (no need for manual Yup validation here)
  // const handleSubmit = (values) => {
  //   // After form submission, navigate to the register code page
  //   console.log("Form submitted:", values);
  //   navigate("register-code");
  // };
  const onSubmit = async (values) => {
    try {
      const researcherData = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        password: values.password,
      };
      const response = await researcherRegister(researcherData);
      // setLoginRegister("login");
      const uuid = response.data.data.researcher.uuid;
      navigate(`register-code/${uuid}`, {
        state: { uuid },
      });
      // Dispatch login or success actions here if needed
      // dispatch(updateLoggedIn(true));
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  const handleToggle = () => {
    setLoginRegister("login");
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <div className="formBlock" dir="rtl">
          <div className="formFields" style={formStyles}>
            <TextInput
              mt="sm"
              placeholder="أدخل البريد الإلكتروني *"
              {...form.getInputProps("email")}
              styles={inputStyles}
              style={inputFieldStyle}
              rightSection={
                <Mail aria-label="Clear input" color="#b6b6b6" size={17} />
              }
              error={form.errors.email} // Display error
            />
            <TextInput
              mt="sm"
              placeholder="أدخل اسمك الكامل *"
              {...form.getInputProps("name")}
              styles={inputStyles}
              style={inputFieldStyle}
              rightSection={
                <User aria-label="Clear input" color="#b6b6b6" size={17} />
              }
              error={form.errors.name} // Display error
            />
            <TextInput
              mt="sm"
              placeholder="أدخل رقم الهاتف *"
              {...form.getInputProps("phone")}
              styles={inputStyles}
              style={inputFieldStyle}
              rightSection={
                <Phone aria-label="Clear input" color="#b6b6b6" size={17} />
              }
              error={form.errors.phone} // Display error
            />
            <PasswordInput
              mt="sm"
              placeholder="أدخل كلمة المرور *"
              {...form.getInputProps("password")}
              styles={inputStyles}
              style={inputFieldStyle}
              error={form.errors.password} // Display error
            />
          </div>

          <Checkbox
            mt="md"
            label="الموافقة على سياسة الخصوصية و شروط الخدمة"
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
            styles={{
              input: {
                "--checkbox-color": "rgba(178, 18, 34, 1)",
                "--checkbox-size": "17px",
              },
              label: {
                fontFamily: "Zain",
                fontWeight: "600",
              },
              root: {
                marginTop: "var(--mantine-spacing-md)",
              },
            }}
            error={form.errors.termsOfService} // Display error
          />
        </div>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            columnGap: "16px",
            position: "relative",
          }}
        >
          <Button
            variant="outline"
            color="rgba(178, 18, 34, 1)"
            style={{
              width: "150px",
              borderRadius: "8px",
              fontSize: "20",
              fontWeight: "800",
            }}
            onClick={handleToggle}
          >
            تسجيل الدخول
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
            إنشاء حساب
          </Button>
        </div>
      </form>
    </div>
  );
};

ResearcherRegisterForm.propTypes = {
  setLoginRegister: PropTypes.func.isRequired,
};

export default ResearcherRegisterForm;
