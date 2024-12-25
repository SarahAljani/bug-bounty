import PropTypes from "prop-types";
import * as React from "react";
import { Transition } from "react-transition-group";
import { Button } from "@mantine/core";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
export function LogoutModal({ opened, onClose, onLogout }) {
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
                  <h2
                    className="sayHi"
                    style={{
                      color: "rgba(29, 29, 27, 1)",
                      fontFamily: "Zain",
                      fontWeight: "800",
                      fontSize: "22px",
                    }}
                  >
                    هل تريد تسجيل الخروج!{" "}
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      columnGap: "20px",
                    }}
                  >
                    <Button
                      style={{
                        width: "150px",
                        borderRadius: "8px",
                        fontSize: "20px",
                        fontWeight: "800",
                      }}
                      variant="outline"
                      color="rgba(178, 18, 34, 1)"
                      size="sm"
                    >
                      إلغاء{" "}
                    </Button>
                    <Button
                      onClick={onLogout}
                      style={{
                        width: "150px",
                        borderRadius: "8px",
                        fontSize: "20px",
                        fontWeight: "800",
                      }}
                      color="rgba(178, 18, 34, 1)"
                      size="sm"
                    >
                      تسجيل الخروج{" "}
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

LogoutModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired, 
  onLogout: PropTypes.func.isRequired, 
};
