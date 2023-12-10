import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { createSection, showSection  } from "../../redux/sectionSlice";

function CreateSection(props) {
  const { onClose, selectedValue, open } = props;
  const [sections, setSections] = useState({});
  const [typedsection, settypedSections] = useState({});
  const dispatch = useDispatch();

  const getSectionData = (e) => {
    settypedSections({typedsection: e.target.value});
    setSections({ ...sections, [e.target.name]: e.target.value, resultPublish: false })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSection(sections));
    handleClose();
    window.location.reload();
  }

  const handleClose = () => {
    settypedSections({typedsection: ""});
    onClose(selectedValue);
  };

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Create Section</DialogTitle>
      <DialogContent>
        <form >
          <div sectionName="pt-4">
            <TextField
              fullWidth
              label="Name"
              name="name"
              onChange={getSectionData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}  disabled={!typedsection.typedsection}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateSection


