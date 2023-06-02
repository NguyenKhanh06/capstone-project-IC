// @mui

import {
  Card,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
// components

// sections

import { useEffect, useState } from 'react';
import axios from 'axios';

import { API_URL } from '../config/apiUrl/apis-url';
import DetailStudentRegister from './Header/Student/DetailStudentRegister';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Box } from '@mui/system';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const tokenfcm = localStorage.getItem('tokenfcm');

  const UpdateTokenFCM = async () => {
    const formData = new FormData();
    formData.append('accountId', user.id);
    formData.append('token', localStorage.getItem('tokenfcm'));
    await axios({
      method: 'POST',
      data: formData,
      url: `${API_URL}/firebasefcm`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      UpdateTokenFCM();
    }, 3500);
  }, [tokenfcm]);

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tasksSub, setTasksSub] = useState([]);
  const [Subtask, setSubTask] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [showRegis, setShowRegis] = useState(false);
  const [regis, setRegis] = useState([]);
  const [student, setStudent] = useState([]);
  const handleClickOpenDetailRegis = (data) => {
    setShowRegis(true);
    setStudent(data);
  };
  const fetchRegis = async (taskid) => {
    await axios.get(`${API_URL}/registration/getDetailbyProjectId/${taskid}`).then((response) => {
      setRegis(response.data.responseSuccess);
    });
  };

  const fetchData = async () => {
    await axios.get(`${API_URL}/project/getAllProject`).then((response) => {
      setProjects(response.data.responseSuccess);
      console.log(response.data.responseSuccess);
    });
  };
  const fetchDataTask = async (taskid) => {
    await axios.get(`${API_URL}/task/getAllTask`).then((response) => {
      setTasks(
        response.data.responseSuccess
          .filter((mil) => mil.projectId === taskid)
          .filter((task) => task.state !== 3 && task.status !== 5)
          .filter((task) => task.parentId !== null)
      );
    });
  };
  const fetchDataRootTask = async (taskid) => {
    await axios.get(`${API_URL}/task/getRootsTask`).then((response) => {
      setTasksSub(
        response.data.responseSuccess
          .filter((mil) => mil.projectId === taskid)
          .filter((task) => task.state !== 3 && task.status !== 5)
      );
    });
  };

  const datachart = [
    {
      title: 'Todo',
      lengthTask: tasks.filter((task) => task.status === 0).length,
    },
    { title: 'Process', lengthTask: tasks.filter((task) => task.status === 1).length },
    { title: 'Review', lengthTask: tasks?.filter((task) => task.status === 2).length },
    { title: 'Reject', lengthTask: tasks?.filter((task) => task.status === 3).length },
    { title: 'Done', lengthTask: tasks?.filter((task) => task.status === 4).length },
  ];
  const data = {
    labels: ['To do', 'Process', 'Done'],
    datasets: [
      {
        label: 'Total Task',
        data: [
          tasksSub?.filter((task) => task.state === 0).length,
          tasksSub?.filter((task) => task.state === 1).length,
          tasksSub?.filter((task) => task.state === 2).length,
        ],
        backgroundColor: ['#FFC107', '#2065D1', '#54D62C'],
        borderColor: ['#FFC107', '#2065D1', '#54D62C'],
        borderWidth: 1,
      },
    ],
  };
  const dataSub = {
    labels: ['To do', 'Process', 'Review', 'Reject', 'Done'],
    datasets: [
      {
        label: 'Total Task',
        data: [
          tasks.filter((task) => task.status === 0).length,
          tasks.filter((task) => task.status === 1).length,
          tasks.filter((task) => task.status === 2).length,
          tasks.filter((task) => task.status === 3).length,
          tasks.filter((task) => task.status === 4).length
        ],
        backgroundColor: ['#FFC107', '#2065D1', '#af19fa', '#ff0400', '#54D62C'],
        borderColor: ['#FFC107', '#2065D1', '#af19fa', '#ff0400', '#54D62C'],
        borderWidth: 1,
      },
    ],
  };
  const datachartState = [
    {
      title: 'Todo',
      lengthTaskState: tasksSub?.filter((task) => task.state === 0).length,
    },
    { title: 'Process', lengthTaskState: tasksSub?.filter((task) => task.state === 1).length },

    { title: 'Done', lengthTaskState: tasksSub?.filter((task) => task.state === 2).length },
  ];

  const column = [
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
  ];
  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(() => {
  //   fetchDataTask();
  //   fetchRegis();

  //   console.log(tasks);
  // }, [project]);

  const columns = [
    {
      field: 'creator',
      headerName: 'Student Name',
      flex: 2,
      valueGetter: (params) => {
        return params.row?.creator;
      },
    },
    {
      field: 'rollNumber',
      headerName: 'Roll Number',
      flex: 1,
      valueGetter: (params) => {
        return params.row?.student?.rollNumber;
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      valueGetter: (params) => {
        return params.row?.student?.email;
      },
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      flex: 1,
      valueGetter: (params) => {
        return params.row?.student?.phoneNumber;
      },
    },

    // {
    //   headerName: 'Action',
    //   flex: 1,
    //   sortable: false,
    //   disableClickEventBubbling: true,
    //   renderCell: (params) => (
    //       <Tooltip title="View Detail">
    //       <IconButton onClick={() => handleClickOpenDetailRegis(params.row)} aria-label="delete">
    //         <RemoveRedEyeRoundedIcon />
    //       </IconButton>
    //     </Tooltip>
    //     ),
    // },
  ];
  const ITEM_HEIGHT = 46;
  const MOBILE_ITEM_HEIGHT = 58;
  const ITEM_PADDING_TOP = 18;
  const MENU_ITEMS = 6;
  const COLORS = ['#FFC107', '#2065D1', '#af19fa', '#ff0400', '#54D62C'];
  const COLOR = ['#FFC107', '#2065D1', '#54D62C'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome {user.fullName}
        </Typography>
        {/* {tasks?.length < 0  || regis?.length <0 ? <img
          src="https://tuanfpt.blob.core.windows.net/folder-excel/loogo-PhotoRoom.png-PhotoRoom.png"
          alt="login"
          style={{ width: '30%', height: '40%', margin: 'auto' }}
        /> : <></>} */}

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Project</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={project}
            label="Project"
            onChange={(e) => {
              setProject(e.target.value);
              fetchDataTask(e.target.value);
              fetchDataRootTask(e.target.value);
              fetchRegis(e.target.value);
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: {
                    xs: MOBILE_ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                    sm: ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                  },
                },
              },
            }}
          >
            {projects.map((project) => (
              <MenuItem value={project.id}>{project.projectName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {tasksSub.length ? (
          <>
            {' '}
            <Typography variant="h3" sx={{ marginBottom: 2, marginTop: 8 }}>
              All Task
            </Typography>
            <Divider variant="middle" sx={{ marginBottom: 5 }} />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={'10%'}
              sx={{ marginBottom: '5%' }}
            >
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center
        "
                spacing={2}
              >
                <Pie style={{ width: 300, height: 300 }} data={data} />
              </Stack>
              <DataGrid
                autoHeight
                rows={tasksSub}
                columns={column}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                  sorting: {
                    sortModel: [{ field: 'dateCreated', sort: 'desc' }],
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            </Stack>
          </>
        ) : (
          <></>
        )}
        {tasks.length ? (
          <>
            {' '}
            <Typography variant="h3" sx={{ marginBottom: 2, marginTop: 8 }}>
              All SubTask
            </Typography>
            <Divider variant="middle" sx={{ marginBottom: 5 }} />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={'10%'}
              sx={{ marginBottom: '5%' }}
            >
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center
        "
                spacing={2}
              >
                <Pie style={{ width: 300, height: 300 }} data={dataSub} />
              </Stack>
              <DataGrid
                autoHeight
                rows={tasks}
                columns={column}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                  sorting: {
                    sortModel: [{ field: 'dateCreated', sort: 'desc' }],
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            </Stack>
          </>
        ) : (
          <></>
        )}

        <Divider variant="middle" sx={{ marginBottom: 5 }} />

        {regis?.length ? (
          <Box sx={{ marginBottom: 5, marginTop: 10 }}>
            {' '}
            <Typography variant="h3" sx={{ marginBottom: 5 }}>
              Registration (Total registration: {regis?.length}){' '}
            </Typography>
            <Card>
              {regis && (
                <DataGrid
                  autoHeight
                  rows={regis}
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
              )}
            </Card>
          </Box>
        ) : (
          <></>
        )}

        {/* <DetailStudentRegister show={showRegis} close={() => setShowRegis(false)} studentID = {student.id}/> */}
      </Container>
    </>
  );
}
