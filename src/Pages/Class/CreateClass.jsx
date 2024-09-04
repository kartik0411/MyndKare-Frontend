import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { createClass, showClass  } from "../../redux/classSlice";
import axios from "../../axiosConfig";

function CreateClass(props) {
  const { onClose, selectedValue, open } = props;
  const [classes, setClasses] = useState({});
  const [typedclass, settypedClasses] = useState({});
  const dispatch = useDispatch();

  const getClassData = (e) => {
    settypedClasses({typedclass: e.target.value});
    setClasses({ ...classes, [e.target.name]: e.target.value, resultPublish: false })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/classes",classes);
    handleClose();
    window.location.reload();
  }

  const handleClose = () => {
    settypedClasses({typedclass: ""});
    onClose(selectedValue);
  };

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Create Class</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4">
            <TextField
              fullWidth
              label="Name"
              name="name"
              onChange={getClassData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              required
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}  disabled={!typedclass.typedclass}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateClass


