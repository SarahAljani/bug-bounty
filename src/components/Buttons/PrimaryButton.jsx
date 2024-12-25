import { Button } from "@mantine/core";
import PropTypes from "prop-types";

const PrimaryButton = ({ children, handleButton }) => {
  return (
    <div>
      <Button
        variant="filled"
        color="rgba(178, 18, 34, 1)"
        size="sm"
        onClick={handleButton} // Properly calling handleButton
      >
        {children}
      </Button>
    </div>
  );
};

// PropTypes validation
PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  handleButton: PropTypes.func.isRequired, // Fixing prop type to expect a function
};

export default PrimaryButton;
