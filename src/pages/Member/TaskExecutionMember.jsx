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
  import dayjs from 'dayjs';
  import Iconify from '../../components/iconify/Iconify';
  import Label from '../../components/label/Label';
  import Scrollbar from '../../components/scrollbar/Scrollbar';
  import { UserListToolbar } from '../../sections/@dashboard/user';
  
  import ListSubTaskMember from './ListSubTaskMember';
  
  
  function TaskExecutionMember(props) {
    const { state } = useLocation();
    const [open, setOpen] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [task, setTask] = useState([]);
    const [tasks, setTasks] = useState([]);
    const[id, setID] = useState([])
    const [showConfirm, setShowConfirm] = useState(false);
  
    const handleViewDetail = (data) => {
      setShowDetail(true);
      setTask(data);
    };
    const handleDeleteTask = () => {
      axios.put(`https://localhost:7115/api/v1/course/delete/${id}`).then((response) => {
        window.location.reload(false);
      });
    };
  
    const fetchData = async () => {
      await axios.get(`https://localhost:7115/api/v1/task/getRootsTask`).then((response) => {
        setTasks(response.data.responseSuccess.filter((mil) => mil.projectId === props.state.id ).filter((milprj) => milprj.mileStoneId === 3).filter((task) => task.status!== 5));
        
        console.log(response)
        
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
    
    console.log("task plan", props)
  
  
    return (
      <>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
            Execution Task
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
              sorting: {
                sortModel: [{ field: "dateCreated", sort: "desc" }],
                 },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
          </Card>
        </Container>
    
     
        <ListSubTaskMember project={props.state} state={task} show={showDetail} close={() => setShowDetail(false)} />
      </>
    );
  }
  
  export default TaskExecutionMember;
  