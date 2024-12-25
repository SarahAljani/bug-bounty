import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Notification = () => {
  const [clicked, setClicked] = useState(true);
  const notificationCount = 1;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {notificationCount < 1 ? (
        <FontAwesomeIcon icon={faBell} style={{ color: "rgba(178, 18, 34, 1)" }} />
      ) : (
        <FontAwesomeIcon
          icon={faBell}
          shake={clicked ? true : false} // Conditional shake based on `clicked` state
          style={{ color: "rgba(178, 18, 34, 1)" }}
          onClick={() => setClicked(false)} // Corrected `onClick` event handler
        />
      )}
      <div style={styles.notificationBubble}>{notificationCount}</div>
    </div>
  );
};
const styles = {
  notificationBubble: {
    position: "absolute",
    top: "-5px",
    right: "-10px",
    backgroundColor: "#ffffff",
    borderRadius: "50px",
    width: "15px",
    height: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(178, 18, 34, 1)",
    fontSize: "10px",
    fontWeight: "bold",
    border: "2px solid rgba(178, 18, 34, 1)", // Optional border for better visibility
    outlineColor: "#fff",
    outlineWidth: "1px",
    outlineOffset: "3px",
  },
};
export default Notification;
