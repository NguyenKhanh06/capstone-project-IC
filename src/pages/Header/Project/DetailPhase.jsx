import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField } from '@mui/material';
import { Button } from 'react-day-picker';
import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { useState } from 'react';


function DetailPhase(props) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [fromDate, setFromDate] = useState(null)
    const [toDate, setToDate] = useState(null)
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setOpen(props.close)
    }
    console.log(props)
    return (
   
        <Dialog
        fullWidth
        maxWidth="md"
        open={props.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
   
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <DialogTitle id="alert-dialog-title">Detail Phase</DialogTitle>
            <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" />
          <DialogContent>
          {/* <TextField id="outlined-basic" fullWidth label="Phase's title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} /> */}
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
          <h1>hhi</h1>
                  </Stack>
          </DialogContent>
          

          <DialogActions style={{ padding: 20 }}>
            <Button variant="contained" onClick={() => CreatePhase()} autoFocus>
              Create Phase
            </Button>
          </DialogActions>
        
 
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Pharse Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
    );
}

export default DetailPhase;