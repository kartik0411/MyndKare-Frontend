import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Padding } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { editSchoolResult } from "../../redux/schoolResultSlice";
import { FormGroup } from "@mui/material";
import axios from "../../axiosConfig";

function UpdateSchoolResult(props) {
  const { onClose, selectedValue, open } = props;
  let ok = {key:selectedValue.id,value:selectedValue.school}
  const [inputs, setInputs] = useState({});
  const [typedschool, settypedSchools] = useState(false);
  const { schools } = useSelector((state) => state.schoolDetail);
  console.log(schools)
  const dispatch = useDispatch();
  
  console.log(ok)
  console.log(selectedValue)
  useEffect(() => {
    if (selectedValue) {
      setInputs(selectedValue);
    }
  }, [selectedValue])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put("/schools",inputs);
    handleClose();
    window.location.reload();

  }

  const handleClose = () => {
    settypedSchools({typedschool: false});
    onClose(selectedValue);
  };

  const updatedSchoolResult = (e) => {
    let rpvalue = true;
    if(e.target.value === "off") {
      rpvalue = false;
    }
    // console.log("e hai :"+JSON.stringify(e.target))
    setInputs({ ...inputs, [e.target.name]: rpvalue })
    settypedSchools({typedschool: true});
  }

  return (
    <Dialog fullWidth maxWidth="md" onClose={handleClose} open={open}>
      <DialogTitle>Edit Studentresult</DialogTitle>
      <DialogContent>
      <form>
          <div className="pt-4">
          <TextField
              fullWidth
              label="Name"
              name="name"
              value={inputs && inputs.name}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              // onChange={updatedQuestion}
            />
          </div>
          <div className="pt-4">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                  name="resultPublish"
                  checked= {inputs  && inputs.resultPublish}
                    onChange={updatedSchoolResult}
                  />
                }
                label="Publish result"
              />
            </FormGroup>
          </div>
        </form>

        {/* <form >
          <div className="pt-4">
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={updateSchoolResult.result_publish && updateSchoolResult.result_publish}
              id="outlined-size-small"
              size="small"
              multiline
              maxRows={4}
              onChange={updatedSchoolResult}
            />
          </div>
        </form> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!typedschool.typedschool}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateSchoolResult;

