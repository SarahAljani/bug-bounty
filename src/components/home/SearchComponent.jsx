import { TextInput, Button } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import PropTypes from "prop-types";
import { useEffect, useState } from "react"; // Import useEffect
const SearchComponent = ({ companies, setFilteredUsers, filtered }) => {
  const [searchResult, setSearchResult] = useState([]);
  // Use Mantine form to handle input
  const form = useForm({
    initialValues: {
      search: "", // Initialize the search term
    },
  });

  // UseEffect to filter users dynamically based on the search field
  useEffect(() => {
    const searchTermLower = form.values.search.toLowerCase().trim();

    // If the search term is empty, show all users
    if (!searchTermLower) {
      setFilteredUsers(filtered);
    } else if (searchTermLower) {
      // Filter users based on search term
      const filteredUsers = companies.filter((user) => {
        const name = user.name?.toLowerCase() || "";
        const type = user.type?.toLowerCase() || "";
        const description = user.description?.toLowerCase() || "";
        const domain = user.domain?.toLowerCase() || "";

        return (
          name.includes(searchTermLower) ||
          type.includes(searchTermLower) ||
          description.includes(searchTermLower) ||
          domain.includes(searchTermLower)
        );
      });
      // Update the filtered users
      setSearchResult(filteredUsers);
    }
  }, [form.values.search, setFilteredUsers, companies]); // Dependency array ensures it runs when search input changes
  const inputStyles = {
    input: {
      textAlign: "right",
    },
  };

  const searchContainerStyle = {
    width: "90%",
  };
  const handleSubmit = () => {
    setFilteredUsers(searchResult);
  };
  return (
    <div className="searchContainer" style={searchContainerStyle}>
      <h4
        style={{
          textAlign: "right",
          marginBottom: "5px",
          color: "#c40b1d",
          fontFamily: "Zain",
          fontWeight: "800 ",
          fontSize: "13px",
        }}
      >
        أكثر من 127 شركة بانتظارك ماذا تنتظر إبدأ الآن
      </h4>
      <div className="searchBar" style={{ marginTop: "20px" }}>
        <form
          onSubmit={form.onSubmit(handleSubmit)} // Prevent form submission from reloading the page
          style={{ width: "100%" }}
        >
          <div
            className="formField"
            dir="rtl"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              rowGap: "10px", // Adds space between the input and buttons
            }}
          >
            {/* TextInput takes full width */}
            <TextInput
              placeholder="ابحث عن الشركات "
              {...form.getInputProps("search")} // Correct way to link form input
              styles={inputStyles}
              style={{ flexGrow: 1 }} // Ensures input grows to take up available space
              rightSection={
                <Search aria-label="Clear input" color="#b6b6b6" size={17} />
              }
            />
            {/* Search Button */}
            <Button
              type="submit" // Set to button type so it doesn't submit the form
              color="rgba(178, 18, 34, 1)"
              style={{ height: "38px", padding: "5px 40px" }}
            >
              بحث
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

SearchComponent.propTypes = {
  companies: PropTypes.array.isRequired, // Define prop type validation for users
  setFilteredUsers: PropTypes.func.isRequired, // Define prop type validation for setFilteredUsers
  filteredUsers: PropTypes.array.isRequired,
  filtered: PropTypes.array.isRequired,
};

export default SearchComponent;
