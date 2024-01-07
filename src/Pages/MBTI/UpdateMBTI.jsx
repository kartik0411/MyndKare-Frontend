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
import Radio from '@mui/material/Radio';
import Select from "@mui/material/Select";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { createTest, showTest } from "../../redux/testSlice";
import { showDBDA } from "../../redux/dbdaSlice";
import { editMBTI, showMBTI  } from "../../redux/mbtiSlice";

function UpdateExam(props) { 
  const { onClose, selectedValue, open, examsValues } = props;
  const [exam, setExam] = useState({});
  const [mbtis, setMBTIs] = useState({});
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
      setMBTIs(selectedValue);
      settypedSections(false);
    }
  },[selectedValue])


  useEffect(() => {
    if(valueChanged && mbtis.examId && mbtis.name) {
      settypedSections(true);
    } else {
      settypedSections(false)
    }
 }, [mbtis]);

  const getMBTIData = (e) => {
    setvalueChanged(true);
  if(e.target.name === "examId") {
    setExam(e.target.value)
    setMBTIs({ ...mbtis, [e.target.name]: e.target.value._id })
  } else {
    setMBTIs({ ...mbtis, [e.target.name]: e.target.value })
  }
  }

  // const getTestData = (e) => {
  //   setMBTIs({ ...mbtis, [e.target.name]: e.target.value })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editMBTI(mbtis));
    handleClose();
    window.location.reload(); 
  }

  const handleClose = () => {
    setMBTIs(selectedValue);
    settypedSections(false)
    setvalueChanged(false);
    onClose(selectedValue);
  };
  const menuItems = examsValues?.map(item => (
    <MenuItem value={item}>{item.name}</MenuItem>
    ));

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Edit MBTI</DialogTitle>
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
              onChange={getMBTIData}
              // defaultvalue={mbtis.examId}
            >
              {menuItems}
            </Select>
            
            </FormControl>
            
            <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="Response"
              name="name"
              value={mbtis.name}
              onChange={getMBTIData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              // defaultvalue={mbtis.name}
              required
            />
          </div>
          <div className="pt-4 flex items-center justify-center" >
          <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="Output"
              name="output"
              value={mbtis.output}
              onChange={getMBTIData}
              id="outlined-size-small"
              size="small"
              multiline
              // defaultvalue={mbtis.output}
              maxRows={4}
            />
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

export default UpdateExam

