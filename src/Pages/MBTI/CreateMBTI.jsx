import React, { useEffect,useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createMBTI, showMBTI  } from "../../redux/mbtiSlice";
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
import { getMBTIsCount } from "../../redux/mbtiSlice";
import { useDispatch, useSelector } from "react-redux";

function CreateMBTI(props)  {
  const { onClose, selectedValue, open, examsValues } = props;
  const [mbtis, setMBTIs] = useState({});
  const [typedsection, settypedSections] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if(mbtis.examId && mbtis.name) {
      settypedSections(true);
    } else {
      settypedSections(false)
    }
 }, [mbtis]);

  const getMBTIData = (e) => {
    setMBTIs({ ...mbtis, [e.target.name]: e.target.value })
  }

  // const getTestData = (e) => {
  //   setMBTIs({ ...mbtis, [e.target.name]: e.target.value })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMBTI(mbtis));
    handleClose();
    window.location.reload(); 
  }

  const handleClose = () => {
    setMBTIs({})
    settypedSections(false)
    onClose(selectedValue);
  };
  const menuItems = examsValues?.map(item => (
    <MenuItem value={item._id}>{item.name}</MenuItem>
    ));

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Create MBTI</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4 flex items-center justify-center">
          <FormControl size="small" sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}>
            <InputLabel id="demo-select-small-label" required>Exam</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              name="examId"
              value={mbtis.examId}
              label="Exam"
              onChange={getMBTIData}
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

export default CreateMBTI


