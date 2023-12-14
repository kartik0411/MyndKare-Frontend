import React, { useEffect,useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createExam, showExam  } from "../../redux/examSlice";
import Radio from '@mui/material/Radio';
import Select from "@mui/material/Select";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { computeSlots } from "@mui/x-data-grid/internals";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { createTest, showTest } from "../../redux/testSlice";
import { useDispatch, useSelector } from "react-redux";

function CreateExam(props)  {
  const { onClose, selectedValue, open } = props;
  const [exams, setExams] = useState({});
  const [test, setTest] = useState({});
  const [dbda, setDbda] = useState(false);
  // const [selectedExam, setSelectedExam] = useState({type: "1"});
  const [typedexam, settypedExams] = useState({});
  const dispatch = useDispatch();
  const { tests, loading, error } = useSelector((state) => {
    // let testobject = state.testDetail
    // if(state.testDetail && state.testDetail.tests && state.testDetail.tests.length>0 && state.testDetail.tests[state.testDetail.tests.length-1]._id == null) {
    //   let newtestobject = JSON.parse(JSON.stringify(testobject));
    //   newtestobject.tests.pop();
    //   return newtestobject;
    // }
    // else {
    return state.testDetail;
    // }
  });

  useEffect(() => {
    dispatch(showTest())
    console.log(tests)
  }, [])

  const styles = {
    equalFields: {
      width: "50%",
      paddingRight: "15px",
    },
  };
  const getExamData = (e) => {
    if(e.target.name === "testId") {
      if(e.target.value.type==2) {
        setDbda(true);
      } else {
        setDbda(false);
      }

    }
    setExams({ ...exams, [e.target.name]: e.target.value._id })
  }

  // const getTestData = (e) => {
  //   setExams({ ...exams, [e.target.name]: e.target.value })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    // window.location.reload(); 
  }

  // const handleChange = (e) => {
  //   // console.log("isse pehle ki value:"+selectedExam)
  //   // console.log("selected exam ki value:"+e.target.value)
  //   setSelectedExam({type: e.target.value});
  //   // console.log("selectedExam.type"+selectedExam.type)
  //   // console.log("typedexam.typedexam"+typedexam.typedexam)
  //   // if(selectedExam && selectedExam.type && (selectedExam.type===1 || selectedExam.type===2) && !typedexam.typedexam)
  //   // {
  //   //   console.log("ye to aara");
  //   //   setsubmitbutton(true);
  //   // }
  // }

  const handleClose = () => {
    settypedExams({typedexam: ""});
    onClose(selectedValue);
  };

  const menuItems = tests.map(item => (
    <MenuItem value={item._id}>{item.name}</MenuItem>
  ));

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Create Exam</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4 flex items-center justify-center">
          <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}>
            <InputLabel id="demo-select-small-label">Test</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="testId"
              value={test}
              label="Test"
              onChange={getExamData}
            >
              {menuItems}
            </Select>
            </FormControl>

            {!dbda ? <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}>
            <InputLabel id="demo-select-small-label">Test</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="testId"
              value={test._id}
              label="Test"
              onChange={getExamData}
            >
              {menuItems}
            </Select>
            </FormControl>  : false}
            
            <TextField
              fullWidth
              label="Name"
              name="name"
              onChange={getExamData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
            />
          </div>
          <div className="pt-4 flex items-center justify-center" >
          <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}>
            <InputLabel id="demo-select-small-label">Timer</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="timer"
              value={exams.timer}
              label="Timer"
              onChange={getExamData}
            >
               <MenuItem value="">
              </MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            </FormControl>
            <FormControl sx={{ display: "inline-flex", width: "100%" }} size="small">
            <InputLabel id="demo-select-small-label">Timer Visible</InputLabel>
            <Select
      
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="timerVisible"
              value={exams.timerVisible}
              label="Timer Visible"
              onChange={getExamData}
            >
              <MenuItem value="">
              </MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            </FormControl>
          </div>
          <div className="pt-4">
            <TextField
              style={styles.equalFields}
              label="Duration"
              name="duration"
              type="number"
              onChange={getExamData}
              id="outlined-number"
              size="small"
            />
            <TextField
              style={styles.equalFields}
              label="Serial"
              name="serial"
              onChange={getExamData}
              id="outlined-number"
              size="small"
              type="number"
              required
            />  
          </div>
        </form>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}  disabled={!typedexam.typedexam}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateExam


