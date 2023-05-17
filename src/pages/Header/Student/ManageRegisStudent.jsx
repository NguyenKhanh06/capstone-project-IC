import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';
import DetailStudent from './DetailStudent';
import DetailStudentRegister from './DetailStudentRegister';
import { API_URL } from '../../../config/apiUrl/apis-url';

function ManageRegisStudent(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [fileStudent, setFileStudent] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDetailForm, setShowDetailForm] = useState(false);
  const [form, setForm] = useState(null);
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [student, setStudent] = useState([]);



  const handleClickOpenDetail = (data) => {
    setShowDetail(true);
    setStudent(data);
  };
  const handleClickOpenDetailForm = (data) => {
    setShowDetailForm(true);
    setForm(data);
  };
  const columns = [
    {
      field: 'projectName',
      headerName: 'Project Name',
      flex: 1,
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
      headerName: 'Status Personal File',
      flex: 1,
      renderCell: (params) => {
        return <Chip label="full" color="success" />;
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
            <Tooltip title="View Detail">
              <IconButton onClick={() => handleClickOpenDetailForm(params.row)} aria-label="delete">
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Upload File">
<IconButton color="primary" aria-label="upload picture" component="label">
  <input hidden onChange={onChangeFile} accept="application/pdf" type="file" />
  <FileUploadOutlinedIcon />
</IconButton>
        </Tooltip> */}
          </Stack>
        );
      },
    },
  ];
  const onChangeFile = (e) => {
    setFileStudent(e.target.files[0]);
  };

  const handleViewDetail = (data) => {
    setShowDetail(true);
    setProject(data);
  };
  const fetchData = async () => {
    await axios.get(`${API_URL}/project/getAllProject`).then((response) => {
  
      setProjects(response.data.responseSuccess.filter((project) => project.status));
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {

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
            Student's Information
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
              }}
              components={{ NoRowsOverlay }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />
          </Box>
        </Card>
      </Container>
      <DetailStudent show={showDetail} close={() => setShowDetail(false)} student={student} />
      <DetailStudentRegister show={showDetailForm} close={() => setShowDetailForm(false)} form={form} />
    </>
  );
}

export default ManageRegisStudent;
