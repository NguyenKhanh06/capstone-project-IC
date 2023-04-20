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
import AssignMember from './AssignMember';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';

function CreateSubTask(props) {
  const regex = /^[\w\s]*$/
  const [open, setOpen] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [viewMember, setViewMember] = useState(false);
  const [member, setMember] = useState([]);
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

  const handleCreateSubTask = () => {
    axios
      .post(
        `https://api.ic-fpt.click/api/v1/task/create?TaskName=${taskName}&ParentTaskId=${props.taskID}&Description=${description}&DeadLine=${deadline.add(1, 'day')}&ProjectId=${props.project.id}&MileStoneId=${props.mileStoneID}&StaffId=${member.staffId}`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          props.getDetail()
          setTimeout(() => {
          
            props.closeSub()
            setShowSuccess(false)
          
            handleClose()
          }, 1000);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };

  const handleCreateSubTask2 = () => {
    axios
      .post(
        `https://api.ic-fpt.click/api/v1/task/create?TaskName=${taskName}&ParentTaskId=${props.taskID}&Description=${description}&DeadLine=${deadline.add(1, 'day')}&ProjectId=${props.project.id}&MileStoneId=${props.mileStoneID}`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
  

          props.getDetail()
setTimeout(() => {

  props.closeSub()
  setShowSuccess(false)

  handleClose()
}, 1000);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };

  const handleSubmit = () => {
    if(member.length !== 0 ){
      handleCreateSubTask()
    }else{
      handleCreateSubTask2()
    }
  }

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
        <form>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Create Task</DialogTitle>
          <IconButton style={{marginRight: 3}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" />

          <DialogTitle style={{ marginBottom: 10 }} id="alert-dialog-title">
            <TextField required fullWidth label="Task Name" onChange={(e) => setTaskName(e.target.value)}
               error={ !regex.test(taskName)}
               helperText={!regex.test(taskName) && "Can not input special character"}
            />
          </DialogTitle>

          <DialogContent>
            <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={3}>
              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <Typography>Members:</Typography>
                {member?.length !== 0 ? <Chip label={member?.staffs?.staffCode} /> : null}
                <Button onClick={() => setViewMember(true)}>Choose Member</Button>
              </Stack>
              <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  maxDate={dayjs(props. deadline.deadLine)}
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
      
            {taskName.length && deadline && regex.test(taskName) ?   <Button variant="contained" onClick={() => handleSubmit()}  autoFocus>
              Create Task
            </Button> :   <Button disabled variant="contained" onClick={() => handleSubmit()}  autoFocus>
              Create Task
            </Button>}
          
          </DialogActions>
        </form>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Task Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
      <AssignMember project={props.project?.id} setMember={setMember} show={viewMember} close={() => setViewMember(false)} />
    </div>
  );
}

export default CreateSubTask;
