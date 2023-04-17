import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import dayjs from 'dayjs';
import axios from 'axios'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import React, { useEffect, useState } from 'react';
import CancelProject from '../../Header/Project/CancelProject';
import DetailCourseNegoPartner from './DetailCourseNeogoPartner';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';

function DetailProjectNegoPartner(props) {
  const [open, setOpen] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [fileStudent, setFileStudent] = useState(null);
  const [project, setProject] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };

 
  const getdetailProject = () => {
    axios.get(`https://localhost:7115/api/v1/project/getDetail/${props.project.id}`).then((response) => {
      setProject(response.data.responseSuccess[0])
      console.log("detail prj", response.data)
    })
  }

  useEffect(() => {
   if(props.project != null ){
    getdetailProject()
   }
  }, [props.project]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(props.close);
  };
  console.log(props)

  const onChangeFile = (e) => {
    setFileStudent(e.target.files[0]);
    console.log('file', e.target.files[0]);
  };

  const handleImportFile = (file) => {
    const formData = new FormData();
    formData.append('formFile', fileStudent);
    formData.append('DateCreated', `2023-03-26T10:32:09.713405`);
    formData.append('Status', true);
    formData.append('ProjectId', props.project.id);
    axios({
      method: 'POST',
      data: formData,
      url: 'https://localhost:7115/api/v1/document',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      if (response.data.isSuccess) {
        setShowSuccess(true);
      
      } 
    }).catch((err) => {
      handleError(err.response.data.responseSuccess);
    })
  };

  useEffect(() => {
    if (fileStudent != null) {
      handleImportFile();
    }
  }, [fileStudent]);

  return (
    <div>
      <Dialog
        open={props.show}
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
         <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
         <DialogTitle id="alert-dialog-title">Project Name: {props.project.projectName}</DialogTitle>
          <IconButton style={{marginRight: 6}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
       
        <Divider variant="middle" />

        <DialogContent>
          <Paper elevation={3} sx={{ margin: 5 }}>
     
            <Stack sx={{ padding: 5 }} direction="row" justifyContent="space-around" alignItems="center" spacing={5}>
              <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={5}>
                <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={2}>
                  <b>Estimate Time Start:</b>
                  <Typography>{project?.estimateTimeStart ? dayjs(project?.estimateTimeStart).format("DD/MM/YYYY") : "-"}</Typography>
                </Stack>
                <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={2}>
                  <b>Official Time Start:</b>
                  <Typography>{project?.officalTimeStart ? dayjs(project?.officalTimeStart).format("DD/MM/YYYY"): "-"}</Typography>
                </Stack>

                <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={2}>
                  <b>Course:</b>
                 <Typography>{project?.course.courseName}</Typography>
                </Stack>
              </Stack>
              <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={5}>
                <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={2}>
                  <b>Estimate Time End:</b>
                  <Typography>{project?.estimateTimeEnd ? dayjs(project?.estimateTimeEnd).format("DD/MM/YYYY") : "-"}</Typography>
                </Stack>
                <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={2}>
                  <b>Official Time End:</b>
                  <Typography>{project?.officalTimeEnd ? dayjs(project?.officalTimeEnd).format("DD/MM/YYYY") : "-"}</Typography>
                </Stack>
                <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={2}>
                  <b>Campus</b>
                  <Typography>{project?.campus.name}</Typography>
                </Stack>
              </Stack>
            </Stack>
            <Box sx={{ padding: '0 44px 44px 44px', maxWidth: '100%' }}>
              <b>Project Description:</b>
              <Typography>
               {project?.description}
              </Typography>
            </Box>
            
          </Paper>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          <Stack direction="row" alignItems="center" spacing={3}>
          {/* <Button
                color="warning"
                variant="contained"
                startIcon={<FileDownloadOutlinedIcon />}
                // onClick={() => handleExportFile()}
              >
                Download File Contract
              </Button>  */}
            <Button color="secondary" variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}>
                Import Mark For Student
                <input
                  onChange={onChangeFile}
                  id="input"
                  hidden
                 
                  type="file"
                />
              </Button>
{/* 
            <Button onClick={() => setShowCancel(true)} color="error" variant="contained">
              Cancel Project
            </Button> */}
          </Stack>
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Upload file Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
      <CancelProject show={showCancel} close={() => setShowCancel(false)} />
      <DetailCourseNegoPartner course={project?.courseId} show={showDetail} close={() => setShowDetail(false)} />
    </div>
  );
}

export default DetailProjectNegoPartner;
