import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import ErrorAlert from '../Alert/ErrorAlert';
import SuccessAlert from '../Alert/SuccessAlert';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChangePass(props) {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [open, setOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState('');
  const handleShowConfirm = (data) => {
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
  const handleClose = () => {
    setOpen(props.close);
  };
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };

  const handleChangeConfirmPass = (e) => {
    if (e.target.value === newPass) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };
  const handleChange = () => {
    axios
      .post(
        `https://localhost:7115/api/v1/account/changePassword?Email=${user.email}&OldPassword=${password}&NewPassword=${newPass}&ConfirmPassword=${confirmPass}`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(() => {
            localStorage.clear();
            sessionStorage.clear();
            navigate('/');
          }, 1000);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseFailed);
      });
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
          <DialogTitle id="alert-dialog-title">Change Password</DialogTitle>
          <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Divider variant="middle" />

        <DialogContent>
          <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                value={password}
                onChange={(e) => setPass(e.target.value)}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Old Password"
              />
            </FormControl>
            <TextField
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              label="New Password"
            />
            <TextField
      
              value={confirmPass}
              onBlur={handleChangeConfirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              error={check}
              helperText={check && 'Passwords do NOT match'}
              type="password"
              label="Confirm New Password"
            />
          </Stack>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          {!check ? (
            <Button variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
              Save
            </Button>
          ) : (
            <Button disabled variant="contained" autoFocus>
              Save
            </Button>
          )}
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
        <DialogTitle id="alert-dialog-title">Update Password</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You want to update password?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button variant="contained" onClick={() => handleChange()} autoFocus>
            Accept
          </Button>
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Pass Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
    </Dialog>
  );
}

export default ChangePass;
