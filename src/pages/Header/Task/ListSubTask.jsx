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
import { useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

import Iconify from '../../../components/iconify/Iconify';
import Label from '../../../components/label/Label';
import Scrollbar from '../../../components/scrollbar/Scrollbar';
import { UserListToolbar } from '../../../sections/@dashboard/user';
import CreateTask from './CreateTask';
import DetailTask from './DetailTask';

import CreateSubTask from './CreateSubTask';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import DetailParentTask from './DetailParentTask';

function ListSubTask(props) {
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
  const [taskName, setTaskName] = useState(props.state.taskName);
  const [description, setDescription] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [id, setID] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [stateTask, SetStateTask] = useState(props.state.state);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
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
  axios.put(`https://localhost:7115/api/v1/task/DisableTask/${id}`).then((response) => {

    if (response.data.isSuccess) {
   setShowSuccess(true)
props.getDetail()
setTimeout(() => {
  handleCloseConfirm()
  setShowSuccess(false)

  handleClose()
}, 1000);

   
    }
  })
  .catch((err) => {
    handleError('Delete fail!');
  });
}
  const data = {
    taskId: props.state.id,
    state: stateTask,
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
            <Typography variant="h4" gutterBottom>
              Initiation Sub Task
            </Typography>
            <IconButton onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <Divider variant="middle" />
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
          
               <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => setShowCreate(true)}
            >
              New Task
            </Button>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <>
            <Container>
              <Card>
                {props.state?.childrenTask?.filter(task => task.status !== 5) ? (
                  <DataGrid
                    autoHeight
                    rows={props.state?.childrenTask?.filter(task => task.status !== 5)}
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
              mileStoneID={props.state.mileStoneId}
              taskID={props.state.id}
              show={showCreate}
              close={() => setShowCreate(false)}
              closeSub = {handleClose}
              getDetail={props.getDetail}
            />
            <DetailTask task={task} show={showDetail} close={() => setShowDetail(false)} />
          </>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
   
          <Button variant="contained" onClick={() => setShowDetailParent(true)} autoFocus>
            Detail Task
          </Button>
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
