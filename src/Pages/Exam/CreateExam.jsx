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
import { showDBDA } from "../../redux/dbdaSlice";
import { getExamsCount } from "../../redux/examSlice";
import { useDispatch, useSelector } from "react-redux";

function CreateExam(props)  {
  const { onClose, selectedValue, open } = props;
  const [exams, setExams] = useState({});
  const [test, setTest] = useState({});
  const [dbdacode, setDBDACode] = useState({});
  const [dbda, setDbda] = useState(false);
  const [timer, setTimer] = useState(false);
  // const [selectedExam, setSelectedExam] = useState({type: "1"});
  const [typedexam, settypedExams] = useState({});
  const [typedsection, settypedSections] = useState(false);
  const dispatch = useDispatch();
  let { tests, loading, error } = useSelector((state) => { 
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

  let { dbdas} = useSelector((state) => {
    return state.dbdaDetail; 
  });

  let { examsCount} = useSelector((state) => {
    // setExams({ ...exams, serial: state.examDetail.count })
    return state.examDetail; 
  });

  useEffect(() => {
    dispatch(showTest())
    dispatch(showDBDA())
    dispatch(getExamsCount())
    console.log(tests)
  }, [])

  useEffect(() => {
    console.log("exams ::"+JSON.stringify(exams))
    if(exams.testId && exams.timer!=null && exams.serial) {
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
    if(e.target.name === "testId") {
      console.log("e.target.value"+e.target.value)
      let type=1;
      for(let i=0;i<tests.length;i++) {
        if((e.target.value === tests[i]._id) ) { 
          if(tests[i].type === 2) {
            type=2;
          }
         break;
        }
      }
      if(type==2) {
        setDbda(true);
      } else {
        setExams({ ...exams, dbdaId: null })
        setDbda(false);
      }
    }
    if(e.target.name === "timer") { 
      if(e.target.value==true) { 
        setTimer(true);
      } else {
        setExams({ ...exams, timerVisible: null })
        setExams({ ...exams, duration: null })
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
    dispatch(createExam(exams));
    setTimeout(() => {
      console.log("Delayed for 1 second.");
    }, "1000");
    handleClose();
    window.location.reload(); 
  }
  
  const handleClose = () => {
    settypedExams({typedexam: ""});
    onClose(selectedValue);
  };
  tests = tests.filter(item => item.name !== "CIS") 
  const menuItems = tests.map(item => (
    <MenuItem value={item._id}>{item.name}</MenuItem>
    ));

    const dbdasmenuItems = dbdas.map(item => (
      <MenuItem value={item._id}>{item.code}</MenuItem>
      ));

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Create Exam</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4 flex items-center justify-center">
          <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}>
            <InputLabel id="demo-select-small-label" required>Test</InputLabel>
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
            
            </FormControl>

            {dbda ? <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}>
            <InputLabel id="demo-select-small-label" required>DBDA Code</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="dbdaId"
              value={dbdacode._id}
              label="Test"
              onChange={getExamData}
            >
              {dbdasmenuItems}
            </Select>
            </FormControl>  : false}
            
            <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
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
          <FormControl size="small" sx={{ display: "inline-flex", width: "50%", paddingRight:"20px"}}>
            <InputLabel id="demo-select-small-label"  required>Timer</InputLabel>
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
            <TextField
              style={styles.equalFields}
              label="Serial"
              name="serial"
              onChange={getExamData}
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
              onChange={getExamData}
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
              onChange={getExamData}
              id="outlined-number"
              size="small"
              required
            />  : false}
          </div>
        </form>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type= "submit" disabled={!typedsection} onClick={handleSubmit} >Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateExam


