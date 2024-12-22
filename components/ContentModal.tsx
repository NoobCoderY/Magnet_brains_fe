import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { RxCross1 } from "react-icons/rx";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#006D77",
  border: "2px solid #006D77",
  boxShadow: 24,
  overflowWrap: "break-word",
  p: 4,
};

interface TaskDeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleOpen: () => void;
  handleClose: () => void;
  contentData: string;
}

export default function BasicModal({
  open,
  setOpen,
  handleOpen,
  handleClose,
  contentData,
}: TaskDeleteDialogProps) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between">
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              className="text-2xl font-bold text-[#FFDDD2]"
            >
              Task Description
            </Typography>
            <span className="cursor-pointer"
              onClick={() => {
                handleClose();
              }}
            >
              <RxCross1 size={22} color="#FFDDD2" />
            </span>
          </div>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, color: "#FFDDD2" }}
          >
            {contentData}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
