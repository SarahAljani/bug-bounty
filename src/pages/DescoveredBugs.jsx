import "../styles/tables.css";
import { Table, Pagination, Button } from "@mantine/core";

import { useEffect, useState } from "react";
import { apiResearcherDescoveredBugs } from "../api/researcherHomePage";

const DescoveredBugs = () => {
  const [bugs, setBugs] = useState([]); // Initialize as an empty array
  const [totalPages, setTotalPages] = useState(1); // Total number of pages from backend

  // Pagination state
  const [activePage, setPage] = useState(1); // Current page

  // Fetch bugs on component mount and when `activePage` changes
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const responseData = await apiResearcherDescoveredBugs(activePage);
        setBugs(responseData?.data?.data?.researchers || []); // Ensure default to empty array
        setTotalPages(responseData?.data?.data?.total_pages || 1); // Ensure default to 1
        console.log(responseData?.data?.data);
      } catch (error) {
        console.log("couldn't fetch the bugs", error);
      }
    };
    fetchBugs();
  }, [activePage]);

  // Define styles for odd and even rows
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
    border: "1px solid rgba(0, 176, 135, 1)",
    color: "rgba(0, 135, 103, 1)",
    width: "80px",
  };

  const btnReject = {
    background: "rgba(255, 197, 197, 1)",
    border: "1px solid rgba(223, 4, 4, 1)",
    color: "rgba(223, 4, 4, 1)",
    width: "80px",
  };

  const btnPending = {
    background: "rgba(88, 89, 91, 0.1)",
    border: "1px solid rgba(88, 89, 91, 1)",
    color: "rgba(88, 89, 91, 1)",
    width: "80px",
  };

  const oddFirstCellStyle = {
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
  };

  const oddLastCellStyle = {
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
  };

  // Map over the `bugs` array only if it's not empty
  const rows =
    bugs.length > 0 ? (
      bugs.map((element, index) => (
        <tr
          key={element.id}
          style={index % 2 !== 0 ? oddRowStyle : evenRowStyle}
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
            {element.company_name}
          </td>
          <td style={index % 2 !== 0 ? oddRowStyle : evenRowStyle}>
            {new Date(element.created_at).toLocaleDateString("en-CA")}
          </td>
          <td style={index % 2 !== 0 ? oddRowStyle : evenRowStyle}>
            {/* {element.file} */}
          </td>
          <td style={index % 2 !== 0 ? oddRowStyle : evenRowStyle}>
            <Button
              variant="light"
              style={
                element.status === "Accept"
                  ? btnAccept
                  : element.status === "Reject"
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
            10 / {element.rate}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
          No bugs found.
        </td>
      </tr>
    );

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
        <Table verticalSpacing="lg" withRowBorders={false} highlightOnHover>
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
              <th>اسم الشركة</th>
              <th>تاريخ الإرسال</th>
              <th>ملف الثغرة</th>
              <th>حالة الثغرة</th>
              <th>تقييم الثغرة</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <Pagination
          total={totalPages} // Total number of pages from backend
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

export default DescoveredBugs;
