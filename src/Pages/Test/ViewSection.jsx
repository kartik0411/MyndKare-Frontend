import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Padding } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { editSection } from "../../redux/sectionSlice";

function ViewSection(props) {
  const { onClose, selectedValue, open } = props;
  const [updateSection, setUpdateSection] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedValue) {
        setUpdateSection(selectedValue);
    }
  }, [selectedValue])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editSection(updateSection));
    handleClose();
    window.location.reload();
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const updatedQuestion = (e) => {
    setUpdateSection({ ...updateSection, [e.target.name]: e.target.value })
  }

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>View Section</DialogTitle>
      <DialogContent>
        <form >
          <div sectionName="pt-4">
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={updateSection && updateSection.name}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              // onChange={updatedQuestion}
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewSection

