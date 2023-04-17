import {
  Box,
  Button,
  Card,
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




function AssignMember(props) {

  const [open, setOpen] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [task, setTask] = useState([]);
  const [deadline, setDeadline] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("")
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [stateTask, SetStateTask] = useState(0)
  const[staffs, setStaffs] = useState([])

const handleClose = () => {
  setOpen(props.close)
}

  const handleViewDetail = (data) => {
    setShowDetail(true);
    setTask(data);
  };


  const fetchData = async () =>{
   await axios.get(`https://localhost:7115/api/v1/project/getJoin/${props.project}`).then((response) => {
     
setStaffs(response.data.responseSuccess)

    })
  }
  useEffect(() => {
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  const columns = [
    {
      field: 'staffs',
      headerName: 'Staff Name',
      flex: 1,
      valueGetter: (params) => {
        return params.value.staffCode;
      },
    },

    {
      headerName: 'Action',
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Tooltip title="Assign Member">
            <IconButton onClick={()=> {props.setMember(params.row); handleClose()}} >
              <AssignmentTurnedInOutlinedIcon color="success" />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];
  console.log("staff", staffs)
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
  

      
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <DialogTitle id="alert-dialog-title">Assign Member</DialogTitle>
              <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
                <CloseOutlinedIcon />
              </IconButton>
            </Stack>
         
        
        <Divider variant="middle" />
       
        <DialogContent>
        <>
      <Container>
        

        <Card>
        <DataGrid
                  autoHeight
                  rows={staffs}
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

    </>
        </DialogContent>
     
      </form>
    </Dialog>
  );
}

export default AssignMember;

