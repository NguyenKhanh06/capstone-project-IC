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
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../components/iconify/Iconify';
import CreateProject from './CreateProject';
import DetailProject from './DetailProject';
import Loading from '../../Loading';
import DetailCancel from './DetailCancel';

function ListProject(props) {
  const regexMailFu = /[\w.-]+fptu@gmail\.com$/;
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDetailCancel, setShowDetailCancel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [id, setID] = useState('');
  const [date, setDate] = useState(null);

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
      url: `https://api.ic-fpt.click/api/v1/project/changeStatus`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
     
  };

  const columns = [
    {
      field: 'projectName',
      headerName: 'Project Name',
      flex: 2,
    },
    {
      field: 'categoryProject',
      headerName: 'Category',
      flex: 1,
      valueGetter: (params) => {
        return params.value.name;
      },
    },

    {
      field: 'dateCreated',
      headerName: 'Date Create',
      flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'estimateTimeStart',
      headerName: 'Start Date',
      flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },

    {
      field: 'estimateTimeEnd',
      headerName: 'End Date',
      flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },

    {
      field: 'campus',
      headerName: 'Campus',
      flex: 1,
      valueGetter: (params) => {
        return params.value.name;
      },
    }, {
      field: 'name',
      headerName: 'Partner',
      flex: 1,
      valueGetter: (params) => {
        return params.row.partner?.name
      },
    },

    {
      field: 'projectStatus',
      headerName: 'Milestone',

      renderCell: (params) => (
     
        <>
          {params.row.projectStatus === 2 ? (
            <Chip label="Cancel" color="error" />
          ) : params.row.projectStatus === 3 ? (
            <Chip label="Initiation" />
          ) : params.row.projectStatus === 4 ? (
            <Chip label="Planning" color="primary" />
          ) : params.row.projectStatus === 5 ? (
            <Chip label="Execution" color="secondary" />
          ) : params.row.projectStatus === 6 ? (
            <Chip label="Monitoring" color="warning" />
          ) : params.row.projectStatus === 7 ? (
            <Chip label="Closing" color="success" />
          ): null}

          {dayjs(new Date()).date() - dayjs(params.row?.estimateTimeStart).date() === 0 &&
          dayjs(new Date()).month() - dayjs(params.row?.estimateTimeStart).month() === 0 &&
          dayjs(new Date()).year() - dayjs(params.row?.estimateTimeStart).year() === 0
            ? updateMilstone(params.row.id, 3)
            : dayjs(new Date()).date() -
                dayjs(params.row?.mileStoneProject?.find((mil) => mil?.mileStoneId === 2)?.dateBegin).date() ===
                0 &&
              dayjs(new Date()).month() -
                dayjs(params.row?.mileStoneProject?.find((mil) => mil?.mileStoneId === 2)?.dateBegin).month() ===
                0 &&
              dayjs(new Date()).year() -
                dayjs(params.row?.mileStoneProject?.find((mil) => mil?.mileStoneId === 2)?.dateBegin).year() ===
                0
            ? updateMilstone(params.row.id, 4)
            
            : dayjs(new Date()).date() -
                dayjs(params.row?.mileStoneProject?.find((mil) => mil?.mileStoneId === 3)?.dateBegin).date() ===
                0 &&
              dayjs(new Date()).month() -
                dayjs(params.row?.mileStoneProject?.find((mil) => mil?.mileStoneId === 3)?.dateBegin).month() ===
                0 &&
              dayjs(new Date()).year() -
                dayjs(params.row?.mileStoneProject?.find((mil) => mil?.mileStoneId === 3)?.dateBegin).year() ===
                0
            ? updateMilstone(params.row.id, 5)
            : dayjs(new Date()).date() -
                dayjs(params.row?.mileStoneProject?.find((mil) => mil?.mileStoneId === 4)?.dateBegin).date() ===
                0 &&
              dayjs(new Date()).month() -
                dayjs(params.row?.mileStoneProject?.find((mil) => mil?.mileStoneId === 4)?.dateBegin).month() ===
                0 &&
              dayjs(new Date()).year() -
                dayjs(params.row?.mileStoneProject?.find((mil) => mil?.mileStoneId === 4)?.dateBegin).year() ===
                0
            ? updateMilstone(params.row.id, 6)
            : dayjs(new Date()).date() -
                dayjs(params.row?.mileStoneProject?.find((mil) => mil?.mileStoneId === 5)?.dateBegin).date() ===
                0 &&
              dayjs(new Date()).month() -
                dayjs(params.row?.mileStoneProject?.find((mil) => mil?.mileStoneId === 5)?.dateBegin).month() ===
                0 &&
              dayjs(new Date()).year() -
                dayjs(params.row?.mileStoneProject?.find((mil) => mil?.mileStoneId === 5)?.dateBegin).year() ===
                0
            ? updateMilstone(params.row.id, 7)
            : null}
        </>
      ),
    },

    {
      field: 'action',
      headerName: 'Action',
   
      flex: 1,

      disableClickEventBubbling: true,

      renderCell: (params) => (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {params.row.projectStatus !== 2 ? (
            <Tooltip title="View Detail">
              <IconButton onClick={() => handleViewDetail(params.row)} aria-label="delete">
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="View Detail">
              <IconButton onClick={() => handleViewDetailCancel(params.row)} aria-label="delete">
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
          )}

          {params.row?.tasks?.length && params.row.projectStatus !== 2 ? (
            <>
              {' '}
              {dayjs(new Date()).month() + 1 - (dayjs(params.row?.tasks[0]?.deadLine).month() + 1) === 0 &&
              dayjs(params.row?.tasks[0]?.deadLine).date() - dayjs(new Date()).date() <= 3 &&
              dayjs(params.row?.tasks[0]?.deadLine).year() - dayjs(new Date()).year() >= 0 &&   params.row?.tasks[0]?.state !== 3 &&  params.row?.tasks[0]?.status !== 5? (
                <Tooltip title="Task List - Have task need do complete">
                  <IconButton
                    color="error"
                    onClick={() => {
                      navigate('/header/list-task', { state: params.row });
                      // console.log(params.row)
                    }}
                  >
                    <AssignmentLateTwoToneIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Task List">
                  <IconButton
                    onClick={() => {
                      navigate('/header/list-task', { state: params.row });
                    }}
                  >
                    <AssignmentLateTwoToneIcon />
                  </IconButton>
                </Tooltip>
              )}
            </>
          ) : params.row.projectStatus === 2 ? (
            <>
              <Tooltip title="Task List - canceled">
                <IconButton
                  onClick={() => {
                    navigate('/header/list-task-cancel', { state: params.row });
                  }}
                >
                  <AssignmentLateTwoToneIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Task List">
              <IconButton
                onClick={() => {
                  navigate('/header/list-task', { state: params.row });
                }}
              >
                <AssignmentLateTwoToneIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* {params.row?.projectStatus === 4 ? (
              <Tooltip title="Delete">
                <IconButton onClick={() => handleShowConfirm(params.row.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Delete">
                <IconButton disabled onClick={() => handleShowConfirm(params.row.id)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )} */}
        </Stack>
      ),
    },
  ];
  const handleDeleteProject = () => {
    axios.put(`https://api.ic-fpt.click/api/v1/project/disable/${id}`).then((response) => {
      console.log(response);
    });
  };

  const handleViewDetail = (data) => {
    setShowDetail(true);
    setProject(data);
  };
  const handleViewDetailCancel = (data) => {
    setShowDetailCancel(true);
    setProject(data);
  };
  const fetchData = async () => {
    setLoading(true);
    await axios.get(`https://api.ic-fpt.click/api/v1/project/getAllProject`).then((response) => {
      console.log('responseProject', response.data);
      setProjects(response.data.responseSuccess);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
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
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setShowCreate(true)}>
            New Project
          </Button>
        </Stack>

        <Card>
          <Box sx={{ height: 'auto', width: '100%' }}>
            {projects?.length && (
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
            ) || <></>}
          </Box>
        </Card>
      </Container>

      <DetailCancel show={showDetailCancel} close={() => setShowDetailCancel(false)} project={project} />
      <DetailProject show={showDetail} close={() => setShowDetail(false)} project={project} />
      <CreateProject show={showCreate} close={() => setShowCreate(false)} />

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
          <Button variant="contained" color="error" onClick={() => handleDeleteProject()} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Loading show={loading} />
    </>
  );
}

export default ListProject;
