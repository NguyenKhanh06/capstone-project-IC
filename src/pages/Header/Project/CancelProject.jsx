import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from 'axios';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import Loading from '../../Loading';


function CancelProject(props) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [file, setFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
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

  const changeStatus = () => {
    const formData = new FormData();
    formData.append("Status", 2)
    formData.append("ProjectId", props.id)
    

    axios({
      method: 'POST',
      data: formData,
      url: 'https://api.ic-fpt.click/api/v1/project/changeStatus',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res =>      setTimeout(() =>{
     window.location.reload()
    }, 1000))
     
  }

  const handleCancel = () => {
    const formData = new FormData();
    formData.append("FormFile", file)
    formData.append("Description", reason)
    formData.append("ProjectId", props.id)
    

    axios({
      method: 'POST',
      data: formData,
      url: 'https://api.ic-fpt.click/api/v1/cancel/create',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response)
        if (response.data.isSuccess) {
changeStatus()
          setShowSuccess(true);
          setLoading(false);
          // setTimeout(reload(), 3000);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
        setLoading(false);
      });
  };
  console.log(props)

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
          <form onSubmit={handleCancel}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <DialogTitle id="alert-dialog-title">Cancel Project</DialogTitle>
              <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
                <CloseOutlinedIcon />
              </IconButton>
            </Stack>
            <Divider variant="middle" />

            <DialogContent>
              <TextField
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                fullWidth
                multiline
                rows={5}
                label="Reason Cancel"
              />

              <Button sx={{ marginTop: 5 }} variant="outlined" component="label">
                File Cancel (Just accept file pdf)
                <input hidden type="file" accept='.pdf' onChange={(e) => setFile(e.target.files[0])} />
              </Button>
              {file && <p style={{marginTop: 10}}>{file.name}</p>}
              <p style={{marginTop: 10, color: "red"}}>(Just accept file with size under 20MB)</p>
            </DialogContent>
            
            <DialogActions style={{ padding: 20 }}>
              {reason.length && file ? (
                <Button color="error" variant="contained" onClick={() => handleCancel()} autoFocus>
                  Cancel Project
                </Button>
              ) : (
                <Button disabled variant="contained" type="submit" autoFocus>
                  Cancel Project
                </Button>
              )}
            </DialogActions>
          </form>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Cancel Project Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
     
    </div>
  );
}

export default CancelProject;
