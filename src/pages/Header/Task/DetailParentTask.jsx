import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
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
    Tooltip,
    Typography,
  } from '@mui/material';
  import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
  import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { useEffect, useState } from 'react';
  import AttachFileIcon from '@mui/icons-material/AttachFile';
  import { deepOrange } from '@mui/material/colors';
  import dayjs from 'dayjs';
  import SuccessAlert from '../../Alert/SuccessAlert';
  import ErrorAlert from '../../Alert/ErrorAlert';
  
  function DetailParentTask(props) {
    const regex = /^[\w\s]*$/
    const [open, setOpen] = useState(false);
    const [deadline, setDeadline] = useState(null);
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState(null);
    const [statusTask, setStatusTask] = useState(0);
    const [member, setMember] = useState([]);
    const [task, setTask] = useState([]);
    const [staff, setStaff] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');
    const [cmtTask, setcmtTask] = useState([]);
    const [fileCmt, setFileCmt] = useState(null)
  const [disableBtn, setDisable] = useState(false);
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
  
  
  
    // const fetchData = async () => {
    //  await axios.get(`https://localhost:7115/api/v1/task/getTaskDetaul/${props.task.id}`).then((response) => {
    //     setTask(response.data.responseSuccess[0]);
    //     setStaff(response.data.responseSuccess[0].assignTasks[0]?.staffs);
    //     setTaskName(response.data.responseSuccess[0].taskName);
    //     setDeadline(dayjs(response.data.responseSuccess[0].deadLine));
    //     setDescription(response.data.responseSuccess[0].description);
    //     setMember(response.data.responseSuccess[0].assignTasks[0]);
  
    //   });
    // };
  
    useEffect(() => {
      if (props.task != null) {
        // fetchData();
        setTaskName(props.task.taskName);
        setDeadline(dayjs(props.task.deadLine));
        setDescription(props.task.description);
        setState(props.task.state);
      }
    }, [props.task]);
    const handleUpdate = () => {
      const formData = new FormData();
      formData.append('TaskName', taskName);
      formData.append('Description', description);
      formData.append('Deadline', deadline);
      formData.append('DateCreate', props.task.deadLine);
      formData.append('DateEnd', props.task.deadLine);
      formData.append('State', state);
      formData.append('Status', 0);
      formData.append('ProjectId', props.task.projectId);
      formData.append('MileStoneId', props.task.mileStoneId);
  
      axios({
        method: 'PUT',
        data: formData,
        url: `https://localhost:7115/api/v1/task/update/${props.task.id}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {

          if (response.data.isSuccess) {
            setShowSuccess(true);

            setTimeout(() => {
window.location.reload()
              }, 1000)
          }
        })
        .catch((err) => {
          handleError(err.response.data.responseSuccess);
        });
  
      // const handleDelete = (id) => {
      //   axios.post(`https://localhost:7115/api/v1/task/unassign/${props.task.id}?staffId=${id}`)
      // }
  
      const handleDelete = () => {
        console.info('You clicked the delete icon.');
      };
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
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <DialogTitle id="alert-dialog-title">Detail Task</DialogTitle>
            {props.task.state === 0 ? (
                     <Chip label="To do" color="warning" />
                   ) : props.task.state === 1 ? (
                     <Chip label="Process" color="primary" />
                   ) : (
                     <Chip label="Done" color="success" />
                   )}
         
          </Stack>
            
                   
          <IconButton style={{marginRight: 6}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
            </Stack>
           
            <Divider variant="middle" />
  
            <DialogContent>
              <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={3}>
                <TextField
                  value={taskName}
                  onChange={(e) => { setTaskName(e.target.value); if(e.target.value){
                   
                    setDisable(true)
                  };}}
                  required
                  fullWidth
                  label="Task Name"
                  error={ !regex.test(taskName)}
                helperText={!regex.test(taskName) && "Can not input special character"}
                />
      
                <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                  <DatePicker
                    required
                    disablePast
                    sx={{ width: '50%' }}
                    label="Deadline"
                    value={deadline}
                    onChange={(newValue) => {
                      setDeadline(newValue);
                      setDisable(true)
                    }}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider>
                <FormControl style={{ width: '50%' }}>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="Status"
                    onChange={(e) => {setState(e.target.value); setDisable(true)}}
                    defaultValue={props.task.status}
                  >
                    <MenuItem value={0}>To Do</MenuItem>
                    <MenuItem value={1}>Process</MenuItem>
                    <MenuItem value={2}>Done</MenuItem>

                  </Select>
                </FormControl>
                <TextField
                  value={description}
                  onChange={(e) => {setDescription(e.target.value); setDisable(true)}}
                  multiline
                  rows={5}
                  fullWidth
                  placeholder="Task Description"
                />
              </Stack>
            </DialogContent>
            <DialogActions style={{ paddingTop: 20, marginRight: 10 }}>
       
              {disableBtn && regex.test(taskName) ? <Button variant="contained" onClick={() => setShowConfirmUpdate(true)} autoFocus>
              Save
            </Button> : <Button disabled variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
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
        <DialogTitle id="alert-dialog-title">Update Task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You Want To Update Task?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button variant="contained"  onClick={() => handleUpdate()} autoFocus>
            Accept
          </Button>
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Task Successful!'} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
          
        </Dialog>
      </div>
    );
  }
  
  export default DetailParentTask;
  