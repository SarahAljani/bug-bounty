import PropTypes from "prop-types";
import * as React from "react";
import { Transition } from "react-transition-group";
import { Button } from "@mantine/core";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
import { useForm, yupResolver } from "@mantine/form";
import { PasswordInput } from "@mantine/core";
import * as yup from "yup";
import "../../styles/LoginRegister.module.css";
import { apiCompanyUpdatePassword } from "../../api/companyHomePage";

export function PasswordResetModal({ opened, onClose }) {
  const schema = yup.object().shape({
    old_password: yup.string().required("Current password is required"),
    // .test(
    //   "passwords-match",
    //   "The current password is not valid",
    // ),
    new_password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      )
      .notOneOf(
        [yup.ref("old_password"), null],
        "New password cannot be the same as the current password"
      )
      .required("Password is required"),
    new_password_confirmation: yup
      .string()
      .oneOf([yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Mantine form with Yup validation resolver
  const form = useForm({
    initialValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validate: yupResolver(schema),
  });

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

  const handleReset = async (values) => {
    try {
      const validationResult = form.validate();
      if (!validationResult.hasErrors) {
        const formPassword = {
          old_password: values.old_password,
          new_password: values.new_password,
          new_password_confirmation: values.new_password_confirmation,
        };
        const response = await apiCompanyUpdatePassword(
          formPassword,
          "/company/changePassword"
        );
        console.log("Company password updated successfully:", response);
      }
    } catch (error) {
      console.log("connot reset the password, an error occured " + error);
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
                    entering: { opacity: 1, backdropFilter: "blur(5px)" },
                    entered: { opacity: 1, backdropFilter: "blur(5px)" },
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
                    يرجى إعادة تعيين كلمة المرور{" "}
                  </h2>
                  <form onSubmit={form.onSubmit(handleReset)}>
                    <div className="formBlock" dir="rtl">
                      <div className="formFields" style={formStyles}>
                        <PasswordInput
                          placeholder="أدخل كلمة المرور الحالية *"
                          {...form.getInputProps("old_password")}
                          styles={inputStyles}
                          style={inputFieldStyle}
                        />

                        <PasswordInput
                          mt="sm"
                          placeholder="أدخل كلمة المرور الجديدة *"
                          {...form.getInputProps("new_password")}
                          styles={inputStyles}
                          style={inputFieldStyle}
                        />

                        <PasswordInput
                          mt="sm"
                          placeholder="قم بتأكيد كلمة المرور الجديدة *"
                          {...form.getInputProps("new_password_confirmation")}
                          styles={inputStyles}
                          style={inputFieldStyle}
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
                        }}
                        onClick={onClose}
                      >
                        رجوع{" "}
                      </Button>

                      <Button
                        type="submit"
                        style={{
                          width: "145px",
                          borderRadius: "8px",
                          fontSize: "20",
                          fontWeight: "800",
                        }}
                        color="rgba(178, 18, 34, 1)"
                        size="sm"
                      >
                        حفظ التغيرات{" "}
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

PasswordResetModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
