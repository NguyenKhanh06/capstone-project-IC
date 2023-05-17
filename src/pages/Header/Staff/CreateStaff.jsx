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
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

  import React, { useEffect, useState } from 'react';
  import Loading from '../../Loading';
  import ErrorAlert from '../../Alert/ErrorAlert';
  import SuccessAlert from '../../Alert/SuccessAlert';
import { API_URL } from '../../../config/apiUrl/apis-url';
  
  function CreateStaff(props) {
    const regex = /^[\w\s]*$/;
    const regexMailFu = /[\w.-]+fptu@gmail\.com$/;
    const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null)
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [Checkerr, setErr] = useState(false);
  const [CheckerrPhone, setErrPhone] = useState(false);
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

  const createStaff = (staff) => {
    const data = {
      "staffCode": staff.email,
      "accountId": staff.accountId
    }
    axios.post(`${API_URL}/staff/create`, data).then((response) => {
      if (response.data.isSuccess) {
        setShowSuccess(true);
        setTimeout(reload(), 5000);
      } 
    }).catch((err) => {
      handleError('Create Fail!!!');
    })
  }
    const handleCreateStaff = () => {
        axios.post(`${API_URL}/account/create?Email=${email}&FullName=${fullName}&PhoneNumber=${phoneNumber}&Address=${address}&Status=true&Role=0
        `).then((response) => {
            if (response.data.isSuccess) {
              createStaff(response.data.responseSuccess)
            } 
          }).catch((err) => {
            handleError(err.response.data.responseSuccess);
          })
    };
    const onblurMail = () => {
      if (regexMailFu.test(email)) {
        setErr(false);
      } else {
        setErr(true);
      }
    };
    const onblurPhone = () => {
      if (regexPhone.test(phoneNumber)) {
        setErrPhone(false);
        
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
          <DialogTitle id="alert-dialog-title">Create Staff</DialogTitle>
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
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    fullWidth
                    label="Full Name"
                    
                  />
                </Stack>
  
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <TextField value={email}    onBlur={onblurMail }  error={Checkerr}
                    helperText={Checkerr && 'Please input email fptu'} onChange={(e) => setEmail(e.target.value)} required fullWidth label="Email" />
                  <TextField
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  fullWidth
                  label="Address"
                />
                
              </Stack>
            </DialogContent>
            <DialogActions style={{ padding: 20 }}>
         
              {fullName.trim().length && email.trim().length && phoneNumber.trim().length && address.trim().length && !Checkerr && !CheckerrPhone ? (
                <Button variant="contained" onClick={() => handleCreateStaff()} autoFocus>
                 Create Staff
                </Button>
              ) : (
                <Button disabled variant="contained" onClick={() => handleCreateStaff()} autoFocus>
                  Update Staff
                </Button>
              )}
            </DialogActions>
          </form>
        </Dialog>
  
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Staff Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </div>
    );
  }
  
  export default CreateStaff;
  