import { Filter } from "tabler-icons-react";
import { Popover, Text } from "@mantine/core";
import { Button } from "@mantine/core";
import PropTypes from "prop-types";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import dayjs from "dayjs"; // Import dayjs for date handling

const FilterComponent = ({ setFilteredUsers, companies, setFiltered }) => {
  const [alignment, setAlignment] = React.useState(null); // For availability
  const [alignment2, setAlignment2] = React.useState(null); // For sorting
  const [filtered1, setFiltered1] = React.useState(companies); // Temporary state for filtered results

  const buttonsStyle = {
    borderRadius: "8px !important",
    fontWeight: "600",
    backgroundColor: "#FFF",
    color: "#696969",
    border: "2px solid #999898 !important",
  };

  const buttonsStyleActive = {
    backgroundColor: "rgba(178, 18, 34, 1)",
    color: "#FFF",
    borderRadius: "8px !important",
    border: "2px solid rgba(178, 18, 34, 1) !important",
    "&:hover": {
      color: "rgba(178, 18, 34, 1)",
    },
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleChange2 = (event, newAlignment) => {
    setAlignment2(newAlignment);
  };

  // Filter based on availability
  React.useEffect(() => {
    let filteredCompanies = [...companies]; // Start with the original data

    if (alignment === "available") {
      filteredCompanies = companies.filter(
        (user) => user.availablitity === true
      );
    } else if (alignment === "anAvailable") {
      filteredCompanies = companies.filter(
        (user) => user.availablitity === false
      );
    }

    setFiltered1(filteredCompanies); // Update filtered state with availability filter
  }, [alignment, companies]);

  // Sort filtered companies based on date
  React.useEffect(() => {
    let sortedCompanies = [...filtered1]; // Clone the filtered data for sorting

    if (alignment2 === "newest") {
      sortedCompanies = sortedCompanies.sort((a, b) =>
        dayjs(b.created_at, "DD/MM/YYYY").isAfter(
          dayjs(a.created_at, "DD/MM/YYYY")
        )
          ? 1
          : -1
      );
    } else if (alignment2 === "oldest") {
      sortedCompanies = sortedCompanies.sort((a, b) =>
        dayjs(a.created_at, "DD/MM/YYYY").isAfter(
          dayjs(b.created_at, "DD/MM/YYYY")
        )
          ? 1
          : -1
      );
    }

    // Only update if sorting logic is applied
    if (alignment2) {
      setFiltered1(sortedCompanies); // Update filtered state with sorted results
    }
  }, [alignment2]); // Dependency on alignment2, remove filtered1 to prevent infinite loop

  // Handle filter submission
  const handleSubmit = () => {
    setFilteredUsers(filtered1);
    setFiltered(filtered1);
  };

  const filterStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: "3px",
  };

  return (
    <div>
      <Popover>
        <Popover.Target>
          <Button
            variant={"outline"}
            color="rgba(178, 18, 34, 1)"
            style={{ height: "38px", width: "60px" }}
          >
            <Filter style={{ width: "40px", height: "38px" }} />
          </Button>
        </Popover.Target>
        <Popover.Dropdown
          dir="rtl"
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "20px",
            width: "330px",
            padding: "20px 15px",
            borderRadius: "16px",
            boxShadow: "1px 8px 30px 1px rgba(0, 0, 0, 0.295)",
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: "20",
              textAlign: "center",
              padding: "0 10px",
            }}
          >
            التصنيف حسب
          </Text>
          <div className="filter1" style={filterStyle}>
            <h4>الإتاحية:</h4>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleChange}
              size="large"
              color="rgba(178, 18, 34, 1)"
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px",
                columnGap: "10px",
              }}
            >
              <ToggleButton
                value="available"
                sx={
                  alignment === "available" ? buttonsStyleActive : buttonsStyle
                }
                style={{ width: "113px", height: "50px" }}
              >
                متاح
              </ToggleButton>

              <ToggleButton
                value="anAvailable"
                sx={
                  alignment === "anAvailable"
                    ? buttonsStyleActive
                    : buttonsStyle
                }
                style={{ width: "113px", height: "50px" }}
              >
                غير متاح
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="filter2" style={filterStyle}>
            <h4>الإتاحية:</h4>
            <ToggleButtonGroup
              value={alignment2}
              exclusive
              onChange={handleChange2}
              size="large"
              color="rgba(178, 18, 34, 1)"
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px",
                columnGap: "10px",
              }}
            >
              <ToggleButton
                value="newest"
                sx={alignment2 === "newest" ? buttonsStyleActive : buttonsStyle}
                style={{ width: "113px", height: "50px" }}
              >
                بدءاً من الأجدد{" "}
              </ToggleButton>

              <ToggleButton
                value="oldest"
                sx={alignment2 === "oldest" ? buttonsStyleActive : buttonsStyle}
                style={{ width: "113px", height: "50px" }}
              >
                بدءاً من الأقدم{" "}
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <Button
            color="rgba(178, 18, 34, 1)"
            size="sm"
            mt="10px"
            style={{
              width: "80%",
              fontSize: "15px",
              fontWeight: "600",
              borderRadius: "8px",
              alignSelf: "center",
            }}
            onClick={handleSubmit}
          >
            فلترة
          </Button>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

FilterComponent.propTypes = {
  setFilteredUsers: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired,
  filteredUsers: PropTypes.array.isRequired,
  filtered: PropTypes.array.isRequired,
  setFiltered: PropTypes.func.isRequired,
};

export default FilterComponent;
