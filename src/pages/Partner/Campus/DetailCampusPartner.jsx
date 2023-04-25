import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useEffect, useState } from 'react';
import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';
import Loading from '../../Loading';

function DetailCampusPartner(props) {
  const [disableBtn, setDisableBtn] = useState(false)
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [campus, setCampus] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [id, setID] = useState('');

  const handleShowConfirm = (data) => {
    setID(data);
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
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

  const handleUpdateCampus = () => {
    axios
      .put(
        `https://api.ic-fpt.click/api/v1/campus/update/${props.campus.id}?Name=${name}&Address=${address}&Status=true&PartnerId=${props.campus.partnerId}`
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
//   const fetchData = async () => {
//     await axios.get(`https://api.ic-fpt.click/api/v1/campus/getDetail/${props.campus.id}`).then((response) => {
//      setCampus(response.data.responseSuccess)
//      setName(response.data.responseSuccess[0].name)
//      setAddress(response.data.responseSuccess[0].address)
//     });
//   };

  useEffect(() => {
    if (props.campus != null) {
    //   fetchData();
      setName(props.campus.name)
      setAddress(props.campus.address)
    }
  }, [props.campus]);

const handleChangeName = (e) => {
setName(e.target.value)
if(e.target.value){
setDisableBtn(true)
}else{
  setDisableBtn(false)
}
}

const handleChangeAddress = (e) => {
  setAddress(e.target.value)
  if(e.target.value){
  setDisableBtn(true)
  }else{
    setDisableBtn(false)
  }
  }
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
          <DialogTitle id="alert-dialog-title">Detail Campus</DialogTitle>
          <IconButton style={{marginRight: 6}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
        <Divider variant="middle" />

        <DialogContent>
          <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
            <TextField
              value={name}
              onChange={handleChangeName}
              required
              fullWidth
              label="Campus Name"
            />
           <TextField
              value={address}
              onChange={handleChangeAddress}
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
 
          {disableBtn ?    <Button variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
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
          <DialogTitle id="alert-dialog-title">Update Campus</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Update Campus?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button variant="contained"onClick={() => handleUpdateCampus()} autoFocus>
              Accept
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Campus Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
    
    </Dialog>
  );
}

export default DetailCampusPartner;
