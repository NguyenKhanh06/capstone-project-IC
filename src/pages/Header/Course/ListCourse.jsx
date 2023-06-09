import {
  Box,
  Button,
  Card,
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
import axios from 'axios';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import Iconify from '../../../components/iconify/Iconify';
import CreateCourse from './CreateCourse';
import DetailCourse from './DetailCourse';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import { API_URL } from '../../../config/apiUrl/apis-url';

function ListCourse(props) {
  const [message, setMessage] = useState('');

  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [course, setCourse] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [id, setID] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleShowConfirm = (data) => {
    setID(data);
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };

  const handleViewDetail = (data) => {
    setShowDetail(true);
    setCourse(data);
  };

  const fetchData = async () => {
    await axios.get(`${API_URL}/course/getAllCourse`).then((response) => {
   
      setCourses(response.data.responseSuccess.filter((course) => course.status));
    });
  };

  useEffect(() => {
    fetchData()
  }, []);

  const handleDeleteCourse = () => {
    axios.put(`${API_URL}/course/delete/${id}`) .then((response) => {
      if (response.data.isSuccess) {
        setShowSuccess(true);
        setTimeout(() =>{
          window.location.reload()
        }, 2000);
      }
    })
    .catch((err) => {
      handleError('Delete fail!');
    });
  };

  const columns = [
    {
      field: 'courseName',
      headerName: 'Course Name',
      flex: 1,
    },

    {
      field: 'dateCreated',
      headerName: 'Create Date',
      flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
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
            <Tooltip title="Delete">
              <IconButton onClick={() => handleShowConfirm(params.row.id)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Course
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setShowCreate(true)}>
            New Course
          </Button>
        </Stack>

        <Card>
          <DataGrid
            autoHeight
            rows={courses}
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
      <DetailCourse show={showDetail} close={() => setShowDetail(false)} course={course} />
      <CreateCourse show={showCreate} close={() => setShowCreate(false)} />

      <Dialog
        open={showConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">Delete Course</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You want to delete this course?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button variant="contained" color="error" onClick={() => handleDeleteCourse()} autoFocus>
            Delete
          </Button>
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Delete Course successful!!'} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
    </>
  );
}

export default ListCourse;
