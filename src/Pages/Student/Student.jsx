import React, { useEffect,useState } from "react";
import { Table } from '../../components/Table'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"; 
import { useDispatch, useSelector } from "react-redux";
import { createStudent, showStudent } from "../../redux/studentSlice";
import { Box, IconButton, Tooltip} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Delete, Edit, Preview} from "@mui/icons-material";
import AssessmentIcon from '@mui/icons-material/Assessment';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert"; 
import { deleteStudent } from "../../redux/studentSlice";
import CircularProgress from '@mui/material/CircularProgress';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { read, utils, writeFile } from 'xlsx';
import UpdateStudent from "./UpdateStudent";
import ViewStudent from "./ViewStudent";
import CreateStudent from "./CreateStudent";
import StudentTest from "./StudentTest";
import DeleteStudent from "./DeleteStudent";
import { createTest, showTest } from "../../redux/testSlice";
import { showDBDA } from "../../redux/dbdaSlice";
import { red, yellow, green } from '@mui/material/colors';
import axios from "../../axiosConfig";
import MenuItem from "@mui/material/MenuItem";

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

const styles = {
  containerQuestion: {
    padding: "20px 50px 50px 50px",
  },
};

function Student() {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [studenttestOpen, setstudenttestOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  // const [snackOpen, setSnackOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [editFormValues, setEditFormValues] = React.useState([]);
  const dispatch = useDispatch();
  let [schoolsmenuItems, setSchoolsmenuItems] = useState([]);
  let [classesmenuItems, setClassesmenuItems] = useState([]);
  let [sectionsmenuItems, setSectionsmenuItems] = useState([]);
  const { students, loading, error } = useSelector((state) => {
    return state.studentDetail;
    // }
  });
  let { tests} = useSelector((state) => { 
    // let testobject = state.testDetail
    // if(state.testDetail && state.testDetail.tests && state.testDetail.tests.length>0 && state.testDetail.tests[state.testDetail.tests.length-1]._id == null) {
    //   let newtestobject = JSON.parse(JSON.stringify(testobject));
    //   newtestobject.tests.pop();s
    //   return newtestobject;
    // }
    // else {
    return state.testDetail;
    // }
  });
  

  let { dbdas} = useSelector((state) => {
    return state.dbdaDetail; 
  });
    console.log(students)
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1
    },
    {
      field: "father",
      headerName: "Father's Name",
      flex: 1
    },
    {
      field: "admsnno",
      headerName: "Admission no",
      flex: 1
    },
    {
      field: "school",
      headerName: "School",
      flex: 1
    },
    {
      field: "class",
      headerName: "School Class",
      flex: 1
    },
    {
      field: "section",
      headerName: "Section",
      flex: 1 
    },
    {
      field: "_id",
      headerName: "Exam Key",
      flex: 2 
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      renderCell: (params) => {
        if(params.row.isAssesmentStarted===false) {
        return (
          <Box>
            <Tooltip title="View details">
              <IconButton onClick={(e) => { 
                handleView(params.row)
              }}>
                <Preview />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit details">
              <IconButton onClick={(e) => {
                handleEdit(params.row)
              }}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete details">
            <IconButton onClick={(e) => {
                handleDelete(params.row)
              }}>
                <Delete  />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Tests Status">
            <IconButton onClick={(e) => {
              }}>
                <DashboardIcon  sx={{ color: red[100] }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Feedback">
            <IconButton onClick={(e) => {
              }}>
                <RateReviewIcon    sx={{ color: red[100] }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Final Report">
            <IconButton onClick={(e) => {
              }}>
                <AssessmentIcon    sx={{ color: red[100] }} />
              </IconButton>
            </Tooltip>
          </Box>
        );
            }
            else if(params.row.finalReportFlag===false) {
              return (
                <Box>
                <Tooltip title="View details">
                  <IconButton onClick={(e) => { 
                    handleView(params.row)
                  }}>
                    <Preview />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit details">
                  <IconButton onClick={(e) => {
                    handleEdit(params.row)
                  }}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete details">
                <IconButton onClick={(e) => {
                    handleDelete(params.row)
                  }}>
                    <Delete  />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Tests Status">
                <IconButton onClick={(e) => {
                                      handlestudenttest(params.row)
                  }}>
                    <DashboardIcon sx={{ color: yellow[700] }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Feedback">
                <IconButton onClick={(e) => {
                  }}>
                    <RateReviewIcon  sx={{ color: red[100] }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Final Report">
                <IconButton onClick={(e) => {
                  }}>
                    <AssessmentIcon  sx={{ color: red[100] }}/>
                  </IconButton>
                </Tooltip>
              </Box>
            );
            }
            else if(params.row.feedbackFlag===false) {
              return (
                <Box>
                <Tooltip title="View details">
                  <IconButton onClick={(e) => { 
                    handleView(params.row)
                  }}>
                    <Preview />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit details">
                  <IconButton onClick={(e) => {
                    handleEdit(params.row)
                  }}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete details">
                <IconButton onClick={(e) => {
                    handleDelete(params.row)
                  }}>
                    <Delete  />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Tests Status">
                <IconButton onClick={(e) => {
                                      handlestudenttest(params.row)
                  }}>
                    <DashboardIcon color="success" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Feedback">
                <IconButton onClick={(e) => {
                  handleDelete(params.row)
                  }}>
                    <RateReviewIcon sx={{ color: yellow[700] }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Final Report">
                <IconButton onClick={(e) => {
                  handleDelete(params.row)
                  }}>
                    <AssessmentIcon  sx={{ color: yellow[700] }}/>
                  </IconButton>
                </Tooltip>
              </Box>
            );
            } 
            else if(params.row.resultPublish===false) {
              return (
                <Box>
                <Tooltip title="View details">
                  <IconButton onClick={(e) => { 
                    handleView(params.row)
                  }}>
                    <Preview />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit details">
                  <IconButton onClick={(e) => {
                    handleEdit(params.row)
                  }}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete details">
                <IconButton onClick={(e) => {
                    handleDelete(params.row)
                  }}>
                    <Delete  />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Tests Status">
                <IconButton onClick={(e) => {
                                      handlestudenttest(params.row)
                  }}>
                    <DashboardIcon color="success" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Feedback">
                <IconButton onClick={(e) => {
                  handleDelete(params.row)
                  }}>
                    <RateReviewIcon color="success" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Final Report">
                <IconButton onClick={(e) => {
                  handleDelete(params.row)
                  }}>
                    <AssessmentIcon  sx={{ color: yellow[700] }}/>
                  </IconButton>
                </Tooltip>
              </Box>
            );
            } else {
              return (
                <Box>
                <Tooltip title="View details">
                  <IconButton onClick={(e) => { 
                    handleView(params.row)
                  }}>
                    <Preview />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit details">
                  <IconButton onClick={(e) => {
                    handleEdit(params.row)
                  }}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete details">
                <IconButton onClick={(e) => {
                    handleDelete(params.row)
                  }}>
                    <Delete  />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Tests Status">
                <IconButton onClick={(e) => {
                                      handlestudenttest(params.row)
                  }}>
                    <DashboardIcon color="success" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Feedback">
                <IconButton onClick={(e) => {
                  handleDelete(params.row)
                  }}>
                    <RateReviewIcon color="success" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Final Report">
                <IconButton onClick={(e) => {
                  handleDelete(params.row)
                  }}>
                    <AssessmentIcon color="success"/>
                  </IconButton>
                </Tooltip>
              </Box>
            );
            }
      },
    },
  ];

  const getData = async() =>{
    let classesToPopulate = await axios.get("/classes");
    let schoolsToPopulate = await axios.get("/schools");
    let sectionsToPopulate = await axios.get("/sections");
    console.log("data hoe gaya set")
    const schools = schoolsToPopulate.data.map(item => (
      <MenuItem value={item.name}>{item.name}</MenuItem>
    ));
    setSchoolsmenuItems(schools);
    const classes = classesToPopulate.data.map(item => (
      <MenuItem value={item.name}>{item.name}</MenuItem>
    ));
    setClassesmenuItems(classes);
    const sections = sectionsToPopulate.data.map(item => (
      <MenuItem value={item.name}>{item.name}</MenuItem>
    ));
    setSectionsmenuItems(sections);
    }

  useEffect(() => {
    dispatch(showStudent())
    dispatch(showTest())
    dispatch(showDBDA())
    getData();
    console.log(students)
  }, [])
  console.log(students)
  const handleCreateOpen = () => { 
    setCreateOpen(true);
  };


  const exportToExcel = async () => {
    const worksheet = utils.json_to_sheet(students);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    writeFile(workbook, 'data.xlsx');
  }

  const handleEdit = (value) => {
    setCreateOpen(false);
    setEditOpen(true);
    setEditFormValues(value)
    console.log(value)
  }

  const handleDelete = (value) => {
    setCreateOpen(false);
    setEditOpen(false);
    setDeleteOpen(true);
    setEditFormValues(value)
    console.log(value)
  }

  const handlestudenttest = (value) => {
    setCreateOpen(false);
    setEditOpen(false);
    setDeleteOpen(false);
    setstudenttestOpen(true);
    setEditFormValues(value)
    console.log(value)
  }

  const handleView = (value) => {
    setCreateOpen(false);
    setEditOpen(false);
    setViewOpen(true);
    setEditFormValues(value)
    console.log(value)
  }
  // const handleSnackbarOpen = () => {
  //   console.log("dekhte hain")
  //   setCreateOpen(false);
  //   setEditOpen(false);
    // setSnackOpen(true);
  // }

  const handleClose = (value) => {
    setEditOpen(false);
    setCreateOpen(false);
    setViewOpen(false);
    setDeleteOpen(false);
    setstudenttestOpen(false);
    // if(snackOpen) {
    //   console.log("ye kaise aa skta")
    //   window.location.reload();
    // }
    // setSnackOpen(false);
    setSelectedValue(value);
  };

  // const snackaction = (
  //   <React.Fragment>
  //     <Button color="secondary" size="small" onClick={handleClose}>
  //       OK
  //     </Button>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );

  if (loading) {
    return (
      <Box className="mb-40 mt-40 flex items-center justify-center" sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  if(error) {
    setTimeout(window.location.reload.bind(window.location), 2000);
    return (
    // <Snackbar
    //   open={setSnackOpen(true)}
    //   autoHideDuration={6000}
    //   onClose={handleClose}
    //   message="Cannot add Duplicate Names"
    //   action={snackaction}
    // />
    <Alert variant="filled" severity="error">
    Cannot add Duplicate Student Names
  </Alert>
    );
  }

  return (
    <>
      {students &&
        <div style={styles.containerQuestion}>
          <Typography
            className="text-sky-600 text-4xl pb-2 pl-2"
            variant="h4"
            gutterBottom
          >
            Students
          </Typography>

          <div className="pb-4">
            <Button className="mx-2" onClick={handleCreateOpen} variant="contained">
              Create Student
            </Button>
          </div>

          <CreateStudent
            selectedValue={selectedValue}
            open={createOpen}
            onClose={handleClose}
          />

          <UpdateStudent
            selectedValue={editFormValues}
            open={editOpen}
            testsValues={tests}
            dbdasValues={dbdas}
            onClose={handleClose}
            schools={schoolsmenuItems}
            classes={classesmenuItems}
            sections={sectionsmenuItems}
            tests={tests}
          />
          <ViewStudent
            selectedValue={editFormValues}
            open={viewOpen}
            testsValues={tests}
            dbdasValues={dbdas}
            onClose={handleClose}
          />
          <StudentTest
            selectedValue={editFormValues}
            open={studenttestOpen}
            onClose={handleClose}
          />
          <DeleteStudent
            selectedValue={editFormValues}
            open={deleteOpen}
            onClose={handleClose}
          />

          <Table
            height={tableOptions.height}
            width={tableOptions.width}
            rows={students}
            columns={columns}
            initialState={tableOptions.initialState}
            pageSizeOptions={tableOptions.pageSizeOptions}
            checkboxSelection={tableOptions.checkboxSelection}
            disableSelectionOnClick={tableOptions.disableSelectionOnClick}
          />
          <div className="flex justify-end">
            <Button className="my-2" onClick={exportToExcel} variant="contained">
              Download <DownloadRoundedIcon />
            </Button>
          </div>
        </div>
      }
    </>
  );
}

export default Student;
