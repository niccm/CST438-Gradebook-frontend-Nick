import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

function AddAssignment(props) { 
 const [assignment, setAssignment] = useState({});
 const [message, setMessage] = useState('');

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
}

const handleClose = () => {
  props.onClose();  
  setOpen(false);
}

  const saveAssignment = ( ) => {
    setMessage(''); 
    console.log("Assignment.save ");     
    fetch(`${SERVER_URL}/assignment` , 
        {  
          method: 'POST', 
          headers: { 'Content-Type': 'application/json', }, 
          body: JSON.stringify( assignment )
        } )
    .then(res => {
        if (res.ok) {
          
          setMessage("Assignment saved.");
        } else {
          setMessage("Save error. "+res.status);
          console.error('Save Assignment error =' + res.status);
    }})
      .catch(err => {
          setMessage("Exception. "+err);
          console.error('Save Assignment exception =' + err);
       });
  };    

  const editChange = (event) => {
    setAssignment({...assignment,  [event.target.name]:event.target.value})
}
// post instead of put 
// where put is a specified id post will say /assignment
// leave off value = 
// course id text field
  return (
      <div>
      <button id = "addButton" onClick={handleOpen}>Add</button>
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
      <div>
      <h3>Assignment Add</h3>
      </div>
      <div margin="auto" >
      <TextField autoFocus fullWidth label="Name" name= "assignmentName"  onChange={editChange}/>
      <TextField autoFocus fullWidth label="DueDate" name="dueDate" onChange={editChange}/> 
      <TextField autoFocus fullWidth label="Course Id" name="courseId" onChange={editChange}/> 
      </div>
    </DialogContent>
    <DialogActions>
    <Button id="closeButton" onClick={handleClose}>Close</Button>
    <Button id="saveButton" onClick={saveAssignment}>Add</Button>
    </DialogActions>
    </Dialog>
      </div>
  ); 
}
export default AddAssignment;