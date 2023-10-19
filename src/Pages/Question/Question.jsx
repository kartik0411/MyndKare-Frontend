import React,{useEffect} from "react";
import { Table } from '../../components/Table'
import QuestionAction from "./QuestionAction"
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CreateQuestion from "./CreateQuestion";
import { useDispatch, useSelector } from "react-redux";
import { showQuestions } from "../../redux/questionSlice";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview } from "@mui/icons-material";
import { deleteQuestion } from "../../redux/questionSlice";
import UpdateQuestion from "./UpdateQuestion";
import CircularProgress from '@mui/material/CircularProgress';

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
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [editFormValues, setEditFormValues] = React.useState([]);
  const dispatch = useDispatch();
  const {questions, loading} = useSelector((state)=>state.app);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "question", headerName: "Question", width: 150, editable: true },
    {
      field: "option1",
      headerName: "Option 1",
      width: 150,
  
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
      width: 150,
    },
    {
      field: "option3",
      headerName: "Option 3",
      type: "number",
      width: 110,
    },
    {
      field: "option4",
      headerName: "Option 4",
      type: "number",
      width: 110,
    },
    {
      field: "option5",
      headerName: "Option 5",
      type: "number",
      width: 110,
    },
  
    {
      field: "comp",
      headerName: "Comp",
      type: "number",
      width: 110,
    },
    {
      field: "answer",
      headerName: "Answer",
      type: "number",
      width: 110,
    },
    {
      field: "exam",
      headerName: "Exam",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      renderCell: (params) => {
        return (
          <Box>
            <Tooltip title="View details">
              <IconButton onClick={() => {}}>
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
                onClick={() => {
                  console.log("delete--------",params,params.row.id)
                  dispatch(deleteQuestion(params.row.id))
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  useEffect(()=>{ 
    dispatch(showQuestions())
  },[])

  const handleCreateOpen = () => {
    setCreateOpen(true);
  };

  const handleEdit = (value ) =>{
    setCreateOpen(false);
    setEditOpen(true);
    setEditFormValues(value)
    console.log(value)
  }

  const handleClose = (value) => {
    setEditOpen(false);
    setCreateOpen(false);
    setSelectedValue(value);
  };

  if(loading){
    return (
      <Box class="mb-40 mt-40 flex items-center justify-center" sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {questions &&
        <div style={styles.containerQuestion}>
        <Typography
          class="text-sky-600 text-4xl pb-4"
          variant="h4"
          gutterBottom
        >
          Questions
        </Typography>

        <div class="pb-4">
          <Button onClick={handleCreateOpen} variant="contained">
            Create Question
          </Button>
        </div>

        <CreateQuestion
          selectedValue={selectedValue}
          open={createOpen}
          onClose={handleClose}
        />

        <UpdateQuestion
          selectedValue={editFormValues}
          open={editOpen}
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
      </div>
}
    </>
  );
}

export default Question