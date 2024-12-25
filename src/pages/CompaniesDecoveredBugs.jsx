import "../styles/tables.css";
import { Table, Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AddRatingModal } from "../components/modals/AddRatingModal";
import { apiCompanyDescoveredBugs } from "../api/companyHomePage";
import { apiReportRating } from "../api/researcherHomePage";
const CompaniesDecoveredBugs = () => {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState(0); // Add state for rating value
  const [totalPages, setTotalPages] = useState(1); // Total number of pages from backend
  const [activePage, setPage] = useState(1); // Current page
  const rowsPerPage = 8; // Rows displayed per page
  const [bugs, setBugs] = useState([]);
  const oddRowStyle = {
    backgroundColor: "rgb(230, 228, 228)",
    color: "rgba(61, 60, 66, 1)",
    position: "relative",
    overflow: "hidden",
    height: "60px",
  };

  const evenRowStyle = {
    backgroundColor: "#fff",
    height: "60px",
  };
  const btnAccept = {
    background: "rgba(22, 192, 152, 0.38)",
    hover: "rgba(45, 209, 171, 0.38)",
    border: "1px solid rgba(0, 176, 135, 1)",
    color: "rgba(0, 135, 103, 1)",
    width: "80px",
  };
  const btnReject = {
    background: "rgba(255, 197, 197, 1)",
    hover: "rgba(45, 209, 171, 0.38)",
    border: "1px solid rgba(223, 4, 4, 1)",
    color: "rgba(223, 4, 4, 1)",
    width: "80px",
  };
  const btnPending = {
    background: "rgba(88, 89, 91, 0.1)",
    "&hover": { background: "rgba(88, 89, 91, 0.1)" },
    border: "1px solid rgba(88, 89, 91, 1)",
    color: "rgba(88, 89, 91, 1)",
    width: "80px",
  };
  // Styles for the first and last cells of the odd rows
  const oddFirstCellStyle = {
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
  };

  const oddLastCellStyle = {
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
  };
  // apiCompanyDescoveredBugs;
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const responseData = await apiCompanyDescoveredBugs(activePage);
        setBugs(responseData.data?.data?.reports);
        setTotalPages(responseData?.data?.data?.total_pages || 1); // Ensure default to 1
        console.log(responseData.data.data);
      } catch (error) {
        console.log("couldn't fetch the bugs", error);
      }
    };
    fetchBugs();
  }, [activePage]);
  const [uuid, setUuid] = useState(null);
  const handleRating = async (value) => {
    const data = {
      rate: value,
    };
    try {
      const response = await apiReportRating(data, uuid);
      setOpened(false);
      setValue(0); // Reset the rating after submission
    } catch (error) {
      console.log(error);
    }
  };
  const rows = bugs.map((element, index) => (
    <tr
      key={element.uuid}
      style={
        (index % 2 !== 0 ? { ...oddRowStyle } : { ...evenRowStyle },
        {
          fontSize: "16px",
          fontWeight: "400",
          color: "rgba(61, 60, 66, 1)",
        })
      }
    >
      <td
        style={
          index % 2 !== 0
            ? { ...oddRowStyle, ...oddFirstCellStyle }
            : evenRowStyle
        }
      >
        {element.title}
      </td>
      <td style={index % 2 !== 0 ? oddRowStyle : evenRowStyle}>
        {element.researcher.name}
      </td>
      <td style={index % 2 !== 0 ? oddRowStyle : evenRowStyle}>
        {new Date(element.created_at).toLocaleDateString("en-CA")}
      </td>
      <td style={index % 2 !== 0 ? oddRowStyle : evenRowStyle}>
        <a href={element.file}>ملف الثغرة: {element.title} </a>
      </td>
      <td style={index % 2 !== 0 ? oddRowStyle : evenRowStyle}>
        <Button
          variant="light"
          style={
            element.status.toLowerCase() === "accept"
              ? btnAccept
              : element.status.toLowerCase() === "reject"
              ? btnReject
              : btnPending
          }
        >
          {element.status}
        </Button>
      </td>
      <td
        style={
          index % 2 !== 0
            ? { ...oddRowStyle, ...oddLastCellStyle }
            : evenRowStyle
        }
      >
        <IoIosAddCircleOutline
          style={{ width: "20px", height: "20px" }}
          onClick={() => {
            setOpened(true);
            console.log(element.uuid);
            setUuid(element.uuid);
          }}
        />
      </td>
      <AddRatingModal
        opened={opened}
        onClose={() => {
          setOpened(false);
          setValue(0); // Reset rating if modal is closed without submission
        }}
        text="يرجى تغييم الثغرة من أصل 5"
        count={5}
        mainText="تقييم الثغرة"
        handleRating={handleRating}
        value={value} // Pass value state
        setValue={setValue} // Pass setValue function
      />
    </tr>
  ));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        dir="rtl"
        style={{
          width: "90%",
          marginTop: "35px",
          borderRadius: "10px",
          padding: "32px",
          backgroundColor: "#fff",
          boxShadow:
            "0px 4px 4px 0 rgba(0, 0, 0, 0.25), 0px -3px 4px 0 rgba(0, 0, 0, 0.158)",
        }}
      >
        <Table verticalSpacing="lg" withRowBorders={false}>
          <thead className="thead-border">
            <tr
              style={{
                fontSize: "20px",
                fontWeight: "800",
                color: "rgba(156, 163, 175, 1)",
                height: "60px",
              }}
            >
              <th>اسم الثغرة</th>
              <th>اسم الباحث</th>
              <th>تاريخ الإرسال</th>
              <th>ملف الثغرة</th>
              <th>حالة الثغرة</th>
              <th>إضافة تقييم للثغرة</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>

        {/* Add the Pagination component */}
        <Pagination
          total={totalPages} // Total number of pages
          page={activePage} // Current page number
          onChange={setPage} // Function to change the page
          color="rgba(178, 18, 34, 1)"
          position="center"
          mt="md"
        />
      </div>
    </div>
  );
};

export default CompaniesDecoveredBugs;
