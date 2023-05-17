import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useState } from 'react';

function DetailFeedBack(props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(props.close);
  };
  console.log(props);
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
        <DialogTitle id="alert-dialog-title">Detail Feedback</DialogTitle>
        <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
          <CloseOutlinedIcon />
        </IconButton>
      </Stack>
      <Divider variant="middle" />

      <DialogContent>
        <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <Typography variant="body1">Title:</Typography>
            <Typography variant="h6">{props?.form?.title}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <Typography variant="body1">Description:</Typography>
            <Typography variant="h6">{props.form?.description}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <Typography variant="body1">Full Name:</Typography>
            <Typography variant="h6">{props.form?.registration?.student?.fullName}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <Typography variant="body1">Email:</Typography>
            <Typography variant="h6">{props.form?.registration?.student?.email}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
            <Typography variant="body1">Phone Number:</Typography>
            <Typography variant="h6">{props.form?.registration?.student?.phoneNumber}</Typography>
          </Stack>
        </Stack>

        <Divider variant="middle" />
        <Typography variant="h6">Feedback of student</Typography>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={1} sx={{ marginTop: 5 }}>
        <TextField
                fullWidth
                multiline
           sx={{marginBottom: 3}}
                value={props.form?.feedBackContent}
                label='Feedback about program'
                InputProps={{
                  readOnly: true,
                }}
              />
          {/* <Typography variant="h6">1. Feedback about program:</Typography>
          <Typography variant="body1">{props.form?.feedBackContent}</Typography> */}
        </Stack>
        <Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
          {props?.form?.feedBackAddOns &&
            props?.form?.feedBackAddOns.map((feedback, index) => (
              <TextField
              multiline
                fullWidth
                key={index}
                value={feedback?.answer}
                label={feedback?.question}
                InputProps={{
                  readOnly: true,
                }}
              />
            ))}
        </Stack>
        {/* 
          {inputList.length
            ? inputList.map((x, i) => (
                <Stack direction="column" spacing={2} key={i} style={{ marginTop: 4 }}>
                  <Divider sx={{ marginTop: 2 }} variant="middle" />

                  <TextField
                    name="title"
                    placeholder="Enter Title"
                    value={x.title}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                    {inputList.length && (
                      <Button variant="contained" color="error" onClick={() => handleRemoveClick(i)}>
                        Remove
                      </Button>
                    )}
                  </Stack>
                </Stack>
              ))
            : null} */}
      </DialogContent>
    </Dialog>
  );
}

export default DetailFeedBack;
