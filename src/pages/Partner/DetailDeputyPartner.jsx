import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,

    IconButton,
    InputAdornment,
 
    Stack,
    TextField,

  } from '@mui/material';
  import axios from 'axios';
  import { Password, Visibility, VisibilityOff } from '@mui/icons-material';
  
  import React, { useEffect, useState } from 'react';
  import Loading from '../Loading';
  import ErrorAlert from '../Alert/ErrorAlert';
  import SuccessAlert from '../Alert/SuccessAlert';
import Iconify from '../../components/iconify/Iconify';

  
  function DetailDeputyPartner(props) {
    const regex = /^[\w\s]*$/
    const regexPhone = /(0[3|5|7|8|9])+([0-9]{7})\b/g;
  
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');
  const [disable, setDisable] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [Checkerr, setErr] = useState(false);
    const [CheckConfirm, setErrConfirm] = useState(false);
    const [deputy, setDeputy] = useState([])

    const [CheckerrPhone, setErrPhone] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [id, setID] = useState('');

  const handleShowConfirm = (data) => {
    setID(data);
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
    function reload() {
      window.location.reload(false);
    }
  
//     const handleCreateStaff = () => {
//       setLoading(true)
//       axios
//         .post(
//           `https://api.ic-fpt.click/api/v1/account/create?Email=${email}&FullName=${fullName}&PhoneNumber=${phoneNumber}&Address=${address}&Status=true&Role=4
//           `
//         )
//         .then((response) => {
//           if (response.data.isSuccess) {
       
//             CreateDeputy(response.data.responseSuccess.accountId)
//           }
//         })
//         .catch((err) => {
//           handleError(err.response.data.responseSuccess);
//         });
//     };
//     const CreateDeputy = (id) => {
//       axios
//         .post(
//           `https://api.ic-fpt.click/api/v1/deputy/create?AccountId=${id}&PartnerId=${props.partnerId}`
//         )
//         .then((response) => {
//           if (response.data.isSuccess) {
//             setShowSuccess(true);
//          handleClose()
//   props.getDeputy()
//   setLoading(false)
//           }
//         })
//         .catch((err) => {
//           handleError(err.response.data.responseSuccess);
//           setLoading(false)
//         });

    const onblur = () => {
      const regexMail = /^[\w.-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (regexMail.test(email)) {
        setErr(false);
      } else {
        setErr(true);
      }
    };


const handleUpdateDeputy = () => {
    axios.put(`https://api.ic-fpt.click/api/v1/account/update/${props.id.accountId}?Email=${email}&Password=${password}&ConfirmPassword=${password}&FullName=${fullName}&PhoneNumber=${phoneNumber}&Status=true&Role=4`).then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true)
     window.location.reload(false)
        
        }
      })
      .catch((err) => {
        handleError("Update fail!");
      });
    
}
    const getDetail = async () => {
        await axios.get(`https://api.ic-fpt.click/api/v1/account/getDetail/${props.id.accountId}`).then(response => {
setDeputy(response.data.responseSuccess)
setFullName(response.data.responseSuccess.fullName)
setEmail(response.data.responseSuccess.email)
setPhoneNumber(response.data.responseSuccess.phoneNumber)
setPassword(response.data.responseSuccess.password)
        })
    }
    useEffect(() => {

        if (props.id != null) {
         getDetail()

        }
      }, [props.id]);



const handleChangeName = (e) => {
    setFullName(e.target.value)
    if(e.target.value && e.target.value.trim().length){
        setDisable(true)
    }else{
        setDisable(false)
    }
}
const handleChangeMail = (e) => {
    setEmail(e.target.value)
    if(e.target.value && e.target.value.trim().length){
        setDisable(true)
    }else{
        setDisable(false)
    }
}
const handleChangePass = (e) => {
    setPassword(e.target.value)
    if(e.target.value && e.target.value.trim().length){
        setDisable(true)
    }else{
        setDisable(false)
    }
}
// const handleChangePassConfirm = (e) => {
//     setPasswordConfirm(e.target.value)
//     if(e.target.value && e.target.value.trim().length && e.target.value === Password){
//         setDisable(true)
//    setErrConfirm(true)
//     }else{
//         setDisable(false)
//    setErrConfirm(false)

//     }
// }
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
            <DialogTitle id="alert-dialog-title">Detail Deputy</DialogTitle>
            <Divider variant="middle" />
            <DialogContent>
              <Stack direction="column" spacing={3.5}>
              <TextField
                    value={fullName}
                    onChange={handleChangeName 
                      
                        }
                    required
                    fullWidth
                    label="Full Name"
                    error={ !regex.test(fullName)}
                    helperText={!regex.test(fullName) && "Can not input special character"}
                  />
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                 
                    <TextField
                    value={email}
                    onChange={(e) => {
                     
                      onblur();
                      setEmail(e.target.value)
    if(e.target.value && e.target.value.trim().length){
        setDisable(true)
    }else{
        setDisable(false)
    }
                    }}
                    required
                    fullWidth
                    label="Email"
                    error={Checkerr}
                    helperText={Checkerr && 'Please input email'}
                  />
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
  
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                

              <TextField
                name="password"
                fullWidth
             onChange={handleChangePass}
                value={password}
                placeholder="Password *"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
               {/* <TextField
                name="Confirmpassword"
                fullWidth
             onChange={handleChangePassConfirm}
                value={passwordConfirm}
                placeholder="Confirm *"
                type={showPassword ? 'text' : 'password'}
error = {!CheckConfirm}
helperText={CheckConfirm && "Password not match!!!"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> */}
                  
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions style={{ padding: 20 }}>
              { disable && !CheckerrPhone? (
                <Button variant="contained"  onClick={() => setShowConfirm(true)} autoFocus>
             Save
                </Button>
              ) : (
                <Button disabled variant="contained" autoFocus>
                 Save
                </Button>
              )}
            </DialogActions>
          </form>
        <Loading show={loading} />
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Deputy Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        <Dialog
          open={showConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Update Deputy</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Update Deputy?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button variant="contained"onClick={() => handleUpdateDeputy()} autoFocus>
              Accept
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
        </Dialog>
       
      </div>
    );
  }
  
  export default DetailDeputyPartner;
  