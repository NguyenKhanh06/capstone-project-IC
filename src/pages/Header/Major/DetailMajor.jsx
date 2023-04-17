import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';
import Loading from '../../Loading';

function DetailMajor(props) {
    const [showConfirm, setShowConfirm] = useState(false);
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
  const handleShowConfirm = (data) => {
   
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
  function reload() {
    window.location.reload(false);
  }
  const handleClose = () => {
    setOpen(props.close);
  };

  const regex = /^[\w\s]*$/

  const UpdateMajor = () => {
    const data = {
        "name": skillName,
        "majorFullName": activity,
        "status": true
      }
    axios.put(`https://localhost:7115/api/v1/Major/update/${props.major.id}`, data).then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        } 

      }).catch((err) => {

        handleError('Create fail!!');
      })
  }
  const handleChangeName = (e) => {


setSkillName(e.target.value)
if (e.target.value  && e.target.value.trim().length) {
    setDisable(true);
  } else {
    setDisable(false);
  }
  }
  const handleChangeAc= (e) => {


    setActivity(e.target.value)
    if (e.target.value && e.target.value.trim().length) {
        setDisable(true);
      } else {
        setDisable(false);
      }
      }
useEffect(() => {
    if (props.major) {
    setSkillName(props?.major?.name)
    setActivity(props?.major?.majorFullName)
    }
  }, [props.major]);

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
          <DialogTitle id="alert-dialog-title">Create Major</DialogTitle>
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
              label="Major Name"
              inputProps={{
                maxLength: 25,
              }}
              error={ !regex.test(skillName)}
                  helperText={!regex.test(skillName) && "Can not input special character"}
            />
            <TextField
              value={activity}
              onChange={handleChangeAc}
              required
              fullWidth
              multiline
              rows={4}
              label="Major Full Name"
              inputProps={{
                maxLength: 100,
               
              }}
              error={ !regex.test(activity)}
              helperText={!regex.test(activity) && "Can not input special character"}
            />

          </Stack>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          { disableBtn && regex.test(activity) && regex.test(skillName)?    <Button variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
           Save
          </Button> :    <Button disabled variant="contained" autoFocus>
            Save
          </Button>}
       
        </DialogActions>
      </form>
      <Dialog
          open={showConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Update major</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Update Major?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button variant="contained"onClick={() => UpdateMajor()} autoFocus>
              Accept
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Slot Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
      <Loading show={loading}/>
      <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Major Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
    </Dialog>
  );
}

export default DetailMajor;
