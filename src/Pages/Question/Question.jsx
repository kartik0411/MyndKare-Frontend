import React, { useEffect } from "react";
import { Table } from '../../components/Table'
import QuestionAction from "./QuestionAction"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreateQuestion from "./CreateQuestion";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion, showQuestions } from "../../redux/questionSlice";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview } from "@mui/icons-material";
import { deleteQuestion } from "../../redux/questionSlice";
import UpdateQuestion from "./UpdateQuestion";
import ViewQuestion from "./ViewQuestion";
import DeleteQuestion from "./DeleteQuestion";
import CircularProgress from '@mui/material/CircularProgress';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { read, utils, writeFile } from 'xlsx';
import { createExam, showExam } from "../../redux/examSlice";

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

function Question() {
  const [createOpen, setCreateOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [viewOpen, setViewOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [editFormValues, setEditFormValues] = React.useState([]);
  const dispatch = useDispatch();
  const { questions, loading } = useSelector((state) => {if(state.questionDetail) {
    let questions = JSON.parse(JSON.stringify(state.questionDetail));
    for(let i=0;i<questions.questions.length;i++) {
      if(questions.questions[i].dbdaId) {
        questions.questions[i].answer = questions.questions[i].AnsOrSerial;
      } else {
        questions.questions[i].serial = questions.questions[i].AnsOrSerial;
      }
    questions.questions[i].option1 = questions.questions[i].options[0];
    if(questions.questions[i].options.length>1) {
      questions.questions[i].option2 = questions.questions[i].options[1];
    }
    if(questions.questions[i].options.length>2) {
      questions.questions[i].option3 = questions.questions[i].options[2];
    }
    if(questions.questions[i].options.length>3) {
      questions.questions[i].option4 = questions.questions[i].options[3];
    }
    if(questions.questions[i].options.length>4) {
      questions.questions[i].option5 = questions.questions[i].options[4];
    }
  }
  console.log("questions="+JSON.stringify(questions))
    return questions;
  }});
  let { exams} = useSelector((state) => {
    return state.examDetail;
  })
  exams=exams.filter(item => item.name !== "CIS") 

  const columns = [
    { field: "name", headerName: "Question", width: 170 },
    {
      field: "option1",
      headerName: "Option 1",
      width: 105,

      // renderCell: (params) => (
      //   <div>
      //     <img
      //       src={
      //         "https://www.shutterstock.com/image-photo/man-holding-megaphone-free-samples-260nw-371075918.jpg"
      //       }
      //       alt=""
      //     />
      //     {params.row.option1}
      //   </div>
      // ),
    },
    {
      field: "option2",
      headerName: "Option 2",
      width: 105,
    },
    {
      field: "option3",
      headerName: "Option 3",
      type: "number",
      width: 105,
    },
    {
      field: "option4",
      headerName: "Option 4",
      type: "number",
      width: 105,
    },
    {
      field: "option5",
      headerName: "Option 5",
      type: "number",
      width: 105,
    },
    {
      field: "answer",
      headerName: "Answer(DBDA)",
      type: "number",
      width: 100,
    },
    {
      field: "serial",
      headerName: "Serial(MBTI)",
      type: "number",
      width: 100,
    },
    {
      field: "examName",
      headerName: "Exam",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 140,
      renderCell: (params) => {
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
              <IconButton
                onClick={(e) => {
                  handleDelete(params.row)
                }}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(showQuestions())
    dispatch(showExam())
  }, [])

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const exportToExcel = async () => {
    const worksheet = utils.json_to_sheet(questions);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    writeFile(workbook, 'data.xlsx');
  }

  const uploadQuestion = async () => {
    try {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.xlsx'; // Specify the accepted file type (Excel)
      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const data = new Uint8Array(e.target.result);
              const workbook = read(data, { type: 'array' });
              const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
              const sheet = workbook.Sheets[sheetName];
              const jsonData = utils.sheet_to_json(sheet);
              dispatch(createQuestion(jsonData));
              console.log(jsonData, "yeh aya hai");
              // setGridData(jsonData);
            } catch (error) {
              console.error('Error parsing Excel file:', error);
            }
          };
          reader.readAsArrayBuffer(file);
        }
      });

      fileInput.click();
    } catch (error) {
      console.error('Error uploading question:', error);
    }
  };

  const handleEdit = (value) => {
    setCreateOpen(false);
    setViewOpen(false);
    setEditOpen(true);
    setDeleteOpen(false);
    setEditFormValues(value)
    console.log(value)
  }
  const handleView = (value) => {
    setCreateOpen(false);
    setEditOpen(false);
    setViewOpen(true);
    setDeleteOpen(false);
    setEditFormValues(value)
  }

  const handleDelete = (value) => {
    setCreateOpen(false);
    setEditOpen(false);
    setDeleteOpen(true);
    setEditFormValues(value)
    console.log(value)
  }

  const handleClose = (value) => {
    setEditOpen(false);
    setCreateOpen(false);
    setViewOpen(false);
    setDeleteOpen(false);
    setSelectedValue(value);
  };

  if (loading) {
    return (
      <Box className="mb-40 mt-40 flex items-center justify-center" sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {questions &&
        <div style={styles.containerQuestion}>
          <Typography
            className="text-sky-600 text-4xl pb-2 pl-2"
            variant="h4"
            gutterBottom
          >
            Questions
          </Typography>

          <div className="pb-4">
            <Button className="mx-2" onClick={handleCreateOpen} variant="contained">
              Create Question
            </Button>
            <Button onClick={uploadQuestion} variant="contained">
              Upload Question <FileUploadRoundedIcon />
            </Button>
          </div>

          <CreateQuestion
            selectedValue={selectedValue}
            open={createOpen}
            examValues={exams}
            onClose={handleClose}
          />

          <UpdateQuestion
            selectedValue={editFormValues}
            examValues={exams}
            open={editOpen}
            onClose={handleClose}
          />

          <ViewQuestion
            selectedValue={editFormValues}
            examValues={exams}
            open={viewOpen}
            onClose={handleClose}
          />

          <DeleteQuestion
            selectedValue={editFormValues}
            open={deleteOpen}
            onClose={handleClose}
          />

          <Table
            height={tableOptions.height}
            width={tableOptions.width}
            rows={questions}
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

export default Question