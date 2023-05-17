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
import { API_URL } from '../../config/apiUrl/apis-url';

function ListProjectMember(props) {
  const user = JSON.parse(sessionStorage.getItem('user'));

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
  const updateMilstone = (id, state) => {
    const formData = new FormData();
    formData.append('ProjectId', id);
    formData.append('Status', state);
    axios({
      method: 'POST',
      data: formData,
      url: `${API_URL}/project/changeStatus`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  
  const columns = [
    {
      field: 'projectName',
      headerName: 'Project Name',
      flex: 2,
      valueGetter: (params) => {
        return params.row.project.projectName;
      },
    },

    // {
    //   field: 'program',
    //   headerName: 'Program',
    //   flex: 1,
    //   valueGetter: (params) => {
    //     return params.value.name;
    //   },
    // },
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
        return dayjs(params.row.project.dateCreated).format('DD/MM/YYYY');
      },
    },

    {
      field: 'estimateTimeStart',

      headerName: 'Start Date',

      flex: 1,
      valueGetter: (params) => {
        return dayjs(params.row.project.estimateTimeStart).format('DD/MM/YYYY');
      },
    },
    {
      field: 'estimateTimeEnd',

      headerName: 'End Date',

      flex: 1,
      valueGetter: (params) => {
        return dayjs(params.row.project.estimateTimeEnd).format('DD/MM/YYYY');
      },
    },
    {
      field: 'name',
      headerName: 'Campus',
      flex: 1,
      valueGetter: (params) => {
        return params.row.project.campus.name;
      },
    },

    {
      field: 'projectPhase',
      headerName: 'Phase',

      renderCell: (params) => (

        <>
        {
          params.row.project.projectStatus === 2 && (
            <Chip label="Cancel" color="error" />
          ) ||  
          <Chip label={ params.row?.project?.projectPhase?.find(phase => phase?.phase?.status)?.phase?.phaseName} />
         
        }

       
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
              <IconButton
                onClick={() => {
                  handleViewDetailMember(params.row);
                }}
                aria-label="delete"
              >
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
            {params.row?.project?.tasks?.length && params.row.project.projectStatus !== 2 ? (
              <>
                {' '}
                {params.row?.project.tasks?.filter( task =>  dayjs(new Date()).month() + 1 - (dayjs(task?.deadLine).month() + 1) === 0 &&
              dayjs(task ?.deadLine).date() - dayjs(new Date()).date() <= 3 &&
              dayjs(task ?.deadLine).year() - dayjs(new Date()).year() >= 0 &&   task?.state !== 3 &&task?.state !== 2 &&  task?.status !== 4).length ? (
                  <Tooltip title="Task List - Have task need do complete">
                    <IconButton
                      color="error"
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
                      navigate('/staff/list-task-cancel', { state: params.row.project });
                    }}
                  >
                    <AssignmentLateTwoToneIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
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
            )}
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
    await axios.get(`${API_URL}/staff/GetProjectByStaffId/${user?.staff?.id}`).then((response) => {
  
      setProjects(response.data.responseSuccess);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
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
            {(projects.length && (
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
                    sortModel: [{ field: 'dateCreated', sort: 'desc' }],
                  },
                }}
                components={{ NoRowsOverlay }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
              />
            )) || <></>}
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
      <DetailPrjMember show={showDetailMember} close={() => setShowDetailMember(false)} project={project} />
      <DetailProjectLeader show={showDetail} close={() => setShowDetail(false)} project={project} />
    </>
  );
}

export default ListProjectMember;
