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
  import axios from 'axios';
  import { Visibility, VisibilityOff } from '@mui/icons-material';
  import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
  import React, { useEffect, useState } from 'react';

  import ErrorAlert from '../Alert/ErrorAlert';
  import SuccessAlert from '../Alert/SuccessAlert';
import ChangePass from './ChangePass';
import { API_URL } from '../../config/apiUrl/apis-url';

  
  function Profile(props) {
    const user = JSON.parse(sessionStorage.getItem("user"));
  const regexPhone = /(0[3|5|7|8|9])+([0-9]{7})\b/g;
   
    const [open, setOpen] = useState(false);

    const [disableBtn, setDisable] = useState(false);
  
  const [password, setPassword] = useState(null)
    const [fullName, setFullName] = useState(null);
 
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
  const [CheckerrPhone, setErrPhone] = useState(false);


  
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
      await axios.get(`${API_URL}/account/getDetail/${user.id}`).then(response => {
  
  setFullName(response.data.responseSuccess?.fullName)
  setEmail(response.data.responseSuccess?.email)
  setPhoneNumber(response.data.responseSuccess?.phoneNumber)
  setPassword(response.data.responseSuccess?.password)
  setAddress(response.data.responseSuccess?.address)
  
      })
  }
  

    useEffect(() => {
    
getDetail()
       
      
    }, []);

    const handleUpdateStaff2 = () => {
      axios.put(`${API_URL}/account/update/${user.id}?Email=${email}&Password=${password}&ConfirmPassword=${password}&FullName=${fullName}&PhoneNumber=${phoneNumber}&Status=true&Role=${user.role}`).then((response) => {
          if (response.data.isSuccess) {
            setShowSuccess(true)
       window.location.reload(false)
          
          }
        })
        .catch((err) => {
          handleError("Update fail!");
        });
    };

    const handleUpdateStaff = () => {
      axios.put(`${API_URL}/account/update/${user.id}?Email=${email}&Password=${password}&ConfirmPassword=${password}&FullName=${fullName}&PhoneNumber=${phoneNumber}&Address=${address}&Status=true&Role=${user.role}`).then((response) => {
          if (response.data.isSuccess) {
            setShowSuccess(true)
       window.location.reload(false)
          
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
      if (regexPhone.test(phoneNumber)) {
        setErrPhone(false);
        setDisable(true)
      } else {
        setErrPhone(true);
        setDisable(false)

      }
  
    }
 
    // const onblurPhone = () => {
    //   if (regexPhone.test(phoneNumber)) {
    //     setErrPhone(false);
    //     setDisable(true)
    //   } else {
    //     setErrPhone(true);
    //     setDisable(false)

    //   }
    // };
    const handleChangeEmail = (e) => {
      setEmail(e.target.value)
      if(e.target.value){
        setDisable(true)
      }else{
        setDisable(false)
      }
  
    }
    const handleChangeAddress = (e) => {
      setAddress(e.target.value)
      if(e.target.value){
        setDisable(true)
      }else{
        setDisable(false)
      }
  
    }
  
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
            <DialogTitle id="alert-dialog-title">My Profile</DialogTitle>
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
                  <TextField  InputProps={{
    readOnly: true,
  }}  value={email} fullWidth label="Email" />
                  <TextField
                    value={phoneNumber}
                    onChange={handleChangePhone}
                    required
                    fullWidth
                    label="Phone Number"
                    type='number'
                    // onBlur={onblurPhone}

                    inputProps={{ maxLength: 10 }}
                
                    error={CheckerrPhone}
                    helperText={CheckerrPhone && 'Phone number must be 10 digits only'}
  
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
                 <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
            readOnly
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
               
              </Stack>
            </DialogContent>
            <DialogActions style={{ padding: 20 }}>
            <Button variant="contained" onClick={() => setShowChangePassword(true)} autoFocus>
                Change Password
                </Button>
              {disableBtn && !CheckerrPhone ? (
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
            <DialogTitle id="alert-dialog-title">Update Profile</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">You Want To Update Profile?</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirm}>Cancel</Button>
              <Button variant="contained"onClick={() => handleUpdateStaff()} autoFocus>
                Accept
              </Button>
            </DialogActions>
            <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Profile Successful!'} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
          </Dialog>
       
        </Dialog>
        <ChangePass show={showChangePassword} close={() => {setShowChangePassword(false)}} email={email}/>
       
      </div>
    );
  }
  
  export default Profile;
  