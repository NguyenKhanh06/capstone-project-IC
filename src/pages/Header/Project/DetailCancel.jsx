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
  import dayjs from 'dayjs';
  import React, { useEffect, useState } from 'react';
  import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
  import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
  import axios from 'axios';
  import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';
import { API_URL } from '../../../config/apiUrl/apis-url';

  
  function DetailCancel(props) {
    const [open, setOpen] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [fileStudent, setFileStudent] = useState(null);
    const [project, setProject] = useState(null);
    const [cancel, setCancel] = useState(null)
    const [doc, setDoc] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

  
    const handleClickOpen = () => {
      setOpen(true);
    };

    const getCancel = async  () => {
        await axios.get(`${API_URL}/cancel/getProjectCancel/${props.project.id}`).then(response => {
      
setCancel(response.data.responseSuccess[0])
        })
    }
    const getdetailProject = () => {
      axios.get(`${API_URL}/project/getDetail/${props.project.id}`).then((response) => {
        setProject(response.data.responseSuccess[0]);
      
      });
    };
    // const fetchDataDoc = async () => {
    //   await axios.get(`${API_URL}/document/getAll`).then((response) => {
    //     console.log(
    //       'doc',
    //       response.data.responseSuccess.find((doc) => doc.projectId === props.project.id)
    //     );
    //     setDoc(response.data.responseSuccess.find((doc) => doc.projectId === props.project.id));
    //   });
    // };
    useEffect(() => {
      if (props.project != null) {
        getdetailProject();
        // fetchDataDoc();
        getCancel()
      }
    }, [props.project]);

    const handleClose = () => {
      setOpen(props.close);
    };
  
    const onChangeFile = (e) => {
      setFileStudent(e.target.files[0]);

    };
  
    // const handleExportFile = () => {
    //   axios({
    //     url: `${API_URL}/document/content/${doc.id}`,
    //     method: 'GET',
    //     responseType: 'blob', // important
    //   }).then((response) => {
    //     console.log(response);
    //     const blob = new Blob([response.data], { type: response.data.type });
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement('a');
    //     link.href = url;
    //     const contentDisposition = response.headers['content-disposition: attachment'];
    //     let fileName = doc.fileName;
    //     if (contentDisposition) {
    //       const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
    //       if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
    //     }
    //     link.setAttribute('download', fileName);
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();
    //     window.URL.revokeObjectURL(url);
    //   });
    // };
    const handleDownload = () => {
      axios
        .get(`${API_URL}/cancel/content/${cancel?.id}`, {
          responseType: 'blob',
        })
        .then((response) => {
     
  
          if (response.status === 200) {
setShowSuccess(true)
          
          }
          let filename = 'cancelFile.pdf';
          filename = decodeURI(filename);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
  
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          link.remove();
        });
    };
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
            <DialogTitle id="alert-dialog-title">Project Name: {project?.projectName}</DialogTitle>
            <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
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
                    <Typography>
                      {project?.estimateTimeStart ? dayjs(project?.estimateTimeStart).format('DD/MM/YYYY') : '-'}
                    </Typography>
                  </Stack>
                  <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={2}>
                    <b>Official Time Start:</b>
                    <Typography>
                      {project?.officalTimeStart ? dayjs(project?.officalTimeStart).format('DD/MM/YYYY') : '-'}
                    </Typography>
                  </Stack>
             
                  <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={2}>
                    <b>Course:</b>
                    <Typography>
                      {project?.course.courseName}
                    </Typography>
                    {/* <Button onClick={() => setShowDetail(true)} variant="text">
                      {project?.course?.skillName}
                    </Button> */}
                  </Stack>
                </Stack>
                <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={5}>
                  <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={2}>
                    <b>Estimate Time End:</b>
                    <Typography>
                      {project?.estimateTimeEnd ? dayjs(project?.estimateTimeEnd).format('DD/MM/YYYY') : '-'}
                    </Typography>
                  </Stack>
                  <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={2}>
                    <b>Official Time End:</b>
                    <Typography>
                      {project?.officalTimeEnd ? dayjs(project?.officalTimeEnd).format('DD/MM/YYYY') : '-'}
                    </Typography>
                  </Stack>
               
                  <Stack direction="column" justifyContent="space-around" alignItems="flex-start" spacing={2}>
                    <b>Campus</b>
                    <Typography>{project?.campus?.name}</Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Box sx={{ padding: '0 44px 44px 44px', maxWidth: '100%' }}>
                <b>Project Description:</b>
                <Typography>{project?.description}</Typography>
              </Box>
              <Stack direction="column" spacing={2} sx={{ padding: '0 44px 44px 44px', maxWidth: '100%' }}>
                <b>Cancel Reason: </b>
                <Typography variant='caption'>{`Date cancel: ${dayjs(cancel?.dateCreated).format("DD/MM/YYYY")}`}</Typography>
                <Typography>{cancel?.description}</Typography>
                <Button onClick={() => handleDownload()} color="warning" variant="contained" startIcon={<FileDownloadOutlinedIcon />}>
               Download file Reason
              </Button>
              </Stack>
            </Paper>
          </DialogContent>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Download Successful!'} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
          {/* <DialogActions style={{ padding: 20 }}>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={6}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <Button color="secondary" variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}>
                    Import File Contract
                    <input
                      onChange={onChangeFile}
                      id="input"
                      hidden
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      type="file"
                    />
                  </Button>
                  {doc != null ? (
                    <Button
                      color="warning"
                      variant="contained"
                      startIcon={<FileDownloadOutlinedIcon />}
                      onClick={() => handleExportFile()}
                    >
                      Download File
                    </Button>
                  ) : (
                    <Button
                      color="warning"
                      disabled
                      variant="contained"
                      startIcon={<FileDownloadOutlinedIcon />}
                      onClick={() => handleExportFile()}
                    >
                      Download File
                    </Button>
                  )}
                </Stack>
                <Button onClick={() => setShowCancel(true)} color="error" variant="contained">
                  Cancel Project
                </Button>
              </Stack>
            </Stack>
          </DialogActions> */}
        </Dialog>
     
      </div>
    );
  }
  
  export default DetailCancel;
  