import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Padding } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { editClass } from "../../redux/classSlice";

function UpdateClass(props) {
  const { onClose, selectedValue, open } = props;
  const [updateClass, setUpdateClass] = useState({});
  const [typedclass, settypedClasses] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedValue) {
        setUpdateClass(selectedValue);
    }
  }, [selectedValue])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editClass(updateClass));
    handleClose();
    window.location.reload();
  }

  const handleClose = () => {
    settypedClasses({typedclass: ""});
    onClose(selectedValue);
  };

  const updatedQuestion = (e) => {
    settypedClasses({typedclass: e.target.value});
    setUpdateClass({ ...updateClass, [e.target.name]: e.target.value })
  }

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Edit Class</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4">
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={updateClass && updateClass.name}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              onChange={updatedQuestion}
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!typedclass.typedclass}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateClass

