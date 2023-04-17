import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function DetailForm(props) {
    
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(props.close);
      };
    return (
        <Dialog
        open={props.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Detail Form</DialogTitle>
          <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Divider variant="middle" />
        <DialogContent>
        <Paper>
            <Stack direction={'column'} justifyContent="space-evenly" alignItems="flex-start" spacing={2} flexWrap="wrap">
            <Stack direction={'row'} justifyContent="space-evenly" alignItems="flex-start" spacing={2} flexWrap="wrap">
            <Typography variant='h5'>Project: </Typography>
        
        <p>{props.form?.project?.projectName}</p>
            </Stack>
            <Divider sx={{marginTop: 5}} variant="middle" />
             <Typography variant='h6'>Basic Information</Typography>
             <ol style={{display: "flex", flexDirection: "column", gap: 3}}>
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
          </Paper>
          <Paper>
          <Divider sx={{marginTop: 5}} variant="middle" />
            <Stack direction={'column'} justifyContent="space-evenly" alignItems="flex-start" spacing={2} flexWrap="wrap">
            
             <Typography variant='h6'>Addition Field</Typography>
             <ol style={{display: "flex", flexDirection: "column", gap: 3}}>
                {props.form?.contentHeader1 ?   <li>{props.form?.contentHeader1}</li> : null}
                {props.form?.contentHeader2 ?   <li>{props.form?.contentHeader2}</li> : null}
                {props.form?.contentHeader3 ?   <li>{props.form?.contentHeader3}</li> : null}
                {props.form?.contentHeader4 ?   <li>{props.form?.contentHeader4}</li> : null}
                {props.form?.contentHeader5 ?   <li>{props.form?.contentHeader5}</li> : null}
          
           
             </ol>
            </Stack>
          </Paper>
        </DialogContent>
 
      </Dialog>
    );
}

export default DetailForm;