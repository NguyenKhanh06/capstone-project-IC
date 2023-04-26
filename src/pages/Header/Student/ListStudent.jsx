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
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
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
import Loading from "../../Loading";
import CreateStudent from './CreateStudent';
import DetailStudent from './DetailStudent';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import DetailStudentRegister from './DetailStudentRegister';
import ListFormStudent from './ListForm';

function StudentCertificate(props) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');

  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(false)
  const [showCreate, setShowCreate] = useState(false);
  const [showRegis, setShowRegis] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [task, setTask] = useState([]);
  const [fileStudent, setFileStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [id, setID] = useState({});
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };
  const handleSuccess = (data) => {
    setShowSuccess(true);
    setMessage(data);
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

      renderCell: (params) => (
          <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
            <Tooltip title="Register information">
              <IconButton
                onClick={() => handleClickOpenDetailRegis(params.row)}
                aria-label="delete"
              >
                <HowToRegOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Detail">
              <IconButton
                onClick={() => handleClickOpenDetail(params.row)}
                aria-label="delete"
              >
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => handleShowConfirm(params.row)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
    },
  ];

  const onChangeFile = (e) => {
    setFileStudent(e.target.files[0]);
  };
  const handleShowConfirm = (data) => {
    setID(data);
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
  const handleDeleteStudent = () => {
    axios.delete(`https://api.ic-fpt.click/api/v1/student/delete/${id.id}`).then((response) => {
      setLoading(false)
      if (response.data.isSuccess) {
        google.accounts.id.revoke(id.email, done => {
          console.log('consent revoked');
        });
        handleSuccess("Delete Student Successful!")
        setTimeout(() => {
         window.location.reload()
        }, 1500)
      }
    })
    .catch((err) => {
      handleError('Delete fail!');
    });
  };

  const handleClickOpenDetail = (data) => {
    setShowDetail(true);
    setStudent(data);
  };

  const handleClickOpenDetailRegis = (data) => {
    setShowRegis(true);
    setStudent(data);
  };
  const fetchData = async () => {
    setLoading(true)
    await axios.get(`https://api.ic-fpt.click/api/v1/student/getAllStudent`).then((response) => {
      setStudents(response.data.responseSuccess);
      setLoading(false)
    });
  };

  useEffect(() => {
    fetchData().catch((error) => {});
  }, []);
  function reload() {
    window.location.reload(false);
  }
  const handleImportFile = (file) => {
    setLoading(true)
    const formData = new FormData();
    formData.append('formFile', fileStudent);
    axios({
      method: 'POST',
      data: formData,
      url: 'https://api.ic-fpt.click/api/v1/student/importStudent',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setLoading(false)
        if (response.data.isSuccess) {
          handleSuccess("Upload File Successful")
          setTimeout(() => {
           window.location.reload()
          }, 1500)
        }
      })
      .catch((err) => {
        handleError('Import fail!');
      });
  };

  useEffect(() => {
    if (fileStudent != null) {
      handleImportFile();
     
    }
  }, [fileStudent]);

  const handleExportFile = () => {
    axios
      .get(`https://api.ic-fpt.click/api/v1/student/exportExcel`, {
        responseType: 'blob',
      })
      .then((response) => {


        if (response.status === 200) {
       handleSuccess("Export Successfull, Please waitting for download!!!")
        
        }
        let filename = 'studentList.xlsx';
        filename = decodeURI(filename);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        link.remove();
      });
  };

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
                onClick={() => handleExportFile()}
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
           {students && <DataGrid
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
            />} 
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
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button variant="contained" color="error" onClick={() => handleDeleteStudent()} autoFocus>
            Delete
          </Button>
        </DialogActions>
       
      </Dialog>
      <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={message} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      <DetailStudent show={showDetail} close={() => setShowDetail(false)} student={student} />
<ListFormStudent show={showRegis} close={() => setShowRegis(false)} studentID = {student}/>
      <CreateStudent show={showCreate} close={() => setShowCreate(false)} />
      <Loading show={loading} />
    </>
  );
}

export default StudentCertificate;
