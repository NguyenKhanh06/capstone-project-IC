
import { Box, Button, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';



function CreateCampus(props) {
    const [open, setOpen] = useState(false);
    const [campusName, setCampusName] = useState("");
    const [address, setAddress] = useState("");

  
  
  
    const handleClose = () => {
      setOpen(props.close);
    };
  
    return (
      <div>
        <Dialog
        fullWidth
        maxWidth="md"
          open={props.show}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
            <form>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Create Campus</DialogTitle>
          <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
          <Divider variant="middle"/>
        
          <DialogContent>
          <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
          <TextField value={campusName} onChange={(e) => setCampusName(e.target.value)} required fullWidth label="Campus Name" />
          <TextField value={address} onChange={(e) => setAddress(e.target.value)} required fullWidth label="Address" />
     
          </Stack>
        
        
          </DialogContent>
          <DialogActions style={{padding: 20}}>
        
            <Button variant='contained' type='submit' autoFocus>
              Create Campus
            </Button>
          </DialogActions>
          </form>
  
        </Dialog>
        </div>
    );
}

export default CreateCampus;