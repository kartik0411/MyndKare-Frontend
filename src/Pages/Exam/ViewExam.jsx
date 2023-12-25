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
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { computeSlots } from "@mui/x-data-grid/internals";
import Radio from '@mui/material/Radio';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

function ViewExam(props) {
  let { onClose, selectedValue, open, testsValues,dbdasValues } = props;
  const [exams, setExams] = useState({});
  const [dbda, setDbda] = useState(false);
  const [timer, setTimer] = useState(false);
  const [examChanged, setExamChanged] = useState(false);
  // const [selectedExam, setSelectedExam] = useState({type: "1"});
  const [typedsection, settypedSections] = useState(false);
  const dispatch = useDispatch();


  let { examsCount} = useSelector((state) => {
    // setExams({ ...exams, serial: state.examDetail.count })
    return state.examDetail; 
  });
  // useEffect(()=> {setTest(exams.testId)}, [tests])
  // useEffect(()=> {if(exams.dbdaId) {setDbda(exams.dbdaId)}}, [dbdas])
  useEffect(() => {
    // if (testsValues) {
    //   setTests(testsValues);
    // }
    // if(dbdasValues) {
    //   setDbadas(dbdasValues);
    // }
    if (selectedValue) {
      let value = Object.assign({},selectedValue);
      if(selectedValue.timer=="Yes") {
        value.timer = true;
        setTimer(true);
      } else if(selectedValue.timer=="No") {
        value.timer = false;
        setTimer(false);
      }
      if(selectedValue.timerVisible=="Yes") {
        value.timerVisible = true;
      } else if(selectedValue.timer=="No") {
        value.timerVisible = false;
      }
      if(value.name?.indexOf('-')>-1) {
        value.name= value.name?.substring(value.name?.indexOf('-')+1);
      } else {
        value.name = "";
      }
      if(value.dbdaId) {
        setDbda(true);
        if(value.name?.indexOf('-')>-1) {
          value.name= value.name?.substring(value.name?.indexOf('-')+1);
        } else {
          value.name = "";
        }
      } else {
        setDbda(false);
      }
      setExams(value);
      settypedSections(false);
      setExamChanged(false);
  }
  }, [selectedValue])


  useEffect(() => {
    console.log("exams ::"+JSON.stringify(exams))
    if(exams.testId && exams.timer!=null && exams.serial && examChanged) {
      if(dbda) {
        if(timer) {
          if(exams.dbdaId && exams.timerVisible!=null && exams.duration) {
            settypedSections(true)
          } else {
            settypedSections(false)
          }
        } else {
          if(exams.dbdaId) {
            settypedSections(true)
          } else {
            settypedSections(false)
          }
        }
      } else {
        if(timer) {
          if(exams.timerVisible!=null && exams.duration) { 
            settypedSections(true)
          } else {
            settypedSections(false)
          }
        } else {
          settypedSections(true)
        }
      }
    } else {
      settypedSections(false)
    }
 }, [exams]);

  const styles = {
    equalFields: {
      width: "50%",
      paddingRight: "15px",
    },
  };
  const getExamData = (e) => {
    setExamChanged(true)
    if(e.target.name === "testId") {
      console.log("e.target.value"+e.target.value)
      let type=1;
      for(let i=0;i<testsValues.length;i++) {
        if((e.target.value === testsValues[i]._id) ) { 
          if(testsValues[i].type === 2) {
            type=2;
          }
         break;
        }
      }
      if(type==2) {
        setDbda(true);
      } else {
        delete exams.dbdaId
        setDbda(false);
      }
    }
    if(e.target.name === "timer") { 
      if(e.target.value==true) { 
        setTimer(true);
      } else {
        delete exams.timerVisible;
        delete exams.duration;
        setTimer(false);
      }
    }
    setExams({ ...exams, [e.target.name]: e.target.value })
  }

  // const getTestData = (e) => {
  //   setExams({ ...exams, [e.target.name]: e.target.value })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editExam(exams));
    handleClose();
    window.location.reload(); 
  }
  
  const handleClose = () => {
    let value = Object.assign({},selectedValue);
    if(selectedValue.timer==="Yes") {
      value.timer = true;
      setTimer(true);
    } else if(selectedValue.timer==="No") {
      value.timer = false;
      setTimer(false);
    }
    if(selectedValue.timerVisible=="Yes") {
      value.timerVisible = true;
    } else if(selectedValue.timer=="No") {
      value.timerVisible = false;
    }
    if(value.name?.indexOf('-')>-1) {
      value.name= value.name?.substring(value.name?.indexOf('-')+1);
    } else {
      value.name = "";
    }
    if(value.dbdaId) {
      setDbda(true);
      if(value.name?.indexOf('-')>-1) {
        value.name= value.name?.substring(value.name?.indexOf('-')+1);
      } else {
        value.name = "";
      }
    } else {
      setDbda(false);
    }
    setExams(value);
    settypedSections(false);
    setExamChanged(false);
    onClose(selectedValue);
  };
  testsValues = testsValues?.filter(item => item.name !== "CIS") 
  const menuItems = testsValues?.map(item => (
    <MenuItem value={item._id}>{item.name}</MenuItem>
    ));

    const dbdasmenuItems = dbdasValues?.map(item => (
      <MenuItem value={item._id}>{item.code}</MenuItem>
      ));

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>View Exam</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4 flex items-center justify-center">
          <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}>
            <InputLabel id="demo-select-small-label" required>Test</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="testId"
              value={exams.testId}
              label="Test"
              //onChange={getExamData}
            >
              {menuItems}
            </Select>
            
            </FormControl>

            {dbda ? <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}>
            <InputLabel id="demo-select-small-label" required>DBDA Code</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="dbdaId"
              value={exams.dbdaId}
              label="Test"
              //onChange={getExamData}
            >
              {dbdasmenuItems}
            </Select>
            </FormControl>  : false}
            
            <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="Name"
              name="name"
              value={exams.name}
             // onChange={getExamData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
            />
          </div>
          <div className="pt-4 flex items-center justify-center" >
          <FormControl size="small" sx={{ display: "inline-flex", width: "50%", paddingRight:"20px"}}>
            <InputLabel id="demo-select-small-label"  required>Timer</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="timer"
              value={exams.timer}
              label="Timer"
              //onChange={getExamData}
            >
               <MenuItem value="">
              </MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            </FormControl>
            <TextField
              style={styles.equalFields}
              label="Serial"
              name="serial"
              value={exams.serial}
              //onChange={getExamData}
              id="outlined-number"
              size="small"
              type="number"
              defaultValue= {examsCount}
              required
            />  
          </div>
          <div className="pt-4 flex items-center justify-center">
          {timer ? <FormControl size="small" sx={{ display: "inline-flex", width: "50%", paddingRight:"20px"}}>
            <InputLabel id="demo-select-small-label"  required>Timer Visible</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="timerVisible"
              value={exams.timerVisible}
              label="Timer Visible"
              //onChange={getExamData}
            >
              <MenuItem value="">
              </MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            </FormControl>  : false}
          {timer ? <TextField 
              style={styles.equalFields}
              label="Duration(Seconds)"
              name="duration"
              type="number"
              value={exams.duration}
              //onChange={getExamData}
              id="outlined-number"
              size="small"
              required
            />  : false}
          </div>
        </form>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewExam

