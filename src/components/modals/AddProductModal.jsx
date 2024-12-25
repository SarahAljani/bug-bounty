import PropTypes from "prop-types";
import * as React from "react";
import { Transition } from "react-transition-group";
import { Button, Textarea, TextInput } from "@mantine/core";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import "../../styles/LoginRegister.module.css";
import { PiAppWindowBold } from "react-icons/pi";
import { World } from "tabler-icons-react";
import { apiCompanyAddProduct } from "../../api/companyHomePage";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/actions/productsActions";
const schema = yup.object().shape({
  title: yup
    .string()
    .min(2, "Name should have at least 2 letters")
    .required("Product name is required"),
  url: yup
    .string()
    // .matches(
    //   /^(https?:\/\/)?[a-zA-Z0-9-]+\.(com|org|net|edu|gov|mil|co|info|biz)(\.[a-zA-Z]{2,})?$/,
    //   "Product domain must be a valid URL (e.g., www.example.com)"
    // )
    .required("Product domain is required"),
  description: yup
    .string()
    .min(20, "Product description must be at least 20 characters")
    .required("Product description is required"),
});
export function AddProductModal({ opened, onClose }) {
  // Mantine form with Yup validation resolver
  const dispatch = useDispatch();
  const [disabled, setDisabled] = React.useState(false);
  const form = useForm({
    initialValues: {
      title: "",
      url: "",
      description: "",
    },
    validate: yupResolver(schema),
  });
  const handleClose = () => {
    form.reset(); // This will reset form values and errors
    onClose(); // Then close the modal
  };
  const inputStyles = {
    input: {
      textAlign: "right",
      borderRadius: "8px",
      "&:focus-within": {
        borderColor: " rgba(178, 18, 34, 1) !important",
      },
    },
  };

  const inputFieldStyle = {
    width: "100%",
  };

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
  };
  const handleAdd = async (values) => {
    try {
      const productData = {
        title: values.title,
        description: values.description,
        url: values.url,
      };
      setDisabled(true);
      values.title = "";
      values.url = "";
      values.description = "";
      const response = await apiCompanyAddProduct(productData);
      dispatch(addProduct(productData));
      onClose();
      setDisabled(false);
    } catch (error) {
      console.log("product couldn't be added ", error);
    }
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
                      fontWeight: "800",
                      fontSize: "22px",
                    }}
                  >
                    إضافة برنامج جديد
                  </h2>
                  <h2
                    className="sayHi"
                    style={{
                      color: "rgba(156, 163, 175, 1)",
                      fontFamily: "Zain",
                      fontWeight: "700",
                      fontSize: "16px",
                    }}
                  >
                    يرجى تعبئة الحقول المطلوبة لإضافة البرنامج
                  </h2>
                  <form onSubmit={form.onSubmit(handleAdd)}>
                    <div className="formBlock" dir="rtl">
                      <div className="formFields" style={formStyles}>
                        <TextInput
                          placeholder="اسم البرنامج *"
                          {...form.getInputProps("title")}
                          styles={inputStyles}
                          style={inputFieldStyle}
                          rightSection={
                            <PiAppWindowBold
                              aria-label="Clear input"
                              color="#b6b6b6"
                              size={17}
                            />
                          }
                          error={form.errors.title} // Display error
                        />
                        <TextInput
                          mt="sm"
                          placeholder="رابط البرنامج *"
                          {...form.getInputProps("url")}
                          styles={inputStyles}
                          style={inputFieldStyle}
                          rightSection={
                            <World
                              aria-label="Clear input"
                              color="#b6b6b6"
                              size={17}
                            />
                          }
                          error={form.errors.url} // Display error
                        />
                        <Textarea
                          mt="sm"
                          rows={3}
                          placeholder="الوصف *"
                          {...form.getInputProps("description")}
                          styles={inputStyles}
                          style={inputFieldStyle}
                          error={form.errors.description} // Display error
                        />
                      </div>
                    </div>
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
                        type="submit"
                        disabled={disabled}
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
                        إضافة
                      </Button>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </ModalDialog>
          </Modal>
        )}
      </Transition>
    </React.Fragment>
  );
}

AddProductModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};
