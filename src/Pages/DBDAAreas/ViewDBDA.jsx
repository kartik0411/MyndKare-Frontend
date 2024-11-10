import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Padding } from "@mui/icons-material";
import { useDispatch } from "react-redux";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(editDBDA(dbdas));
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
      <DialogTitle>View DBDA</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4 flex items-center justify-center">
          <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="Code"
              name="code"
              value={dbdas.code}
              // onChange={getDBDAData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              // defaultvalue={dbdas.name}
              required
            />
            
            <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="Name"
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
          <div className="pt-4 flex items-center justify-center">
            <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="Detail"
              name="detail"
              value={dbdas.detail}
              // onChange={getDBDAData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              // defaultvalue={dbdas.name}
            />
          </div>
        </form>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewExam

