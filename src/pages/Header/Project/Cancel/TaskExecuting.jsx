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
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


import DetailTask from './DetailTask';
import ListSubTask from './ListSubTaskCancel';



function TaskPlanning(props) {
  const { state } = useLocation();
  const [open, setOpen] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [task, setTask] = useState([]);
  const [tasks, setTasks] = useState([]);
  const[id, setID] = useState([])
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
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
      setTimeout(() => {
        reload();
      }, 3000);
    }
  })
  .catch((err) => {
    handleError(err.response.data.responseSuccess);
  });
  };

  const fetchData = async () => {
    await axios.get(`https://localhost:7115/api/v1/task/getRootsTask`).then((response) => {
      setTasks(response.data.responseSuccess.filter((mil) => mil.projectId === props.state.id ).filter((milprj) => milprj.mileStoneId === 3).filter((task) => task.status!== 5));
     
      
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);



const handleShowConfirm = (data) => {
  setID(data);
  setShowConfirm(true);
};

const handleCloseConfirm = (data) => {
  setShowConfirm(false);
};
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
            {params.row?.state === 0 ? (
              <Chip label="To do" color="warning" />
            ) : params.row?.state === 1 ? (
              <Chip label="Process" color="primary"  />
            ) : params.row?.state === 2 ? <Chip label="Done" color='success'/> : null}
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
           
          
          </Stack>
        );
      },
    },
  ];



  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Executing Task
          </Typography>
        
        </Stack>
  
        <Card>
        <DataGrid
          autoHeight
          rows={tasks}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
        </Card>
      </Container>
      
     
      <ListSubTask project={props.state} state={task} show={showDetail} close={() => setShowDetail(false)} />
    </>
  );
}

export default TaskPlanning;
