import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Padding } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { editExam } from "../../redux/examSlice";
import Radio from '@mui/material/Radio';
import Select from "@mui/material/Select";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function UpdateExam(props) {
  const { onClose, selectedValue, open } = props;
  const [updateExam, setUpdateExam] = useState({});
  const [typedexam, settypedExams] = useState({});
  const [selectedExam, setSelectedExam] = useState({type: updateExam.type});
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedValue) {
        setUpdateExam(selectedValue);
    }
  }, [selectedValue])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editExam(updateExam));
    handleClose();
    window.location.reload();
  }

  const handleClose = () => {
    settypedExams({typedexam: ""});
    onClose(selectedValue);
  };

  
  const handleChange = (e) => {
    // console.log("isse pehle ki value:"+selectedExam)
    // console.log("selected exam ki value:"+e.target.value)
    if(typedexam && typedexam.typedexam && typedexam.typedexam!="") {
      settypedExams({typedexam: typedexam.typedexam});
    } else {
      settypedExams({typedexam: updateExam.name});
    }
    setSelectedExam({type: e.target.value});
    setUpdateExam({ ...updateExam, type: e.target.value})
    // console.log("selectedExam.type"+selectedExam.type)
    // console.log("typedexam.typedexam"+typedexam.typedexam)
    // if(selectedExam && selectedExam.type && (selectedExam.type===1 || selectedExam.type===2) && !typedexam.typedexam)
    // {
    //   console.log("ye to aara");
    //   setsubmitbutton(true);
    // }
  }


  const updatedQuestion = (e) => {
    settypedExams({typedexam: e.target.value});
    setUpdateExam({ ...updateExam, [e.target.name]: e.target.value, type: selectedExam.type})
  }

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Edit Exam</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4">
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={updateExam && updateExam.name}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              onChange={updatedQuestion}
            />
          </div>
        </form>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={selectedExam.type}
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
        <Button onClick={handleSubmit} disabled={!typedexam.typedexam}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateExam

