import {
  Box,
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
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useEffect, useState } from 'react';
import Loading from '../../Loading';
import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';

function DetailStaff(props) {
  const regexMailFu = /[\w.-]+fptu@gmail\.com$/;
  const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableBtn, setDisable] = useState(false);

const [password, setPassword] = useState(null)
  const [fullName, setFullName] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [Checkerr, setErr] = useState(false);
  const [CheckerrPhone, setErrPhone] = useState(false);
  function reload() {
    window.location.reload(false);
  }
  const handleShowConfirm = (data) => {
   
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };

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



  const getDetail = async () => {
    await axios.get(`https://api.ic-fpt.click/api/v1/account/getDetail/${props.staff.accountId}`).then(response => {

setFullName(response.data.responseSuccess?.fullName)
setEmail(response.data.responseSuccess?.email)
setPhoneNumber(response.data.responseSuccess?.phoneNumber)
setPassword(response.data.responseSuccess?.password)
setAddress(response.data.responseSuccess?.address)

    })
}

  useEffect(() => {
    if (props.staff !== null) {
      getDetail()
      setFullName(props.staff?.account?.fullName)
      setEmail(props.staff?.account?.email)
      setPhoneNumber(props.staff?.account?.phoneNumber)
setAddress(props.staff?.account?.address)
    }
  }, [props.staff]);


  const handleUpdateStaff = () => {
    axios.put(`https://api.ic-fpt.click/api/v1/account/update/${props.staff.accountId}?Email=${email}&Password=${password}&ConfirmPassword=${password}&FullName=${fullName}&PhoneNumber=${phoneNumber}&Address=${address}&Status=true&Role=${props.staff?.account?.role}`).then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true)
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        
        }
      })
      .catch((err) => {
        handleError("Update fail!");
      });
  };



  const handleChangeName = (e) => {
    setFullName(e.target.value)
    if(e.target.value){
      setDisable(true)
    }else{
      setDisable(false)
    }

  }

  const handleChangePhone = (e) => {
    setPhoneNumber(e.target.value)


  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)


  }
  const handleChangeAddress = (e) => {
    setAddress(e.target.value)
    if(e.target.value){
      setDisable(true)
    }else{
      setDisable(false)
    }

  }
  const onblurMail = () => {
    if (regexMailFu.test(email)) {
      setErr(false);
      setDisable(true)

    } else {
      setErr(true);
    }
  };
  const onblurPhone = () => {
    if (regexPhone.test(phoneNumber)) {
      setErrPhone(false);
      setDisable(true)

    } else {
      setErrPhone(true);
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
        
          < Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Detail Staff</DialogTitle>
          <IconButton style={{marginRight: 6}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" />
          <DialogContent>
            <Stack direction="column" spacing={3.5}>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <TextField
                  value={fullName}
                  onChange={handleChangeName}
                  required
                  fullWidth

                  label="Full Name"
                />
              </Stack>

              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
           
                <TextField value={email}       onBlur={onblurMail } onChange={handleChangeEmail} required fullWidth label="Email"  error={Checkerr}
                    helperText={Checkerr && 'Please input email fptu'}/>
                <TextField
                  value={phoneNumber}
                  onChange={handleChangePhone}
                  required
                  fullWidth
                  label="Phone Number"
                  onBlur={onblurPhone }
                  inputProps={{ maxLength: 10 }}
                  error={CheckerrPhone}
                  helperText={CheckerrPhone && 'Please input phone number'}
                />
              </Stack>

              <TextField
                value={address}
                multiline
                onChange={handleChangeAddress}
                required
                fullWidth
                label="Address"
              />
               {/* <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
            label="Password"
          />
        </FormControl>
              */}
            </Stack>
          </DialogContent>
          <DialogActions style={{ padding: 20 }}>
            {disableBtn && !Checkerr && !CheckerrPhone ? (
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
          <DialogTitle id="alert-dialog-title">Update Staff</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Update Staff?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button variant="contained"onClick={() => handleUpdateStaff()} autoFocus>
              Accept
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Staff Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
        
      </Dialog>

      {/* <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Staff Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} /> */}
    </div>
  );
}

export default DetailStaff;
