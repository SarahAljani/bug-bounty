import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // Use yupResolver
import { TextInput, PasswordInput, Checkbox, Button } from "@mantine/core";
import { User, Mail, World, Users } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import * as yup from "yup";
import PropTypes from "prop-types"; // Import prop-types for validation
import { Select } from "@mantine/core";
import { companyRegister } from "../../api/companyRegister";
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
  // domain: yup
  //   .string()
  //   .matches(
  //     /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.(com|org|net|edu|gov|mil|co|info|biz)(\.[a-zA-Z]{2,})?$/,
  //     "Domain must be a valid URL (e.g., www.example.com)"
  //   )
  //   .required("Domain is required"),
  employess_count: yup
    .string()
    .matches(/^\d+$/, "Employee number must be numeric")
    .min(1, "Employee number must be greater than 0")
    .required("Employee number is required"),
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

const CompanyRegisterForm = () => {
  const { loginRegister, setLoginRegister } = useContext(LoginRegisterContext);
  // React-hook-form with Yup validation
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Use yupResolver to connect Yup schema to react-hook-form
  });

  // Responsive styling
  const isLargeScreen = useMediaQuery("(min-width: 1000px)");

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

  // Handle form submission
  // const onSubmit = (values) => {
  //   dispatch(updateLoggedIn(true));
  //   console.log("Form submitted:", values);
  // };

  // Handle form submission
  const onSubmit = async (values) => {
    try {
      const companyData = {
        name: values.name,
        employess_count: values.employess_count,
        type: values.type, // Assuming the selected company type
        email: values.email,
        password: values.password,
        domain: values.domain,
      };
      console.log(companyData);
      const response = await companyRegister(companyData);
      setLoginRegister("login");
      console.log("Company registered successfully:", response);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formBlock" dir="rtl">
          <div className="formFields" style={formStyles}>
            <TextInput
              mt="sm"
              placeholder="أدخل اسم الشركة *"
              {...register("name")} // Use register for form input
              styles={inputStyles}
              style={inputFieldStyle}
              rightSection={
                <User aria-label="Clear input" color="#b6b6b6" size={17} />
              }
              error={errors.name?.message} // Display error from react-hook-form
            />
            <TextInput
              mt="sm"
              placeholder="أدخل دومين الشركة *"
              {...register("domain")}
              styles={inputStyles}
              style={inputFieldStyle}
              rightSection={
                <World aria-label="Clear input" color="#b6b6b6" size={17} />
              }
              error={errors.domain?.message}
            />
            <Select
              {...register("type")}
              onChange={(value) => setValue("type", value)}
              mt="sm"
              placeholder="أدخل نوع الشركة *"
              data={[
                { value: "حكومية", label: "حكومية" },
                { value: "مشتركة", label: "مشتركة" },
                { value: "خاصة", label: "خاصة" },
              ]}
              styles={inputStyles}
              style={inputFieldStyle}
              error={errors.type?.message}
            />

            <TextInput
              mt="sm"
              placeholder="أدخل عدد موظفين الشركة *"
              {...register("employess_count")}
              styles={inputStyles}
              style={inputFieldStyle}
              rightSection={
                <Users aria-label="Clear input" color="#b6b6b6" size={17} />
              }
              error={errors.employess_count?.message}
            />
            <TextInput
              mt="sm"
              placeholder="أدخل البريد الإلكتروني للشركة *"
              {...register("email")}
              styles={inputStyles}
              style={inputFieldStyle}
              rightSection={
                <Mail aria-label="Clear input" color="#b6b6b6" size={17} />
              }
              error={errors.email?.message}
            />

            <PasswordInput
              mt="sm"
              placeholder="أدخل كلمة المرور *"
              {...register("password")}
              styles={inputStyles}
              style={inputFieldStyle}
              error={errors.password?.message}
            />
          </div>

          <Checkbox
            mt="md"
            label="الموافقة على سياسة الخصوصية و شروط الخدمة"
            {...register("termsOfService")}
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
            error={errors.termsOfService?.message}
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

CompanyRegisterForm.propTypes = {
  setLoginRegister: PropTypes.func.isRequired,
};

export default CompanyRegisterForm;
