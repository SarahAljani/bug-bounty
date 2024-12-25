import PropTypes from "prop-types";
import * as React from "react";
import { Transition } from "react-transition-group";
import { Button } from "@mantine/core";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogContent from "@mui/joy/DialogContent";
import { Rating } from "@mantine/core";
import { useState } from "react";
export function AddRatingModal({
  opened,
  onClose,
  handleRating,
  text,
  count,
  mainText,
  value,
  setValue,
}) {
  // const [value, setValue] = useState(0);
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
                  transition: `opacity 200ms, backdrop-filter 200ms`,
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
                padding: 0,
                opacity: 0,
                width: "400px",
                height: "265px",
                transition: `opacity 200ms`,
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
                    margin: "10px 0px",
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",

                    rowGap: "20px",
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
                    {mainText}{" "}
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
                    {/* يرجى تغييم الثغرة من أصل 5{" "} */}
                    {text}
                  </h2>
                  <div
                    className="rating"
                    style={{
                      width: "100%",
                      padding: "20px 0px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(233, 236, 246, 1)",
                    }}
                  >
                    <Rating
                      value={value} // Controlled by parent
                      onChange={setValue} // Update parent state on change
                      size="xl"
                      count={count}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      columnGap: "20px",
                    }}
                  >
                    <Button
                      mt={5}
                      style={{
                        width: "150px",
                        borderRadius: "8px",
                        fontSize: "20px",
                        fontWeight: "800",
                      }}
                      variant="outline"
                      color="rgba(178, 18, 34, 1)"
                      size="sm"
                      onClick={onClose}
                    >
                      إلغاء{" "}
                    </Button>
                    <Button
                      onClick={() => {
                        handleRating(value);
                      }}
                      mt={5}
                      style={{
                        width: "150px",
                        borderRadius: "8px",
                        fontSize: "20px",
                        fontWeight: "800",
                      }}
                      color="rgba(178, 18, 34, 1)"
                      size="sm"
                    >
                      إرسال التقييم
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

AddRatingModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  handleRating: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  mainText: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};
