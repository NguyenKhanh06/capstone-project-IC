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
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useEffect, useState, useCallback } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import dayjs from 'dayjs';
import SuccessAlert from '../Alert/SuccessAlert';
import ErrorAlert from '../Alert/ErrorAlert';
import DetailCmt from '../Header/Task/DetailCmt';

function DetailTaskMember(props) {
  const staff = JSON.parse(sessionStorage.getItem('staff'));

  const [open, setOpen] = useState(false);
  const [disableBtn, setDisable] = useState(false);
  const [deadline, setDeadline] = useState(null);
  const [disableCmt, setDisableCmt] = useState(false);

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(0);
  const [statusTask, setStatusTask] = useState(0);
  const [member, setMember] = useState([]);
  const [task, setTask] = useState([]);
  const [cmtTask, setcmtTask] = useState([]);
  const [comment, setComment] = useState('');
  const [fileCmt, setFileCmt] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCmt, setShowCmt] = useState(false);
  const [cmt, setCmt] = useState([]);
  const [id, setID] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);


  const handleClickOpenConfirmDelete = (id) => {
    setID(id);
    setShowConfirmDelete(true);
  };
  const handleClickCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };
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
  const handleSuccess = (data) => {
    setShowSuccess(true);
    setMessage(data);
  };

  const handleShowCmt = (data) => {
    setShowCmt(true);
    setCmt(data);
  };
  const handleDeleteComment = () => {
    axios.delete(`https://localhost:7115/api/v1/comment/delete/${id}`).then((response) => {
      if (response.data.isSuccess) {
        setShowConfirmDelete(false)
        handleSuccess('Delete successfull!!!');
        fetchDataComment()
      }
    })
    .catch((err) => {
      handleError(err.response.data.responseSuccess);
    });
  }
  const fetchData = () => {

    axios.get(`https://localhost:7115/api/v1/task/getTaskDetaul/${props.task.id}`).then((response) => {
      console.log("task", response)
      setTask(response.data.responseSuccess[0]);
      setTaskName(response.data.responseSuccess[0].taskName);
      setDeadline(dayjs(response.data.responseSuccess[0].deadLine));
      setDescription(response.data.responseSuccess[0].description);
      setMember(response.data.responseSuccess[0].assignTasks[0]);
    });
  };

  useEffect(() => {
    if (props.task != null) {
      fetchData();

      setTaskName(props.task.taskName);
      setDeadline(dayjs(props.task.deadLine));
      setDescription(props.task.description);
      setStatus(props.task.status);
    }
  }, [props.task]);

  const handleUpdate = () => {
   
    const formData = new FormData();
    formData.append('TaskStatus', status);
    formData.append('TaskId', props.task.id,);

    axios({
      method: 'POST',
      data: formData,
      url: `https://localhost:7115/api/v1/task/changeStatus`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }) .then((response) => {
      setShowConfirm(false);
      if (response.data.isSuccess) {
        handleSuccess('Update Task Successfull!!!!')
        setTimeout(() => {
          reload();
        }, 2000);
      }
    })
    .catch((err) => {
      handleError(err.response.data.responseSuccess);
    });
   
  };
  const handleSubmitComment = (e) => {
    const formData = new FormData();
    formData.append('FormFile', fileCmt);
    formData.append('Comment', comment);
    formData.append('TaskId', task.id);
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

  console.log("task", props)


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
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
              <DialogTitle id="alert-dialog-title">Detail Task</DialogTitle>

              <Box>
                {props.task.status === 0 ? (
                  <Chip label="To do" color="warning" />
                ) : props.task.status === 1 ? (
                  <Chip label="Process" color="primary" />
                ) : props.task.status === 2 ? (
                  <Chip label="Review" color="secondary" />
                ) : props.task.status === 3 ? (
                  <Chip label="Reject" color="error" />
                ) : props.task.status === 4 ? (
                  <Chip label="Done" color="success" />
                ) : null}
              </Box>
            </Stack>
            <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>

          <Divider variant="middle" />

          <DialogContent>
            <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={3}>
              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <Typography variant="h6">Task Name:</Typography>
                <Typography>{taskName}</Typography>
              </Stack>
              {/* <TextField value={taskName} onChange={(e) => setTaskName(e.target.value)} required fullWidth label="Task Name" /> */}
              {/* <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
              <Typography variant='h6'>Members:</Typography>
              <Tooltip title="Nguyen Cong Khanh (K13 HCM)/To do">
              <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        alt={member.staffCode}
        src="/broken-image.jpg"
      />
              </Tooltip>
  
    </Stack> */}
              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <Typography variant="h6">Deadline:</Typography>
                <Typography>{dayjs(props.task.deadLine).format('DD/MM/YYYY')}</Typography>
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <Typography variant="h6">Description:</Typography>
                <Typography>{props.task.description}</Typography>
              </Stack>

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
              <FormControl style={{ width: '50%' }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                {props.task.status === 3 ? (
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
                    <MenuItem disabled style={{ display: 'none' }} value={0}>
                      To Do
                    </MenuItem>
                    <MenuItem value={1}>Process</MenuItem>
                    <MenuItem style={{ display: 'none' }} value={2}>
                      Review
                    </MenuItem>
                    <MenuItem disabled style={{ display: 'none' }} value={3}>
                      Reject
                    </MenuItem>
                    <MenuItem disabled style={{ display: 'none' }} value={4}>
                      Done
                    </MenuItem>
                  </Select>
                ) : props.task.status === 0 ? (
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
                    <MenuItem disabled style={{ display: 'none' }} value={0}>
                      To Do
                    </MenuItem>
                    <MenuItem value={1}>Process</MenuItem>
                    <MenuItem style={{ display: 'none' }} value={2}>
                      Review
                    </MenuItem>
                    <MenuItem disabled style={{ display: 'none' }} value={3}>
                      Reject
                    </MenuItem>
                    <MenuItem disabled style={{ display: 'none' }} value={4}>
                      Done
                    </MenuItem>
                  </Select>
                ) : props.task.status === 1 ? (
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
                    <MenuItem disabled style={{ display: 'none' }} value={0}>
                      To Do
                    </MenuItem>
                    <MenuItem style={{ display: 'none' }} value={1}>
                      Process
                    </MenuItem>
                    <MenuItem value={2}>Review</MenuItem>
                    <MenuItem disabled style={{ display: 'none' }} value={3}>
                      Reject
                    </MenuItem>
                    <MenuItem disabled style={{ display: 'none' }} value={4}>
                      Done
                    </MenuItem>
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
                    <MenuItem disabled style={{ display: 'none' }} value={0}>
                      To Do
                    </MenuItem>
                    <MenuItem style={{ display: 'none' }} value={1}>
                      Process
                    </MenuItem>
                    <MenuItem style={{ display: 'none' }} value={2}>
                      Review
                    </MenuItem>
                    <MenuItem disabled style={{ display: 'none' }} value={3}>
                      Reject
                    </MenuItem>
                    <MenuItem disabled style={{ display: 'none' }} value={4}>
                      Done
                    </MenuItem>
                  </Select>
                )}
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions style={{ paddingTop: 20, marginRight: 6 }}>
            {/* <Button onClick={handleClose}>Close</Button> */}
            {disableBtn ? (
              <Button variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
                Save
              </Button>
            ) : (
              <Button disabled variant="contained" onClick={() => handleUpdate()} autoFocus>
                Save
              </Button>
            )}
          </DialogActions>

          <Divider variant="middle" style={{ marginTop: 20 }} />
          <DialogTitle id="alert-dialog-title">Comment Task</DialogTitle>
          <DialogContent>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} style={{ paddingTop: 10 }}>
              <TextField
                fullWidth
                value={comment}
                onChange={handleChangeComment}
                label="Comment"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="File attack">
                        <IconButton onChange={onChangeFile} aria-label="upload picture" component="label">
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
              {disableCmt ? (
                <Button onClick={() => handleSubmitComment()} variant="contained">
                  Comment
                </Button>
              ) : (
                <Button disabled onClick={() => handleSubmitComment()} variant="contained">
                  Comment
                </Button>
              )}
            </Stack>
            {/* <img
                style={{ maxWidth: '300px', maxHeight: '300px', marginTop: 20 }}
                src="https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg"
                alt="imgcmt"
              /> */}
            {cmtTask?.length
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
                    <b>{cmt.fullName}</b>
                    <Typography
                      sx={{
                        float: 'left',
                        marginRight: '60%',
                        fontSize: 'small',
                        color: '#8F8E8E',
                      }}
                    >
                      {cmt.checkEdit && <p>Edited</p>}
                      {dayjs(cmt.created).format('DD/MM/YYYY')}
                    </Typography>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                      <Box>
                        {cmt?.fileUrl && <Link href={cmt.fileUrl}>File Attack</Link>}
                        {cmt?.comment && <p>{cmt?.comment}</p>}
                      </Box>

                      {cmt?.staffId === staff[0]?.id ? (
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                          <Tooltip title="Edit comment">
                            <IconButton onClick={() => handleShowCmt(cmt)}>
                              <EditOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Comment">
                          <IconButton onClick={() => handleClickOpenConfirmDelete(cmt.id)}>
                <DeleteOutlineOutlinedIcon color='error'/>
              </IconButton>
                          </Tooltip>
                        </Stack>
                      ) : (
                        <></>
                      )}
                    </Stack>

                    {/* <img
              style={{ maxWidth: '300px', maxHeight: '300px' }}
              src="https://img-19.commentcamarche.net/cI8qqj-finfDcmx6jMK6Vr-krEw=/1500x/smart/b829396acc244fd484c5ddcdcb2b08f3/ccmcms-commentcamarche/20494859.jpg"
              alt="imgcmt"
            /> */}
                  </Box>
                ))
              : null}
          </DialogContent>
        </form>
        <Dialog
          open={showConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Update Task Status</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Change Status?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button variant="contained" onClick={() => handleUpdate()} autoFocus>
              Change
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={showConfirmDelete}
          onClose={handleClickCloseConfirmDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle id="alert-dialog-title">{'Delete Comment!'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You want to delete this comment?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickCloseConfirmDelete}>Cancel</Button>
            <Button variant="contained" onClick={() => handleDeleteComment(id)} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <DetailCmt show={showCmt} close={() => setShowCmt(false)} cmt={cmt} fetchDataComment={fetchDataComment}/>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={message} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />

      </Dialog>
    </div>
  );
}

export default DetailTaskMember;
