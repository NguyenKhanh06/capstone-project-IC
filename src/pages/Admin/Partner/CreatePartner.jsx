import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField } from '@mui/material';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useState } from 'react';
import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';

function CreatePartner(props) {
  const regex = /^[\w\s]*$/
  const [name, setName] = useState("");
  const [local, setLocal] = useState("");
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);
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

  const handleCreatePartner = () => {
    axios
      .post(`https://localhost:7115/api/v1/partner/create?Name=${name}&Local=${local}&Note=${note}&Status=true`)
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(reload(), 3000);
        } 
      }).catch((err) => {
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
          <DialogTitle id="alert-dialog-title">Create Partner</DialogTitle>
          <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Divider variant="middle" />

        <DialogContent>
          <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
            <TextField value={name} onChange={(e) => setName(e.target.value)} required fullWidth label="Partner Name"
            error={ !regex.test(name)}
            helperText={!regex.test(name) && "Can not input special character"} />
            <TextField value={local} onChange={(e) => setLocal(e.target.value)} required fullWidth label="Location" />
            <TextField
              value={note}
              multiline
              rows={5}
              onChange={(e) => setNote(e.target.value)}
              fullWidth
              label="Note"
              error={ !regex.test(note)}
              helperText={!regex.test(note) && "Can not input special character"}
            />
          </Stack>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          {name.trim().length && local.trim().length && regex.test(note) && regex.test(name)? (
            <Button variant="contained" onClick={() => handleCreatePartner()} autoFocus>
              Create Partner
            </Button>
          ) : (
            <Button disabled variant="contained" autoFocus>
              Create Partner
            </Button>
          )}
        </DialogActions>
      </form>
      <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Partner Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
    </Dialog>
  );
}

export default CreatePartner;
