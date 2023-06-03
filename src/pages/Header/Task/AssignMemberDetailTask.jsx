import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import { API_URL } from '../../../config/apiUrl/apis-url';

function AssignMemberDetailTask(props) {
  const [open, setOpen] = useState(null);
  const [task, setTask] = useState([]);

  const [staffs, setStaffs] = useState([]);
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

  const handleClose = () => {
    setOpen(props.close);
  };

  const fetchData = async () => {
    await axios.get(`${API_URL}/project/getJoin/${props.project}`).then((response) => {
    
      setStaffs(response.data.responseSuccess);
      //   const result = Object.values(response.data.responseSuccess).map(
      //     Object.values
      //   );

      //   //   const array = Object.keys(response.data.responseSuccess.filter((project) => project.project.status))
      //   // .map((key) =>
      //   //      obj[key]
      //   // )
      //   const prj = [];
      //   result.map((rs) => prj.push(rs[6]));
      // setStaffs(prj)
    });
  };
  useEffect(() => {
    fetchData().catch((error) => {
   
    });
  }, []);
  console.log(props)

  const handleAssignTask = (id) => {
    axios
      .post(`${API_URL}/task/assignTask/${props.taskId}?StaffId=${id}`)
      
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          props.getDetail()
          setTimeout(() => {
  
            setShowSuccess(false)
          
            handleClose()
          }, 1000);
      
        }
      })
      .catch((err) => {
        handleError('Assign fail!!!');
      });
  };

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
            <IconButton onClick={() => handleAssignTask(params.row.staffId)}>
              <AssignmentTurnedInOutlinedIcon color="success" />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];
  // const columns = [
  //     {
  //       field: 'skillName',
  //       headerName: 'Course Name',
  //       flex: 1,
  //     },

  //     {
  //       field: 'dateCreated',
  //       headerName: 'Create Date',
  //       flex: 1,
  //       valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
  //     },

  //     {
  //       headerName: 'Action',
  //       flex: 1,
  //       sortable: false,
  //       disableClickEventBubbling: true,
  //       renderCell: (params) => {
  //         return (
  //             <Tooltip title="Assign Member">
  //             <IconButton >
  //               <AssignmentTurnedInOutlinedIcon color='success' />
  //             </IconButton>
  //           </Tooltip>
  //         );
  //       },
  //     },
  //   ];

  return (
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
      <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Assign Task Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
    </Dialog>
  );
}

export default AssignMemberDetailTask;
