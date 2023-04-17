import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { Padding } from '@mui/icons-material';
import DetailSlotNego from './DetailSlotNego';

function ListSlotNego(props) {
    const [showDetail, setShowDetail] = useState(false)
  return (
    <div  style={{marginTop: 40}}>
      <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={5}>
        <Paper elevation={2} sx={{ padding: '10px 30px 10px 30px' }}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="h6">{props?.slots?.length}</Typography>
            <Typography variant="h6">Slots</Typography>
          </Stack>
        </Paper>
        <Paper elevation={2} sx={{ padding: '10px 30px 10px 30px' }}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="h6">30</Typography>
            <Typography sx={{ color: 'green' }} variant="h6">
              Slots Approve
            </Typography>
          </Stack>
        </Paper>
        <Paper elevation={2} sx={{ padding: '10px 30px 10px 30px' }}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="h6">30</Typography>
            <Typography color="error" variant="h6">
              Slots Reject
            </Typography>
          </Stack>
        </Paper>
      </Stack>
      <Divider sx={{marginTop: 7}} variant="middle" />
      <Accordion
        disableGutters
        elevation={3}
        sx={{
          '&:before': {
            display: 'none',
          },
        }}
        style={{ marginBottom: 10, borderRadius: 15, marginTop: 15 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={55}>
            <Stack direction="column" justifyContent="space-between" alignItems="flex-start" spacing={2}>
              {/* <Chip
                           label = {slot?.slotStatus === 1 ? "Approve" : slot?.slotStatus === 2 ? "Reject" : slot?.slotStatus === 0 ? null : null}
                            color={slot?.slotStatus === 1 ? "success" : slot?.slotStatus === 2 ? "error"  : slot?.slotStatus === 0 ? null : null}
                            style={{ marginRight: "10px" }}
                            size="small"
                          /> */}
              {/* {slot?.slotStatus === 1 ? (
                          <Chip label="Approve" color="success" size="small" />
                        ) : slot?.slotStatus === 2 ? (
                          <Chip label="Reject" color="error" size="small" />
                        ) : slot?.slotStatus === 0 ? (
                          <Chip label="New" color="warning" size="small" />
                        ) : null} */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Chip label="New" color="warning" size="small" />
                <Typography sx={{ color: 'text.secondary' }}>
                  <Chip label={'Slot: 1 '} color="primary" style={{ marginRight: '10px' }} />
                </Typography>
              </Stack>

              <Typography sx={{ color: 'text.secondary' }}>20/2</Typography>
              <Typography>Intro duction</Typography>

              {/* <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        
                        </Typography> */}
            </Stack>
            <Button>View detail</Button>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            sx={{
              backgroundColor: '#F8F8F8',
              borderRadius: '15px',
              padding: '0 0 10px 15px',
              width: '100%',
              marginBottom: '20px',
            }}
          >
            <p className="reject-content">
              <p style={{ color: 'red' }}>Rejected</p>
              UX Design is quite a complex job role, because in every project in every organisation you may need to tap
              into different skills. Because it is a job primarily based on collaborating with other people, I want to
              show you not only the methods of working or tools to use, but also soft skills that will help you work out
              various design problems.
            </p>
            <Button>View Detail</Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion
        disableGutters
        elevation={3}
        sx={{
          '&:before': {
            display: 'none',
          },
        }}
        style={{ marginBottom: 10, borderRadius: 15, marginTop: 15 }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={55}>
            <Stack direction="column" justifyContent="space-between" alignItems="flex-start" spacing={2}>
              {/* <Chip
                           label = {slot?.slotStatus === 1 ? "Approve" : slot?.slotStatus === 2 ? "Reject" : slot?.slotStatus === 0 ? null : null}
                            color={slot?.slotStatus === 1 ? "success" : slot?.slotStatus === 2 ? "error"  : slot?.slotStatus === 0 ? null : null}
                            style={{ marginRight: "10px" }}
                            size="small"
                          /> */}
              {/* {slot?.slotStatus === 1 ? (
                          <Chip label="Approve" color="success" size="small" />
                        ) : slot?.slotStatus === 2 ? (
                          <Chip label="Reject" color="error" size="small" />
                        ) : slot?.slotStatus === 0 ? (
                          <Chip label="New" color="warning" size="small" />
                        ) : null} */}
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Chip label="New" color="warning" size="small" />
                <Typography sx={{ color: 'text.secondary' }}>
                  <Chip label={'Slot: 1 '} color="primary" style={{ marginRight: '10px' }} />
                </Typography>
              </Stack>

              <Typography sx={{ color: 'text.secondary' }}>20/2</Typography>
              <Typography>Intro duction</Typography>

              {/* <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        
                        </Typography> */}
            </Stack>
            <Button onClick={() => setShowDetail(true)}>View detail</Button>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            sx={{
              backgroundColor: '#F8F8F8',
              borderRadius: '15px',
              padding: '0 0 10px 15px',
              width: '100%',
              marginBottom: '20px',
            }}
          >
            <p className="reject-content">
              <p style={{ color: 'red' }}>Rejected</p>
              UX Design is quite a complex job role, because in every project in every organisation you may need to tap
              into different skills. Because it is a job primarily based on collaborating with other people, I want to
              show you not only the methods of working or tools to use, but also soft skills that will help you work out
              various design problems.
            </p>
            <Button>View Detail</Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
<DetailSlotNego show={showDetail} close={()=> setShowDetail(false)}/>
      {/* <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Box
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "white",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">
               30
              </Typography>
              <Typography variant="h6">Slots</Typography>
            </Box>
            <Box
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "white",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h8" color="green">
                5
              </Typography>
              <Typography variant="h7" color="green">
                Slots Approve
              </Typography>
            </Box>
            <Box
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "white",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h8" color="red">
                7
              </Typography>
              <Typography variant="h7" color="red">
                Slots Reject
              </Typography>
            </Box>
          </Stack> */}
    </div>
  );
}

export default ListSlotNego;
