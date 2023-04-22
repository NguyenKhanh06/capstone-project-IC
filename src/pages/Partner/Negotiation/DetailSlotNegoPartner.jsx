import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import InfoIcon from '@mui/icons-material/Info';
import dayjs from 'dayjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RejectSlot from './RejectSlot';
import DetailReason from './DetailReason';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';

function DetailSlotNegoPartner(props) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [timeAllocation, setTime] = useState(null);
  const [learningType, setType] = useState('');
  const [detail, setDetail] = useState('');
  const [showReject, setShowReject] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [slot, setSlot] = useState({})


  const handleError = (data) => {
    setMessage(data);
    setShowError(true);
  };

  function reload() {
    window.location.reload(false);
  }
  const handleReject = () => {
    setShowReject(true);
    
  };

  const handleClose = () => {
    setOpen(props.close);
  };

  const handleShowReason = (data) => {
    setShowReason(true);
    setReason(data);
  };
  const handleApproveSlot = () => {
    axios.put(`https://api.ic-fpt.click/api/v1/slot/updateStatus/${props.slot.id}?Status=1`).then((response) => {
      if (response.data.isSuccess) {
        setShowSuccess(true);
        props.getDetail()
        setTimeout(() => {
          setShowSuccess(false);
          handleClose()
        }, 1000)
      } else {
        handleError(response.statusText);
      }
    });
  };
  const getDetail = async () => {
    await axios.get(`https://api.ic-fpt.click/api/v1/slot/getDetail/${props.slot.id }`).then(response => {
      setSlot(response.data.responseSuccess[0])
      setTopic(response.data.responseSuccess[0]?.name);
      setTime(response.data.responseSuccess[0]?.timeAllocation);
      setType(response.data.responseSuccess[0]?.type);
      setDetail(response.data.responseSuccess[0]?.detail);
    })
  }
    useEffect(() => {
      if (props.slot != null) {
        setTopic(props.slot?.name);
        setTime(props.slot?.timeAllocation);
        setType(props.slot?.type);
        setDetail(props.slot?.detail);
     getDetail()
      }
    }, [props.slot]);
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
              <b>Topic: </b>
              <Typography>{slot?.name}</Typography>
              <b>Time Allocation: </b>
              <Typography> {slot?.timeAllocation}</Typography>
              <b>Learning Type: </b>
              <Typography> {slot?.type}</Typography>
              <b>Detail Slot: </b>
              {slot?.detail === 'null' ? <></> :    <Typography>{slot?.detail}</Typography>}
           
            </Stack>
           {slot?.reasons?.length ? <DialogTitle>Reject Reason</DialogTitle> : <></>} 
            <Divider variant="middle" />

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
             null
            )}
          </DialogContent>
          <DialogActions style={{ padding: 20 }}>
            {slot?.slotStatus === 0 ? (
              <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
                <Button onClick={() => handleApproveSlot()} variant="contained" color="success">
                  Approve
                </Button>

                <Button onClick={() => handleReject()} variant="contained" color="error">
                  Reject
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
                <Button disabled onClick={() => handleApproveSlot()} variant="contained" color="success">
                  Approve
                </Button>

                <Button disabled onClick={() => handleReject()} variant="contained" color="error">
                  Reject
                </Button>
              </Stack>
            )}
          </DialogActions>
        </form>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Approve Successful!!!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
      <RejectSlot show={showReject} close={() => setShowReject(false)} slotID={props.slot.id} getDetail={props.getDetail} getDetailSlot={getDetail}  CloseDetail = {handleClose} />
      <DetailReason show={showReason} close={() => setShowReason(false)} reason={reason} />
 
    </div>
  );
}

export default DetailSlotNegoPartner;
