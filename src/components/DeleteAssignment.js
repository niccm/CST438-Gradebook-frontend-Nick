import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


function DeleteAssignment(props) {
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
  const deleteAssignment = ( ) => {
    setMessage('');
    console.log(assignment.id);
    fetch(`${SERVER_URL}/assignment/${assignment.id}` ,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', },
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
    handleClose();
  };
  return (
    <div>
      <button onClick={handleOpen}>Delete</button>
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
      <div>
      <h3>Are You Sure You want to delete this assignment</h3>
      </div>
    </DialogContent>
    <DialogActions>
    <Button id="closeButtonDelete" onClick={handleClose}>Close</Button>
    <Button id ="deleteButton" onClick={deleteAssignment}>Delete</Button>
    </DialogActions>
    </Dialog>
    </div>
  );
}
export default DeleteAssignment;