import "../../styles/productTable.css";
import { Table, Pagination } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { AddProductModal } from "../../components/modals/AddProductModal";
import { UpdateProductModal } from "../../components/modals/UpdateProductModal";
import { DeleteProductModal } from "../../components/modals/DeleteProductModal";
import { apiCompanyProducts } from "../../api/companyHomePage";
import { fetch_products } from "../../redux/actions/productsActions";
const ProductsPage = () => {
  const company = useSelector((state) => state.auth.currentUser);
  const [deleteData, setDeleteData] = useState({ open: false, element: {} });
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [totalPages, setTotalPages] = useState(1); // Total number of pages from backend

  // Pagination state
  const [activePage, setPage] = useState(1); // Current page
  const handleAdd = () => {};
  const handleUpdate = () => {};
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await apiCompanyProducts(activePage);
        // setProducts(responseData.data.data.product);
        dispatch(fetch_products(responseData.data.data.products));
         setTotalPages(responseData?.data?.data?.total_pages || 1);
      } catch (error) {
        console.log("products couldn't be addded ", error);
      }
    };
    fetchProducts();
  }, [activePage]);

  const oddRowStyle = {
    backgroundColor: "rgba(238, 238, 238, 1)",
    color: "rgba(61, 60, 66, 1)",
    position: "relative",
    overflow: "hidden",
    height: "50px",
  };

  const evenRowStyle = {
    height: "50px",
  };

  // Styles for the first and last cells of the odd rows
  const oddFirstCellStyle = {
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
    paddingRight: "10px",
  };

  const oddLastCellStyle = {
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
    paddingLeft: "10px",
  };
  const evenFirstCellStyle = {
    paddingRight: "10px",
  };
  const evenLastCellStyle = {
    paddingLeft: "10px",
  };
  const rows = products.map((element, index) => (
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
            : { evenRowStyle, ...evenFirstCellStyle }
        }
      >
        <MdOutlineEdit
          style={{ color: "rgba(137, 137, 137, 1)" }}
          onClick={() => setOpenUpdate(true)}
        />
        <UpdateProductModal
          opened={openUpdate}
          onClose={() => setOpenUpdate(false)}
          handleUpdate={handleUpdate}
          uuid={element.uuid}
        />
      </td>
      <td style={index % 2 !== 0 ? oddRowStyle : evenRowStyle}>
        {element.title}
      </td>
      <td style={index % 2 !== 0 ? oddRowStyle : evenRowStyle}>
        {element.url}
      </td>
      <td style={index % 2 !== 0 ? oddRowStyle : evenRowStyle}>
        {element.description}
      </td>
      <td
        style={
          index % 2 !== 0
            ? { ...oddRowStyle, ...oddLastCellStyle }
            : { evenRowStyle, ...evenLastCellStyle }
        }
      >
        <RiDeleteBinLine
          onClick={() => setDeleteData({ open: true, element: element })} // Pass the uuid of the product to delete
          style={{
            width: "20px",
            height: "20px",
            color: "rgba(178, 18, 34, 1)",
          }}
        />
      </td>
      {/* <DeleteProductModal
        opened={openDelete}
        onClose={() => setOpenDelete(false)}
        element={element}
      /> */}
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
          width: "95%",
          marginTop: "35px",
          borderRadius: "15px",
          padding: "10px",
          boxShadow:
            "0px 4px 4px 0 rgba(0, 0, 0, 0.25), 0px -3px 4px 0 rgba(0, 0, 0, 0.158)",
        }}
      >
        <Table verticalSpacing="md" withRowBorders={false}>
          <thead>
            <tr
              style={{
                fontSize: "20px",
                fontWeight: "800",
                color: "rgba(156, 163, 175, 1)",
              }}
            >
              <th></th>
              <th>اسم البرنامج</th>
              <th>رابط البرنامج</th>
              <th>الوصف</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>

        {/* Add the Pagination component */}
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Pagination
            total={totalPages}
            page={activePage} // Current page number
            onChange={setPage} // Function to change the page
            color="rgba(178, 18, 34, 1)"
            position="center"
            mt="md"
          />
          {/* total={Math.ceil(paginatedProducts.length / rowsPerPage)}  Total number of pages */}
          <Button
            variant="outline"
            mt="md"
            onClick={() => setOpenAdd(true)}
            color="rgba(178, 18, 34, 1)"
            style={{
              width: "178px",
              borderRadius: "8px",
              fontSize: "20",
              fontWeight: "800",
              right: "50%",
              transform: "translateX(110%)",
            }}
          >
            <span style={{ marginLeft: "20px" }}>إضافة برنامج جديد</span>

            <IoAddCircleOutline style={{ width: "20px", height: "20px" }} />
          </Button>
          <AddProductModal
            opened={openAdd}
            onClose={() => setOpenAdd(false)}
            handleAdd={handleAdd}
          />
        </div>
        <DeleteProductModal
          opened={deleteData.open}
          onClose={() => setDeleteData({ open: false, element: {} })} // Close the modal and reset the uuid
          element={deleteData.element} // Pass the uuid of the product to delete
        />
      </div>
    </div>
  );
};

export default ProductsPage;
