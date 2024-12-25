import { Button } from "@mantine/core";
import PropTypes from "prop-types";
const SecondaryButton = ({ children }) => {
  return (
    <div>
      <Button variant="outline" color="rgba(178, 18, 34, 1)" size="sm">
        {children}
      </Button>
    </div>
  );
};
SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SecondaryButton;
