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
import { PieChart, Pie, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar, Cell } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Header/Chart';
import { API_URL } from '../config/apiUrl/apis-url';
import DetailStudentRegister from './Header/Student/DetailStudentRegister';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { DataGrid } from '@mui/x-data-grid';
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
  const [showRegis, setShowRegis] = useState(false);
  const [regis, setRegis] = useState([]);
  const [student, setStudent] = useState([]);
  const handleClickOpenDetailRegis = (data) => {
    setShowRegis(true);
    setStudent(data);
  };
  const fetchRegis = async () => {
    await axios.get(`${API_URL}/registration/getDetailbyProjectId/${project}`).then((response) => {
      setRegis(response.data.responseSuccess);
    });
  };

  const fetchData = async () => {
    await axios.get(`${API_URL}/project/getAllProject`).then((response) => {
      setProjects(response.data.responseSuccess);
      console.log(response.data.responseSuccess);
    });
  };
  const fetchDataTask = async () => {
    await axios.get(`${API_URL}/task/getRootsTask`).then((response) => {
      setTasks(
        response.data.responseSuccess
          .filter((mil) => mil.projectId === project)
          .filter((task) => task.state !== 3 && task.status !== 5)
      );
    });
  };

  const datachart = [
    {
      title: 'Todo',
      lengthTask: tasks.filter((task) => task.state === 0).length,
    },
    { title: 'Process', lengthTask: tasks.filter((task) => task.state === 1).length },
    { title: 'Done', lengthTask: tasks.filter((task) => task.state === 2).length },
  ];

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchRegis();
    fetchDataTask();
    console.log(project);
  }, [project]);

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
  const COLORS = ['#FFC107', '#2065D1', '#54D62C'];
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

        {/* <img
          src="https://tuanfpt.blob.core.windows.net/folder-excel/loogo-PhotoRoom.png-PhotoRoom.png"
          alt="login"
          style={{ width: '30%', height: '40%', margin: 'auto' }}
        /> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Project</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={project}
            label="Project"
            onChange={(e) => {
              setProject(e.target.value);
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

{tasks.length ? (
          <div style={{ textAlign: 'left' }}>
               <Divider variant='middle' sx={{ marginBottom: 5}}/>
            <Typography variant='h3' sx={{ marginBottom: 5}}>All Task</Typography>
            <div>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center
              "
                spacing={2}
              >
                <PieChart width={300} height={300}>
                  <Pie
                    dataKey="lengthTask"
                    isAnimationActive={false}
                    data={datachart}
                    // cx={120}
                    // cy={200}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    fill="#8884d8"
                    label={renderCustomizedLabel}
                  >
                    {tasks.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start
              "
                  spacing={2}
                >
                  <Stack
                    Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center
              "
                    spacing={2}
                  >
                    <div style={{ width: '30px', height: '20px', backgroundColor: '#FFC107' }} />
                    <Typography>To do</Typography>
                  </Stack>
                  <Stack
                    Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center
              "
                    spacing={2}
                  >
                    <div style={{ width: '30px', height: '20px', backgroundColor: '#2065D1' }} />
                    <Typography>Process</Typography>
                  </Stack>
                  <Stack
                    Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center
              "
                    spacing={2}
                  >
                    <div style={{ width: '30px', height: '20px', backgroundColor: '#54D62C' }} />
                    <Typography>Done</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </div>
          </div>
        ) : (
          <></>
        )}
        <Divider variant='middle' sx={{ marginBottom: 5}}/>
        <Typography variant='h3' sx={{ marginBottom: 5}}>Form registration (Total registration: {regis?.length}) </Typography>
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

       
        {/* <DetailStudentRegister show={showRegis} close={() => setShowRegis(false)} studentID = {student.id}/> */}
      </Container>
    </>
  );
}
