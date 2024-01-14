import React, { useEffect,useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createDBDA, showDBDA  } from "../../redux/dbdaSlice";
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
import { getDBDAsCount } from "../../redux/dbdaSlice";
import { useDispatch, useSelector } from "react-redux";

function CreateDBDA(props)  {
  const { onClose, selectedValue, open, examsValues } = props;
  const [dbdas, setDBDAs] = useState({});
  const [typedsection, settypedSections] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if(dbdas.code && dbdas.name) {
      settypedSections(true);
    } else {
      settypedSections(false)
    }
 }, [dbdas]);

  const getDBDAData = (e) => {
    setDBDAs({ ...dbdas, [e.target.name]: e.target.value })
  }

  // const getTestData = (e) => {
  //   setDBDAs({ ...dbdas, [e.target.name]: e.target.value })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createDBDA(dbdas));
    handleClose();
    window.location.reload(); 
  }

  const handleClose = () => {
    setDBDAs({})
    settypedSections(false)
    onClose(selectedValue);
  };

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Create DBDA</DialogTitle>
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
              required
            />
            
            <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="Name"
              name="name"
              value={dbdas.name}
              onChange={getDBDAData}
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
        <Button type= "submit" disabled={!typedsection} onClick={handleSubmit} >Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateDBDA


