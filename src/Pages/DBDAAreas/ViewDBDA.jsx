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
  const { onClose, selectedValue, open, examsValues } = props;
  const [exam, setExam] = useState({});
  const [dbdas, setDBDAs] = useState({});
  const [valueChanged, setvalueChanged] = useState(false);
  const [typedsection, settypedSections] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=> {
    console.log("selectedValue"+JSON.stringify(selectedValue));
    if(selectedValue) {
      for(let i=0;i<examsValues.length;i++) {
        if(selectedValue?.examId === examsValues[i]._id) {
          setExam(examsValues[i]);
        }
      }
      setDBDAs(selectedValue);
      settypedSections(false);
    }
  },[selectedValue])


  useEffect(() => {
    if(valueChanged && dbdas.examId && dbdas.name) {
      settypedSections(true);
    } else {
      settypedSections(false)
    }
 }, [dbdas]);

  const getDBDAData = (e) => {
    setvalueChanged(true);
  if(e.target.name === "examId") {
    setExam(e.target.value)
    setDBDAs({ ...dbdas, [e.target.name]: e.target.value._id })
  } else {
    setDBDAs({ ...dbdas, [e.target.name]: e.target.value })
  }
  }

  // const getTestData = (e) => {
  //   setDBDAs({ ...dbdas, [e.target.name]: e.target.value })
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(editDBDA(dbdas));
  //   handleClose();
  //   window.location.reload(); 
  // }

  const handleClose = () => {
    setDBDAs(selectedValue);
    settypedSections(false)
    setvalueChanged(false);
    onClose(selectedValue);
  };
  const menuItems = examsValues?.map(item => (
    <MenuItem value={item}>{item.name}</MenuItem>
    ));

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>View DBDA</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4 flex items-center justify-center">
          <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}>
            <InputLabel id="demo-select-small-label" required>Exam</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="examId"
              value={exam}
              label="Exam"
              // onChange={getDBDAData}
              // defaultvalue={dbdas.examId}
            >
              {menuItems}
            </Select>
            
            </FormControl>
            
            <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="Response"
              name="name"
              value={dbdas.name}
              // onChange={getDBDAData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              // defaultvalue={dbdas.name}
              required
            />
          </div>
          <div className="pt-4 flex items-center justify-center" >
          <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="Output"
              name="output"
              value={dbdas.output}
              // onChange={getDBDAData}
              id="outlined-size-small"
              size="small"
              multiline
              // defaultvalue={dbdas.output}
              maxRows={4}
            />
          </div>
        </form>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        {/* <Button type= "submit" disabled={!typedsection} onClick={handleSubmit} >Save</Button> */}
      </DialogActions>
    </Dialog>
  );
}

export default ViewExam

