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
import { editDBDA} from "../../redux/dbdaSlice";
import axios from "../../axiosConfig";

function UpdateExam(props) { 
  const { onClose, selectedValue, open, examsValues } = props;
  const [exam, setExam] = useState({});
  const [dbdas, setDBDAs] = useState({});
  const [valueChanged, setvalueChanged] = useState(false);
  const [typedsection, settypedSections] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=> {
    console.log("selectedValue"+JSON.stringify(selectedValue));
    if(selectedValue) {
      setDBDAs(selectedValue);
      settypedSections(false);
    }
  },[selectedValue])


  useEffect(() => {
    if(valueChanged && dbdas.code && dbdas.name) {
      settypedSections(true);
    } else {
      settypedSections(false)
    }
 }, [dbdas]);

  const getDBDAData = (e) => {
    setvalueChanged(true);
    setDBDAs({ ...dbdas, [e.target.name]: e.target.value })
  }

  // const getTestData = (e) => {
  //   setDBDAs({ ...dbdas, [e.target.name]: e.target.value })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put("/dbda",dbdas);
    handleClose();
    window.location.reload(); 
  }

  const handleClose = () => {
    setDBDAs(selectedValue);
    settypedSections(false)
    setvalueChanged(false);
    onClose(selectedValue);
  };

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Edit DBDA</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4 flex items-center justify-center">
          <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="Code"
              name="code"
              value={dbdas.code}
              onChange={getDBDAData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              // defaultvalue={dbdas.name}
              required
            />
            
            <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="Response"
              name="name"
              value={dbdas.name}
              onChange={getDBDAData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              // defaultvalue={dbdas.name}
              required
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

