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
  const [doc, setDoc] = useState(null);

  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };

 
  const getdetailProject = () => {
    axios.get(`https://api.ic-fpt.click/api/v1/project/getDetail/${props.project.id}`).then((response) => {
      setProject(response.data.responseSuccess[0])
      console.log("detail prj", response.data)
    })
  }
  console.log(props)
  const fetchDataDoc = async () => {
    await axios.get(`https://api.ic-fpt.click/api/v1/document/getAll`).then((response) => {
      console.log(
        'doc',
        response.data.responseSuccess.filter((doc) => doc.projectId === props.project.id)
      );
      setDoc(response.data.responseSuccess.filter((doc) => doc.projectId === props.project.id));
    });
  };
  console.log(props)
  useEffect(() => {
   if(props.project != null ){
    getdetailProject()
    fetchDataDoc()
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
    formData.append('DateCreated', new Date());
    formData.append('Status', true);
    formData.append('ProjectId', props.project.id);
    axios({
      method: 'POST',
      data: formData,
      url: 'https://api.ic-fpt.click/api/v1/document',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      if (response.data.isSuccess) {
        setShowSuccess(true);
        setTimeout(() => {
       window.location.reload()
        }, 1000);
      } 
    }).catch((err) => {
      setTimeout(() => {
        window.location.reload()
         }, 1000);
      handleError('Upload fail!');
    })
  };
  const handleExportFile = (documentPrj) => {
    axios({
      url: `https://api.ic-fpt.click/api/v1/document/content/${documentPrj.id}`,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      console.log(response);
      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const contentDisposition = response.headers['content-disposition: attachment'];
      let fileName = documentPrj.fileName;
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
      }
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    });
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
              {project?.description !== 'null' &&       <Typography>

{project?.description}
</Typography>}
        
            </Box>
            <Box sx={{ padding: '0 44px 44px 44px', maxWidth: '100%' }}>
            <b>Project's Files:</b>
            <Stack direction="column" alignItems="flex-start" spacing={3}>
            {doc && doc.map((document, index) => (
                      <Button
                   
                      variant="text"
                     
                      onClick={() => handleExportFile(document)}
                    >
                      {document.fileName}
                    </Button>
                ))
                }
            </Stack>
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
              {props.project?.checkNegotiationStatus ?   <Button color="secondary" variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}>
                Import Mark For Student
                <input
                  onChange={onChangeFile}
                  id="input"
                  hidden
                 
                  type="file"
                />
              </Button> :   <Button disabled color="secondary" variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}>
                Import Course Reasult
                <input
                  onChange={onChangeFile}
                  id="input"
                  hidden
                 
                  type="file"
                />
              </Button>}
          
{/* 
            <Button onClick={() => setShowCancel(true)} color="error" variant="contained">
              Cancel Project
            </Button> */}
          </Stack>
        </DialogActions>
        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Upload File Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
      <CancelProject show={showCancel} close={() => setShowCancel(false)} />
      <DetailCourseNegoPartner course={project?.courseId} show={showDetail} close={() => setShowDetail(false)} />
    </div>
  );
}

export default DetailProjectNegoPartner;
