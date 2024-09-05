import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { createSchool, showSchool  } from "../../redux/schoolSlice";
import axios from "../../axiosConfig";

function CreateSchool(props) {
  const { onClose, selectedValue, open } = props;
  const [schools, setSchools] = useState({});
  const [typedschool, settypedSchools] = useState({});
  const dispatch = useDispatch();

  const getSchoolData = (e) => {
    settypedSchools({typedschool: e.target.value});
    setSchools({ ...schools, [e.target.name]: e.target.value, lastPublish: null })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/schools",schools);
    handleClose();
    window.location.reload();
  }

  const handleClose = () => {
    settypedSchools({typedschool: ""});
    onClose(selectedValue);
  };

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Create School</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4">
            <TextField
              fullWidth
              label="Name"
              name="name"
              onChange={getSchoolData}
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
        <Button onClick={handleSubmit}  disabled={!typedschool.typedschool}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateSchool


