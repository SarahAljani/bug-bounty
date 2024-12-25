import ImageProfile from "../../components/images/ImageProfile.jsx";
import { useForm, yupResolver } from "@mantine/form";
import { TextInput, Button, Textarea } from "@mantine/core";
import { Select } from "@mantine/core";
import { User, Mail, World, Users } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import * as yup from "yup";
import { useNavigate } from "react-router-dom"; // Moved the import to the top
import { useDispatch } from "react-redux";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/usersActions.jsx";
import { useEffect, useState } from "react";
import { LogoutModal } from "../../components/modals/LogoutModal.jsx";
import "../../styles/researcherProfile.css";
import { PasswordResetModal } from "../../components/modals/PasswordResetModal.jsx";
import { updateLoggedIn } from "../../redux/actions/aurhActions.jsx";
import {
  apiCompanyProfile,
  apiCompanyUpdateProfile,
} from "../../api/companyHomePage.js";
import { updateCompanyProfile } from "./../../redux/actions/companyDataActions";
import { logout } from "../../api/logout.js";
const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name should have at least 2 letters")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  domain: yup
    .string()
    .matches(
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.(com|org|net|edu|gov|mil|co|info|biz)(\.[a-zA-Z]{2,})?$/,
      "domain must be a valid URL (e.g., www.example.com)"
    )
    .required("domain is required"),
  employess_count: yup
    .string()
    .matches(/^\d+$/, "Employee number must be numeric")
    .min(1, "Employee number must be greater than 0")
    .required("Employee number is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  type: yup.string().required("Organization status is required"), // Add organization status validation
});

const CompaniesProfilePage = () => {
  const [opened, setOpened] = useState(false);
  const [openedReset, setOpenedReset] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      domain: "",
      employess_count: "",
      description: "",
      type: "",
      image: null,
    },
    validate: yupResolver(schema),
  });
  const company = useSelector((state) => state.company.companyData);
  const profileStyle = {
    width: "100px",
    height: "100px",
  };
  // Handle image change
  const handleImageChange = (file) => {
    setUploadedImage(URL.createObjectURL(file)); // Update local image URL for preview

    // Set the file object directly in the form
    form.setFieldValue("image", file);
  };

  const optionsFilter = ({ options, search }) => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
    );

    filtered.sort((a, b) => a.label.localeCompare(b.label));
    return filtered;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await apiCompanyProfile();
        console.log(responseData);

        form.setValues({
          name: responseData.name || "",
          email: responseData.email || "",
          domain: responseData.domain || "",
          employess_count: responseData.employess_count || "",
          description: responseData.description || "",
          type: responseData.type || "",
          image: responseData.logo || null, // Assuming the image is stored as `logo`
        });

        // Optionally dispatch data to the Redux store
        dispatch(updateCompanyProfile(responseData));
      } catch (error) {
        console.error("Failed to fetch company data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      const response = await logout(`/company/company/logout`);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    // dispatch(updateLoggedIn(false));
    // window.location.reload();
    // window.location.reload();
    // window.location.reload();
  };
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

  const handleSubmit = async (values) => {
    try {
      // Create a new FormData instance
      const formData = new FormData();

      // Append all form fields to FormData
      formData.append("id", company.uuid);
      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("domain", values.domain);
      formData.append("type", values.type);
      formData.append("employess_count", values.employess_count);
      formData.append("description", values.description);

      // Append the image file if available
      if (values.image) {
        formData.append("logo", values.image); // 'logo' should match your API field name for the image
      }

      // Send the form data using your API function
      const response = await apiCompanyUpdateProfile(formData);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data.data.company)
      );
      console.log("Company profile updated successfully:", response);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="mainProfileContainer">
      <div className="profileContainer">
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "10px",
          }}
        >
          <div className="profileImage">
            <ImageProfile
              profileStyle={profileStyle}
              edition={true}
              onImageChange={handleImageChange}
              uploadedImage={uploadedImage}
            />
            <div className="iconCircle" onClick={() => setOpened(true)}>
              <MdLogout className="logout" onLogout={handleLogout} />
            </div>
          </div>
          <div className="formBlock" dir="rtl">
            <div className="formFields" style={formStyles}>
              <TextInput
                mt="sm"
                placeholder="أدخل اسم الشركة *"
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
                placeholder="أدخل دومين الشركة *"
                {...form.getInputProps("domain")}
                styles={inputStyles}
                style={inputFieldStyle}
                rightSection={
                  <World aria-label="Clear input" color="#b6b6b6" size={17} />
                }
                error={form.errors.domain} // Display error
              />
              <Select
                {...form.getInputProps("type")}
                mt="sm"
                placeholder="أدخل نوع الشركة *"
                data={["حكومية", "مشتركة", "خاصة"]}
                defaultValue={form.values.type}
                filter={optionsFilter}
                nothingFoundMessage="Nothing found..."
                searchable
                styles={inputStyles}
                style={inputFieldStyle}
                error={form.errors.type} // Validation error
              />
              <TextInput
                mt="sm"
                placeholder="أدخل عدد موظفين الشركة *"
                {...form.getInputProps("employess_count")}
                styles={inputStyles}
                style={inputFieldStyle}
                rightSection={
                  <Users aria-label="Clear input" color="#b6b6b6" size={17} />
                }
                error={form.errors.employess_count} // Display error
              />
              <TextInput
                mt="sm"
                placeholder="أدخل البريد الإلكتروني للشركة *"
                {...form.getInputProps("email")}
                styles={inputStyles}
                style={inputFieldStyle}
                rightSection={
                  <Mail aria-label="Clear input" color="#b6b6b6" size={17} />
                }
                error={form.errors.email} // Display error
              />
            </div>
            <Textarea
              mt="sm"
              rows={3}
              placeholder="أدخل وصف عن خبرتك و تحصيلك العلمي و الجوائز الحاصل عليها إن وجدت..."
              {...form.getInputProps("description")}
              styles={inputStyles}
              error={form.errors.description} // Display error
            />
          </div>
          <p
            className="resetpass"
            style={{
              color: "#222222",
              fontSize: "13px",
              fontWeight: "800",
              width: "100%",
              textAlign: "right",
              marginRight: "20px",
            }}
            onClick={() => setOpenedReset(true)}
          >
            إعادة تعيين كلمة المرور
          </p>
          <div
            className="buttonsProfile"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              columnGap: "15px",
            }}
          >
            <Button
              variant="outline"
              onClick={() => navigate("/company-products")}
              color="rgba(178, 18, 34, 1)"
              style={{
                width: "150px",
                borderRadius: "8px",
                fontSize: "20",
                fontWeight: "800",
              }}
            >
              إضافة/حذف برنامج{" "}
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
              onClick={handleSubmit}
            >
              حفظ التغييرات{" "}
            </Button>
          </div>
        </form>
        <LogoutModal
          opened={opened}
          onClose={() => setOpened(false)}
          onLogout={handleLogout}
        />
        <PasswordResetModal
          opened={openedReset}
          onClose={() => setOpenedReset(false)}
          targetId={parseInt(company.uuid)}
        />
      </div>
    </div>
  );
};

export default CompaniesProfilePage;
