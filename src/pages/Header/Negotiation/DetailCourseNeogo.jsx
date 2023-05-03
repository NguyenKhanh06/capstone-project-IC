import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import axios from 'axios';
import dayjs from 'dayjs';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';

import React, { useEffect, useState } from 'react';
import CancelProject from '../Project/CancelProject';
import DetailSlotNego from './DetailSlotNego';
import DetailReason from '../../Partner/Negotiation/DetailReason';
import { DataGrid } from '@mui/x-data-grid';

function DetailCourseNego(props) {
  const [open, setOpen] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState(null);
  const [course, setCourse] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [slotsApprove, setSlotsApprove] = useState([]);
  const [slotsReject, setSlotsReject] = useState([]);
  const [slots, setSlots] = useState([]);
  const [slot, setSlot] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [index, setIndex] = useState('');

  const handleViewDetail = (data, index) => {
    setSlot(data);
    setShowDetail(true);
    setIndex(index);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(props.close);
  };

  const fetchData = async () => {
    await axios.get(`https://api.ic-fpt.click/api/v1/syllabus/GetListSyllabusPartner/${props.id.partnerId}`).then((response) => {
  
 

        setSyllabus(response.data.responseSuccess.filter(syl => syl.status && syl.course.id === props.id.courseId)[0])
     
        setSlots(response.data.responseSuccess.filter(syl => syl.status && syl.course.id === props.id.courseId)[0]?.slots.filter(slot => slot.status))
        setSlotsApprove(
          response.data.responseSuccess.filter(syl => syl.status && syl.course.id === props.id.courseId)[0]
            .slots.filter((slot) => slot.status && slot.slotStatus === 1)
        );
        setSlotsReject(
          response.data.responseSuccess.filter(syl => syl.status && syl.course.id === props.id.courseId)[0].slots.filter((slot) => slot.status && slot.slotStatus === 2)
        );
      
     
      // fetchDetailSyllabus(response.data.responseSuccess[0].syllabus.filter((syllabus) => syllabus.status)[0].id)
 
    
    });
  };


  useEffect(() => {
    if (props.id) {
      fetchData();
    }
  }, [props.id]);
  useEffect(() => {
    if (props.id) {
      fetchData();
    }
  }, [props.id]);
  const handleShowReason = (data) => {
    setShowReason(true);
    setReason(data);
  };
  const columns = [
    {
      field: 'session',
      headerName: 'Slot',
      flex: 0,
    },

    {
      field: 'name',
      headerName: 'Topic',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Learning Type',
      flex: 1,
    },
    {
      field: 'timeAllocation',
      headerName: 'Time Allocation (minutes)',
      flex: 1,
    },
    {
      field: 'slotStatus',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <>
          {params.row?.slotStatus === 1 ? (
                              <Chip label="Approved" color="success" size="small" />
                            ) : params.row?.slotStatus === 2 ? (
                              <Chip label="Rejected" color="error" size="small" />
                            ) : params.row?.slotStatus === 0 ? (
                              <Chip label="New" color="warning" size="small" />
                            ) : null}
        </>
      )
    },
    {
      headerName: 'Action',
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
          <Tooltip title="View Detail">
            <IconButton  onClick={() => handleViewDetail(params.row)} aria-label="delete">
              <RemoveRedEyeRoundedIcon />
            </IconButton>
          </Tooltip>
         
        </Stack>
      ),
    },
  ];
  return (
    <div>
      <Dialog
        open={props.show}
        fullWidth
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Detail Course</DialogTitle>
          <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Divider variant="middle" />

        <DialogContent>
          <Paper elevation={3} sx={{ margin: 5 }}>
            <Stack
              sx={{ padding: 5 }}
              direction="column"
              justifyContent="space-around"
              alignItems="flex-start"
              spacing={5}
            >
              <Box>
                <b>Skill Name:</b>
                <Typography>{props?.id?.course?.courseName}</Typography>
              </Box>
              <Box>
                <b>Activity:</b>
                <Typography>{props?.id?.course?.activity}</Typography>
              </Box>
              <Box>
                <b>Course Content:</b>
                <Typography>{props?.id?.course?.content}</Typography>
              </Box>
            </Stack>
          </Paper>
          <Paper elevation={3} sx={{ margin: 5 }}>
            <DialogTitle id="alert-dialog-title">Detail Syllabus</DialogTitle>
            <Divider variant="middle" />

            <Stack
              sx={{ padding: 5 }}
              direction="column"
              justifyContent="space-around"
              alignItems="flex-start"
              spacing={5}
            >
              <Box>
                <b>Syllabus Name:</b>
                <Typography>{syllabus?.content}</Typography>
              </Box>
              <Box>
                <b>SyllabusDescription:</b>
                <Typography>{syllabus?.description}</Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper elevation={0} sx={{ margin: 5 }}>
            <DialogTitle id="alert-dialog-title">List Slot</DialogTitle>
            <Divider variant="middle" />
            <div style={{ marginTop: 40 }}>
              <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={5}>
                <Paper elevation={2} sx={{ padding: '10px 30px 10px 30px' }}>
                  <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <Typography variant="h6">{slots?.length}</Typography>
                    <Typography variant="h6">Slots</Typography>
                  </Stack>
                </Paper>
                <Paper elevation={2} sx={{ padding: '10px 30px 10px 30px' }}>
                  <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <Typography variant="h6">{slotsApprove?.length ? slotsApprove.length : '0'}</Typography>
                    <Typography sx={{ color: 'green' }} variant="h6">
                      Slots Approve
                    </Typography>
                  </Stack>
                </Paper>
                <Paper elevation={2} sx={{ padding: '10px 30px 10px 30px' }}>
                  <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <Typography variant="h6">{slotsReject?.length ? slotsReject.length : '0'}</Typography>
                    <Typography color="error" variant="h6">
                      Slots Reject
                    </Typography>
                  </Stack>
                </Paper>
              </Stack>
              <Divider sx={{ marginTop: 7 }} variant="middle" />
             

              <DetailSlotNego show={showDetail} close={() => setShowDetail(false)} slot={slot} getDetail={fetchData} />
              <DetailReason show={showReason} close={() => setShowReason(false)} reason={reason} />
            </div>
          </Paper>
          <Box style={{ marginTop: 20 }}>
            <Container>
              <Card>
                {slots && (
                  <DataGrid
                    autoHeight
                    rows={slots}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                  />
                )}
                {/* <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

                  <Scrollbar>
                    <TableContainer>
                      <Table>
                        <EnhancedTableHead
                          order={order}
                          orderBy={orderBy}
                          onRequestSort={handleRequestSort}
                          rowCount={props.syllabus.slots?.length}
                        />
                        <TableBody>
                         {slot?.length ? (<>
                          {stableSort(slot, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                              <TableRow hover key={index}>
                                <TableCell component="th">{index + 1}</TableCell>
                                <TableCell component="th">{row.name}</TableCell>
                                <TableCell align="left">{row.type}</TableCell>
                                <TableCell align="left">{row.timeAllocation}</TableCell>
                                <TableCell align="left">
                                  <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                                    <Tooltip title="View Detail">
                                      <IconButton onClick={() => handleViewDetail(row, index+1)} aria-label="delete">
                                        <RemoveRedEyeRoundedIcon />
                                      </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Delete">
                                      <IconButton onClick={()=> handleClickOpenConfirm(row.id)}>
                                        <DeleteIcon color="error" />
                                      </IconButton>
                                    </Tooltip>
                                  </Stack>
                                </TableCell>
                              </TableRow>
                            ))}
                         </>) : (<></>)}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Scrollbar>

                  <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={slot?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  /> */}
              </Card>
            </Container>
          </Box>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          <Stack direction="row" alignItems="center" spacing={3}>
            {/* <Button onClick={() => setShowCancel(true)} color="error" variant="contained">
              Cancel Project
            </Button> */}
          </Stack>
        </DialogActions>
      </Dialog>
      <CancelProject show={showCancel} close={() => setShowCancel(false)} />
    </div>
  );
}

export default DetailCourseNego;
