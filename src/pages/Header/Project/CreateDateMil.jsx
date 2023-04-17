import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState } from 'react';

function CreateDateMil(props) {
    const [open, setOpen]= useState(false)
    const [fromDateInit, setFromInit]= useState(null)
    const [toDateInit, setToInit]= useState(null)
    const handleClose =() =>{
        setOpen(props.close)
    }
    const CreateDate = () => {
        const data ={
            "projectId": props.prjId,
            "mileStoneId": 1,
            "dateBegin": fromDateInit,
            "dateEnd":toDateInit
        }
        axios.put(`https://localhost:7115/api/v1/milestone/changeMileStoneDate/1`, data).then((response) => {
            console.log(response)
        })
    }
    return (
        <Dialog
        fullWidth
        maxWidth="lg"
        open={props.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form >
    
  
        
  
          <DialogTitle  id="alert-dialog-title">
        
            <Typography variant="h4" gutterBottom>
          Assign Partner
            </Typography>
        
     
            </DialogTitle>
           
          
          <Divider variant="middle" />
         
          <DialogContent>
          <>
        <Container>
          
  
          <Card>
          <Stack direction="column" justifyContent='space-around' alignItems="center" spacing={4}>
            <Typography>Initiation</Typography>
            <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                    //   minDate={dayjs(estimateStart).add(7, 'day')}
                      sx={{ width: '50%' }}
                      label="FromDate"
                      value={fromDateInit}
                      onChange={(newValue) => {
                        setFromInit(newValue);
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                  <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disablePast
                      minDate={dayjs(fromDateInit).add(7, 'day')}
                      sx={{ width: '50%' }}
                      label="FromDate"
                      value={toDateInit}
                      onChange={(newValue) => {
                        setToInit(newValue);
                      }}
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
          </Stack>
          </Card>
        </Container>
  
      </>
          </DialogContent>
          <DialogActions style={{padding: 20}}>

            <Button variant="contained" onClick={() => CreateDate()} autoFocus>
         Update Date
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
}

export default CreateDateMil;