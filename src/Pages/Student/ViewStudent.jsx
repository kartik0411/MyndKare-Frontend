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


function ViewStudent(props)  {
  const { onClose, selectedValue, open } = props;
  const [students, setStudents] = useState({});
  const [dateValue, setDateValue] = useState();
  const [testids, setTestids] = useState([]);
  const [typedsection, settypedSections] = useState(false);
  const [studentChanged, setStudentChanged] = useState(false); 
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
    console.log(JSON.stringify(students));
    if(studentChanged && students.name && students.father && students.school && students.father && students.class && students.section && dateValue) {
      settypedSections(true);
    }
    else {
      settypedSections(false);
    }
  }, [students, dateValue,testids]);

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
  const getStudentData = (e) => {
    setStudentChanged(true);
    setStudents({ ...students, [e.target.name]: e.target.value })
  }  
  const testschanged = (e) => {
    setStudentChanged(true);
    setTestsChanged(true);
    setTestids(e.target.value)
  } 
  

  useEffect(() => {
    if(open==true) {
      console.log(JSON.stringify(selectedValue))
      getStudentTestIds();
      let studentdata = JSON.parse(JSON.stringify(selectedValue));
      let dob = new Date(studentdata.dob);
      console.log("daaate of b "+dob)
      setDateValue(dob);
      studentdata.dob = null;
      setStudents(studentdata);
    }
  }, [open]);

  const getStudentTestIds = async() =>{
    if(selectedValue && selectedValue._id) {
      let studentDetails = await axios.get("/students/"+selectedValue._id);
      setTestids(studentDetails.data.tests);
    }
  }


  const handleSubmit = async (e) => {
    let stud = new Object();
    stud.student = students;
    stud.student.dob = dateValue;
    stud.studentTests = testids;
    stud.testsViewd = testsChanged;
    e.preventDefault();
    await axios.put("/students",stud);
    handleClose();
    window.location.reload(); 
  }

  const handleClose = () => {
    // let studentdata = JSON.parse(JSON.stringify(selectedValue));
    setStudents(null);
    getStudentTestIds([]);
    settypedSections(false);
    setStudentChanged(false);
    onClose(selectedValue);
  };

  const schoolmenuItems = schools.map(item => (
    <MenuItem value={item.name}>{item.name}</MenuItem>
    ));

  const classmenuItems = classes.map(item => (
    <MenuItem value={item.name}>{item.name}</MenuItem>
    ));

  const sectionmenuItems = sections.map(item => (
    <MenuItem value={item.name}>{item.name}</MenuItem>
    ));
  const testmenuItems = tests.map(item => (
    <MenuItem value={item._id}><Checkbox checked={testids.indexOf(item._id) > -1} /> {item.name}</MenuItem>
  ));

  return (
    <>
      {students?.school && schools.length>0 &&
        <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
          <DialogTitle>View Student</DialogTitle>
          <DialogContent>
            <form >
              <div className="pt-4 flex items-center justify-center">
                <TextField sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}
                  fullWidth
                  label="Name"
                  name="name"
                  value={students.name}
                  // onChange={getStudentData}
                  id="outlined-size-small"
                  size="small"
                  multiline
                  maxRows={4}
                  required
                />

                <TextField sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}
                  fullWidth
                  label="Father's Name"
                  name="father"
                  value={students.father}
                  // onChange={getStudentData}
                  id="outlined-size-small"
                  size="small"
                  multiline
                  maxRows={4}
                  required
                />
              </div>
              <div className="pt-4 flex items-center justify-center" >
                <TextField sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }} 
                  fullWidth
                  label="Admission No."
                  name="admsnno"
                  value={students.admsnno}
                  // onChange={getStudentData}
                  id="outlined-size-small"
                  size="small"
                  multiline
                  maxRows={4}
                  required
                />
                <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}>
                  <InputLabel id="demo-select-small-label" required>School</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    name="school"
                    value={students.school}
                    label="School"
                    // onChange={getStudentData}
                    required
                  >
                    {schoolmenuItems}
                  </Select>


                </FormControl>
              </div>
              <div className="pt-4 flex items-center justify-center">
                <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}>
                  <InputLabel id="demo-select-small-label" required>Class</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    name="class"
                    value={students.class}
                    label="Class"
                    // onChange={getStudentData}
                    required
                  >
                    {classmenuItems}
                  </Select>

                </FormControl>
                <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}>
                  <InputLabel id="demo-select-small-label" required>Section</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    name="section"
                    value={students.section}
                    label="Section"
                    // onChange={getStudentData}
                    required
                  >
                    {sectionmenuItems}
                  </Select>

                </FormControl>
              </div>
              <div className="pt-4 flex items-center justify-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateField', 'DateField']} size="small" sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}>
                    <DateField label="Date of Birth"
                      value={dayjs(dateValue)}
                      // onChange={(datevalue) =>   {setStudentChanged(true); setDateValue(datevalue);}}
                      format="DD-MM-YYYY"
                      required 
                      disabled/>
                  </DemoContainer>
                </LocalizationProvider>
                <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight: "20px" }}>
                  <InputLabel id="demo-multiple-checkbox-label">Enabled Tests</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={testids}
                    // onChange={!students.isAssesmentStarted && testschanged}
                    input={<OutlinedInput label="Enabled Tests" />}
                    MenuProps={MenuProps}
                  >
                    {testmenuItems}
                  </Select>
                </FormControl>
              </div>
            </form>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            {/* <Button type="submit" disabled={!typedsection} onClick={handleSubmit} >view</Button> */}
          </DialogActions>
        </Dialog>
      }
    </>
  );
}

export default ViewStudent


