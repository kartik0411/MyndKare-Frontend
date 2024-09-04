import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { createTest, showTest  } from "../../redux/testSlice";
import Radio from '@mui/material/Radio';
import Select from "@mui/material/Select";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { computeSlots } from "@mui/x-data-grid/internals";
import axios from "../../axiosConfig";

function CreateTest(props) {
  const { onClose, selectedValue, open } = props;
  const [tests, setTests] = useState({});
  const [selectedTest, setSelectedTest] = useState({type: "1"});
  const [typedtest, settypedTests] = useState({});
  const dispatch = useDispatch();

  const getTestData = (e) => {
    settypedTests({typedtest: e.target.value});
    setTests({ ...tests, [e.target.name]: e.target.value, type: selectedTest.type })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/tests",tests);
    handleClose();
    window.location.reload();
  }

  const handleChange = (e) => {
    // console.log("isse pehle ki value:"+selectedTest)
    // console.log("selected test ki value:"+e.target.value)
    setSelectedTest({type: e.target.value});
    // console.log("selectedTest.type"+selectedTest.type)
    // console.log("typedtest.typedtest"+typedtest.typedtest)
    // if(selectedTest && selectedTest.type && (selectedTest.type===1 || selectedTest.type===2) && !typedtest.typedtest)
    // {
    //   console.log("ye to aara");
    //   setsubmitbutton(true);
    // }
  }

  const handleClose = () => {
    settypedTests({typedtest: ""});
    onClose(selectedValue);
  };

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Create Test</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4">
            <TextField
              fullWidth
              label="Name"
              name="name"
              onChange={getTestData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              required
            />
          </div>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={selectedTest.type}
              onChange={handleChange}
              defaultValue="1"
            >
              <FormControlLabel value="1" control={<Radio />} label="RESPONSE BASED(MBTI)" />
              <FormControlLabel value="2" control={<Radio />} label="SCORE BASED(DBDA)" />
            </RadioGroup>
          </FormControl>
        </form>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}  disabled={!typedtest.typedtest}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTest


