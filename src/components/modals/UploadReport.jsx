import { useState } from "react";
import { useForm } from "@mantine/form"; // Import useForm
import PropTypes from "prop-types"; // Import PropTypes
// import Button from "@mui/joy/Button";
import * as React from "react";
import { Transition } from "react-transition-group";
import { FileButton, Group, Text, TextInput, Button } from "@mantine/core";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
import { apiReport } from "../../api/researcherHomePage";
import { BsUpload } from "react-icons/bs";
export function UploadReport({ onClose, open, uuid }) {
  const [files, setFiles] = useState([]);
  const form = useForm({
    initialValues: {
      title: "",
      product: "",
    },
    validate: {
      title: (value) =>
        value.trim().length === 0 ? "يجب إدخال اسم التقرير" : null,
    },
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("product_uuid", uuid);

    files.forEach((file) => {
      formData.append("report_file", file);
    });
    try {
      const response = await apiReport(formData);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const inputStyles = {
    input: {
      textAlign: "right",
      borderRadius: "8px",
    },
  };

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexWrap: "wrap",
  };

  const inputFieldStyle = {
    width: "100%",
  };

  return (
    <React.Fragment>
      <Transition in={open} timeout={400}>
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
              }}
            >
              <DialogContent>
                <div
                  style={{
                    width: "100%",
                    marginTop: "25px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    rowGap: "30px",
                    position: "relative",
                  }}
                >
                  <form
                    onSubmit={form.onSubmit(handleSubmit)}
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <div className="formBlock" dir="rtl">
                      <div className="formFields" style={formStyles}>
                        <TextInput
                          mt="sm"
                          placeholder="أدخل اسم التقرير *"
                          {...form.getInputProps("title")} // Use form.getInputProps for input
                          styles={inputStyles}
                          style={inputFieldStyle}
                          rightSection={<></>}
                        />
                        <Group justify="center">
                          <FileButton
                            onChange={setFiles}
                            accept=".pdf,.doc,.docx,.txt,.xlsx"
                            multiple
                          >
                            {(props) => (
                              <Button
                                variant="outline"
                                {...props}
                                color="rgba(178, 18, 34, 1)"
                                style={{
                                  width: "300px",
                                  borderRadius: "8px",
                                  fontSize: "20px",
                                  fontWeight: "800",
                                  marginTop: "20px",
                                }}
                              >
                                <BsUpload
                                  className="btnIconcp"
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                  }}
                                />
                              </Button>
                            )}
                          </FileButton>
                        </Group>
                        <div
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          {files.length > 0 && (
                            <Text
                              size="sm"
                              style={{ fontSize: "16px", fontWeight: "600" }}
                            >
                              الملفات المختارة:
                            </Text>
                          )}

                          <ul>
                            {files.map((file, index) => (
                              <li key={index}>{file.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        marginTop: "25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        columnGap: "10px",
                        position: "relative",
                      }}
                    >
                      <Button
                        onClick={() => setFiles([])} // Clear files on cancel
                        style={{
                          width: "200px",
                          borderRadius: "8px",
                          fontSize: "20px",
                          fontWeight: "800",
                        }}
                        variant="outline"
                        color="rgba(178, 18, 34, 1)"
                        size="sm"
                      >
                        إلغاء الإرسال
                      </Button>
                      <Button
                        type="submit"
                        style={{
                          width: "200px",
                          borderRadius: "8px",
                          fontSize: "20px",
                          fontWeight: "800",
                        }}
                        color="rgba(178, 18, 34, 1)"
                        size="sm"
                      >
                        إرسال التقرير{" "}
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

// Add prop types validation for the props
UploadReport.propTypes = {
  open: PropTypes.bool.isRequired, // open is a required function
  onClose: PropTypes.func.isRequired, // close is a required function
  uuid: PropTypes.string.isRequired,
};
