import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { editStudent, showStudent } from "../../redux/studentSlice";
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
import { showClass } from "../../redux/classSlice";
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
import { Table } from '../../components/Table'
import { Box, IconButton, Tooltip } from "@mui/material";
import Download from '@mui/icons-material/Download';


function StudentTests(props) {
    const { onClose, selectedValue, open } = props;
    const [students, setStudents] = useState({});
    const [studentTests, setStudentTests] = useState([]);
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
    const tableOptions = {
        height: "auto",
        width: "100%",
        initialState: {
            pagination: {
                paginationModel: {
                    pageSize: 10,
                },
            },
        },
        pageSizeOptions: [5, 10, 25],
        checkboxSelection: false,
        disableSelectionOnClick: true,
    };
    useEffect(() => {
        console.log(JSON.stringify(selectedValue))
        getData();

    }, []);

    const getData = async () => {
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
        if (studentChanged && students.name && students.father && students.school && students.father && students.class && students.section && dateValue) {
            settypedSections(true);
        }
        else {
            settypedSections(false);
        }
    }, [students, dateValue, testids]);

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
        console.log(JSON.stringify(selectedValue))
        getStudentTestIds();
        // let dob = new Date(studentdata.dob);
        // console.log("daaate of b "+dob)
        // setDateValue(dob);
        // studentdata.dob = null;
        // setStudents(studentdata);
    }, [selectedValue]);

    const getStudentTestIds = async () => {
        if (selectedValue && selectedValue._id) {
            let studentdata = await axios.get("/studentExams/" + selectedValue._id)
            setStudents(studentdata.data);
            let studentTests = await axios.get("/getReportStatus/"+selectedValue._id);
            setStudentTests(studentTests.data);
        }
    }


    const handleSubmit = async (e) => {
        let stud = new Object();
        stud.student = students;
        stud.student.dob = dateValue;
        stud.studentTests = testids;
        stud.testsUpdated = testsChanged;
        e.preventDefault();
        await axios.put("/students", stud);
        handleClose();
        window.location.reload();
    }

    const handleClose = () => {
        // let studentdata = JSON.parse(JSON.stringify(selectedValue));
        // setStudents(studentdata);
        // getStudentTestIds();
        // settypedSections(false);
        // setStudentChanged(false);
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

    const examsColumns = [
        {
            field: "studentName",
            headerName: "Student",
            flex: 1
        },
        {
            field: "examName",
            headerName: "Exam",
            flex: 1
        },
        {
            field: "startTime",
            headerName: "Start Time",
            flex: 1
        },
        {
            field: "endTime",
            headerName: "End Time",
            flex: 1
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            flex: 1,
            renderCell: (params) => {
                if (params.row.status === "In Progress") {
                    return (
                        <Box display="flex" spacing={2} justifyContent="space-between">
                            <Button size="small" variant="contained" style={{
                                backgroundColor: "#FFA500"
                            }} onClick={(e) => {
                                // handleEdit(params.row)
                            }}>
                                Finish
                            </Button>
                            <Button size="small" variant="contained" color="error" onClick={(e) => {
                                // handleEdit(params.row)
                            }}>
                                Restart
                            </Button>
                        </Box>
                    );
                } else if (params.row.status === "Finished") {
                    return (
                        <Box display="flex" spacing={2} justifyContent="space-between">
                            <Button size="small" variant="contained"  onClick={(e) => {
                                // handleEdit(params.row)
                            }} disabled>
                                Finish
                            </Button>
                            <Button size="small" variant="contained" color="error" onClick={(e) => {
                                // handleEdit(params.row)
                            }}>
                                Restart
                            </Button>
                        </Box>
                    );
                } else {
                    return (
                        <Box display="flex" spacing={2} justifyContent="space-between">
                            <Button size="small" variant="contained" onClick={(e) => {
                                // handleEdit(params.row)
                            }} disabled>
                                Finish
                            </Button>
                            <Button size="small" variant="contained" onClick={(e) => {
                                // handleEdit(params.row)
                            }} disabled>
                                Restart
                            </Button>
                        </Box>
                    );
                }
            }
        }
    ]

    const testsColumns = [
        {
            field: "studentName",
            headerName: "Student",
            flex: 1
        },
        {
            field: "name",
            headerName: "Test",
            flex: 1
        },
        {
            field: "completedFlag",
            headerName: "Status",
            flex: 1
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            flex: 1,
            renderCell: (params) => {
                if (params.row.completedFlag === "Completed") {
                    return (
                        <Box display="flex" spacing={2} justifyContent="space-between">
                            <Button size="small" variant="contained" style={{
                                backgroundColor: "#8F00FF"
                            }} startIcon={<Download />} onClick={(e) => {
                                // handleEdit(params.row)
                            }}>
                                Download Report
                            </Button>
                        </Box>
                    );
                } else {
                    return (
                        <Box display="flex" spacing={2} justifyContent="space-between">
                            <Button size="small" variant="contained" startIcon={<Download />} disabled>
                                Download Report
                            </Button>
                        </Box>
                    );
                }
            }
        }
    ]

    return (
        <>
            {students?.school && studentTests.length>0 && 
                <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
                    <DialogTitle>Student Exams</DialogTitle>
                    <DialogContent>
                        <Table
                            height={tableOptions.height}
                            width={tableOptions.width}
                            rows={students.studentExams}
                            columns={examsColumns}
                            initialState={tableOptions.initialState}
                            pageSizeOptions={tableOptions.pageSizeOptions}
                            checkboxSelection={tableOptions.checkboxSelection}
                            disableSelectionOnClick={tableOptions.disableSelectionOnClick}
                        />

                    </DialogContent>
                    <DialogTitle>Student Tests</DialogTitle>
                    <DialogContent>
                        <Table
                            height={tableOptions.height}
                            width={tableOptions.width}
                            rows={studentTests}
                            columns={testsColumns}
                            initialState={tableOptions.initialState}
                            pageSizeOptions={tableOptions.pageSizeOptions}
                            checkboxSelection={tableOptions.checkboxSelection}
                            disableSelectionOnClick={tableOptions.disableSelectionOnClick}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        {/* <Button type="submit" disabled={!typedsection} onClick={handleSubmit} >Update</Button> */}
                    </DialogActions>
                </Dialog>
                
            }
        </>
    );
}

export default StudentTests


