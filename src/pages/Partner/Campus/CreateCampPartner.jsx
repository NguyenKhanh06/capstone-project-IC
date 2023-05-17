import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useState } from 'react';
import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';
import Loading from '../../Loading';
import { API_URL } from '../../../config/apiUrl/apis-url';

function CreateCampPartner(props) {
  const regex = /^[\w\s]*$/
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

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

  const handleCreateCampus = () => {
    axios
      .post(
        `${API_URL}/campus/create?Name=${name}&Address=${address}&PartnerId=${props.PartnerID}`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(() => {
            window.location.reload()
          }, 1000)
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
          <DialogTitle id="alert-dialog-title">Create Campus</DialogTitle>
          <IconButton style={{marginRight: 6}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
        <Divider variant="middle" />

        <DialogContent>
          <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              label="Campus Name"
              error={ !regex.test(name)}
              helperText={!regex.test(name) && "Can not input special character"}
            />
           <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              fullWidth
              label="Campus Address"
              inputProps={{ maxLength: 200 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ position: 'absolute', right: 10, bottom: 25 }}>
                    {address?.length}/200
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}> 
          {name.trim().length && address.trim().length &&  regex.test(name) ?    <Button variant="contained" onClick={() => handleCreateCampus()} autoFocus>
            Create Campus
          </Button> :    <Button disabled variant="contained" autoFocus>
            Create Campus
          </Button>}
       
        </DialogActions>
      </form>
      <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Campus Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
    </Dialog>
  );
}

export default CreateCampPartner;
