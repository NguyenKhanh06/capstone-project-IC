import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';
import Loading from '../../Loading';

function CreateCourse(props) {

  const [disableBtn, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [content, setContent] = useState("");
  const [activity, setActivity] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };

  function reload() {
    window.location.reload(false);
  }
  const handleClose = () => {
    setOpen(props.close);
  };

  const regex = /^[\w\s]*$/
  const regexEmail = /^[a-zA-Z0-9._%+-]+@fpt\.edu\.vn$/i;
  const regexPhone = /^\+?\d{1,3}[- ]?\d{3}[- ]?\d{4}$/;
  
  const handleChangeName = (e) => {
    // console.log(regex.test(e.target.value));
    console.log(regexPhone.test(e.target.value));

setSkillName(e.target.value)

  }

  const handleCreateCourse = () => {
    setLoading(true)
    console.log(`https://localhost:7115/api/v1/course/create?Activity=${activity}&Content=${content}&CourseName=${skillName}`)
    axios
      .post(
        `https://localhost:7115/api/v1/course/create?Activity=${activity}&Content=${content}&CourseName=${skillName}`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(reload(), 5000);
        } 
        setLoading(false)
      }).catch((err) => {
        setLoading(false)
        handleError(err.response.data.responseSuccess);
      })
  };

  
  
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Create Course</DialogTitle>
          <IconButton style={{marginRight: 6}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
        
        <Divider variant="middle" />

        <DialogContent>
          <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
            <TextField
              value={skillName}
              onChange={handleChangeName}
              required
              fullWidth
              label="Course Name"
              inputProps={{
                maxLength: 25,
              }}
              error={ !regex.test(skillName)}
                  helperText={!regex.test(skillName) && "Can not input special character"}
            />
            <TextField
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              required
              fullWidth
              multiline
              rows={4}
              label="Activity"
              inputProps={{
                maxLength: 100,
               
              }}
              error={ !regex.test(activity)}
              helperText={!regex.test(activity) && "Can not input special character"}
            />
            <TextField
              value={content}
              multiline
              rows={5}
              onChange={(e) => setContent(e.target.value)}
              required
              fullWidth
              inputProps={{
                maxLength: 1000,
               
              }}
             
              label="Description"
            />
          </Stack>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          { activity.trim().length && regex.test(activity) && skillName.trim().length && regex.test(skillName)?    <Button variant="contained" onClick={() => handleCreateCourse()} autoFocus>
            Create Course
          </Button> :    <Button disabled variant="contained" autoFocus>
            Create Course
          </Button>}
       
        </DialogActions>
      </form>
      <Loading show={loading}/>
      <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Course Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
    </Dialog>
  );
}

export default CreateCourse;
