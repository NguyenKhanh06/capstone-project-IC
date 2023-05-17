import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import InfoIcon from '@mui/icons-material/Info';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import moment from 'moment';
import axios from 'axios';
import dayjs from 'dayjs';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';

function DetailCmt(props) {
  const [open, setOpen] = useState(false);
  const [disableBtn, setDisable] = useState(false);
  const [cmt, setCmt] = useState('');
  const [file, setFile] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [viewMember, setViewMember] = useState(false);
  const [showCmt, setShowCmt] = useState(false);
  const [fileCmt, setFileCmt] =useState(null)

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
  const handleSuccess = (data) => {
    setShowSuccess(true);
    setMessage(data);
  };
  function reload() {
    window.location.reload(false);
  }

  const handleClose = () => {
    setOpen(props.close);
  };
  const handleChangecmt = (e) => {
    setCmt(e.target.value);
    if (e.target.value) {
      setDisable(true);
    }
  };

  useEffect(() => {
    if (props.cmt != null) {
      setCmt(props.cmt?.comment);
      setFile(props.cmt?.fileUrl);
    }
  }, [props.cmt]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('Comment', cmt);
    formData.append('TaskId',props.cmt.tasksId);
    formData.append('FormFile', fileCmt);
    axios({
      method: 'PUT',
      data: formData,
      url: `${API_URL}/comment/updateTaskComment/${props.cmt.id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          handleSuccess("Update comment successful!")
         
          setTimeout(() => {
  
            setShowSuccess(false)
            handleClose()
            handleCloseConfirm()
      
          }, 1000);
        props.fetchDataComment()
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };
  const onChangeFile = (e) => {
    setFileCmt(e.target.files[0]);
    if (e.target.files[0]) {
      setDisable(true);
    }
  
  };
  const DeleteFile = () => {
    axios.delete(`${API_URL}/comment/deleteFile/${props.cmt.id}`).then((response) => {
      if (response.data.isSuccess) {
        handleSuccess("Delete file successful!")

       
        setTimeout(() => {

          setShowSuccess(false)
          handleClose()

    
        }, 1000);
      props.fetchDataComment()
      }
    })
    .catch((err) => {
      handleError(err.response.data.responseSuccess);
    });
  }
  return (
    <Dialog fullWidth maxWidth="md" onClose={props.close} aria-labelledby="customized-dialog-title" open={props.show}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <DialogTitle id="alert-dialog-title">Edit Comment</DialogTitle>
        <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
          <CloseOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider variant="middle" />

      <DialogContent>
        <>
          <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
            <Typography
              sx={{
                fontWeight: 'bold',
              }}
            >
              {props.cmt?.fullName}
            </Typography>
            <Typography
              sx={{
                fontSize: 'small',

                color: '#8F8E8E',
              }}
            >
              {dayjs(props?.cmt?.dateCreated).format('DD/MM/YYYY')}
            </Typography>
            <Typography
              sx={{
                fontSize: 'small',

                color: '#8F8E8E',
              }}
            >
              {props?.cmt?.checkEdit && <p>Edited</p>}
            </Typography>
            <Stack
              direction="column"
              justifyContent="center"
              spacing={2}
              style={{
                width: '100%',
              }}
            >
              <Box
                style={{
                  backgroundColor: 'white',

                  borderRadius: '20px',
                  width: '100%',
                }}
              >
                {props.cmt?.fileUrl && <Link href={props?.cmt?.fileUrl}>{props.cmt?.viewFile[0].fileName}</Link>}
               {props.cmt?.fileUrl ? 
       
                  <Tooltip title="Delete Comment">
                       <IconButton onClick={() => DeleteFile()} color='error'>
               <DeleteIcon />
             </IconButton>
                </Tooltip>
              : 
     
      <Button  component="label" variant='contained'>
        Upload file
        <input hidden onChange={onChangeFile} type="file" />
      </Button> } 
                {fileCmt && <p>{fileCmt.name}</p>}
              </Box>
              <Box
                style={{
                  backgroundColor: 'white',

                  borderRadius: '20px',
                  width: '100%',
                }}
              >
               <TextField fullWidth multiline value={cmt} onChange={handleChangecmt} />
              </Box>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={3} sx={{ marginTop: 6 }}>
            {/* <Button
            variant="contained"
            color="success"
            onClick={() => {
             
            }}
          >
            Approve
          </Button> */}
          </Stack>
        </>
      </DialogContent>
      <DialogActions>
        {disableBtn ? (
          <Button variant="contained" onClick={() => setShowConfirm(true)}>
            Save
          </Button>
        ) : (
          <Button disabled variant="contained" onClick={() => setShowConfirm(true)}>
            Save
          </Button>
        )}
      </DialogActions>
      <Dialog
        open={showConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">Update Comment</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You Want To Update Comment?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button variant="contained" onClick={() => handleUpdate()} autoFocus>
            Accept
          </Button>
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={message} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
    </Dialog>
  );
}

export default DetailCmt;
