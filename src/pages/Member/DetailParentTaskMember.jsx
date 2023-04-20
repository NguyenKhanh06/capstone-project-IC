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
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

  import axios from 'axios';
  import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { useEffect, useState } from 'react';
  import AttachFileIcon from '@mui/icons-material/AttachFile';
  import { deepOrange } from '@mui/material/colors';
  import dayjs from 'dayjs';
  import SuccessAlert from '../Alert/SuccessAlert';
  import ErrorAlert from '../Alert/ErrorAlert';
  
  function DetailParentTaskMember(props) {
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
    //  await axios.get(`https://api.ic-fpt.click/api/v1/task/getTaskDetaul/${props.task.id}`).then((response) => {
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
    // const handleUpdate = () => {
    //   const formData = new FormData();
    //   formData.append('TaskName', taskName);
    //   formData.append('Description', description);
    //   formData.append('Deadline', deadline);
    //   formData.append('DateCreate', props.task.deadLine);
    //   formData.append('DateEnd', props.task.deadLine);
    //   formData.append('State', state);
    //   formData.append('Status', 0);
    //   formData.append('ProjectId', props.task.projectId);
    //   formData.append('MileStoneId', props.task.mileStoneId);
  
    //   axios({
    //     method: 'PUT',
    //     data: formData,
    //     url: `https://api.ic-fpt.click/api/v1/task/update/${props.task.id}`,
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //     .then((response) => {
    //         console.log(response)
    //       if (response.data.isSuccess) {
    //         setShowSuccess(true);
    //         setTimeout(() => {
    //             reload()
    //           }, 3000)
    //       }
    //     })
    //     .catch((err) => {
    //       handleError(err.response.data.responseSuccess);
    //     });
  
    //   // const handleDelete = (id) => {
    //   //   axios.post(`https://api.ic-fpt.click/api/v1/task/unassign/${props.task.id}?staffId=${id}`)
    //   // }
  
    //   const handleDelete = () => {
    //     console.info('You clicked the delete icon.');
    //   };
    // };
  

  
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
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                <Typography variant='h6'>Task Name: </Typography>

                    <Typography>{props.task.taskName}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                <Typography variant='h6'>Task Name: </Typography>

                    <Typography>{dayjs(props.task.deadLine).format("DD/MM/YYYY")}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                <Typography variant='h6'>Task Name: </Typography>

                    <Typography>{props.task.description}</Typography>
                </Stack>
                {/* <TextField
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  required
                  fullWidth
                  label="Task Name"
                />
       */}
                {/* <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                  <DatePicker
                    required
                    disablePast
                    sx={{ width: '50%' }}
                    label="Deadline"
                    value={deadline}
                    onChange={(newValue) => {
                      setDeadline(newValue);
                    }}
                    format="DD/MM/YYYY"
                  />
                </LocalizationProvider> */}
                {/* <FormControl style={{ width: '50%' }}>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="Status"
                    onChange={(e) => setState(e.target.value)}
                    defaultValue={props.task.status}
                  >
                    <MenuItem value={0}>To Do</MenuItem>
                    <MenuItem value={1}>Process</MenuItem>
                    <MenuItem value={2}>Done</MenuItem>

                  </Select>
                </FormControl> */}
                {/* <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  multiline
                  rows={5}
                  fullWidth
                  label="Task Description"
                /> */}
              </Stack>
            </DialogContent>
            <DialogActions style={{ paddingTop: 20, marginRight: 10 }}>
             
              {/* <Button variant="contained" onClick={() => handleUpdate()} autoFocus>
                Save & Close
              </Button> */}
            </DialogActions>
          </form>
          {/* <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Task Successful!'} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} /> */}
        </Dialog>
      </div>
    );
  }
  
  export default DetailParentTaskMember;
  