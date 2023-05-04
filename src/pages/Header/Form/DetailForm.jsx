import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { DataGrid } from '@mui/x-data-grid';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DetailStudentRegister from '../Student/DetailStudentRegister';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import axios from 'axios';
import DetailStudentRegisterDetail from '../Student/DetailStudentRegisterDetail';

function DetailForm(props) {
  const [disableBtn, setDisable] = useState(false);
  const [disableBtn1, setDisable1] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
    const [childForm, setChildForm] = useState(null)
    const [open, setOpen] = useState(false);
  const [showRegis, setShowRegis] = useState(false);
  const [student, setStudent] = useState([]);
  const [openRegis, setOpenRegis] = useState(null)
  const [closeRegis, setCloseRegis] = useState(null)

    const handleClose = () => {
        setOpen(props.close);
      };
      const columns = [
        {
          field: 'fullName',
          headerName: 'Full Name',
          flex: 1,
          valueGetter: (params) => {
       
            return params.row.student.fullName
          },
        
        },
    
        {
          field: 'rollNumber',
          headerName: 'Roll Number',
          flex: 1,
          valueGetter: (params) => {
       
            return params.row.student.rollNumber
          },
        },
    
        {
          field: 'email',
          headerName: 'Email',
          flex: 2,
          valueGetter: (params) => {
       
            return params.row.student.email
          },
        },
    
        {
          field: 'phoneNumber',
          headerName: 'phoneNumber',
          flex: 1,
          valueGetter: (params) => {
       
            return params.row.student.phoneNumber
          },
        },
        {
          field: 'address',
          headerName: 'Address',
          flex: 1,
          valueGetter: (params) => {
       
            return params.row.student.address
          },
        },
        {
          field: 'action',
          headerName: 'Action',
          flex: 1,
          disableClickEventBubbling: true,
    
          renderCell: (params) => (
            <Tooltip title="View detail">
            <IconButton
              onClick={() => handleClickOpenDetailRegis(params.row)}
              aria-label="delete"
            >
              <RemoveRedEyeRoundedIcon />
            </IconButton>
          </Tooltip>
            ),
        },
      ]
      const handleError = (data) => {
        setShowError(true);
        setMessage(data);
      };
      const handleClickOpenDetailRegis = (data) => {
        setShowRegis(true);
        setStudent(data);
      };
      const handleCloseConfirm = (data) => {
        setShowConfirm(false);
      };
const updateDate = () => {
  axios({
    method: 'PUT',
 
    url: `https://api.ic-fpt.click/api/v1/registration/UpdateRegisId/${props.form?.id}?DateOpenRegis=${openRegis}&DateCloseRegis=${closeRegis}&ProjectId=${props.form?.project?.id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((response) => {
    if (response.data.isSuccess) {
      setShowSuccess(true);

      setTimeout(() => {
    window.location.reload()

      }, 1000)
  

    }
  })
  .catch((err) => {
    handleError('Delete fail!!!!');

  });
}

const getChildForm = async () => {
  axios.get(`https://api.ic-fpt.click/api/v1/registration/GetChildReg/${props.form?.id}`).then(response => {
    setChildForm(response.data.responseSuccess)
  })
}

useEffect(() => {
  if (props.form) {
    setOpenRegis(dayjs(props.form?.dateOpenRegis))
    setCloseRegis(dayjs(props.form?.dateCloseRegis))
    getChildForm()
  }
}, [props.form]);

    return (
        <Dialog
        open={props.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Detail Form</DialogTitle>
          <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Divider variant="middle" />
        <DialogContent>
        <Stack  sx={{ marginBottom: 4}} direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
            
                      format="DD/MM/YYYY"
                      sx={{ width: '50%' }}
                      label="Estimate Date Open"
                      value={openRegis}
                      onChange={(newValue) => {
                        setOpenRegis(newValue);
                        setDisable(true)
                      }}
                    />
                  </LocalizationProvider>

                  <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
       
                      minDate={dayjs(closeRegis)}
                      sx={{ width: '50%' }}
                      label="Estimate Date Close"
                      value={closeRegis}
                      onChange={(newValue) => {
                        setCloseRegis(newValue);
                        setDisable1(true)
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </Stack>
            <Stack direction={'column'} justifyContent="space-evenly" alignItems="flex-start" spacing={2} flexWrap="wrap">
            <Stack direction={'row'} justifyContent="space-evenly" alignItems="flex-start" spacing={2} flexWrap="wrap">
            <Typography variant='h5'>Project: </Typography>
        
        <p>{props.form?.project?.projectName}</p>
            </Stack>
            <Divider sx={{marginTop: 5}} variant="middle" />
             <Typography variant='h6'>Basic Information</Typography>
             <ol style={{display: "flex", flexDirection: "column", gap: 3, marginLeft: "20px", marginBottom: "20px"}}>
                <li>Student Name</li>
                <li>Roll Number</li>
                <li>Major</li>
                <li>Date of birth</li>
                <li>Phone Number</li>
                <li>Passport Number</li>
                <li>Expiration Date</li>
                <li>Social Link</li>
                <li>Passport Image</li>
                <li>Payment Image</li>
             </ol>
            </Stack>
       
          <Divider sx={{marginTop: 5}} variant="middle" />
            <Stack direction={'column'} justifyContent="space-evenly" alignItems="flex-start" spacing={2} flexWrap="wrap">
            
             <Typography variant='h6'>Addition Field</Typography>
             <ol style={{display: "flex", flexDirection: "column", gap: 3, marginLeft: "20px", marginBottom: "20px"}}>
                {props.form?.contentHeader1 ?   <li>{props.form?.contentHeader1}</li> : null}
                {props.form?.contentHeader2 ?   <li>{props.form?.contentHeader2}</li> : null}
                {props.form?.contentHeader3 ?   <li>{props.form?.contentHeader3}</li> : null}
                {props.form?.contentHeader4 ?   <li>{props.form?.contentHeader4}</li> : null}
                {props.form?.contentHeader5 ?   <li>{props.form?.contentHeader5}</li> : null}
          
           
             </ol>
            </Stack>
            <Divider sx={{marginTop: 5}} variant="middle" />
            <Typography sx={{marginTop: 6, marginBottom: 4}} variant='h6'>Register (Total student: {childForm?.length})</Typography>

          {childForm && <DataGrid
              autoHeight
              rows={childForm}
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
        </DialogContent>
        <DialogActions>
          {disableBtn ||  disableBtn1 ? <Button variant='contained' onClick={() => setShowConfirm(true)}>Save</Button> : <Button disabled variant='contained'>Save</Button>}
        </DialogActions>
        <Dialog
        open={showConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">Update Form</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You Want To Update Form?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button variant="contained" onClick={() => updateDate()} autoFocus>
            Accept
          </Button>
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Form Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
    
      </Dialog>
        <DetailStudentRegisterDetail show={showRegis} close={() => setShowRegis(false)} studentID = {student}/>
      </Dialog>
    );
}

export default DetailForm;