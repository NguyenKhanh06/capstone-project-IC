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
  Link,
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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deepOrange } from '@mui/material/colors';
import dayjs from 'dayjs';

import DetailCmt from './DetailCmt';

function DetailTask(props) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const staffcheck = JSON.parse(sessionStorage.getItem("staff"));

  const regex = /^[\w\s]*$/
  const [open, setOpen] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [comment, setComment] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(0);
  const [statusTask, setStatusTask] = useState(0);
  const [member, setMember] = useState(null);
  const [task, setTask] = useState([]);
  const [disableBtn, setDisable] = useState(false);
  const [disableCmt, setDisableCmt] = useState(false);
  const [staff, setStaff] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [cmtTask, setcmtTask] = useState([]);
  const [fileCmt, setFileCmt] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [viewMember, setViewMember] = useState(false);
  const [showCmt, setShowCmt] = useState(false);
  
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const [cmt, setCmt] = useState([])

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
  const handleClickOpenConfirmDelete = (id) => {
    setID(id);
    setShowConfirmDelete(true);
  };
  const handleClickCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };
  const handleSuccess = (data) => {
    setShowSuccess(true);
    setMessage(data);
  };
  function reload() {
    window.location.reload(false);
  }
  const handleClose = () => {
    setOpen(
      props.close
     , () => {
    props.resetInputData();
   });

    // setOpen(props.close);
    // props.reset
  };

  const fetchData = async () => {
    await axios.get(`https://localhost:7115/api/v1/task/getTaskDetaul/${props.task.id}`).then((response) => {
      setTask(response.data.responseSuccess[0]);
      setStaff(response.data.responseSuccess[0].assignTasks[0]?.staffs);
      setTaskName(response.data.responseSuccess[0].taskName);
      setDeadline(dayjs(response.data.responseSuccess[0].deadLine));
      setDescription(response.data.responseSuccess[0].description);

      setStatus(response.data.responseSuccess[0].status);
      setMember(response.data.responseSuccess[0].assignTasks[0]);
    });
  };



  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('TaskName', taskName);

    formData.append('Description', description);
    formData.append('Deadline', deadline);
    formData.append('DateCreate', props.task.deadLine);
    formData.append('DateEnd', props.task.deadLine);
    formData.append('State', 0);
    formData.append('Status', status);
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
          handleSuccess('Update Task Successful!!!');
          setTimeout(() => {
            reload();
          }, 3000);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };

  const handleSubmitComment = (e) => {
    const formData = new FormData();
    formData.append('Comment', comment);
    formData.append('TaskId', task.id);
    formData.append('FormFile', fileCmt);
    axios({
      method: 'POST',
      data: formData,
      url: 'https://localhost:7115/api/v1/comment/createCommentTask',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => {
      setComment("")
      setFileCmt()
      fetchDataComment()
    })
  };
  const fetchDataComment = async () => {
    await axios.get(`https://localhost:7115/api/v1/comment/GetCommentInTask`).then((response) => {
      console.log("cmt", response)
      setcmtTask(response.data.responseSuccess.filter(cmt => cmt.tasksId === props.task.id) );
    });
  };


  const data = {
    taskId: props.task.id,
    taskStatus: 0,
  };

  const handleUpdateStatus = () => {
    axios
      .post(`https://localhost:7115/api/v1/task/changeStatus/${props.task.id}`, data)
     
  };

  const handleDeleteComment = () => {
    axios.delete(`https://localhost:7115/api/v1/comment/delete/${id}`).then((response) => {
      if (response.data.isSuccess) {
        setShowConfirmDelete(false)
        handleSuccess('Delete successfull!!!');
        setTimeout(reload(), 3000);
      }
    })
    .catch((err) => {
      handleError(err.response.data.responseSuccess);
    });
  }
  const handleDelete = (id) => {
    axios
      .post(`https://localhost:7115/api/v1/task/unassign/${props.task.id}?staffId=${id}`)
      .then((response) => {
        handleUpdateStatus();
        if (response.data.isSuccess) {
          handleSuccess('Unassign member successfull!!!');
          setTimeout(reload(), 3000);
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };
  const handleChangeComment = (e) => {
    setComment(e.target.value);
    if (e.target.value) {
      setDisableCmt(true);
    } else {
      setDisableCmt(false);
    }
  };
  const onChangeFile = (e) => {
    setFileCmt(e.target.files[0]);
    if (e.target.files[0]) {
 
      setDisableCmt(true);
    } else {
      setDisableCmt(false);
    }
  };
  const handleShowCmt = (data) => {
    setShowCmt(true)
    setCmt(data)
  };
  useEffect(() => {
    if (props.task) {
      fetchData();
fetchDataComment()
      // setTaskName(props.task.taskName);
      // setDeadline(dayjs(props.task.deadLine));
      // setDescription(props.task.description);
      // setStatus(props.task.status);
    }
  }, [props.task]);


 const removeImage = () => {
    setFileCmt({
        selectedFile: undefined,
        selectedFileName: undefined,
        imageSrc: undefined,
        value: ''
    })}
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
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <DialogTitle id="alert-dialog-title">Detail Task</DialogTitle>
            <IconButton onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>

          <Divider variant="middle" />

          <DialogContent>
            <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={3}>
              <TextField
                value={taskName}
                onChange={(e) => {
                  setTaskName(e.target.value);
                  setDisable(true);
                }}
                required
                fullWidth
                label="Task Name"
                error={ !regex.test(taskName)}
                helperText={!regex.test(taskName) && "Can not input special character"}
              />
              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <Typography>Members:</Typography>
                {member && (
                  <Chip  label={member?.staffs?.staffCode} />
                ) }
              </Stack>

              <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                <DatePicker
                  required
                  disablePast
                  sx={{ width: '50%' }}
                  label="Deadline"
                  value={deadline}
                  onChange={(newValue) => {
                    setDeadline(newValue);
                    setDisable(true);
                  }}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
              <FormControl style={{ width: '50%' }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                {props.task.status === 2 || props.task.status === 3 ? (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setDisable(true);
                    }}
                    defaultValue={props.task.status}
                  >
                    <MenuItem style={{ display: 'none' }} value={0}>
                      To Do
                    </MenuItem>
                    <MenuItem style={{ display: 'none' }} value={1}>
                      Process
                    </MenuItem>
                    <MenuItem style={{ display: 'none' }} value={2}>
                      Review
                    </MenuItem>
                    <MenuItem value={3}>Reject</MenuItem>
                    <MenuItem value={4}>Done</MenuItem>
                  </Select>
                ) : (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={(e) => {
                      setStatus(e.target.value);
                      setDisable(true);
                    }}
                    defaultValue={props.task.status}
                  >
                    <MenuItem style={{ display: 'none' }} value={0}>
                      To Do
                    </MenuItem>
                    <MenuItem style={{ display: 'none' }} value={1}>
                      Process
                    </MenuItem>
                    <MenuItem style={{ display: 'none' }} value={2}>
                      Review
                    </MenuItem>
                    <MenuItem style={{ display: 'none' }} value={3}>
                      Reject
                    </MenuItem>
                    <MenuItem style={{ display: 'none' }} value={4}>
                      Done
                    </MenuItem>
                  </Select>
                )}
              </FormControl>
              <TextField
                placeholder="Task Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDisable(true);
                }}
                multiline
                rows={5}
                fullWidth
              />
            </Stack>
          </DialogContent>
       

          <Divider variant="middle" style={{ marginTop: 20 }} />
          <DialogTitle id="alert-dialog-title">Comment Task</DialogTitle>
          <DialogContent>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} style={{ paddingTop: 10 }}>
              <TextField
                fullWidth
                multiline
                value={comment}
                onChange={handleChangeComment}
                label="Comment"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="File attack">
                        <IconButton onChange={onChangeFile}  aria-label="upload picture" component="label">
                          <input hidden type="file" />
                          <AttachFileIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
              {fileCmt && <Stack>
                <p>{fileCmt.name}</p>
                
      
                </Stack>}
              {/* <Tooltip title="File attack">
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" />
                  <AttachFileIcon fontSize="inherit" />
                </IconButton>
              </Tooltip> */}

              
            </Stack>
            {/* <img
                style={{ maxWidth: '300px', maxHeight: '300px', marginTop: 20 }}
                src="https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg"
                alt="imgcmt"
              /> */}
            {cmtTask
              ? cmtTask.map((cmt, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#F8F8F8',
                      width: '100%',
                      padding: '10px 5px 10px 20px',
                      borderRadius: '20px',
                      marginTop: '20px',
                    }}
                  >
                    <b>{cmt?.fullName}</b>
                    <Typography
                      sx={{
                        float: 'left',
                        marginRight: '60%',
                        fontSize: 'small',

                        color: '#8F8E8E',
                      }}
                    >
                       {cmt?.checkEdit && <p>Edited</p>}
                      {dayjs(cmt?.dateCreated).format('DD/MM/YYYY')}
                    </Typography>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Box>
             {cmt?.fileUrl && <Link href={cmt?.fileUrl}>File Attack</Link>}
                    {cmt?.comment && <p>{cmt?.comment}</p>}
              </Box>  

           
           
          </Stack> 
            
                  </Box>
                ))
              : null}
      
     
          </DialogContent>
        </form>
  
       
        
      
        <DetailCmt show={showCmt} close = {() => setShowCmt(false)} cmt={cmt} fetchDataComment={fetchDataComment}/>

      </Dialog>
    </div>
  );
}

export default DetailTask;
