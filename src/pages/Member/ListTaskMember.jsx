import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Paper, Stack } from '@mui/material';
import { UserListToolbar } from '../../sections/@dashboard/user';
import TaskInitiationMember from './TaskInitiationMember';
import TaskPlanningMember from './TaskPlanningMember';
import TaskExecutionMember from './TaskExecutionMember';
import TaskMinotoringMember from './TaskMinotoringMember';
import TaskClosingMember from './TaskClosingMember';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/apiUrl/apis-url';


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
function ListTaskMember(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { state } = useLocation();
  const [phases, setPhases] = useState([])
  const getPhase = () => {
    axios.get(`${API_URL}/phase/getPhaseByProjectId/${state.id}`).then(response => {
  setPhases(response.data.responseSuccess)

    })
  }

  useEffect(() => {
  
    getPhase();
  
  }, []);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        {phases.map((phase, index) =>        <Tab key={index} label={phase?.phase?.phaseName} {...a11yProps(index)} />)}
   
   {/* <Tab label="Planning" {...a11yProps(1)} />
   <Tab label="Execution" {...a11yProps(2)} />
   <Tab label="Monitoring " {...a11yProps(3)} />
   <Tab label="Closing" {...a11yProps(4)} /> */}

 </Tabs>
</Box>
{phases.map((phase, index) =>  <TabPanel key={index} value={value} index={index}>
<TaskInitiationMember phase = {phase} state={state}/>
</TabPanel>)}
   


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

export default ListTaskMember;
