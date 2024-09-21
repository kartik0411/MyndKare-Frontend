import React, { useEffect,useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { editStudent, showStudent  } from "../../redux/studentSlice";
import Radio from '@mui/material/Radio';
import Select from "@mui/material/Select";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { computeSlots } from "@mui/x-data-grid/internals";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { showSchool } from "../../redux/schoolSlice";
import {showClass } from "../../redux/classSlice";
import { showSection } from "../../redux/sectionSlice";
import { showDBDA } from "../../redux/dbdaSlice";
import { getStudentsCount } from "../../redux/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { DateField } from '@mui/x-date-pickers/DateField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { showTest } from "../../redux/testSlice";
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import axios from "../../axiosConfig";


function EditFeedback(props)  {
  const { onClose, selectedValue, open } = props;
  const [students, setStudents] = useState({});
  const [dateValue, setDateValue] = useState();
  const [one, setone] = useState();
  const [two, settwo] = useState();
  const [three, setthree] = useState();
  const [four, setfour] = useState();
  const [five, setfive] = useState();
  const [six, setsix] = useState();
  const [seven, setseven] = useState();
  const [testids, setTestids] = useState([]);
  const [typedsection, settypedSections] = useState(false);
  const [feedbackChanged, setFeedbackChanged] = useState(false); 
  const [testsChanged, setTestsChanged] = useState(false);
  const dispatch = useDispatch();
  let [schools, setSchools] = useState([]);
  let [classes, setClasses] = useState([]);
  let [sections, setSections] = useState([]);
  let [tests, setTests] = useState([]);
  // useEffect(() => {
  //   let testiids =  tests.map(function(i) {
  //     return i._id;
  // })
  //   setTestids(testiids);
  // }, [tests]);

  // useEffect(() => { 
  //   setStudents({ ...students, dob: dateValue, resultPublish: false, counsellorId: "6558ac9039d0ba5397e75965", feedbackFlag: false, finalReportFlag: false, isAssesmentStarted: false })
  // }, [dateValue]);

  useEffect(() => {
    console.log(JSON.stringify(selectedValue))
    getData();

  }, []);

  const getData = async() =>{
    let classesToPopulate = await axios.get("/classes");
    setClasses(classesToPopulate.data);
    let schoolsToPopulate = await axios.get("/schools");
    setSchools(schoolsToPopulate.data);
    let sectionsToPopulate = await axios.get("/sections");
    setSections(sectionsToPopulate.data);
    let testsToPopulate = await axios.get("/tests");
    setTests(testsToPopulate.data);
    }

  useEffect(() => {
    if(feedbackChanged==true && one && one!="" && two && two!="" && three && three!="" && four && four!="" && five && five!="" && six && six!="" && seven && seven!="" ) {
      settypedSections(true);
    }
    else {
      settypedSections(false);
    }
  }, [one,two,three,four, five, six, seven]);

  const styles = {
    equalFields: {
      width: "50%",
      paddingRight: "15px",
    },
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  

  useEffect(() => {
    settypedSections(false);
    if(selectedValue?.feedbackFlag==true) {
        getStudentFeedbacks();
    } else {
        setone("");
        settwo("");
        setthree("");
        setfour("");
        setfive("");
        setsix("");
        setseven("");
    }
  }, [selectedValue]);

  const getStudentFeedbacks = async() =>{
    if(selectedValue && selectedValue._id) {
      let studentfeedbacks = await axios.get("/feedback/"+selectedValue._id);
      setone(studentfeedbacks?.data?.feedbacks[0]);
      settwo(studentfeedbacks?.data?.feedbacks[1]);
      setthree(studentfeedbacks?.data?.feedbacks[2]);
      setfour(studentfeedbacks?.data?.feedbacks[3]);
      setfive(studentfeedbacks?.data?.feedbacks[4]);
      setsix(studentfeedbacks?.data?.feedbacks[5]);
      setseven(studentfeedbacks?.data?.feedbacks[6]);
    }
  }


  const handleSubmit = async (e) => {
    let feed = new Object();
    let feedbacks = [];
    feedbacks.push(one);
    feedbacks.push(two);
    feedbacks.push(three);
    feedbacks.push(four);
    feedbacks.push(five);
    feedbacks.push(six);
    feedbacks.push(seven);
    feed.feedbacks = feedbacks;
    feed._id = selectedValue._id;
    e.preventDefault();
    await axios.put("/feedback",feed);
    await handleClose();
    window.location.reload(); 
  }

  const handleClose = async ()  => {
    // setone();
    // settwo();
    // setthree();
    // setfour();
    // setfive();
    // setsix();
    // setseven();
    settypedSections(false);
    setFeedbackChanged(false);
    onClose(selectedValue);
  };


  return (
    <>
      {((selectedValue?.feedbackFlag==false) || (selectedValue?.feedbackFlag==true && seven))  &&
        <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
          <DialogTitle>Counseller Feedback</DialogTitle>
          <DialogContent>
            <form >
              <div className="pt-4 flex items-center justify-center">
                <TextField sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}
                  fullWidth
                  label="Student Name"
                  name="name"
                  value={selectedValue.name}
                //   onChange={getStudentData}
                  id="outlined-size-small"
                  size="small"
                  multiline
                  maxRows={4}
                  required
                  disabled
                />
              </div>
              <div className="pt-4 flex items-center justify-center">
                <TextField sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}
                  fullWidth
                  label="Academic"
                  name="name"
                  value={one}
                  onChange={(value) =>   {setFeedbackChanged(true); setone(value.target.value); }}
                  id="outlined-size-small"
                  size="small"
                  multiline
                  maxRows={4}
                  required
                />
              </div>
              <div className="pt-4 flex items-center justify-center">
                <TextField sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}
                  fullWidth
                  label="Personal Interaction Child"
                  name="name"
                  value={two}
                  onChange={(value) =>   { setFeedbackChanged(true); settwo(value.target.value); }}
                  id="outlined-size-small"
                  size="small"
                  multiline
                  maxRows={4}
                  required
                />
              </div>
              <div className="pt-4 flex items-center justify-center">
                <TextField sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}
                  fullWidth
                  label="Personal Interactions Parents"
                  name="name"
                  value={three}
                  onChange={(value) =>   {setFeedbackChanged(true); setthree(value.target.value); }}
                  id="outlined-size-small"
                  size="small"
                  multiline
                  maxRows={4}
                  required
                />
              </div>
              <div className="pt-4 flex items-center justify-center">
                <TextField sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}
                  fullWidth
                  label="Suggested Career or Stream Option-1"
                  name="name"
                  value={four}
                  onChange={(value) =>   {setFeedbackChanged(true); setfour(value.target.value); }}
                  id="outlined-size-small"
                  size="small"
                  multiline
                  maxRows={4}
                  required
                />
              </div>
              <div className="pt-4 flex items-center justify-center">
                <TextField sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}
                  fullWidth
                  label="Suggested Career or Stream Option-2"
                  name="name"
                  value={five}
                  onChange={(value) =>   {setFeedbackChanged(true); setfive(value.target.value); }}
                  id="outlined-size-small"
                  size="small"
                  multiline
                  maxRows={4}
                  required
                />
              </div>
              <div className="pt-4 flex items-center justify-center">
                <TextField sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}
                  fullWidth
                  label="Counseller Remarks"
                  name="name"
                  value={six}
                  onChange={(value) =>   {setFeedbackChanged(true); setsix(value.target.value); }}
                  id="outlined-size-small"
                  size="small"
                  multiline
                  maxRows={4}
                  required
                />
              </div>
              <div className="pt-4 flex items-center justify-center">
                <TextField sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}
                  fullWidth
                  label="Counseller Name"
                  name="name"
                  value={seven}
                  onChange={(value) =>   {setFeedbackChanged(true); setseven(value.target.value); }}
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
            <Button type="submit" disabled={!typedsection} onClick={handleSubmit} >Save</Button>
          </DialogActions>
        </Dialog>
      }
    </>
  );
}

export default EditFeedback


