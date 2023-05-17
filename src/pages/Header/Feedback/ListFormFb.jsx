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
  import axios from 'axios';
  import dayjs from 'dayjs';
  import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
  import { DataGrid } from '@mui/x-data-grid';
  import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { useEffect, useState } from 'react';
  import Iconify from '../../../components/iconify/Iconify';

import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import { API_URL } from '../../../config/apiUrl/apis-url';
import CreateFormFb from './CreateFormFb';
import DetailFormFb from './DetailFormFb';
import DetailFeedBack from './DetailFeedBack';

  
  function ListFormFb(props) {
    const [showCreate, setShowCreate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
  
    const [form, setForm] = useState([]);
    const [formDetail, setFormDetail] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [status, setStatus] = useState(null)
    const [showConfirmUpdate, setShowConfirmUpdate] = useState(false);
    const [id, setID] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

    const handleCloseConfirm = (data) => {
      setShowConfirm(false);
    };

    const handleShowConfirmUpdate = (data, status) => {
      setID(data);
      setStatus(status)
      setShowConfirmUpdate(true);
    };
  
    const handleCloseConfirmUpdate = (data) => {
      setShowConfirmUpdate(false);
    };
  
    const handleViewDetail = (data) => {
      setShowDetail(true);
      setFormDetail(data);
    };
  
    const fetchData = async () => {
      await axios.get(`${API_URL}/feedback/getRootFeedBack`).then((response) => {

        setForm(response.data.responseSuccess)
      });
    };
  
    useEffect(() => {
      fetchData()
    }, []);
  
    const handleDeleteCourse = () => {
      axios.put(`${API_URL}/course/delete/${id}`).then((response) => {
        window.location.reload(false);
      });
    };
  const handleChangeForm = () => {
    axios.put(`${API_URL}/registration/UpdateRegisStatus/${id}?status=${status}`).then((response) => {
      if (response.data.isSuccess) {
        setShowSuccess(true);
        setTimeout(() => {
 window.location.reload()
        }, 1000)
      }
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);

    setShowError(true)
    });
  }
    const columns = [
      {
        field: 'title',
        headerName: 'Title',
        flex: 1,
   
      },
      {
        field: 'registration',
        headerName: 'Form',
        flex: 2,
        valueGetter: (params) => params.row?.registration?.title,
      },
    //   {
    //     field: 'creator',
    //     headerName: 'Creater',
    //     flex: 1,
    //   },
      // {
      //   field: 'childrenFeedBacKs',
      //   headerName: 'Total feedback',
      //   flex: 2,

      //   valueGetter: (params) => {
       
      //     return params.row?.childrenFeedBacKs?.length
      //   },
      // },
      // {
      //   field: 'status',
      //   headerName: 'Status',
      //   flex: 1,
      //   renderCell: (params) => {
      //     return (
      //       <>
      //       {params.row.status ? <Chip label="Active" color='success'/> : <Chip label='Deactive' color='error'/>}
      //       </>
      //     );
      //   },
      // },
  
    
  
  
      {
        headerName: 'Action',
        flex: 1,
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => (
            <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
              <Tooltip title="View Detail">
                <IconButton onClick={() => handleViewDetail(params.row)} aria-label="delete">
                  <RemoveRedEyeRoundedIcon />
                </IconButton>
              </Tooltip>

              {/* {params.row.status ? (<Tooltip title="Close form">
           <IconButton onClick={() => handleShowConfirmUpdate(params.row.id, false)} aria-label="delete">
             <HighlightOffIcon color='error'/>
           </IconButton>
         </Tooltip>) : (<Tooltip title="Open form">
           <IconButton onClick={() => handleShowConfirmUpdate(params.row.id, true)} aria-label="delete">
             <CheckCircleOutlineTwoToneIcon color='success'/>
           </IconButton>
         </Tooltip>)} */}
              {/* <Tooltip title="Delete">
                <IconButton onClick={() => handleShowConfirm(params.row.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip> */}
            </Stack>
          ),
      },
    ];
    return (
      <>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
         Form Feedback
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setShowCreate(true)}>
              New Form
            </Button>
          </Stack>
  
          <Card>
            {form && <DataGrid
              autoHeight
              rows={form}
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
          </Card>
        </Container>
  <DetailFormFb show={showDetail} close={() => setShowDetail(false)} form={formDetail} />
  <CreateFormFb show={showCreate} close={() => setShowCreate(false)}/>
        {/* <Dialog
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
        </Dialog> */}
        <Dialog
          open={showConfirmUpdate}
          onClose={handleCloseConfirmUpdate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Change Status Form</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You want to change status form?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmUpdate}>Cancel</Button>
            <Button variant="contained" onClick={() => handleChangeForm()} autoFocus>
            Accept
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Status Successful!'} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={'Update Status Fail!!!'} />
        </Dialog>
      </>
    );
  }
  
  export default ListFormFb;
  