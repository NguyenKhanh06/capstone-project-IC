import {
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
  Select,
  Stack,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';

function CreateSlot(props) {

  const regex = /^[\w\s]*$/
  const regexEmail = /^[a-zA-Z0-9._%+-]+@fpt\.edu\.vn$/i;
  const regexPhone = /^\+?\d{1,3}[- ]?\d{3}[- ]?\d{4}$/;
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const [topic, setTopic] = useState('');
  const [timeAllocation, setTime] = useState('');
  const [learningType, setType] = useState('');
  const [detail, setDetail] = useState('');
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

  const handleCreateSlot = () => {
    axios
      .post(
        `https://api.ic-fpt.click/api/v1/slot/create?Name=${topic}&Detail=${detail}&TimeAllocation=${timeAllocation}&Type=${learningType}&SyllabusId=${props.syllabusID}`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(() => {
            props.getDetail();
            handleClose();
            setShowSuccess(false)
          }, 1000)

        }
      })
      .catch((err) => {
        handleError(err?.response?.data.responseSuccess);
      });
  };
  const handleChange = (event) => {
    setType(event.target.value);
    if (event.target.value) {
      setDisable(true);
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
        <form onSubmit={handleCreateSlot}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <DialogTitle id="alert-dialog-title">Create Slot</DialogTitle>
            <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" />

          <DialogContent>
            <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
              <TextField
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                fullWidth
                label="Slot Topic"
                inputProps={{
                  maxLength: 255,
                }}
             
              />
              <TextField
                value={timeAllocation}
                onChange={(e) => setTime(e.target.value)}
                type="number"
                required
                fullWidth
                label="Time Allocation"
                
                InputProps={{
                  endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
        
                }}
              />
              {/* <TextField value={learningType} onChange={(e) => setType(e.target.value)} required fullWidth label="Learning Type" /> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Learning Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={learningType}
                  label="Learning Type"
                  onChange={handleChange}
                >
                  <MenuItem value={'Online'}>Online</MenuItem>
                  <MenuItem value={'Offline'}>Offline</MenuItem>
                </Select>
              </FormControl>
              <TextField
                value={detail}
                multiline
                rows={5}
                onChange={(e) => setDetail(e.target.value)}
                fullWidth
                label="Detail Slot"
                inputProps={{
                  maxLength: 1000,
                }}
                error={ !regex.test(detail)}
              helperText={!regex.test(detail) && "Can not input special character"}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            {topic.trim().length && timeAllocation.trim().length && disable && regex.test(detail)  ? (
              <Button variant="contained" onClick={() => handleCreateSlot()} autoFocus>
                Create Slot
              </Button>
            ) : (
              <Button disabled variant="contained" onClick={() => handleCreateSlot()} autoFocus>
                Create Slot
              </Button>
            )}
          </DialogActions>
        </form>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Slot Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
    </div>
  );
}

export default CreateSlot;
