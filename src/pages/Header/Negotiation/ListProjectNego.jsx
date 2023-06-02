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
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';

import { useNavigate } from 'react-router-dom';
import Iconify from '../../../components/iconify/Iconify';
import DetailProjectNego from './DetailProjectNego';
import DetailCourseNego from './DetailCourseNeogo';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import { API_URL } from '../../../config/apiUrl/apis-url';

function ListProjectNego(props) {
  const navigate = useNavigate();
  const [fileStudent, setFileStudent] = useState(null);

  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [course, setCourse] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNego, setShowNego] = useState(false);

  const [viewMember, setViewMember] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [id, setID] = useState('');
  const [idPrj, setIDPrj] = useState('');

  const handleImportFile = (file) => {
    const formData = new FormData();
    formData.append('formFile', fileStudent);
    formData.append('DateCreated', new Date());
    formData.append('Status', true);
    formData.append('ProjectId', idPrj.id);
    axios({
      method: 'POST',
      data: formData,
      url: `${API_URL}/document`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          handleSuccess('Complete Project Successful!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        handleError('Complete Project Fail!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  const handleShowConfirmChange = (data) => {
    setShowConfirm(true);
    setIDPrj(data);
  };

  const handleShowConfirm = (data) => {
    setID(data);
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };
  const handleSuccess = (data) => {
    setShowSuccess(true);
    setMessage(data);
  };
  const handleUpdate1 = () => {
    axios
      .put(
        `${API_URL}/project/update/${idPrj.id}?CampusName=${idPrj.campusName}&ProjectName=${
          idPrj.projectName
        }&Description=${idPrj.description}&EstimateTimeStart=${dayjs(idPrj.estimateTimeStart)}&EstimateTimeEnd=${dayjs(
          idPrj.estimateTimeEnd
        )}&DateCreate=${dayjs(idPrj.dateCreated)}&ProjectStatus=${idPrj.projectStatus}&LeaderId=${
          idPrj.leaderId
        }&CourseId=${idPrj.courseId}&PartnerId=${idPrj.partnerId}&ProgramId=${
          idPrj.programId
        }&CampusId=${idPrj.campusId}&CheckNegotiationStatus=true`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          handleImportFile();
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };

  const handleUpdate2 = () => {
    axios
      .put(
        `${API_URL}/project/update/${idPrj.id}?CampusName=${idPrj.campusName}&ProjectName=${
          idPrj.projectName
        }&Description=${idPrj.description}&EstimateTimeStart=${dayjs(idPrj.estimateTimeStart)}&EstimateTimeEnd=${dayjs(
          idPrj.estimateTimeEnd
        )}&DateCreate=${dayjs(idPrj.dateCreated)}&ProjectStatus=${idPrj.projectStatus}&LeaderId=${
          idPrj.leaderId
        }&CourseId=${idPrj.courseId}&PartnerId=${idPrj.partnerId}&OfficalTimeStart=${dayjs(
          idPrj.officalTimeStart
        )}&OfficalTimeEnd=${dayjs(idPrj.officalTimeEnd)}&ProgramId=${idPrj.programId}&CampusId=${
          idPrj.campusId
        }&CheckNegotiationStatus=true`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          handleImportFile();
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };
  // console.log(`${API_URL}/project/update/${props.project.id}?CampusName=${selectedCampus?.name}&ProjectName=${projectName}&Description=${description}&EstimateTimeStart=${estimateStart}&EstimateTimeEnd=${estimateEnd}&DateCreate=${props.project.dateCreated}&ProjectStatus=${status}&LeaderId=${selectedLeader.id}&CourseId=${course.id}&PartnerId=${props.project.partnerId}&CategoryProjectId=${cate.id}&CampusId=${selectedCampus.id}`)}

  const handleUpdateProject = () => {
    if (idPrj.officalTimeStart && idPrj.officalTimeEnd != null) {
      handleUpdate2();
    } else {
      handleUpdate1();
    }
  };

  const onChangeFile = (e) => {
    setFileStudent(e.target.files[0]);
  };

  const columns = [
    {
      field: 'projectName',
      headerName: 'Project Name',
      flex: 2,
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
      field: 'partner',
      headerName: 'Partner',
      flex: 1,
      valueGetter: (params) => {
        return params.value.name;
      },
    },

    {
      field: 'action',
      headerName: 'Action',
      flex: 1,

      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          return alert(JSON.stringify(currentRow, null, 4));
        };

        return (
          <>
            {params.row.projectStatus === 2 ? (
              <Tooltip title="Project is canceled">
                <DoNotDisturbOnOutlinedIcon color="error" />
              </Tooltip>
            ) : params.row.checkNegotiationStatus ? (
              <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                <Tooltip title="View Detail">
                  <IconButton onClick={() => handleViewDetail(params.row)} aria-label="delete">
                    <RemoveRedEyeRoundedIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Neogotiation is completed">
                  <IconButton onClick={() => handleViewNego(params.row)} aria-label="delete">
                    <CheckCircleOutlineTwoToneIcon color="success" />
                  </IconButton>
                </Tooltip>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                <Tooltip title="View Detail">
                  <IconButton onClick={() => handleViewDetail(params.row)} aria-label="delete">
                    <RemoveRedEyeRoundedIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Neogotiation">
                  <IconButton onClick={() => handleViewNego(params.row)} aria-label="delete">
                    <HandshakeOutlinedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Complete">
                  <IconButton onClick={() => handleShowConfirmChange(params.row)} aria-label="delete">
                    <CheckCircleOutlineTwoToneIcon color="success" />
                  </IconButton>
                </Tooltip>
              </Stack>
            )}
          </>
        );
      },
    },
  ];

  const handleViewDetail = (data) => {
    setShowDetail(true);
    setProject(data);
  };
  const handleViewNego = (data) => {
    setShowNego(true);
    setID(data);
  };
  const fetchData = async () => {
    await axios.get(`${API_URL}/project/getAllProject`).then((response) => {
      setProjects(response.data.responseSuccess);
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {});
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
            Negotiation
          </Typography>
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
                  sortModel: [{ field: 'dateCreated', sort: 'desc' }],
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
        <DialogTitle id="alert-dialog-title">Complete the neogotiation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Import file before complete the Neogotiation?{' '}
          </DialogContentText>
          <p style={{ marginTop: 10, color: 'red' }}>(Just accept file with size under 20MB)</p>
          <Button
            style={{ marginTop: 20 }}
            color="secondary"
            variant="contained"
            component="label"
            startIcon={<FileUploadOutlinedIcon />}
          >
            Update File
            <input onChange={onChangeFile} id="input" hidden type="file" />
          </Button>

          {fileStudent && <Typography style={{ marginTop: 10 }}>{fileStudent?.name}</Typography>}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          {fileStudent ? (
            <Button onClick={() => handleUpdateProject()} variant="contained" autoFocus>
              Accept
            </Button>
          ) : (
            <Button disabled onClick={() => handleUpdateProject()} variant="contained" autoFocus>
              Accept
            </Button>
          )}
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Complete Project Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={'Complete Project Fail!'} />
      </Dialog>
      <DetailCourseNego show={showNego} close={() => setShowNego(false)} id={id} />
      <DetailProjectNego show={showDetail} close={() => setShowDetail(false)} project={project} />
    </>
  );
}

export default ListProjectNego;
