import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import dayjs from 'dayjs';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

import Iconify from '../../../components/iconify/Iconify';
import Label from '../../../components/label/Label';
import Scrollbar from '../../../components/scrollbar/Scrollbar';
import { UserListToolbar } from '../../../sections/@dashboard/user';
import CreateTask from './CreateTask';
import DetailTask from './DetailTask';  
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import CreateSubTask from './CreateSubTask';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import DetailParentTask from './DetailParentTask';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { API_URL } from '../../../config/apiUrl/apis-url';

function ListSubTask(props) {
  const regex = /^[\w\s]*$/
  const columns = [
    {
      field: 'taskName',
      headerName: 'Task Name',
      flex: 1,
    },

    {
      field: 'dateCreated',
      headerName: 'Create Date',
      flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'deadLine',
      headerName: 'Deadline',
      flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'state',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.row?.status === 0 ? (
              <Chip label="To do" color="warning" />
            ) : params.row?.status === 1 ? (
              <Chip label="Process" color="primary" />
            ) : params.row?.status === 2 ? (
              <Chip label="Review" color="secondary" />
            ) : params.row?.status === 3 ? (
              <Chip label="Reject" color="error" />
            ) : params.row?.status === 4 ? (
              <Chip label="Done" color="success" />
            ) : null}
          </>
        );
      },
    },
    {
      headerName: 'Action',
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
    
          <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
            <Tooltip title="View Detail">
              <IconButton onClick={() => handleViewDetail(params.row)} aria-label="delete">
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
          <IconButton onClick={() => handleShowConfirm(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
          </Stack>
        );
      },
    },
  ];

  const [open, setOpen] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDetailParent, setShowDetailParent] = useState(false);
  const [task, setTask] = useState([]);
  const [deadline, setDeadline] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [id, setID] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [state, setState] = useState(null);
  const [childTask, setChildTask] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [disableBtn, setDisable] = useState(false);
    const [showConfirmUpdate, setShowConfirmUpdate] = useState(false);
  const [message, setMessage] = useState('');
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };

  const handleShowConfirm = (data) => {
    setID(data);
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };

  const handleShowConfirmUpdate = (data) => {
    setID(data);
    setShowConfirmUpdate(true);
  };

  const handleCloseConfirmUpdate = (data) => {
    setShowConfirmUpdate(false);
  };
  const handleClose = () => {
    setOpen(props.close);
  };

  const handleViewDetail = (data) => {
    setShowDetail(true);
    setTask(data);
  };
  function reload() {
    window.location.reload(false);
  }
const handleDeleteTask = () => {
  axios.put(`${API_URL}/task/DisableTask/${id}`).then((response) => {

    if (response.data.isSuccess) {
   setShowSuccess(true)
getChildTask()
setTimeout(() => {
  handleCloseConfirm()
  setShowSuccess(false)

}, 1000);

   
    }
  })
  .catch((err) => {
    handleError('Delete fail!');
  });
}
const getChildTask = async () => {
 await axios.get(`${API_URL}/task/GetChildTask/${props.state.id}`).then(response => {
 
    setChildTask(response.data.responseSuccess.filter(task => task.status !== 5))
  })
}

  useEffect(() => {
    if (props.state != null) {
     getChildTask()
      setTaskName(props.state.taskName);
      setDeadline(dayjs(props.state.deadLine));
      setDescription(props.state.description);
      setState(props.state.state);
    }
  }, [props.state]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('TaskName', taskName);
    if(description )
   {
    formData.append('Description', description)
   }else{
    formData.append('Description', '')
   }
  
    formData.append('Deadline', deadline);
    formData.append('DateCreate', props.state.deadLine);
    formData.append('DateEnd', props.state.deadLine);
    formData.append('State', state);
    formData.append('Status', 0);
    formData.append('ProjectId', props.state.projectId);
    formData.append('PhaseId', props.state.phaseId);

    axios({
      method: 'PUT',
      data: formData,
      url: `${API_URL}/task/update/${props.state.id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {

        if (response.data.isSuccess) {
          setShowSuccess(true);
          props.getDetail()
          setTimeout(() => {
            setShowSuccess(false);
            handleClose()
            handleCloseConfirmUpdate()

            }, 1000)
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });

    // const handleDelete = (id) => {
    //   axios.post(`${API_URL}/task/unassign/${props.task.id}?staffId=${id}`)
    // }

    const handleDelete = () => {
      console.info('You clicked the delete icon.');
    };
  };
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={props.show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form>
        <DialogTitle id="alert-dialog-title">
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} >
            <Typography variant="h4" gutterBottom>
              {props.state.taskName}
            </Typography>
            {props.state.state === 0 ? (
              <Chip label="To do" color="warning" />
            ) : props.state.state === 1 ? (
              <Chip label="Process" color="primary" />
            ) : (
              <Chip label="Done" color="success" />
            )}

            </Stack>
            <IconButton onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
        </DialogTitle>



        <DialogContent>
          <>
          <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={3} style={{marginTop: 10}}>
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
                  {props.state.state ===  2 ?<Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="Status"
                    onChange={(e) => {setState(e.target.value); setDisable(true)}}
                    defaultValue={props.state.state}
                  >
                    
                    <MenuItem style={{ display: 'none' }} value={0}>To Do</MenuItem>
                    <MenuItem style={{ display: 'none' }} value={1}>Process</MenuItem>
                    <MenuItem style={{ display: 'none' }} value={2}>Done</MenuItem>

                  </Select> :  props.state.state ===  0 ?<Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="Status"
                    onChange={(e) => {setState(e.target.value); setDisable(true)}}
                    defaultValue={props.state.state}
                  >
                    
                    <MenuItem style={{ display: 'none' }} value={0}>To Do</MenuItem>
                    <MenuItem value={1}>Process</MenuItem>
                    <MenuItem style={{ display: 'none' }} value={2}>Done</MenuItem>

                  </Select> : props.state.state ===  1 ? <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="Status"
                    onChange={(e) => {setState(e.target.value); setDisable(true)}}
                    defaultValue={props.state.state}
                  >
                    
                    <MenuItem style={{ display: 'none' }}  value={0}>To Do</MenuItem>
                    <MenuItem style={{ display: 'none' }}  value={1}>Process</MenuItem>
                    <MenuItem value={2}>Done</MenuItem>

                  </Select> :<Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="Status"
                    onChange={(e) => {setState(e.target.value); setDisable(true)}}
                    defaultValue={props.state.state}
                  >
                    
                    <MenuItem value={0}>To Do</MenuItem>
                    <MenuItem value={1}>Process</MenuItem>
                    <MenuItem value={2}>Done</MenuItem>

                  </Select>}
                 
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
              <Divider variant="middle" />
        <DialogTitle id="alert-dialog-title">
          <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={2}>
          
          {props.state.state !== 2 &&  <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => setShowCreate(true)}
            >
              New Task
            </Button>}
              
          </Stack>
        </DialogTitle>
            <Container>
                      
              <Card>
                {childTask ? (
                  <DataGrid
                    autoHeight
                    rows={childTask}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                      sorting: {
                        sortModel: [{ field: "dateCreated", sort: "desc" }],
                         },
                    }}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                  />
                ) : (
                  <p>No task</p>
                )}
              </Card>
            </Container>

            <CreateSubTask
            deadline={props.state}
              project={props.project}
              mileStoneID={props.state.phaseId}
              taskID={props.state.id}
              show={showCreate}
              close={() => setShowCreate(false)}
              closeSub = {handleClose}
              getDetail={getChildTask}
            />
            <DetailTask task={task} show={showDetail} close={() => setShowDetail(false)} />
          </>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
   
       
              {disableBtn && regex.test(taskName) ? <Button variant="contained" onClick={() => setShowConfirmUpdate(true)} autoFocus>
              Save
            </Button> : <Button disabled variant="contained" onClick={() => setShowConfirmUpdate(true)} autoFocus>
              Save
            </Button>} 
        </DialogActions>
      </form>
      <Dialog
        open={showConfirmUpdate}
        onClose={handleCloseConfirmUpdate}
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
          <Button onClick={handleCloseConfirmUpdate}>Cancel</Button>
          <Button variant="contained"  onClick={() => handleUpdate()} autoFocus>
            Accept
          </Button>
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Task Successful!'} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
      <Dialog
      open={showConfirm}
      onClose={handleCloseConfirm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">Delete Task</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">You want to delete this task?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseConfirm}>Cancel</Button>
        <Button variant="contained" onClick={() => handleDeleteTask()} color="error"  autoFocus>
          Delete
        </Button>
      </DialogActions>
      <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Delete Task Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
    </Dialog>
      <DetailParentTask show={showDetailParent} close={() => setShowDetailParent(false)} task={props.state} />
    
    </Dialog>
  );
}

export default ListSubTask;
