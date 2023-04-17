import {
    Autocomplete,
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Popover,
    Select,
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
  import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

  import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
  import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
  import DeleteIcon from '@mui/icons-material/Delete';
  import { visuallyHidden } from '@mui/utils';
  import { useEffect, useState } from 'react';
  import Iconify from '../../../components/iconify/Iconify';
  import Label from '../../../components/label/Label';
  import Scrollbar from '../../../components/scrollbar/Scrollbar';
  import { UserListToolbar } from '../../../sections/@dashboard/user';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';


  function AssignMember(props) {
    const regexMailFu = /[\w.-]+fptu@gmail\.com$/
  const [open, setOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [joinprj, setJoinPrj] = useState([])
    const [stateTask, SetStateTask] = useState(0)
    const[staffs, setStaffs] = useState([]);
    const [member, setMember] = useState([])
    const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };

  function reload() {
    window.location.reload(false);
  }
    const handleChangeSelect = (event, value) => setSelectedOptions(value);
  
    const handleClose = () => {
      setOpen(props.close);
    };
  
   
    const fetchData = async () =>{
     await axios.get(`https://localhost:7115/api/v1/staff/getAll`).then((response) => {
  setStaffs(response.data.responseSuccess.filter(staff => staff.account.status&& regexMailFu.test(staff.account.email)).filter(staflead => staflead.id !== props.project.leaderId))
      })
    }

    const fetchJoin = async () => {
     await axios.get(`https://localhost:7115/api/v1/project/getJoin/${props.project.id}`).then((response) => {
        setJoinPrj(response.data.responseSuccess)
    
      })
    }
    useEffect(() => {
      if(props.project != null){
    
        fetchData()
        fetchJoin()
      }
      
    }, [props.project]);
  


    const handleSubmit = () => {
      const formData = new FormData();
      selectedOptions.map(staff =>  formData.append('staffId', staff.id))
     
     
  
      axios({
        method: 'POST',
        data: formData,
        url: `https://localhost:7115/api/v1/project/assign/${props.project.id}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          if (response.data.isSuccess) {
            setShowSuccess(true);
            setTimeout(() =>{
              fetchData()
              fetchJoin()
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
        field: 'staffCode',
        headerName: 'Staff Code',
        flex: 1,
        renderCell: (params) => { return (params.row.staffs.staffCode)}
      
      },
  
      
  
      // {
      //   headerName: 'Action',
      //   flex: 1,
      //   sortable: false,
      //   disableClickEventBubbling: true,
      //   renderCell: (params) => {
      //     return (
      //       <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
      //         <Tooltip title="View Detail">
      //           <IconButton  aria-label="delete">
      //             <RemoveRedEyeRoundedIcon />
      //           </IconButton>
      //         </Tooltip>
      //         <Tooltip title="Delete">
      //           <IconButton >
      //             <DeleteIcon color="error" />
      //           </IconButton>
      //         </Tooltip>
      //       </Stack>
      //     );
      //   },
      // },
    ];
    return (
        <Dialog
        fullWidth
        maxWidth="md"
        open={props.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form >
    
  
        
  
           
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <DialogTitle id="alert-dialog-title">Assign Member</DialogTitle>
              <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
                <CloseOutlinedIcon />
              </IconButton>
            </Stack>
          <Divider variant="middle" />
         
          <DialogContent>
          <>
        {/* <Container>
          
  
          <Card>
            <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />
  
            <Scrollbar>
              <TableContainer>
                <Table>
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={staffs.length}
                  />
                  <TableBody>
                    {stableSort(staffs, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow hover key={index}>
                            <TableCell>   <Checkbox value={row.id} onClick={(event) => handleSendSelection(event)}/></TableCell>
                          <TableCell component="th">{row.account.fullName}</TableCell>
                          <TableCell align="left">{row.account.email}</TableCell>
                          <TableCell align="left">{row?.account.phoneNumber}</TableCell>
                          <TableCell align="left">{row?.account.address}</TableCell>
                        
  
                 
                          <TableCell align="left">
                            <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                              <Tooltip title="View Detail">
                                <IconButton onClick={() => handleViewDetail()} aria-label="delete">
                                  <RemoveRedEyeRoundedIcon />
                                </IconButton>
                              </Tooltip>
  
                              <Tooltip title="Assign Leader">
                                <IconButton onClick={()=> {props.setLeader(row); handleClose()}}>
                                  <AssignmentTurnedInOutlinedIcon color='success' />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
  
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={staffs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container> */}

<Autocomplete
sx={{marginBottom: 4}}
        multiple
    
        id="tags-outlined"
        onChange={handleChangeSelect}
        options={staffs}
        getOptionLabel={(option) => option.staffCode}
        fullWidth
       
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Assign Member"
            placeholder="Assign Member"
          />
        )}
      />
     <DataGrid
            autoHeight
            rows={joinprj}
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
      </>
          </DialogContent>
          <DialogActions style={{padding: 20}}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={()=> handleSubmit()} autoFocus>
          Assign Member
            </Button>
          </DialogActions>
        </form>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Assign Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
    );
  }
  
  export default AssignMember;
  