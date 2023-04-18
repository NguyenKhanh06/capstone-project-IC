import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { DataGrid } from '@mui/x-data-grid';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DetailStudentRegister from '../Student/DetailStudentRegister';

function DetailForm(props) {
    
    const [open, setOpen] = useState(false);
  const [showRegis, setShowRegis] = useState(false);
  const [student, setStudent] = useState([]);

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
          flex: 1,
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
              onClick={() => handleClickOpenDetailRegis(params.row.student)}
              aria-label="delete"
            >
              <RemoveRedEyeRoundedIcon />
            </IconButton>
          </Tooltip>
            ),
        },
      ]

      const handleClickOpenDetailRegis = (data) => {
        setShowRegis(true);
        setStudent(data);
      };
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
            <Typography sx={{marginTop: 6, marginBottom: 4}} variant='h6'>Register (Total student: {props.form?.childrenRegistrations?.length})</Typography>

          {props.form?.childrenRegistrations && <DataGrid
              autoHeight
              rows={props.form?.childrenRegistrations}
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
        <DetailStudentRegister show={showRegis} close={() => setShowRegis(false)} studentID = {student.id}/>
      </Dialog>
    );
}

export default DetailForm;