import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useEffect, useState } from 'react';
import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';

function DetailSlot(props) {
  const regex = /^[\w\s]*$/
  const [open, setOpen] = useState(false);
  const [disableBtn, setDisable] = useState(false);
  const [topic, setTopic] = useState('');
  const [timeAllocation, setTime] = useState(null);
  const [learningType, setType] = useState('');
  const [detail, setDetail] = useState('');
  const [session, setSession] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };
  const handleClose = () => {
    setOpen(props.close);
  };
  function reload() {
    window.location.reload(false);
  }
  const handleShowConfirm = (data) => {
   
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
  useEffect(() => {
    if (props.slot) {
      setSession(props.slot.session)
      setTopic(props.slot.name);
      setTime(props.slot.timeAllocation);
      setType(props.slot.type);
      setDetail(props.slot.detail);
    }
  }, [props.slot]);

  const handleUpdateSlot = () => {
    axios
      .put(
        `https://api.ic-fpt.click/api/v1/slot/update/${props.slot.id}?Name=${topic}&Detail=${detail}&TimeAllocation=${timeAllocation}&Type=${learningType}&SyllabusId=${props.slot.syllabusId}`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
         props.getDetail()
         setTimeout(handleClose(), 3000)
         
         setShowConfirm(false);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };

  const handleChangeTopic = (e) => {
    setTopic(e.target.value);
    if (e.target.value) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };
  const handleChangeTime = (e) => {
    setTime(e.target.value);
    if (e.target.value.trim()) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const handleChangeDetail = (e) => {
  
  if(e.target.value){
    setDetail(e.target.value);
  }else{
    setDetail('');
  }
      setDisable(true);
  
  };
  const handleChange = (event) => {
    setType(event.target.value);
    if (event.target.value) {
      setDisable(true);
    } else {
      setDisable(false);
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
        <form onSubmit={handleUpdateSlot}>
         
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Slot: {props.slot.session}</DialogTitle>
          <IconButton style={{marginRight: 6}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <DialogContent>
            <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
              <TextField value={topic} onChange={handleChangeTopic} required fullWidth label="Slot Topic"
              
              error={ !regex.test(topic)}
              helperText={!regex.test(topic) && "Can not input special character"}
              />
              <TextField
                value={timeAllocation}
                onChange={handleChangeTime}
                type="number"
                required
                fullWidth
                label="Time Allocation"
                InputProps={{
                  endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                }}
              />
              <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Learning Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={learningType}
          label="Learning Type"
          onChange={handleChange}
          defaultValue={props.slot.type}
        >
          <MenuItem value={"Online"}>Online</MenuItem>
          <MenuItem value={"Offline"}>Offline</MenuItem>

        </Select>
      </FormControl>
              {/* <TextField value={learningType} onChange={handleChangeType} required fullWidth label="Learning Type" /> */}
              <TextField
                value={detail}
                multiline
                rows={5}
                onChange={handleChangeDetail}
                fullWidth
                label="Detail Slot"
                error={ !regex.test(detail)}
              helperText={!regex.test(detail) && "Can not input special character"}
              />
            </Stack>
          </DialogContent>
          {props.slot.slotStatus !== 1 && <DialogActions style={{ padding: 20 }}>
            {disableBtn && regex.test(detail) ? (
              <Button variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
                Save
              </Button>
            ) : (
              <Button disabled variant="contained"  autoFocus>
                Save
              </Button>
            )}
          </DialogActions> }
         
        </form>
        <Dialog
          open={showConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Update Slot</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Update Slot?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button variant="contained"onClick={() => handleUpdateSlot()} autoFocus>
              Accept
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Slot Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
        
      </Dialog>
    </div>
  );
}

export default DetailSlot;
