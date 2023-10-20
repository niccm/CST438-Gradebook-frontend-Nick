import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


function EditAssignment(props) { 
  const [assignment, setAssignment] = useState(props.assignment)
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
    fetch(`${SERVER_URL}/assignment/${assignment.id}` , 
        {  
          method: 'PUT', 
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

  //const headers = ['Name', 'Due Date', 'Course'];

  return (
    <div>
      <button onClick={handleOpen}>Edit</button>
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
      <div>
      <h3>Assignment Edit</h3>
      </div>
      <div margin="auto" >
      <TextField autoFocus fullWidth id="nameEdit" label="Name" name= "assignmentName" value={assignment.assignmentName} onChange={editChange}/>
      <TextField autoFocus fullWidth id="dueDateEdit" label="DueDate" name="dueDate" value={assignment.dueDate} onChange={editChange}/> 
      </div>
    </DialogContent>
    <DialogActions>
    <Button id="closeAssignmentButton" onClick={handleClose}>Close</Button>
    <Button id="saveAssignmentButton" onClick={saveAssignment}>Save</Button>
    </DialogActions>
    </Dialog>
    </div>
  ); 
}

export default EditAssignment;