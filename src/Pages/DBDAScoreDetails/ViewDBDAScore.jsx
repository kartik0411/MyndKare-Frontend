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
  const [dbdaScores, setDBDAScores] = useState({});
  const [valueChanged, setvalueChanged] = useState(false);
  const [typedsection, settypedSections] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=> {
    console.log("selectedValue"+JSON.stringify(selectedValue));
    if(selectedValue) {
      setDBDAScores(selectedValue);
      settypedSections(false);
    }
  },[selectedValue])


  useEffect(() => {
    if(valueChanged && dbdaScores.code && dbdaScores.name) {
      settypedSections(true);
    } else {
      settypedSections(false)
    }
 }, [dbdaScores]);

  const getDBDAScoreData = (e) => {
    setvalueChanged(true);
    setDBDAScores({ ...dbdaScores, [e.target.name]: e.target.value })
  }

  // const getTestData = (e) => {
  //   setDBDAScores({ ...dbdaScores, [e.target.name]: e.target.value })
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(editDBDAScore(dbdaScores));
    handleClose();
    window.location.reload(); 
  }

  const handleClose = () => {
    setDBDAScores(selectedValue);
    settypedSections(false)
    setvalueChanged(false);
    onClose(selectedValue);
  };

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>View DBDAScore</DialogTitle>
      <DialogContent>
        <form >
          <div className="pt-4 flex items-center justify-center">
          <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="DBDA"
              name="dbda"
              value={dbdaScores.dbda}
              // onChange={getDBDAScoreData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              // defaultvalue={dbdaScores.name}
              required
            />
            
            <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="Score"
              name="score"
              value={dbdaScores.score}
              // onChange={getDBDAScoreData}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              // defaultvalue={dbdaScores.name}
              required
            />
          </div>
          <div className="pt-4 flex items-center justify-center" >
            <TextField sx={{ display: "inline-flex", width: "100%", paddingRight:"20px"}}
              fullWidth
              label="Detail"
              name="detail"
              value={dbdaScores.detail} 
              // onChange={getDBDAScoreData}
              id="outlined-size-small"
              multiline
              maxRows={4}
              // defaultvalue={dbdaScores.name}
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

