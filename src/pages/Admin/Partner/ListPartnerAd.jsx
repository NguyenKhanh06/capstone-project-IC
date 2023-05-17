import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Iconify from '../../../components/iconify/Iconify';
import CreatePartner from './CreatePartner';
import DetailPartnerAd from './DetailPartnerAd';
import { API_URL } from '../../../config/apiUrl/apis-url';

function ListPartnerAd(props) {
    const [partners, setPartners] = useState([])
    const [partner, setPartner] = useState([])
    const [showDetail, setShowDetail] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [id, setID] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');
    const handleError = (data) => {
      setShowError(true);
      setMessage(data);
    };
  
    const handleShowConfirm = (data) => {
      setID(data);
      setShowConfirm(true);
    };
  
    const handleCloseConfirm = (data) => {
      setShowConfirm(false)
    };
    function reload() {
      window.location.reload(false);
    }
  
    const handleViewDetail = (data) => {
      setShowDetail(true);
      setPartner(data);
    };
    const fetchData = async () => {
        await axios.get(`${API_URL}/partner/getAllPartner`).then((response) => {
          
          setPartners(response.data.responseSuccess.filter(partner => partner.status))
       
        });
      };
      useEffect(() => {
        fetchData().catch((error) => {
          console.log(error);
        });
      }, []);

      const handleDeletePartner = () => {
        axios.post(`${API_URL}/partner/disable/${id}`).then((response) => {
          if (response.data.isSuccess) {
            setShowSuccess(true);
            setTimeout(reload(), 5000);
          } 
        }).catch((err) => {
          handleError(err.response.data.responseSuccess);
        })
      }
      const columns = [
        {
          field: 'name',
          headerName: 'Partner Name',
          flex: 1,
        },
      
        {
          field: 'local',
          headerName: 'Location',
          flex: 1,
         
        },
      
        
        {
         
          headerName: 'Action',
          flex: 1,
            sortable: false,
          disableClickEventBubbling: true,
          renderCell: (params) => {
            return(
              <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                <Tooltip title="View Detail">
                  <IconButton onClick={() => handleViewDetail(params.row)} aria-label="delete">
                    <RemoveRedEyeRoundedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleShowConfirm(params.row.id)} >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              </Stack>
            )
          },
        },
      ];
    return (
      <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Partner
          </Typography>
          <Button onClick={() => setShowCreate(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} >
            New Partner
          </Button>
        </Stack>

        <Card>
        {partners && <DataGrid
            autoHeight
            rows={partners}
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
     
<CreatePartner show={showCreate} close={() => setShowCreate(false)}/>
<DetailPartnerAd show={showDetail} close={() => setShowDetail(false)} partner={partner}/>
     
    <Dialog
      open={showConfirm}
      onClose={handleCloseConfirm}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">Delete Partner</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">You want to delete this partner?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseConfirm}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={() => handleDeletePartner()} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </>
    );
}

export default ListPartnerAd;