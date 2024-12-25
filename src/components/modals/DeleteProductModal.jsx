import PropTypes from "prop-types";
import * as React from "react";
import { Transition } from "react-transition-group";
import { Button } from "@mantine/core";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
import "../../styles/LoginRegister.module.css";
import { apiCompanyDeleteProduct } from "../../api/companyHomePage";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/actions/productsActions";

export function DeleteProductModal({ opened, onClose, element }) {
  // Mantine form with Yup validation resolver
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const response = await apiCompanyDeleteProduct(element.uuid);
      dispatch(deleteProduct(element.uuid));
      onClose();
    } catch (error) {
      console.log(error);
    }
    
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <React.Fragment>
      <Transition in={opened} timeout={400}>
        {(state) => (
          <Modal
            keepMounted
            open={!["exited", "exiting"].includes(state)}
            onClose={onClose}
            slotProps={{
              backdrop: {
                sx: {
                  opacity: 0,
                  backdropFilter: "none",
                  transition: `opacity 400ms, backdrop-filter 400ms`,
                  ...{
                    entering: { opacity: 1, backdropFilter: "blur(1px)" },
                    entered: { opacity: 1, backdropFilter: "blur(1px)" },
                  }[state],
                },
              },
            }}
            sx={[
              state === "exited"
                ? { visibility: "hidden" }
                : { visibility: "visible" },
            ]}
          >
            <ModalDialog
              sx={{
                opacity: 0,
                transition: `opacity 300ms`,
                ...{
                  entering: { opacity: 1 },
                  entered: { opacity: 1 },
                }[state],
                borderRadius: "16px !important",
              }}
            >
              <DialogContent>
                <div
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    rowGap: "10px",
                    position: "relative",
                    height: "fit-content",
                  }}
                >
                  <h2
                    className="sayHi"
                    style={{
                      color: "rgba(29, 29, 27, 1)",
                      fontFamily: "Zain",
                      fontWeight: "700",
                      fontSize: "20px",
                    }}
                  >
                    هل أنت متأكد أنك تريد حذف هذاالبرنامج
                  </h2>
                  <h5>{element.title}</h5>
                  <div
                    style={{
                      marginTop: "25px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      columnGap: "10px",
                      position: "relative",
                    }}
                  >
                    <Button
                      color="rgba(178, 18, 34, 1)"
                      variant="outline"
                      style={{
                        width: "145px",
                        borderRadius: "8px",
                        fontSize: "20",
                        fontWeight: "800",
                        color: "",
                        fontFamily: "Zain",
                      }}
                      onClick={handleClose}
                    >
                      إلغاء{" "}
                    </Button>

                    <Button
                      onClick={handleDelete}
                      style={{
                        width: "145px",
                        borderRadius: "8px",
                        fontFamily: "Zain",
                        fontSize: "20",
                        fontWeight: "800",
                        color: "rgba(249, 249, 249, 1)",
                      }}
                      color="rgba(178, 18, 34, 1)"
                      size="sm"
                    >
                      موافق
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}

DeleteProductModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
  element: PropTypes.object,
};
