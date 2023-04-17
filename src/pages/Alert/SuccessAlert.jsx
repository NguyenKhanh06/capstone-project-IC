import { Alert, IconButton, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function SuccessAlert(props) {
  const [open, setOpen] = useState(false);


 if(props.show){
  setTimeout(() => {
    props.close()
  }, 3000)
 }
 

    return (
        <Snackbar
        open={props.show}
  
       
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
           action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(props.close);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
         
          variant="filled"
        
          severity="success"
          sx={{ width: "100%" }}
        >
         {props.message}
        </Alert>
      </Snackbar>
    );
}

export default SuccessAlert;