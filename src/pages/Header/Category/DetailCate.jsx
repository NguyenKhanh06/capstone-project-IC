import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import Loading from "../../Loading"
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';


function DetailCate(props) {
  const regex = /^[\w\s]*$/;
    const [open, setOpen] = useState(false);
const [cateName, setCateName] = useState('');
const [showConfirm, setShowConfirm] = useState(false);
const [loading, setLoading] = useState(false)
const [showSuccess, setShowSuccess] = useState(false);
const [showError, setShowError] = useState(false);
const [disableBtn, setDisable] = useState(false)
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
    const handleUpdateCategory= () => {
    
      axios.put(`https://api.ic-fpt.click/api/v1/categoryProject/update/${props.cate.id}?Name=${cateName}&Status=true`).then((response) =>{
      
       if (response.data.isSuccess) {
        setShowSuccess(true);
        setTimeout(() => {
          handleClose()
          setShowSuccess(false);
          handleCloseConfirm()
setDisable(false)
        }, 1000)
        props.getAll()
       
      } 
      setLoading(false)
    }).catch((err) => {
      setLoading(false)
      handleError('Update fail!!!');
    
    });
      
    };

const handleChangeName = (e) => {
setCateName(e.target.value)
if (e.target.value.trim()) {
  setDisable(true);
} else {
  setDisable(false);
}
}
    useEffect(() => {
        if(props.cate){
            setCateName(props.cate.name)
        }
      }, [props.cate]);
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
          <DialogTitle id="alert-dialog-title">Detail Category</DialogTitle>
          <IconButton style={{marginRight: 6}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle"/>

          <DialogContent>
          <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
          <TextField value={cateName} onChange={handleChangeName} required fullWidth label="Category Name"
          inputProps={{
            maxLength: 25,
          }}
          error={ !regex.test(cateName)}
          helperText={!regex.test(cateName) && "Can not input special character"}
          />
       
          </Stack>
          </DialogContent>
          <DialogActions style={{padding: 20}}>
{ disableBtn  && regex.test(cateName)? <Button variant="contained" onClick={()=> handleShowConfirm()} autoFocus>
              Save
            </Button> :  <Button disabled variant="contained" autoFocus>
              Save
            </Button> }
           
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
        <DialogTitle id="alert-dialog-title">Update Category</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You want to update this category?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>
            Cancel
          </Button>
          <Button variant="contained"  onClick={() => handleUpdateCategory()} autoFocus>
          Accept
          </Button>
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Category Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
      </Dialog>

    );
}

export default DetailCate;