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
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../components/iconify/Iconify';

import Loading from '../Loading';
import DetailProject from '../Header/Project/DetailProject';
import DetailPrjMember from './DetailPrjMember';
import DetailProjectLeader from './Leader/DetailPrjLeader';

function ListProjectMember(props) {
  const user = JSON.parse(sessionStorage.getItem('user'));
console.log("staff", user)
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDetailMember, setShowDetailMember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [id, setID] = useState('');

  const handleShowConfirm = (data) => {
    setID(data);
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };

  const columns = [
    {
      field: 'projectName',
      headerName: 'Project Name',
      flex: 1,
       valueGetter: (params) => {
       
        return params.row.project.projectName
      },
    
    },
    // {
    //   field: 'categoryProject',
    //   headerName: 'Category',
    //   flex: 1,
    //   valueGetter: (params) => {
    //     return params.params.row.project
    //   },
    // },
    {
      field: 'leaderId',

      headerName: 'Role',

      flex: 1,
      renderCell: (params) => {
       
        return params.row.project.leaderId === user?.staff.id ? <Chip label="Leader" /> : <Chip label="Member" />;
      },
    
    },


    // {
    //   field: 'campusName',
    //   headerName: 'Start Date',
    //   flex: 1,
    //   valueGetter: (params) => {
       
    //     return params.row.project.campusName
    //   },
    // },

  
    // {
    //   field: 'campusName',

    //   headerName: 'Role',

    //   flex: 1,
    //   valueGetter: (params) => {
    //    console.log(params)
    //     return params.value.campusName
    //   },
    
    // },


    {
      field: 'dateCreated',
      headerName: 'Date Create',
      flex: 1,
      valueGetter: (params) => {
       
        return dayjs(params.row.project.dateCreated).format("DD/MM/YYYY")
      },
    },
      
    {
      field: 'estimateTimeStart',

      headerName: 'Start Date',

      flex: 1,
      valueGetter: (params) => {
       
        return dayjs(params.row.project.estimateTimeStart).format("DD/MM/YYYY")
      },
    
    },
    {
      field: 'estimateTimeEnd',

      headerName: 'End Date',

      flex: 1,
      valueGetter: (params) => {
       
        return dayjs(params.row.project.estimateTimeEnd).format("DD/MM/YYYY")
      },
    
    },
    {
      field: 'name',
      headerName: 'Campus',
      flex: 1,
      valueGetter: (params) => {
       
        return params.row.project.campus.name
      },
    },

    {
      field: 'projectStatus',
      headerName: 'MileStone',
      flex: 1,
      renderCell: (params) => (
     
        <>
          {params.row.project.projectStatus === 2 ? (
            <Chip label="Cancel" color="error" />
          ) : params.row.project.projectStatus === 3 ? (
            <Chip label="Initiation" />
          ) : params.row.project.projectStatus === 4 ? (
            <Chip label="Planning" color="primary" />
          ) : params.row.project.projectStatus === 5 ? (
            <Chip label="Execution" color="secondary" />
          ) : params.row.project.projectStatus === 6 ? (
            <Chip label="Monitoring" color="warning" />
          ) : params.row.project.projectStatus === 7 ? (
            <Chip label="Closing" color="success" />
          ) : null}

          {dayjs(new Date()).date() - dayjs(params.row.project?.estimateTimeStart).date() === 0 &&
          dayjs(new Date()).month() - dayjs(params.row.project?.estimateTimeStart).month() === 0 &&
          dayjs(new Date()).year() - dayjs(params.row.project?.estimateTimeStart).year() === 0
            ? updateMilstone(params.row.project.id, 3)
            : dayjs(new Date()).date() -
                dayjs(params.row.project?.mileStoneProject?.find((mil) => mil?.mileStoneId === 2)?.dateBegin).date() ===
                0 &&
              dayjs(new Date()).month() -
                dayjs(params.row.project?.mileStoneProject?.find((mil) => mil?.mileStoneId === 2)?.dateBegin).month() ===
                0 &&
              dayjs(new Date()).year() -
                dayjs(params.row.project?.mileStoneProject?.find((mil) => mil?.mileStoneId === 2)?.dateBegin).year() ===
                0
            ? updateMilstone(params.row.project.id, 4)
            
            : dayjs(new Date()).date() -
                dayjs(params.row.project?.mileStoneProject?.find((mil) => mil?.mileStoneId === 3)?.dateBegin).date() ===
                0 &&
              dayjs(new Date()).month() -
                dayjs(params.row.project?.mileStoneProject?.find((mil) => mil?.mileStoneId === 3)?.dateBegin).month() ===
                0 &&
              dayjs(new Date()).year() -
                dayjs(params.row.project?.mileStoneProject?.find((mil) => mil?.mileStoneId === 3)?.dateBegin).year() ===
                0
            ? updateMilstone(params.row.project.id, 5)
            : dayjs(new Date()).date() -
                dayjs(params.row.project?.mileStoneProject?.find((mil) => mil?.mileStoneId === 4)?.dateBegin).date() ===
                0 &&
              dayjs(new Date()).month() -
                dayjs(params.row.project?.mileStoneProject?.find((mil) => mil?.mileStoneId === 4)?.dateBegin).month() ===
                0 &&
              dayjs(new Date()).year() -
                dayjs(params.row.project?.mileStoneProject?.find((mil) => mil?.mileStoneId === 4)?.dateBegin).year() ===
                0
            ? updateMilstone(params.row.project.id, 6)
            : dayjs(new Date()).date() -
                dayjs(params.row.project?.mileStoneProject?.find((mil) => mil?.mileStoneId === 5)?.dateBegin).date() ===
                0 &&
              dayjs(new Date()).month() -
                dayjs(params.row.project?.mileStoneProject?.find((mil) => mil?.mileStoneId === 5)?.dateBegin).month() ===
                0 &&
              dayjs(new Date()).year() -
                dayjs(params.row.project?.mileStoneProject?.find((mil) => mil?.mileStoneId === 5)?.dateBegin).year() ===
                0
            ? updateMilstone(params.row.project.id, 7)
            : null}
        </>
      ),
    },

    {
 
      headerName: 'Action',
      flex: 1,

      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };

        return (
          <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
    
            <Tooltip title="View Detail">
              <IconButton  onClick={() => {
                         handleViewDetailMember(params.row)
                    }} aria-label="delete">
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
            {params.row?.project?.tasks?.length && params.row.project.projectStatus !== 2 ? (
          
              <>
             
                {' '}
                {dayjs(new Date()).month() + 1 - (dayjs(params.row?.project.tasks[0]?.deadLine).month() + 1) === 0 &&
                dayjs(params.row?.project.tasks[0]?.deadLine).date() - dayjs(new Date()).date() <= 3 && dayjs(params.row?.project.tasks[0]?.deadLine).year() - dayjs(new Date()).year() >= 0 ? (
                  <Tooltip title="Task List - Have task need do complete">
                  <IconButton
                  color='error'
                    onClick={() => {
                      if (params.row.project.leaderId === user?.staff.id) {
                        navigate('/staff/leader/list-task', { state: params.row.project });
                      } else {
                        navigate('/staff/member/list-task', { state: params.row.project });
                      }
                    }}
                  >
                    <AssignmentLateTwoToneIcon />
                  </IconButton>
                </Tooltip>
                ) : (
                  <Tooltip title="Task List ">
              <IconButton
           
                onClick={() => {
                  if (params.row.project.leaderId === user?.staff.id) {
                    navigate('/staff/leader/list-task', { state: params.row.project });
                  } else {
                    navigate('/staff/member/list-task', { state: params.row.project });
                  }
                }}
              >
                <AssignmentLateTwoToneIcon />
              </IconButton>
            </Tooltip>
                )}
              </>
            ) : params.row.project.projectStatus === 2 ? (
              <>
                <Tooltip title="Task List - canceled">
                  <IconButton
                    onClick={() => {
                      navigate('/staff/list-task-cancel', { state: params.row.project  });
                    }}
                  >
                    <AssignmentLateTwoToneIcon />
                  </IconButton>
                </Tooltip>
              </>
            )  :  (
              <>
              <Tooltip title="Task List ">
              <IconButton
      
                onClick={() => {
                  if (params.row.project.leaderId === user?.staff.id) {
                    navigate('/staff/leader/list-task', { state: params.row.project });
                  } else {
                    navigate('/staff/member/list-task', { state: params.row.project });
                  }
                }}
              >
                <AssignmentLateTwoToneIcon />
              </IconButton>
            </Tooltip>
              </>
            ) }
           
          </Stack>
        );
      },
    },
  ];

  const handleViewDetail = (data) => {
    setShowDetail(true);
    setProject(data);
  };
  const handleViewDetailMember = (data) => {
    setShowDetailMember(true);
    setProject(data);
  };
  
  const fetchData = async () => {
    setLoading(true);
    await axios.get(`https://api.ic-fpt.click/api/v1/staff/GetProjectByStaffId/${user?.staff?.id}`).then((response) => {
      console.log(response)
      setProjects(response.data.responseSuccess);
      setLoading(false)

     
      
    });
  };

  useEffect(() => {

    fetchData()
   
  
  }, []);

  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        Do not have any project.
      </Stack>
    );
  }
  return (
    <>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Project
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setShowCreate(true)}>
            New Project
          </Button> */}
        </Stack>
        <Card>
          <Box sx={{ height: 'auto', width: '100%' }}>
          <DataGrid
              autoHeight
              rows={projects}
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
              components={{ NoRowsOverlay }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />
         

</Box>
        </Card>
      </Container>


      <Dialog
        open={showConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You want to delete this project?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
        </DialogActions>
      </Dialog>
<Loading show={loading} />
      <DetailPrjMember show={showDetailMember} close={() => setShowDetailMember(false)} project={project}/>
      <DetailProjectLeader show={showDetail} close={() => setShowDetail(false)} project={project} />
    </>
  );
}

export default ListProjectMember;
