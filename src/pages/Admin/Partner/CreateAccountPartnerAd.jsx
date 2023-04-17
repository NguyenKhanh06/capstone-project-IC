import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import React, { useEffect, useState } from 'react';
import Loading from '../../Loading';
import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';

function CreateAccountPartnerAd(props) {
  const regex = /^[\w\s]*$/

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [Checkerr, setErr] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = () => {
    setOpen(props.close);
  };

  const handleError = (data) => {
    setMessage(data);
    setShowError(true);
  };
  function reload() {
    window.location.reload(false);
  }

  const handleCreateStaff = () => {
    setLoading(true)
    axios
      .post(
        `https://localhost:7115/api/v1/account/create?Email=${email}&FullName=${fullName}&PhoneNumber=${phoneNumber}&Address=${address}&Status=true&Role=4
        `
      )
      .then((response) => {
        if (response.data.isSuccess) {
     
          CreateDeputy(response.data.responseSuccess.accountId)
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };
  const CreateDeputy = (id) => {
    axios
      .post(
        `https://localhost:7115/api/v1/deputy/create?AccountId=${id}&PartnerId=${props.partnerId}`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
       handleClose()
props.getDeputy()
setLoading(false)
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
        setLoading(false)
      });
  };
console.log(props)
  const onblur = () => {
    const regexMail = /^[\w.-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regexMail.test(email)) {
      setErr(false);
    } else {
      setErr(true);
    }
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={props.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form>
          <DialogTitle id="alert-dialog-title">Create Deputy</DialogTitle>
          <Divider variant="middle" />
          <DialogContent>
            <Stack direction="column" spacing={3.5}>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <TextField
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  fullWidth
                  label="Full Name"
                  error={ !regex.test(fullName)}
                  helperText={!regex.test(fullName) && "Can not input special character"}
                />
              </Stack>

              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <TextField
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    onblur();
                  }}
                  required
                  fullWidth
                  label="Email"
                  error={Checkerr}
                  helperText={Checkerr && 'Please input email'}
                />
                <TextField
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  fullWidth
                  label="Phone Number"
                  type='number'
                  inputProps={{ maxLength: 10 }}
                />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions style={{ padding: 20 }}>
            {fullName.trim().length && email.trim().length && phoneNumber.trim().length && regex.test(fullName) && !Checkerr ? (
              <Button variant="contained" onClick={() =>handleCreateStaff()} autoFocus>
                Create Deputy
              </Button>
            ) : (
              <Button disabled variant="contained" autoFocus>
                    Create Deputy
              </Button>
            )}
          </DialogActions>
        </form>
      <Loading show={loading} />
      <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Deputy Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
     
    </div>
  );
}

export default CreateAccountPartnerAd;
