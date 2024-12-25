import PropTypes from "prop-types";
import "../../styles/productTable.css";
import { Table } from "@mantine/core";
import { Button } from "@mantine/core";
import { useState } from "react";
import { UploadReport } from "./../modals/UploadReport";
const ProductTable = ({ products }) => {
  // Define styles for odd rows (index % 2 !== 0)
  const [open, setOpen] = useState(false); // UseState correctly
  const oddRowStyle = {
    backgroundColor: "rgb(230, 228, 228)",
    color: "rgba(61, 60, 66, 1)",
    position: "relative",
    overflow: "hidden",
  };

  // Styles for the first and last cells of the odd rows
  const oddFirstCellStyle = {
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
    // Apply box-shadow to simulate the gradient effect
  };

  const oddLastCellStyle = {
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
    // Similar box-shadow for the left side
  };

  // Define styles for even rows (index % 2 === 0)
  const evenRowStyle = {
    backgroundColor: "#fff",
  };
  const btnStyle = {
    width: "80px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    padding: "0",
  };
  const rows = products.map((element, index) => (
    <Table.Tr
      key={element.uuid}
      style={index % 2 !== 0 ? oddRowStyle : evenRowStyle} // Apply oddRowStyle for odd rows
    >
      {/* First cell: Apply border radius only for odd rows */}
      <Table.Td
        style={
          index % 2 !== 0
            ? { ...oddRowStyle, ...oddFirstCellStyle } // Combine row style with cell-specific style
            : evenRowStyle
        }
      >
        {element.title}
      </Table.Td>

      {/* Middle cell: No border-radius needed */}

      <Table.Td
        style={index % 2 !== 0 ? oddRowStyle : evenRowStyle}
        className="tableLinks"
      >
        <a href="">{element.url}</a>
      </Table.Td>

      {/* Last cell: Apply border radius only for odd rows */}
      <Table.Td style={index % 2 !== 0 ? oddRowStyle : evenRowStyle}>
        {element.description}
      </Table.Td>
      <Table.Td
        style={
          index % 2 !== 0
            ? { ...oddRowStyle, ...oddLastCellStyle } // Combine row style with cell-specific style
            : evenRowStyle
        }
      >
        <Button
          color="rgba(178, 18, 34, 1)"
          style={btnStyle}
          onClick={() => setOpen(true)} // Fix button onClick
        >
          {"رفع تقرير"}{" "}
        </Button>
        <UploadReport
          open={open}
          onClose={() => setOpen(false)}
          uuid={element.uuid}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
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
      <Table
        verticalSpacing="md"
        withRowBorders={false}
        className="minproductTable"
      >
        <Table.Thead className="min-thead-border">
          <Table.Tr>
            <Table.Th style={{ textAlign: "center" }}>اسم البرنامج</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>رابط البرنامج</Table.Th>
            <Table.Th style={{ textAlign: "center" }}>وصف البرنامج</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

ProductTable.propTypes = {
  products: PropTypes.array.isRequired, // Ensure it's passed as an array
};

export default ProductTable;
