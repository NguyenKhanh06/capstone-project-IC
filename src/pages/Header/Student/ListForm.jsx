import { Card, Container, Dialog, DialogContent, DialogTitle, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { DataGrid } from '@mui/x-data-grid';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import axios from 'axios';
import DetailStudentRegister from './DetailStudentRegister';

function ListFormStudent(props) {
    const [students, setStudents] = useState(null);
    const [open, setOpen] = useState(false);
    const [showRegis, setShowRegis] = useState(false);
  const [student, setStudent] = useState([]);
    

    const handleClose = () => {
        setOpen(props.close);
      };
      console.log(props.studentID?.id)
    const getDetail = async () => {
        await axios
          .get(`https://api.ic-fpt.click/api/v1/registration/getDetailbyStudentId/${props?.studentID?.id}`)
          .then((response) => {
         
            setStudents(response.data.responseSuccess);
            // if (response.data.responseSuccess[0]?.contentHeader1 !== 'null') {
            //   setContent1(response.data.responseSuccess.content1);
            // }
            // if (response.data.responseSuccess[0]?.contentHeader2 !== 'null') {
            //   setContent2(response.data.responseSuccess[0].content2);
            // }
            // if (response.data.responseSuccess[0]?.contentHeader3 !== 'null') {
            //   setContent3(response.data.responseSuccess[0].content3);
            // }
            // if (response.data.responseSuccess[0]?.contentHeader4 !== 'null') {
            //   setContent4(response.data.responseSuccess[0].content4);
            // }
            // if (response.data.responseSuccess[0]?.contentHeader5 !== 'null') {
            //   setContent5(response.data.responseSuccess[0].content5);
            // }
         
            // setDate(response.data.responseSuccess[0]?.dateExpired);
            // setNumber(response.data.responseSuccess[0]?.numberPassPort);
            // setLink(response.data.responseSuccess[0]?.scocialLink);
            // setProject(response.data.responseSuccess[0]?.project.id);
          });
      };
      useEffect(() => {
        if(props.studentID){
getDetail()
        }
      }, [props.studentID]);

      const handleClickOpenDetailRegis = (data) => {
        setShowRegis(true);
        setStudent(data);
      };
    
    const columns = [
        {
          field: 'project',
          headerName: 'Project',
          flex: 1,
          valueGetter: (params) => {
         
            return params.row?.project?.projectName
          },
        },
        {
          field: 'creator',
          headerName: 'Creater',
          flex: 1,
        },
    
      
    
    
        {
          headerName: 'Action',
          flex: 1,
          sortable: false,
          disableClickEventBubbling: true,
          renderCell: (params) => {
            return (
              <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                <Tooltip title="View Detail">
                  <IconButton onClick={() =>handleClickOpenDetailRegis(params.row)} aria-label="delete">
                    <RemoveRedEyeRoundedIcon />
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title="Delete">
                  <IconButton onClick={() => handleShowConfirm(params.row.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip> */}
              </Stack>
            );
          },
        },
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
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Detail Registration Information</DialogTitle>
          <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
   
          {/* <FormControl sx={{width: "20%", marginLeft: 5, marginTop: 5}}>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                  
                      label="Status"
                    
                      defaultValue={1}
                    >
                      <MenuItem value={0}>No role</MenuItem>
                      <MenuItem value={2}>Staff</MenuItem>
                      <MenuItem value={3}>Collaborator</MenuItem>
                    </Select>
                  </FormControl> */}
          <DialogContent>
          <Container>
          
  
          <Card>
           {students &&  <DataGrid
              autoHeight
              rows={students}
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
          </DialogContent>
<DetailStudentRegister show={showRegis} close={() => setShowRegis(false)} studentID = {student.id}/>
          </Dialog>
   

    );
}

export default ListFormStudent;