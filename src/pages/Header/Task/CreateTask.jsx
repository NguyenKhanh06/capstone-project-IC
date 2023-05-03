import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import dayjs from 'dayjs';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';

function CreateTask(props) {
  const regex = /^[\w\s]*$/
  const [open, setOpen] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChangeSelect = (event, value) => setSelectedOptions(value);
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

  const handleCreateTask = () => {
    axios
      .post(
        `https://api.ic-fpt.click/api/v1/task/create?TaskName=${taskName}&Description=${description}&DeadLine=${deadline.add(1, 'day')}&ProjectId=${props.projectid}&MileStoneId=${props.mileStoneId}`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
    props.getDetail()

    setTimeout(() => {
      setShowSuccess(false);

      handleClose()
    }, 1000);
        }
      })
      .catch((err) => {
        handleError('Create fail!!!!');
      });
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
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Create Task</DialogTitle>
          <IconButton onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
        
          <Divider variant="middle" />

          <DialogTitle style={{ marginBottom: 10 }} id="alert-dialog-title">
            <TextField required fullWidth label="Task Name" onChange={(e) => setTaskName(e.target.value)} 
            
            inputProps={{
              maxLength: 255,
             
            }} 
            />
       
          </DialogTitle>

          <DialogContent>
            <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={3}>
              <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  minDate={dayjs(props?.deadline?.dateBegin).add(1, 'day')}
                  maxDate={dayjs(props?.deadline?.dateEnd).add(1, 'day')}
                  sx={{ width: '50%' }}
                  label="Deadline"
                  value={deadline}
                  onChange={(newValue) => {
                    setDeadline(newValue);
                  }}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
              <TextField
                multiline
                rows={5}
                fullWidth
                label="Task Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Stack>
          </DialogContent>
          <DialogActions style={{ padding: 20 }}>
            {taskName.trim().length && deadline ? (
              <Button variant="contained" onClick={() => handleCreateTask()} autoFocus>
                Create Task
              </Button>
            ) : (
              <Button disabled variant="contained" onClick={() => handleCreateTask()} autoFocus>
                Create Task
              </Button>
            )}
          </DialogActions>
        </form>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Task Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
    </div>
  );
}

export default CreateTask;
