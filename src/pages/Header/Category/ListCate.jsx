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
import axios from 'axios';
import dayjs from 'dayjs';
import { DataGrid } from '@mui/x-data-grid';
  import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { useEffect, useState } from 'react';
  import Iconify from '../../../components/iconify/Iconify';
import CreateCategory from './CreateCategory';


  function ListCate(props) {
    const [showCreate, setShowCreate] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [course, setCourse] = useState([]);
    const [cates, setCates] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [id, setID] = useState('');
  
    const handleShowConfirm = (data) => {
      setID(data);
      setShowConfirm(true);
    };
  
    const handleCloseConfirm = (data) => {
      setShowConfirm(false)
    };
 
  
    const handleViewDetail = (data) => {
      setShowDetail(true);
      setCourse(data);
    };

    const fetchData = async () => {
      await axios.get(`https://api.ic-fpt.click/api/v1/categoryProject/getAllCate`).then((response) => {
        console.log(response.data)
        setCates(response.data.responseSuccess.filter(cate => cate.status)
          )
        
      });
    };
  
    useEffect(() => {
      fetchData().catch((error) => {
        console.log(error);
      });
    }, []);
  
const handleDeleteCourse = () => {
  axios.put(`https://api.ic-fpt.click/api/v1/course/delete/${id}`).then((response) => {
window.location.reload(false)
  })
}

const columns = [
  {
    field: 'name',
    headerName: 'Course Name',
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
          <Tooltip onClick={() => handleShowConfirm(params.row.id)} title="Delete">
            <IconButton>
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
            Category
            </Typography>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setShowCreate(true)}>
              New Category
            </Button>
          </Stack>
  
          <Card>
          <DataGrid
              autoHeight
              rows={cates}
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
          </Card>
        </Container>
     
       <CreateCategory show={showCreate} close={() => setShowCreate(false)}/>
      <Dialog
        open={showConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">Delete Course</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">You want to delete this course?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={() => handleDeleteCourse()} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </>
    );
  }
  
  export default ListCate;
  