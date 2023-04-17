import { Alert, IconButton, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';


function ErrorAlert(props) {
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
        
          severity="error"
          sx={{ width: "100%" }}
        >
         {props.message}
        </Alert>
      </Snackbar>
    );
}

export default ErrorAlert;