import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import DetailReason from '../../Partner/Negotiation/DetailReason';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';

function DetailSlotNego(props) {
  const [disableBtn, setDisable] = useState(false);

  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [timeAllocation, setTime] = useState('');
  const [learningType, setType] = useState('');
  const [detail, setDetail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState('');
  const [slot, setSlot] = useState({})


  function reload() {
    window.location.reload(false);
  }
  const handleShowConfirm = (data) => {
   
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
  const handleClose = () => {
    setOpen(props.close);
  };

  const handleError = (data) => {
    setMessage(data);
    setShowError(true);
  };


const getDetail = async () => {
  await axios.get(`https://api.ic-fpt.click/api/v1/slot/getDetail/${props.slot.id }`).then(response => {
    setSlot(response.data.responseSuccess[0])
    setTopic(response.data.responseSuccess[0]?.name);
    setTime(response.data.responseSuccess[0]?.timeAllocation);
    setType(response.data.responseSuccess[0]?.type);
    if(response.data.responseSuccess[0]?.detail === 'null'){
      setDetail('');
    }else{
      setDetail(response.data.responseSuccess[0]?.detail);
    }
   
  })
}
  useEffect(() => {
    if (props.slot != null) {
  
   getDetail()
 
   setTopic(props.slot?.name);
   setTime(props.slot?.timeAllocation);
   setType(props.slot?.type);
   if(props.slot?.detail === 'null'){
     setDetail('');
   }else{
     setDetail(props.slot?.detail);
   }
    }
  }, [props.slot]);



  const handleupdateStatus = () => {
    axios.put(`https://api.ic-fpt.click/api/v1/slot/updateStatus/${props.slot.id}?Status=0`).then((response) => {
      props.getDetail()
    });
  };

  const handleUpdateSlot = () => {
    axios
      .put(
        `https://api.ic-fpt.click/api/v1/slot/update/${props.slot.id}?Name=${topic}&Detail=${detail}&TimeAllocation=${timeAllocation}&Type=${learningType}&SyllabusId=${props.slot.syllabusId}`
      )
      .then((response) => {
       
        if (response.data.isSuccess) {
          setShowSuccess(true);
          handleupdateStatus()
      
          setTimeout(() => {
            setShowSuccess(false);
            handleCloseConfirm()
            handleClose()
          }, 2000);
        } else {
          handleError(response.statusText);
        }
      });
  };

  const handleChangeTopic = (e) => {
    setTopic(e.target.value);
    if (e.target.value) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };
  const handleChangeTime = (e) => {
    setTime(e.target.value);
    if (e.target.value) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };
  const handleChangeType = (e) => {
    setType(e.target.value);
    if (e.target.value) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };
  const handleChangeDetail = (e) => {
    
    if(e.target.value){
      setDetail(e.target.value);
    }else{
      setDetail('')
    }
    setDisable(true);
  };
  const handleShowReason = (data) => {
    setShowReason(true);
    setReason(data);
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
          <DialogTitle id="alert-dialog-title">Slot: {props.slot?.session}</DialogTitle>
          <IconButton style={{marginRight: 6}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <DialogContent>
            <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
              <TextField
                value={topic}
                onChange={handleChangeTopic}
                required
                fullWidth
                label="Slot Topic"
              />
              <TextField
                value={timeAllocation}
                onChange={handleChangeTime}
                type="number"
                required
                fullWidth
                label="Time Allocation"
                InputProps={{
                  endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                }}
              />
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Learning Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={learningType}
          label="Learning Type"
          onChange={handleChangeType}
          defaultValue={props.slot?.type}
        >
          <MenuItem value={"Online"}>Online</MenuItem>
          <MenuItem value={"Offline"}>Offline</MenuItem>

        </Select>
      </FormControl>
              <TextField
                value={detail}
                multiline
                rows={5}
                onChange={handleChangeDetail}
                fullWidth
                label="Detail Slot"
              />
            </Stack>
            <Divider variant="middle" />

          {slot?.reasons?.length ? <DialogTitle>Reject Reason</DialogTitle> : <></>}  
            {slot?.reasons?.length ? (
             slot?.reasons?.map((reason, index) => (
                <Stack
                  key={index}
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{
                    backgroundColor: '#F8F8F8',
                    borderRadius: '15px',
                    padding: '0 0 10px 15px',
                    width: '100%',
                    marginTop: '20px',
                  }}
                >
                  <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <p style={{ color: 'red' }}>Rejected</p>
                    <p>{reason?.deputies?.account?.fullName}</p>
                    <Typography
                      sx={{
                        float: 'left',
                        marginRight: '60%',
                        fontSize: 'small',
                        marginBottom: 2,
                        color: '#8F8E8E',
                      }}
                    >
                      {dayjs(reason?.dateCreated).format('DD/MM/YYYY')}
                    </Typography>
                  </Stack>

                  <p className="reject-content">{reason.reasonContent}</p>
                  <Button onClick={() => handleShowReason(reason)}>View Detail</Button>
                </Stack>
              ))
            ) : (
              <></>
            )}
          </DialogContent>
          {slot?.slotStatus === 1 ?   <DialogActions style={{ padding: 20 }}>
            <Button onClick={handleClose}>Cancel</Button>
            
            
          </DialogActions> :
            <DialogActions style={{ padding: 20 }}>
          
            {disableBtn  ? <Button variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
              Save
            </Button> : <Button disabled variant="contained" autoFocus>
             Save
            </Button> }
            
          </DialogActions>
          }
        
        </form>
        <Dialog
          open={showConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Update Slot</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Update Slot?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button variant="contained"onClick={() => handleUpdateSlot()} autoFocus>
              Accept
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Slot Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
        <DetailReason show={showReason} close={() => setShowReason(false)} reason={reason} />
        
      </Dialog>
    </div>
  );
}

export default DetailSlotNego;
