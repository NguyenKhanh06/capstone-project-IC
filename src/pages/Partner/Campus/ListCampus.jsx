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
  Tooltip,
  Typography,
} from '@mui/material';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import Iconify from '../../../components/iconify/Iconify';
import Label from '../../../components/label/Label';
import Scrollbar from '../../../components/scrollbar/Scrollbar';
import { UserListToolbar } from '../../../sections/@dashboard/user';

import CreateCampus from '../../Header/Partner/CreateCampus';
import DetailCampusPartner from './DetailCampusPartner';
import CreateCampPartner from './CreateCampPartner';
import { API_URL } from '../../../config/apiUrl/apis-url';

function ListCampus(props) {
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
  const user = JSON.parse(sessionStorage.getItem('user'));
  const deputy = JSON.parse(sessionStorage.getItem('deputy'));

  const [open, setOpen] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [campuses, setCampuses] = useState([]);
  const [campus, setCampus] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [id, setId] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };

  const handleClickOpenConfirmDelete = (id) => {
    setId(id);
    setShowConfirmDelete(true);
  };
  const handleClickCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
  };
  function reload() {
    window.location.reload();
  }

  const handleDeleteCampus = () => {
    axios
      .put(`${API_URL}/campus/disable/${id}`)
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setTimeout(() => {
            reload()
          }, 1000)
        }
      })
      .catch((err) => {
        handleError(err.response.data.responseSuccess);
      });
  };
  const getCampus = async () => {
    await axios.get(`${API_URL}/campus/getAll`).then((response) => {
      setCampuses(response.data.responseSuccess.filter((campus) => campus.partnerId === deputy.partnerId && campus.status));
    });
  };

  // const handleViewDetail = (data) => {
  //   setShowDetail(true);
  //   setTask(data);
  // };
  const handleViewDetail = (data) => {
    setShowDetail(true);
    setCampus(data);
  };

  useEffect(() => {
    getCampus();
  }, []);
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Campus
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setShowCreate(true)}>
            New Campus
          </Button>
        </Stack>

        <Card>
        {campuses &&   <DataGrid
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
          />}
        </Card>
      </Container>
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
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Delete Campus Successful!'} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
      <CreateCampPartner show={showCreate} close={() => setShowCreate(false)} PartnerID= {deputy.partnerId} />
      <DetailCampusPartner show={showDetail} close={() => setShowDetail(false)} campus={campus} />
    </>
  );
}

export default ListCampus;
