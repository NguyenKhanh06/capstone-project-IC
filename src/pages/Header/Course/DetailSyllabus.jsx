import {
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
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import Iconify from '../../../components/iconify/Iconify';

import CreateSyllabus from './CreateSyllabus';
import CreateSlot from './CreateSlot';
import DetailSlot from './DetailSlot';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';

function DetailSyllabus(props) {
  const regex = /^[\w\s]*$/
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [slot, setSlot] = useState([]);
  const [slotDetail, setSlotDetail] = useState([]);
  const [slotIndex, setSlotIndex] = useState('');
  const [filterName, setFilterName] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [id, setId] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [showErrorDelete, setShowErrorDelete] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);


  const handleShowConfirm = (data) => {
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };

  const handleError = (data) => {
    setMessage(data);
    setShowError(true);
  };
  const handleErrorDelete = (data) => {
    setMessage(data);
    setShowErrorDelete(true);
  };
  const handleClickOpenConfirmDelete = (id) => {
    setId(id);
    setShowConfirmDelete(true);
  };
  const handleClickCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };
  const handleClickCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleViewDetail = (data, index) => {
    setShowDetail(true);
    setSlotDetail(data);
  };

  const handleClose = () => {
    setOpen(props.close);
  };

  useEffect(() => {
    if (props.syllabus) {
      getDetail()
      setContent(props.syllabus.content);
      setDescription(props.syllabus.description);
      setSlot(props.syllabus.slots?.filter((slot) => slot.status));
    }
  }, [props.syllabus]);

  const handleDeleteSlot = (id) => {
    axios
      .put(
        `https://api.ic-fpt.click/api/v1/slot/disable/${id}
  `
      )
      .then((response) => {
        handleClickCloseConfirmDelete()
        setShowSuccessDelete(true);

        getDetail()
      }) .catch((err) => {
        handleError("Delete fail!");
      });
  };
const getDetail= async () => {
 await axios.get(`https://api.ic-fpt.click/api/v1/syllabus/getDetail/${props.syllabus.id}`).then(response => {
    setSlot(response.data.responseSuccess[0]?.slots?.filter((slot) => slot.status))
  })
}
  const handleUpdate = () => {
    axios
      .put(
        `https://api.ic-fpt.click/api/v1/syllabus/update/${props.syllabus.id}?Content=${content}&Description=${description}&Status=true&CourseId=${props.syllabus.courseId}`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          props.getDetail()
          handleCloseConfirm()

setTimeout(() =>{
  handleClose()
}, 1000);

        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };

  const columns = [
    {
      field: 'session',
      headerName: 'Slot',
      flex: 1,
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
              <IconButton onClick={() => handleViewDetail(params.row)} aria-label="delete">
                <RemoveRedEyeRoundedIcon />
              </IconButton>
            </Tooltip>
            {params.row === slot[slot.length - 1] ? (
              <Tooltip title="Delete">
                <IconButton onClick={() => handleClickOpenConfirmDelete(params.row.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Delete">
                <IconButton disabled>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        ),
    },
  ];
  const handleChangeContent = (e) => {
    setContent(e.target.value);
    if (e.target.value) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={props.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <DialogTitle id="alert-dialog-title">Detail Syllabus</DialogTitle>
        </Stack>
         
          <IconButton style={{marginRight: 6}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
            {/* <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Stack direction="row" spacing={3.5} justifyContent="flex-start" alignItems="center">
                <h4>Detail Syllabus</h4> <Chip color="success" label="Active" />
              </Stack>
              <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
                <CloseOutlinedIcon />
              </IconButton>
            </Stack> */}
      
          <Divider variant="middle" />

          <DialogContent>
            <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
            <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={2}>
                  <b>Partner:</b>
                  <Typography>{props.syllabus?.partner?.name}</Typography>
                </Stack>
                <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={2}>
                  <b>Partner's Location:</b>
                  <Typography>{props.syllabus?.partner?.local}</Typography>
                </Stack>
                <Divider variant='middle'/>
              <TextField value={content} onChange={handleChangeContent} required fullWidth label="Syllabus Content"
               inputProps={{
                maxLength: 25,
               
              }} 
              
              error={ !regex.test(content)}
              helperText={!regex.test(content) && "Can not input special character"}
            />
              
              <TextField
                value={description}
                multiline
                rows={5}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDisableBtn(true);
                }}
                fullWidth
                inputProps={{
                  maxLength: 1000,
                 
                }}
                label="Description"
                error={ !regex.test(description)}
                helperText={!regex.test(description) && "Can not input special character"}
              />
             
            </Stack>
            <DialogActions style={{ padding: 10 }}>
              <Stack direction="row" spacing={3.5} sx={{ padding: 2 }}>
                {disableBtn && regex.test(description) && regex.test(content)? (
                  <Button onClick={() => setShowConfirm(true)} variant="contained" autoFocus>
                    Save
                  </Button>
                ) : (
                  <Button disabled onClick={() => setShowConfirm(true)} variant="contained" autoFocus>
                    Save
                  </Button>
                )}
              </Stack>
            </DialogActions>
            <Divider variant="middle" />
            <Box style={{ marginTop: 20 }}>
              <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                  <Typography variant="h4" gutterBottom>
                    Slot
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => setShowCreate(true)}
                  >
                    New Slot
                  </Button>
                </Stack>

                <Card>
                  {slot && <DataGrid
                    autoHeight
                    rows={slot}
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
                  />}
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
        </form>
        <DetailSlot show={showDetail} close={() => setShowDetail(false)} slot={slotDetail} getDetail={getDetail} />
        <CreateSlot show={showCreate} close={() => setShowCreate(false)} syllabusID={props.syllabus.id} getDetail={getDetail} />
        <Dialog
          open={showConfirmDelete}
          onClose={handleClickCloseConfirmDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle id="alert-dialog-title">{'Delete Slot!'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You want to delete this slot?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickCloseConfirmDelete}>Cancel</Button>
            <Button variant="contained" onClick={() => handleDeleteSlot(id)} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
          <SuccessAlert
            show={showSuccessDelete}
            close={() => setShowSuccessDelete(false)}
            message={'Delete Slot Successful!'}
          />
          <ErrorAlert show={showErrorDelete} close={() => setShowError(false)} message={message} />
        </Dialog>
        <Dialog
          open={showConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Update Syllabus</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Update Syllabus?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button variant="contained" onClick={() => handleUpdate()} autoFocus>
              Accept
            </Button>
          </DialogActions>
  
        </Dialog>
        <SuccessAlert
            show={showSuccess}
            close={() => setShowSuccess(false)}
            message={'Update Syllabus Successful!'}
          />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
    </div>
  );
}

export default DetailSyllabus;
