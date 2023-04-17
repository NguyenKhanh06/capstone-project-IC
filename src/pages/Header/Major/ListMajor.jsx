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
import CreateMajor from './CreateMajor';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import DetailMajor from './DetailMajor';

  
  function ListMajor(props) {
    const [showCreate, setShowCreate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [major, setMajor] = useState([]);
    const [majors, setMajors] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [id, setID] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');
  
    const handleShowConfirm = (data) => {
      setID(data);
      setShowConfirm(true);
    };
  
    const handleCloseConfirm = (data) => {
      setShowConfirm(false);
    };
  
    const handleViewDetail = (data) => {
      setShowDetail(true);
      setMajor(data);
    };
    const handleError = (data) => {
        setShowError(true);
        setMessage(data);
      };
    
    const fetchData = async () => {
      await axios.get(`https://localhost:7115/api/v1/Major/getAllMajor`).then((response) => {
       
        setMajors(response.data.responseSuccess.filter((course) => course.status));
      });
    };
  
    useEffect(() => {
      fetchData()
    }, []);
  
    const handleDeleteMajor = () => {
      axios.put(`https://localhost:7115/api/v1/Major/disable/${id}`)  .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        } 

      }).catch((err) => {

        handleError('Create fail!!');
      })
    };
  
    const columns = [
        {
            field: 'majorFullName',
            headerName: 'Major Full Name',
            flex: 1,
           
          },
      {
        field: 'name',
        headerName: 'Major',
        flex: 1,
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
         Major
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setShowCreate(true)}>
              New Major
            </Button>
          </Stack>
  
          <Card>
            <DataGrid
              autoHeight
              rows={majors}
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
    <CreateMajor show={showCreate} close = {() => setShowCreate(false)}/>
  <DetailMajor show={showDetail} close ={() => setShowDetail(false)} major={major}/>
        <Dialog
          open={showConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Delete Major</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You want to delete this major?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button variant="contained" color="error" onClick={() => handleDeleteMajor()} autoFocus>
              Delete
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Delete Major Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
      </>
    );
  }
  
  export default ListMajor;
  