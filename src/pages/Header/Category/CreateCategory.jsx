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
import axios from 'axios';
import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import Loading from '../../Loading';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';

function CreateCategory(props) {
  const regex = /^[\w\s]*$/;
  const [open, setOpen] = useState(false);
  const [cateName, setCateName] = useState('');

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

  const handleCreateCategory = () => {
    axios.post(`https://localhost:7115/api/v1/categoryProject/create?Name=${cateName}&Status=true`).then((response) => {

      setCateName('');
      props.getAll();
      if (response.data.isSuccess) {
        setShowSuccess(true);
       
        setTimeout(  handleClose(), 3000);
      } 
      setLoading(false)
    }).catch((err) => {
      setLoading(false)
      handleError('Create fail!!!');
    
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
          <DialogTitle id="alert-dialog-title">Create Category</DialogTitle>
          <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Divider variant="middle" />

        <DialogContent>
          <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
            <TextField
              value={cateName}
              onChange={(e) => setCateName(e.target.value)}
              required
              fullWidth
              error={ !regex.test(cateName)}
              helperText={!regex.test(cateName) && "Can not input special character"}
              label="Category Name"
              inputProps={{
                maxLength: 25,
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          {cateName.trim().length && regex.test(cateName) ? (
            <Button variant="contained" onClick={() => handleCreateCategory()} autoFocus>
              Create Category
            </Button>
          ) : (
            <Button disabled variant="contained" onClick={() => handleCreateCategory()} autoFocus>
              Create Category
            </Button>
          )}
        </DialogActions>
      </form>
      <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Category Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
    </Dialog>
  );
}

export default CreateCategory;
