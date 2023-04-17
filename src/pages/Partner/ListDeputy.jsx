import { Button, Card, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { DataGrid } from '@mui/x-data-grid';
import DetailDeputyPartner from './DetailDeputyPartner';
import SuccessAlert from '../Alert/SuccessAlert';
import ErrorAlert from '../Alert/ErrorAlert';

function ListDeputy(props) {
  const deputy = JSON.parse(sessionStorage.getItem('deputy'));
  console.log("dep", deputy)
  const [deputies, setDeputies] = useState([]);
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [idDep, setIdDep] = useState();
  const [showDep, setShowDep] = useState(false);
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false)
  const handleShowConfirm = (mail, status) => {
    setEmail(mail);
    setStatus(status)
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
  const getDeputy = async () => {
   await axios.get(`https://localhost:7115/api/v1/deputy/getAll`).then((response) => {
      setDeputies(response.data.responseSuccess.filter((dep) => dep.partnerId === deputy.partnerId && dep.accountId !== deputy.accountId));
     
    });
  };
  useEffect(() => {
    getDeputy();
  }, []);
  const handleDetailDep = (id) => {
    setShowDep(true);
    setIdDep(id);
  };
  const ChangeStatus = () => {
    axios
      .put(`https://localhost:7115/api/v1/account/changeStatusAccount/${email}?Status=${status}`)
      .then((response) => {
        if (response.data.isSuccess) {
          getDeputy()
          handleSuccess('Update Successful!!!');
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        
        }
      })
      .catch((err) => {
        handleError('Update Fail!');
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      
      });
  };
 
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
      field: 'account',
      headerName: 'Status',
      flex: 1,
      disableClickEventBubbling: true,
      renderCell: (params) =>
        // <Button onClick={() => console.log(params.row)}>check</Button>
        params.row.account.status ? <Chip label="Active" color="success" /> : <Chip label="Deactive" color="error" />,
    },

    {
      headerName: 'Action',
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
          <Tooltip title="View Detail">
            <IconButton onClick={() => handleDetailDep(params.row)} aria-label="delete">
              <RemoveRedEyeRoundedIcon />
            </IconButton>
          </Tooltip>
          {params.row.account.status ? (
            <Tooltip title="Deactive account">
              <IconButton onClick={() => handleShowConfirm(params.row.account.email, false)}>
                <HighlightOffOutlinedIcon color="error" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Active Account">
              <IconButton onClick={() => handleShowConfirm(params.row.account.email, true)}>
                <PublishedWithChangesOutlinedIcon color="success" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      ),
    },
  ];
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
        Deputy
        </Typography>
      </Stack>

      <Card>
      {deputies &&   <DataGrid
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
             sorting: {
                sortModel: [{ field: "dateCreated", sort: "desc" }],
                 },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />}
      </Card>
      <Dialog
        open={showConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">{'Update Status Deputy!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You want to update status of deputy?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button variant="contained" onClick={() => ChangeStatus()}  autoFocus>
            Accept
          </Button>
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
      <DetailDeputyPartner show={showDep} close={() => setShowDep(false)} id={idDep} />
    
    </Container>
  );
}

export default ListDeputy;
