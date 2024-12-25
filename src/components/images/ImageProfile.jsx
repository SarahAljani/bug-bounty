import "../../styles/imageProfile.css";
import { FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import { useRef } from "react";

const ImageProfile = ({
  profileStyle,
  edition,
  onImageChange,
  uploadedImage,
}) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const inputFileRef = useRef(null);

  const getInitials = () => {
    // name = "";
    const nameParts = user.name.trim().split(" ");
    const firstInitial = nameParts[0]?.charAt(0) || "";
    const lastInitial =
      nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : "";
    const isArabic = /[\u0600-\u06FF]/.test(firstInitial);
    return isArabic
      ? `${firstInitial}\u200C${lastInitial}`
      : `${firstInitial}${lastInitial}`;
  };

  const handleImageClick = () => {
    inputFileRef.current.click(); // Trigger the hidden file input on click
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageChange(file); // Pass the selected file to the parent component
      console.log(file);
    }
  };

  // const renderProfileImage = () => {
  //   if (user.logo || user.image) {
  //     return (
  //       <img
  //         src={user.logo ? user.logo : user.image}
  //         alt={user.name}
  //         className={user.status == 1 ? "logoStyle" : "imageStyles"}
  //         style={
  //           edition
  //             ? { width: "100px", height: "100px", objectFit: "cover" }
  //             : { width: "45px", height: "45px", objectFit: "cover" }
  //         }
  //       />
  //     );
  //   } else {
  //     const initials = getInitials();
  //     return (
  //       <div className="profileStyles" style={profileStyle}>
  //         {initials}
  //       </div>
  //     );
  //   }
  // };
  const renderProfileImage = () => {
    // If there's an uploadedImage (local preview), show it
    if (uploadedImage) {
      return (
        <img
          src={uploadedImage}
          alt="Selected Profile"
          className={user.status == 1 ? "logoStyle" : "imageStyles"}
          style={
            edition
              ? { width: "100px", height: "100px", objectFit: "cover" }
              : { width: "45px", height: "45px", objectFit: "cover" }
          }
        />
      );
    }

    // If no uploaded image, check for user image from server
    if (user.logo || user.image) {
      return (
        <img
          src={user.logo ? user.logo : user.image}
          alt={user.name}
          className={user.status == 1 ? "logoStyle" : "imageStyles"}
          style={
            edition
              ? { width: "100px", height: "100px", objectFit: "cover" }
              : { width: "45px", height: "45px", objectFit: "cover" }
          }
        />
      );
    }

    // Otherwise, show initials
    const initials = getInitials();
    return (
      <div className="profileStyles" style={profileStyle}>
        {initials}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        className="profile"
        style={
          edition
            ? {
                height: "100px",
                borderRadius: "50%",
                boxShadow:
                  user.status == 1 ? "" : " 0px 4px 5px rgba(0, 0, 0, 0.37) ",
              }
            : { textAlign: "center" }
        }
        onClick={edition ? handleImageClick : null}
      >
        {renderProfileImage()}
        {edition === true && (
          <div className="iconCircle">
            <FaEdit className="edit" />
          </div>
        )}

        <input
          type="file"
          ref={inputFileRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      {edition === true && (
        <h2
          className="sayHi"
          style={{
            color: "rgba(29, 29, 27, 1)",
            fontFamily: "Zain",
            fontWeight: "700",
            fontSize: "16px",
            marginTop: "9px",
          }}
        >
          اختر صورة جديدة{" "}
        </h2>
      )}
    </div>
  );
};

ImageProfile.propTypes = {
  profileStyle: PropTypes.object.isRequired,
  edition: PropTypes.bool.isRequired,
  onImageChange: PropTypes.func.isRequired,
  imageUrl: PropTypes.string, // or PropTypes.string.isRequired if you prefer
  uploadedImage: PropTypes,
};

export default ImageProfile;
