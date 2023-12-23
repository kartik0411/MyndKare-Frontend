import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Padding } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { editTest } from "../../redux/testSlice";
import Radio from '@mui/material/Radio';
import Select from "@mui/material/Select";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function UpdateTest(props) {
  const { onClose, selectedValue, open } = props;
  const [updateTest, setUpdateTest] = useState({});
  const [typedtest, settypedTests] = useState({});
  const [selectedTest, setSelectedTest] = useState({type: updateTest.type});
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedValue) {
        setUpdateTest(selectedValue);
    }
  }, [selectedValue])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTest(updateTest));
    handleClose();
    window.location.reload();
  }

  const handleClose = () => {
    settypedTests({typedtest: ""});
    onClose(selectedValue);
  };

  
  const handleChange = (e) => {
    // console.log("isse pehle ki value:"+selectedTest)
    // console.log("selected test ki value:"+e.target.value)
    if(typedtest && typedtest.typedtest && typedtest.typedtest!="") {
      settypedTests({typedtest: typedtest.typedtest});
    } else {
      settypedTests({typedtest: updateTest.name});
    }
    setSelectedTest({type: e.target.value});
    setUpdateTest({ ...updateTest, type: e.target.value})
    // console.log("selectedTest.type"+selectedTest.type)
    // console.log("typedtest.typedtest"+typedtest.typedtest)
    // if(selectedTest && selectedTest.type && (selectedTest.type===1 || selectedTest.type===2) && !typedtest.typedtest)
    // {
    //   console.log("ye to aara");
    //   setsubmitbutton(true);
    // }
  }


  const updatedQuestion = (e) => {
    settypedTests({typedtest: e.target.value});
    setUpdateTest({ ...updateTest, [e.target.name]: e.target.value, type: selectedTest.type})
  }

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Edit Test</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4">
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={updateTest && updateTest.name}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              onChange={updatedQuestion}
              required
            />
          </div>
        </form>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={selectedTest.type}
              onChange={handleChange}
              defaultValue={selectedValue && selectedValue.type}
            >
              <FormControlLabel value="1" control={<Radio />} label="RESPONSE BASED(MBTI)" />
              <FormControlLabel value="2" control={<Radio />} label="SCORE BASED(DBDA)" />
            </RadioGroup>
          </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!typedtest.typedtest}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateTest

