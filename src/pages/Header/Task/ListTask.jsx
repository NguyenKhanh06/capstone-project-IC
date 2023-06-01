import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { PieChart, Pie, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar, Cell } from 'recharts';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Paper, Stack } from '@mui/material';
import ListProject from '../Project/ListProject';
import TaskInitiation from './TaskInitiation';
import { UserListToolbar } from '../../../sections/@dashboard/user';
import TaskPlanning from './TaskPlanning';
import TaskExecuting from './TaskExecuting';
import TaskMonitoring from './TaskMinitoring';
import TaskClosing from './TaskClosing';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config/apiUrl/apis-url';
import { Doughnut } from 'react-chartjs-2';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function ListTask(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { state } = useLocation();
  const [phases, setPhases] = useState([]);
  const [tasks, setTasks] = useState([]);

  const getPhase = () => {
    axios.get(`${API_URL}/phase/getPhaseByProjectId/${state.id}`).then((response) => {
      setPhases(response.data.responseSuccess);
    });
  };
  const fetchData = async () => {
    await axios.get(`${API_URL}/task/getAllTask`).then((response) => {
      setTasks(
        response.data.responseSuccess
          .filter((mil) => mil.projectId === state.id)
          .filter((task) => task.state !== 3 && task.status !== 5)
      );
    });
  };
  const datachart = [
    {
      title: 'Todo',
      lengthTask: tasks.filter((task) => task.state === 0 || task.status === 0).length,
    },
    { title: 'Process', lengthTask: tasks.filter((task) => task.state === 1 || task.status === 1).length },
    { title: 'Review', lengthTask: tasks?.filter((task) => task.status === 2).length },
    { title: 'Reject', lengthTask: tasks?.filter((task) => task.status === 3).length },
    { title: 'Done', lengthTask: tasks.filter((task) => task.state === 2 || task.status === 4).length },

  ];

  useEffect(() => {
    fetchData();
    getPhase();
  }, []);
  const COLORS = ['#FFC107', '#2065D1', '#af19fa', '#ff0400', '#54D62C'];
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        {/* <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={5}>
          <Paper elevation={2} sx={{ padding: '10px 30px 10px 30px' }}>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <Typography variant="h6">{tasks?.length}</Typography>
              <Typography variant="h6">Tasks</Typography>
            </Stack>
          </Paper>
       
          <Paper elevation={2} sx={{ padding: '10px 30px 10px 30px' }}>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <Typography variant="h6">
                {
                  tasks.filter((task) => task.state === 0).filter((task) => task.state !== 3 && task.status !== 5)
                    .length
                }
              </Typography>
              <Typography sx={{ color: 'orange' }} variant="h6">
                Task To do
              </Typography>
            </Stack>
          </Paper>
          <Paper elevation={2} sx={{ padding: '10px 30px 10px 30px' }}>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <Typography variant="h6">
                {
                  tasks.filter((task) => task.state === 1).filter((task) => task.state !== 3 && task.status !== 5)
                    .length
                }
              </Typography>
              <Typography color="primary" variant="h6">
                Tasks Process
              </Typography>
            </Stack>
          </Paper>
          <Paper elevation={2} sx={{ padding: '10px 30px 10px 30px' }}>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
              <Typography variant="h6">
                {
                  tasks.filter((task) => task.state === 2).filter((task) => task.state !== 3 && task.status !== 5)
                    .length
                }
              </Typography>
              <Typography sx={{ color: 'green' }} variant="h6">
                Tasks Done
              </Typography>
            </Stack>
          </Paper>
        </Stack> */}
  
     
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {phases.map((phase, index) => (
            <Tab key={index} label={phase?.phase?.phaseName} {...a11yProps(index)} />
          ))}

          {/* <Tab label="Planning" {...a11yProps(1)} />
          <Tab label="Execution" {...a11yProps(2)} />
          <Tab label="Monitoring " {...a11yProps(3)} />
          <Tab label="Closing" {...a11yProps(4)} /> */}
        </Tabs>
      </Box>
      {phases.map((phase, index) => (
        <TabPanel key={index} value={value} index={index}>
          <TaskInitiation phase={phase} state={state} />
        </TabPanel>
      ))}
      {/* <TabPanel value={value} index={0}>
     <TaskInitiation state={state}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TaskPlanning state={state}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <TaskExecuting state={state}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <TaskMonitoring state={state}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <TaskClosing state={state}/>
      </TabPanel> */}
    </Box>
    // <>
    //   <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
    //     <Card sx={{ maxWidth: 345, borderRight: '4px solid grey' }}>
    //       <CardActionArea>
    //         <CardContent>
    //           <Typography gutterBottom variant="h5" component="div">
    //             Initiation
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             From date: 20/2/2023
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             To date: 20/2/2023
    //           </Typography>
    //         </CardContent>
    //       </CardActionArea>
    //       <CardActions>
    //         <Link to='/header/task-initiation'>
    //         <Button size="small" color="primary">
    //           View detail
    //         </Button>
    //         </Link>

    //       </CardActions>
    //     </Card>
    //     <Card sx={{ maxWidth: 345, borderRight: '4px solid #2065D1' }}>
    //       <CardActionArea>
    //         <CardContent>
    //           <Typography gutterBottom variant="h5" component="div">
    //             Planning
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             From date: 20/2/2023
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             To date: 20/2/2023
    //           </Typography>
    //         </CardContent>
    //       </CardActionArea>
    //       <CardActions>
    //         <Button size="small" color="primary">
    //           View detail
    //         </Button>
    //       </CardActions>
    //     </Card>
    //     <Card sx={{ maxWidth: 345, borderRight: '4px solid #af19fa' }}>
    //       <CardActionArea>
    //         <CardContent>
    //           <Typography gutterBottom variant="h5" component="div">
    //             Execution
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             From date: 20/2/2023
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             To date: 20/2/2023
    //           </Typography>
    //         </CardContent>
    //       </CardActionArea>
    //       <CardActions>
    //         <Button size="small" color="primary">
    //           View detail
    //         </Button>
    //       </CardActions>
    //     </Card>
    //     <Card sx={{ maxWidth: 345, borderRight: '4px solid #FFC107' }}>
    //       <CardActionArea>
    //         <CardContent>
    //           <Typography gutterBottom variant="h5" component="div">
    //             Minotoring
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             From date: 20/2/2023
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             To date: 20/2/2023
    //           </Typography>
    //         </CardContent>
    //       </CardActionArea>
    //       <CardActions>
    //         <Button size="small" color="primary">
    //           View detail
    //         </Button>
    //       </CardActions>
    //     </Card>
    //     <Card sx={{ maxWidth: 345, borderRight: '4px solid #54D62C' }}>
    //       <CardActionArea>
    //         <CardContent>
    //           <Typography gutterBottom variant="h5" component="div">
    //             Closing
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             From date: 20/2/2023
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             To date: 20/2/2023
    //           </Typography>
    //         </CardContent>
    //       </CardActionArea>
    //       <CardActions>
    //         <Button size="small" color="primary">
    //           View detail
    //         </Button>
    //       </CardActions>
    //     </Card>
    //   </Stack>
    // </>
  );
}

export default ListTask;
