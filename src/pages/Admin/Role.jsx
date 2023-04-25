import { Button, Card, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import { DataGrid } from '@mui/x-data-grid';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import DetailStaff from '../Header/Staff/DetailStaff';
import CreateStaff from '../Header/Staff/CreateStaff';
import DetailStaffAd from './DetailStaffAd';
import Iconify from '../../components/iconify/Iconify';
import SuccessAlert from '../Alert/SuccessAlert';
import ErrorAlert from '../Alert/ErrorAlert';

function Role(props) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const regexMailFu = /[\w.-]+fptu@gmail\.com$/

    const [staffs, setStaffs] = useState([])
    const [staff, setStaff] = useState([])
    const [showConfirm, setShowConfirm] = useState(false);
    const [showConfirmChange, setShowConfirmChange] = useState(false);
    const [showConfirmChangeRole, setShowConfirmChangeRole] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [id, setID] = useState(null);
  const [idStaff, setIDStaff] = useState(null);
  const [status, setStatus] = useState(null);
  const [mail, setMail] = useState(null);


  const handleError = (data) => {
    setMessage(data);
    setShowError(true);
  };
  const handleSuccess = (data) => {
    setMessage(data);
    setShowSuccess(true);
  };
  function reload() {
      window.location.reload(false);
    }


  const handleShowConfirm = (data, status) => {
    setID(data);
setStatus(status)
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
  const handleShowConfirmUpdate = (data) => {
    setIDStaff(data);

    setShowConfirmChangeRole(true);
  };
  const handleCloseConfirmUpdate = (data) => {
    setShowConfirmChangeRole(false);
    setIDStaff(data)
  };
  const handleShowConfirmChange = (data) => {
    setMail(data);
    setShowConfirmChange(true);
  };
  const handleCloseConfirmChange = () => {

    setShowConfirmChange(false);
  };

const handleShowDetail = (data) => {
    setShowDetail(true);
    setStaff(data);

}

const updateHeader = () => {

  const data = {
    "staffCode": idStaff.staffCode,
  "isHeadOfDepartMent": true,
  "accountId": idStaff.accountId
  }
  axios.put(`https://api.ic-fpt.click/api/v1/staff/update/${idStaff.id}`, data).then((response) => {
    if (response.data.isSuccess) {
      handleSuccess('Update To Header Successful!!!!!')
      setTimeout(reload(), 2000);
    } 
  }).catch((err) => {
    handleError('Update To Header Fail!!!!');
  })
}

const handleChange = () => {
    axios.put(`https://api.ic-fpt.click/api/v1/account/ChangeRole/${mail}?roleEnum=2`).then((response) => {
        if (response.data.isSuccess) {
          handleSuccess('Update To Staff Successful!!!!!')
          setTimeout(reload(), 2000);
        } 
      }).catch((err) => {
        handleError('Update  To Staff Fail!!!!');
      })
}

const handleDeleteStaff = () => {
    axios.put(`https://api.ic-fpt.click/api/v1/account/changeStatusAccount/${id}?Status=${status}`).then((response) => {
        if (response.data.isSuccess) {
          handleSuccess('Delete Account Successful!!!!!')
          setTimeout(() =>{
            window.location.reload();
         }, 2000);
        } 
      }).catch((err) => {
        handleError('Delete Account Fail!!!!');
      })
}

    const fetchData = async () => {
       await axios.get(`https://api.ic-fpt.click/api/v1/staff/getAll`).then((response) => {
    
            setStaffs(response.data.responseSuccess.filter(staff => staff.account.role !== 4   && regexMailFu.test(staff.account.email)))
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
          field: 'status',
          headerName: 'Status',
          flex: 1,
          renderCell: (params) => {
       
            return (
              <>
              {params.row.account.status ? 
              <Chip label="Active" color='success'/> : <Chip label="Deactive" color='error' />
            }
              </>
            )
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
              sortComparator: (v1, v2) => v1.role.localeCompare(v2.role)
          },
        {
          field: 'action',
          headerName: 'Action',
          flex: 1.5,
          disableClickEventBubbling: true,
    
          renderCell: (params) => {
    return(
    
              <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                <Tooltip title="View Detail">
                  <IconButton onClick={() => handleShowDetail(params.row)} aria-label="delete">
                    <RemoveRedEyeRoundedIcon />
                  </IconButton> 
                </Tooltip>
                {params.row?.account.role === 2 && !params.row.isHeadOfDepartMent ?   
                
                params.row.account.status ? (
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
                : null}
                
                {params.row?.account.role === 0 ?   <Tooltip  title="Update to Staff">
                  <IconButton onClick={() => handleShowConfirmChange(params.row?.account?.email)} >
                    <ArrowCircleUpOutlinedIcon color="success" />
                  </IconButton>
                </Tooltip> : params.row?.account.role === 2 && !params.row.isHeadOfDepartMent ?   <Tooltip  title="Update to Header of department">
                  <IconButton onClick={() => handleShowConfirmUpdate(params.row)} >
                    <ArrowCircleUpOutlinedIcon color="success" />
                  </IconButton>
                </Tooltip> : null}
              
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
             Account
            </Typography>
            {/* <Button onClick={() => setShowCreate(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Account
            </Button> */}
          </Stack>
  
          <Card>
          {staffs &&   <DataGrid
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
            />}
          </Card>
        </Container>

        <Dialog
          open={showConfirmChange}
          onClose={handleCloseConfirmChange}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Update Role</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Do You want to update this account to be a staff?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCloseConfirmChange()}>Cancel</Button>
            <Button onClick={() => handleChange()} variant="contained" autoFocus>
              Accept
            </Button>
          </DialogActions>
        </Dialog>
  
        <Dialog
          open={showConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Chnage Staff's Status</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You want to change status of this staff?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCloseConfirm()}>Cancel</Button>
            <Button onClick={() => handleDeleteStaff()} variant="contained"  autoFocus>
              Accept
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={showConfirmChangeRole}
          onClose={handleCloseConfirmUpdate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Chnage Staff's Status</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You want to change this staff to head of department?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCloseConfirmUpdate()}>Cancel</Button>
            <Button onClick={() => updateHeader()} variant="contained"  autoFocus>
              Accept
            </Button>
          </DialogActions>
        </Dialog>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={message}/>
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message}/>
        <CreateStaff show={showCreate} close={() => setShowCreate(false)}/>
        <DetailStaffAd show = {showDetail} close={() => setShowDetail(false)} staff={staff}/>

      </>
    );
}

export default Role;