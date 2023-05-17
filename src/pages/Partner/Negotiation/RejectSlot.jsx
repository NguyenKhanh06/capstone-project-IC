import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField } from '@mui/material';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import React, { useState } from 'react';
import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert'
import Loading from "../../Loading"
import { API_URL } from '../../../config/apiUrl/apis-url';



function RejectSlot(props) {
    const [open, setOpen] = useState(false);
const [reason, setReason] = useState('');
const [file, setFile] = useState(null);
const [showSuccess, setShowSuccess] = useState(false);
const [showError, setShowError] = useState(false);
const [message, setMessage] = useState('');
const [loading, setLoading] = useState(false)

    const handleClose = () => {
      setOpen(props.close);
    };
    const handleError = (data) => {
      setMessage(data);
      setShowError(true);
    };
    
    function reload(){
      window.location.reload(false);
    }
   

 

      const handleRejectSlot = () => {

        axios 
          .put(
            `${API_URL}/slot/updateStatus/${props.slotID}?Status=2`
          ).  then((response) => {
            if (response.data.isSuccess) {
              CreateReason()
            
              setShowSuccess(true);
              setLoading(false);
              props.getDetail()
              props.getDetailSlot()
              
            }
          })
          .catch((err) => {
            handleError(err.response.data.responseSuccess);
            setLoading(false);
          });
           
         
      };
      const CreateReason =() => {
        const formData = new FormData();
        
        formData.append("ReasonContent", reason)
        formData.append("SlotId", props.slotID)
        axios({
          method: "POST",
          data: formData,
          url: `${API_URL}/reason/create`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((response)=>{
          setTimeout(() => {
            if(props.CloseDetail){
              props.CloseDetail()
            }
          setReason('')
            setShowSuccess(false);
            handleClose()
          }, 1000)
       } )
      }
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
        <form >
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}> 
          <DialogTitle id="alert-dialog-title">Reject</DialogTitle>
          <IconButton style={{marginRight: 6}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle"/>

          <DialogContent>
          
          <TextField value={reason} onChange={(e) => setReason(e.target.value)} required fullWidth multiline rows={5} label="Reason Cancel" />
          
          </DialogContent>
          <DialogActions style={{padding: 20}}>

            {reason.trim().length ?<Button onClick={() => handleRejectSlot()} color='error' variant="contained" autoFocus>
              Reject Slot
            </Button> :<Button disabled onClick={() => handleRejectSlot()} color='error' variant="contained" autoFocus>
              Reject Slot
            </Button> }
            
          </DialogActions>
        </form>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={"Reject Successful!!!"} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message}/>
      </Dialog>
      
    </div>
    );
}

export default RejectSlot;