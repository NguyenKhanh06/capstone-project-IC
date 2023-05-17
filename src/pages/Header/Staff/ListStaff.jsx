import { Button, Card, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import Iconify from '../../../components/iconify/Iconify';
import DetailStaff from './DetailStaff';
import CreateStaff from './CreateStaff';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import { API_URL } from '../../../config/apiUrl/apis-url';

function ListStaff(props) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const regexMailFu = /[\w.-]+fptu@gmail\.com$/
    const [staffs, setStaffs] = useState([])
    const [staff, setStaff] = useState([])
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [id, setID] = useState(null);


  const handleError = (data) => {
    setMessage(data);
    setShowError(true);
  };
  function reload() {
      window.location.reload(false);
    }


  const handleShowConfirm = (data) => {
    setID(data);
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
const handleShowDetail = (data) => {
    setShowDetail(true);
    setStaff(data);

}

const handleDeleteStaff = () => {
    axios.put(`${API_URL}/account/changeStatusAccount/${id}?Status=false`).then((response) => {
     
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(() =>{
            window.location.reload();
         }, 2000);
        } 
      }).catch((err) => {
        handleError('Delete fail!');
      })
}

const fetchData = async () => {
  await axios.get(`${API_URL}/staff/getAll`).then((response) => {

       setStaffs(response.data.responseSuccess.filter(staff => staff.account.role !== 4  && staff.account.status && staff.account.role !== 1 && regexMailFu.test(staff.account.email)))
   })
}
useEffect(() => {
   fetchData()
 }, []);
const columns = [
   {
     field: 'fullName',
     headerName: 'Full Name',
     flex: 2,
     valueGetter: (params) => {
  
       return params.row?.account?.fullName
     },
   },
   {
       field: 'staffCode',
       headerName: 'Staff Code',
       flex: 1,
   
     },

   {
     field: 'email',
     headerName: 'Email',
     flex: 2,
       valueGetter: (params) => {
  
   return params.row?.account?.email
 },
   },



   {
     field: 'address',
     headerName: 'Address',
     flex: 1,
     valueGetter: (params) => {
  
       return params.row?.account?.address
     },
   },
   {
       field: 'account',
       headerName: 'Role ',
       flex: 0,
       renderCell: (params) => {
           return (
             <>
               {params.row?.account.role === 0 ? (
                 <Chip label="No role" />
               ) : params.row?.account.role === 1 ? (
                 <Chip label="Admin" color="primary" />
               ) : params.row?.account.role === 2 &&  !params.row?.isHeadOfDepartMent? (
                 <Chip label="Staff" color="secondary" />
               ) : params.row?.account.role === 3 ? (
                 <Chip label="Collaborator" color="warning" />
               ): params.row?.account.role === 2 && params.row?.isHeadOfDepartMent ? (
                   <Chip label="Header Of Department" color="info" />
                 ): null}
                
             </>
             
           );
           
         },
       
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
                  <IconButton onClick={() => handleShowDetail(params.row)} aria-label="delete">
                    <RemoveRedEyeRoundedIcon />
                  </IconButton> 
                </Tooltip>
                {/* {params.row?.account.role === 2 && !params.row.isHeadOfDepartMent ?     params.row.account.status ? (
                  <Tooltip  title="Deactive account">
                  <IconButton onClick={() => handleShowConfirm(params.row?.account?.email, false)} >
                  <HighlightOffOutlinedIcon color="error" />
                  </IconButton>
                </Tooltip>
        
                ) : (
                  <Tooltip title="Active Account">
                    <IconButton onClick={() => handleShowConfirm(params.row.account.email, true)}>
                      <PublishedWithChangesOutlinedIcon color="success" />
                    </IconButton>
                  </Tooltip>
                )
                : null} */}
               
              </Stack>
    )
          },
        },
      ];
    
    return (
        <>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Staff
            </Typography>
            {/* <Button onClick={() => setShowCreate(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Staff
            </Button> */}
          </Stack>
  
          <Card>
            <DataGrid
              autoHeight
              rows={staffs}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              getRowId={(row) => row.accountId}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
            />
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
          <DialogTitle id="alert-dialog-title">Delete Staff</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You want to delete this staff?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCloseConfirm()}>Cancel</Button>
            <Button onClick={() => handleDeleteStaff()} variant="contained" color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <CreateStaff show={showCreate} close={() => setShowCreate(false)}/>
        <DetailStaff show = {showDetail} close={() => setShowDetail(false)} staff={staff}/>
<SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message="Delete Successful!!!"/>
<ErrorAlert show={showError} close={() => setShowError(false)} message={message}/>
      </>
    );
}

export default ListStaff;