import ImageProfile from "../../components/images/ImageProfile.jsx";
import { useForm, yupResolver } from "@mantine/form";
import { TextInput, Button, Textarea } from "@mantine/core";
import { User, Mail, Phone } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import * as yup from "yup";
import { useNavigate } from "react-router-dom"; // Moved the import to the top
import { useDispatch } from "react-redux";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { LogoutModal } from "../../components/modals/LogoutModal.jsx";
import "../../styles/researcherProfile.css";
import { PasswordResetModal } from "../../components/modals/PasswordResetModal.jsx";
import {
  apiResearcherProfile,
  apiResearcherUpdateProfile,
} from "../../api/researcherHomePage.js";
import { updateResearcherProfile } from "../../redux/actions/researcherDataAction.jsx";
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
  phone: yup
    .string()
    .matches(/^\d+$/, "Phone number must be numeric")
    .required("Phone number is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  termsOfService: yup
    .boolean()
    .oneOf([true], "You must accept the terms of service"),
});
const ResearcherProfilePage = () => {
  // const [opened, { open, close }] = useDisclosure(false);
  const [opened, setOpened] = useState(false);
  const [openedReset, setOpenedReset] = useState(false);
  const profileStyle = {
    width: "100px",
    height: "100px",
  };
  const [uploadedImage, setUploadedImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      description: "",
      image: null,
    },
    validate: yupResolver(schema), // Use yupResolver to connect Yup schema to Mantine form
  });
  const researcher = useSelector((state) => state.researcher.researcherData);
  // Handle image change
  const handleImageChange = (file) => {
    setUploadedImage(URL.createObjectURL(file)); // Update local image URL for preview

    // Set the file object directly in the form
    form.setFieldValue("image", file);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await apiResearcherProfile();
        console.log(responseData);

        form.setValues({
          name: responseData?.name || "",
          email: responseData?.email || "",
          phone: responseData?.phone || "",
          description: responseData?.description || "",
          image: responseData.image || null,
        });
        dispatch(updateResearcherProfile(responseData));
      } catch (error) {
        console.error("Failed to fetch researcher data:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  const handleLogout = async () => {
    try {
      const response = await logout(`/researcher/researcher/logout`);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
      formData.append("id", researcher.uuid);
      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("description", values.description);

      // Append the image file if available
      if (values.image) {
        formData.append("image", values.image); // 'logo' should match your API field name for the image
      }

      // Send the form data using your API function
      const response = await apiResearcherUpdateProfile(formData);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data.data.researcher)
      );
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
              <MdLogout className="logout" />
            </div>
          </div>
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
        </form>
        <LogoutModal
          opened={opened}
          onClose={() => setOpened(false)}
          onLogout={handleLogout}
        />
        <PasswordResetModal
          opened={openedReset}
          onClose={() => setOpenedReset(false)}
          targetId={parseInt(researcher.uuid)}
        />
      </div>
    </div>
  );
};

export default ResearcherProfilePage;
