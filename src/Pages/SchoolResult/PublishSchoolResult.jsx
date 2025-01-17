import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Padding } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import axios from "../../axiosConfig";

function PublishSchoolResult(props) {
  const { onClose, selectedValue, open } = props;
  const [updateSchool, setUpdateSchool] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedValue) {
        setUpdateSchool(selectedValue);
    }
  }, [selectedValue])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.get("/schools/resultPublish/"+updateSchool._id);
    handleClose();
    window.location.reload();
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const updatedQuestion = (e) => {
    setUpdateSchool({ ...updateSchool, [e.target.name]: e.target.value })
  }

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Are you sure you want to Publish the Result of the below Organisation?</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4">
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={updateSchool && updateSchool.name}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              // onChange={updatedQuestion}
            />
          </div>
        </form>
      </DialogContent>
      <DialogContent >Note: Report will be published only for students with completed Feedback Forms from Counselors. </DialogContent >
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleSubmit}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default PublishSchoolResult

