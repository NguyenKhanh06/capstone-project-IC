import { Backdrop, Box, CircularProgress } from '@mui/material';
import React from 'react';

function Loading(props) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(props.close);
  };

    return (
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.show}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
     
    );
}

export default Loading;