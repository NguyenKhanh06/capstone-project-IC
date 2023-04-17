import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../../../components/iconify/Iconify';
import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';
import CreateCampus from './CreateCampus';
import DetailCampus from './DetailCampus';
import CreateAccountPartner from './CreateAccountPartner';
import Loading from '../../Loading';

function DetailPartner(props) {
  const columns = [
    {
      field: 'name',
      headerName: 'Campus Name',
      flex: 1,
    },

    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
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
          <Tooltip title="Delete">
            <IconButton onClick={() => handleClickOpenConfirmDelete(params.row.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];
  const columnsDep = [
    {
      field: 'fullName',
      headerName: 'Deputy Name',
      flex: 1,
      valueGetter: (params) => {
        return params.row.account.fullName;
      },
    },

    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      valueGetter: (params) => {
        return params.row.account.email;
      },
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
          <Tooltip title="Delete">
            <IconButton onClick={() => handleClickOpenConfirmDeleteDep(params.row.account.email)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];
  const regex = /^[\w\s]*$/
  const [disableBtn, setDisableBtn] = useState(false);
  const [name, setName] = useState('');
  const [local, setLocal] = useState('');
  const [note, setNote] = useState('');
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [campus, setCampus] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [partner, setPartner] = useState([]);
  const [deputies, setDeputies] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showCreateDeputy, setShowCreateDeputy] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showConfirmDeleteDep, setShowConfirmDeleteDep] = useState(false);
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');

  const handleShowConfirm = (data) => {
    setId(data);
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };

  const handleError = (data) => {
    setMessage(data);
    setShowError(true);
  };
  const handleSuccess = (data) => {
    setMessage(data);
    setShowSuccess(true);
  };
  const handleClickOpenConfirmDelete = (id) => {
    setId(id);
    setShowConfirmDelete(true);
  };
  const handleClickCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };
  const handleClickOpenConfirmDeleteDep = (mail) => {
    setEmail(mail);
    setShowConfirmDeleteDep(true);
  };
  const handleClickCloseConfirmDeleteDep = () => {
    setShowConfirmDeleteDep(false);
  };
  function reload() {
    window.location.reload(false);
  }
  const handleClose = () => {
    setOpen(props.close);
  };

  const handleViewDetail = (data) => {
    setShowDetail(true);
    setCampus(data);
  };

  const handleDeleteCampus = () => {
    axios
      .put(`https://localhost:7115/api/v1/campus/disable/${id}`)
      .then((response) => {
        if (response.data.isSuccess) {
          handleSuccess('Delete Campus Successful!!!');
          fetchData()
          setShowConfirmDelete(false)
     
         
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };
  const handleUpdatePartner = () => {
    axios
      .put(
        `https://localhost:7115/api/v1/partner/update/${props.partner.id}?Name=${name}&Local=${local}&Note=${note}&Status=true`
      )
      .then((response) => {
        if (response.data.isSuccess) {
          handleCloseConfirm()
          handleSuccess('Update Partner Successfull!!!!');
          setTimeout(() => {
            window.location.reload()
          }, 1000)
       
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };
  const fetchData = async () => {

    await axios.get(`https://localhost:7115/api/v1/partner/getDetail/${props.partner.id}`).then((response) => {
      
      setPartner(response.data.responseSuccess[0]);
      setCampuses(response.data.responseSuccess[0]?.campuses.filter(camp => camp.status));
      setName(response.data.responseSuccess[0]?.name);
      setLocal(response.data.responseSuccess[0]?.local);
      if (response.data.responseSuccess[0]?.note != null) {
        setNote(response.data.responseSuccess[0]?.note);
      }
     
    });
  };
  const getDeputy = () => {
    axios.get(`https://localhost:7115/api/v1/deputy/getAll`).then((response) => {
      setDeputies(
        response.data.responseSuccess.filter((dep) => dep.partnerId === props.partner.id && dep.account.status)
      );
    });
  };
  const disableDeputy = () => {
    axios
      .put(`https://localhost:7115/api/v1/account/disable/${email}`)
      .then((response) => {
        if (response.data.isSuccess) {
          setShowConfirmDeleteDep(false);
          handleSuccess('Delete Deputy Successfull!!!!');
          getDeputy();
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };
  useEffect(() => {
  
    if (props.partner != null) {
      setCampuses(props.partner.campuses)
      setName(props.partner.name);
      setLocal(props.partner.local);
      if (props.partner?.note != null) {
        setNote(props.partner?.note);
      }
      fetchData();
      getDeputy();
    }
  }, [props.partner]);

  const handleChangeName = (e) => {
    setName(e.target.value);
    if (e.target.value) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const handleChangeLocation = (e) => {
    setLocal(e.target.value);
    if (e.target.value) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const handleChangeNote = (e) => {
    setNote(e.target.value);

    setDisableBtn(true);
  };
  return (
   
 <>
 {loading ? <Loading show={loading}/> :  <Dialog
      fullWidth
      maxWidth="md"
      open={props.show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Detail Partner</DialogTitle>
          <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Divider variant="middle" />

        <DialogContent>
          <Stack direction="column" spacing={3.5} sx={{ padding: 2 }}>
            <TextField value={name} onChange={handleChangeName} required fullWidth label="Partner Name"      error={ !regex.test(name)}
            helperText={!regex.test(name) && "Can not input special character"} />
            <TextField value={local} onChange={handleChangeLocation} required fullWidth label="Location" />
            <TextField value={note} multiline rows={5} onChange={handleChangeNote} fullWidth label="Note"
            
            error={ !regex.test(note)}
            helperText={!regex.test(note) && "Can not input special character"}
            />
          </Stack>
          <DialogActions style={{ padding: 20 }}>
            {disableBtn && regex.test(note) && regex.test(name) ? (
              <Button variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
                Save
              </Button>
            ) : (
              <Button disabled variant="contained" autoFocus>
                Save
              </Button>
            )}
          </DialogActions>
          <Divider variant="middle" />
          <Box style={{ marginTop: 40 }}>
            <Container>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                  Campus
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={() => setShowCreate(true)}
                >
                  New Campus
                </Button>
              </Stack>

              <Card>
          {campuses &&    <DataGrid
                  autoHeight
                  rows={campuses}
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
                /> }
              </Card>
            </Container>
          </Box>
          <Divider variant="middle" />
          {/* <Box style={{ marginTop: 40 }}>
            <Container>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                  Deputy
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={() => setShowCreateDeputy(true)}
                >
                  New Deputy
                </Button>
              </Stack>

              <Card>
                <DataGrid
                  getRowId={(row) => row.accountId}
                  autoHeight
                  rows={deputies}
                  columns={columnsDep}
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
              </Card>
            </Container>
          </Box> */}
        </DialogContent>
      </form>
      <DetailCampus show={showDetail} close={() => setShowDetail(false)} campus={campus} getDetail = {fetchData} />
      <CreateCampus show={showCreate} close={() => setShowCreate(false)} PartnerID={props.partner.id} getDetail = {fetchData} />
      <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={message} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      <CreateAccountPartner show={showCreateDeputy} close={() => setShowCreateDeputy(false)} getDeputy={getDeputy} partnerId= {props.partner.id}/>
      <Dialog
        open={showConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">Update Partner</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You Want To Update Partner?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button variant="contained" onClick={() => handleUpdatePartner()} autoFocus>
            Accept
          </Button>
        </DialogActions>
        {/* <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Partner Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} /> */}
      </Dialog>
      <Dialog
        open={showConfirmDelete}
        onClose={handleClickCloseConfirmDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Campus!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You want to delete this campus?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseConfirmDelete}>Cancel</Button>
          <Button variant="contained" onClick={() => handleDeleteCampus(id)} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showConfirmDeleteDep}
        onClose={handleClickCloseConfirmDeleteDep}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Deputy!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You want to delete this deputy?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseConfirmDeleteDep}>Cancel</Button>
          <Button variant="contained" onClick={() => disableDeputy(email)} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Loading show={loading}/>
    </Dialog>}
 </>
  );
}

export default DetailPartner;
