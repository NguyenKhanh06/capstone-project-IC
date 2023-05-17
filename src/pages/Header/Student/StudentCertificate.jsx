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
  import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
  import DeleteIcon from '@mui/icons-material/Delete';
  import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
  import { DataGrid } from '@mui/x-data-grid';
  import { visuallyHidden } from '@mui/utils';
  import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
  import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
  import { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import Iconify from '../../../components/iconify/Iconify';
  import Label from '../../../components/label/Label';
  import Scrollbar from '../../../components/scrollbar/Scrollbar';
  import { UserListToolbar } from '../../../sections/@dashboard/user';
  import CreateStudent from './CreateStudent';
  import DetailStudent from './DetailStudent';
import { API_URL } from '../../../config/apiUrl/apis-url';
  
  function StudentCertificate(props) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
  
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [task, setTask] = useState([]);
    const [fileStudent, setFileStudent] = useState(null);
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [id, setID] = useState('');
    const navigate = useNavigate()
  
    const handleShowConfirm = (data) => {
      setID(data);
      setShowConfirm(true);
    };
  
    const handleCloseConfirm = (data) => {
      setShowConfirm(false)
    };
    const handleDeleteStudent = () => {
      axios.delete(`${API_URL}/student/delete/${id}`).then((response) => {
        window.location.reload(false);
      });
    };
  
    const handleClickOpenDetail = (data) => {
      setShowDetail(true);
      setStudent(data);
      
    };
  
    const columns = [
      {
        field: 'fullName',
        headerName: 'Full Name',
        flex: 1,
      },
  
      {
        field: 'rollNumber',
        headerName: 'Roll Number',
        flex: 1,
      },
  
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
      },
  
      {
        field: 'phoneNumber',
        headerName: 'phoneNumber',
        flex: 1,
      },
      {
        field: 'address',
        headerName: 'Address',
        flex: 1,
      },
      {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        disableClickEventBubbling: true,
  
        renderCell: (params) => {
  return(
  
            <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
              <Tooltip title="View Detail">
                <IconButton onClick={() => navigate('/header/student/student-information', {state: params.row}) } aria-label="delete">
                  <RemoveRedEyeRoundedIcon />
                </IconButton> 
              </Tooltip>
              <Tooltip  title="Delete">
                <IconButton onClick={() => handleShowConfirm(params.row.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            </Stack>
  )
        },
      },
    ];
  
    const onChangeFile = (e) => {
      setFileStudent(e.target.files[0]);
    };
  
    const [filterName, setFilterName] = useState('');
    const handleOpenMenu = (event) => {
      setOpen(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setOpen(null);
    };
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
  
    const handleFilterByName = (event) => {
      setPage(0);
      setFilterName(event.target.value);
    };
  
    const handleViewDetail = (data) => {
      setShowDetail(true);
      setTask(data);
    };
  
    const fetchData = async () => {
      await axios.get(`${API_URL}/student/getAllStudent`).then((response) => {
        setStudents(response.data.responseSuccess);
   
      });
    };
  
    useEffect(() => {
      fetchData().catch((error) => {});
    }, []);
  
    const handleImportFile = (file) => {
      const formData = new FormData();
      formData.append('formFile', fileStudent);
      axios({
        method: 'POST',
        data: formData,
        url: `${API_URL}/student/importStudent`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        
      });
    };
  
    useEffect(() => {
      if (fileStudent != null) {
        handleImportFile();
      }
    }, [fileStudent]);
  
    return (
      <>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Student
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={6}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Button color="secondary" variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}>
                  Import File
                  <input
                    onChange={onChangeFile}
                    id="input"
                    hidden
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    type="file"
                  />
                </Button>
  
                <Button
                  color="warning"
                  variant="contained"
                  startIcon={<FileDownloadOutlinedIcon />}
                  onClick={() => handleImportFile()}
                >
                  Export File
                </Button>
              </Stack>
  
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={() => setShowCreate(true)}
              >
                New Student
              </Button>
            </Stack>
          </Stack>
  
          <Card>
            <Box sx={{ height: 'auto', width: '100%' }}>
              <DataGrid
                autoHeight
                rows={students}
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
          <DialogTitle id="alert-dialog-title">Delete Student</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You want to delete this student?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={() => handleDeleteStudent()} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
  
        <DetailStudent show={showDetail} close={() => setShowDetail(false)} student={student}/>
  
        <CreateStudent show={showCreate} close={() => setShowCreate(false)} />
      </>
    );
  }
  
  export default StudentCertificate;
  