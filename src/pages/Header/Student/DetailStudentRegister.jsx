import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
  Link,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoIcon from '@mui/icons-material/Info';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import SuccessAlert from '../../Alert/SuccessAlert';
import ErrorAlert from '../../Alert/ErrorAlert';

function DetailStudentRegister(props) {
  const [disableBtn, setDisableBtn] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null)
  const [preview, setPreview] = useState();
  const [preview2, setPreview2] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [numberPassPort, setNumber] = useState('')
  const [socialLink, setLink] = useState('')
  const [dateExpired, setDate] = useState(null)
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);

  const handleClose = () => {
    setOpen(props.close);
  };
  const handleShowConfirm = (data) => {
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
  const itemData = [
 
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
]
  const fetchDataPrj = async () => {

    await axios.get(`https://localhost:7115/api/v1/registration/getAllRes`).then((response) =>{
setProjects(response.data.responseSuccess)
console.log("form", response.data.responseSuccess)
    })
 
  };

const getDetail = async () => {
  await axios.get(`https://localhost:7115/api/v1/registration/getDetailbyStudentId/${props.studentID}`).then(response => {
   setStudent(response.data.responseSuccess[0])
   setDate(response.data.responseSuccess[0]?.dateExpired)
   setNumber(response.data.responseSuccess[0]?.numberPassPort)
   setLink(response.data.responseSuccess[0]?.scocialLink)
   setProject(response.data.responseSuccess[0]?.project.id)
  })
}
const onSelectFile = (e) => {
  if (!e.target.files || e.target.files.length === 0) {
    setSelectedFile(undefined);
    return;
  }

  // I've kept this example simple by using the first image instead of multiple
  setSelectedFile(e.target.files[0]);
  if (e.target.files[0]) {
    setDisableBtn(true);
  }
};
const onSelectFile2 = (e) => {
  if (!e.target.files || e.target.files.length === 0) {
    setSelectedFile2(undefined);
    return;
  }

  // I've kept this example simple by using the first image instead of multiple
  setSelectedFile2(e.target.files[0]);
  if (e.target.files[0]) {
    setDisableBtn(true);
  }
};
useEffect(() => {
  if (!selectedFile) {
    setPreview(undefined);
    return;
  }

  const objectUrl = URL.createObjectURL(selectedFile);
  setPreview(objectUrl);

  // free memory when ever this component is unmounted
}, [selectedFile]);
useEffect(() => {
  if (!selectedFile2) {
    setPreview2(undefined);
    return;
  }

  const objectUrl = URL.createObjectURL(selectedFile2);
  setPreview2(objectUrl);

  // free memory when ever this component is unmounted
}, [selectedFile2]);

useEffect(() => {
  if(props.studentID){
getDetail()
fetchDataPrj()
  }

}, [props.studentID]);



const UpdateStudent = () => {
  const formData = new FormData();
  formData.append('PassportImageUrl', selectedFile)
  formData.append('UrlImageBill', selectedFile2)


  axios({
    method: 'PUT',
    data: formData,
    url: `https://localhost:7115/api/v1/registration/updateRegisByStudentId/${props.studentID}?FullName=${student.student.fullName}&MajorId=${student?.student?.majorId}&memberCode=${student?.student?.memberCode}&PhoneNumber=${student.student.phoneNumber}&NumberPassPort=${numberPassPort}&RollNumber=${student.student?.rollNumber}&RollNumber=${student.student?.rollNumber}&YourEmail=${student.student?.email}&ScocialLink=${socialLink}&DateExpired=${dateExpired}&ProjectId=${project}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => {

      if (response.data.isSuccess) {
        setShowSuccess(true);
        setLoading(false);
        setTimeout(() => {
     window.location.reload()
        }, 1000)
      
      }
    })
    .catch((err) => {
      handleError("Update fail!!!!");
      setTimeout(() => {
        window.location.reload()
           }, 1000)
    });
}
const ITEM_HEIGHT = 46;
const MOBILE_ITEM_HEIGHT = 58;
const ITEM_PADDING_TOP = 18;
const MENU_ITEMS = 6;
console.log(student)
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
       < Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <DialogTitle id="alert-dialog-title">Detail Registration Information</DialogTitle>
          <IconButton style={{marginRight: 6}} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>


      <form>
    
       
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
          <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing={2}>
          <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
            <Typography variant='body1'>Full Name:</Typography>
          <Typography variant='h6'>{student?.student.fullName}</Typography>
          </Stack>
     
          <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
            <Typography variant='body1'>Email:</Typography>
          <Typography variant='h6'>{student?.student.email}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
            <Typography variant='body1'>Phone Number:</Typography>
          <Typography variant='h6'>{student?.student.phoneNumber}</Typography>
          </Stack>
          </Stack>
          <Divider variant="middle" sx={{marginBottom: 6, marginTop: 4}} />

          <Stack direction='row' justifyContent='center' alignItems='center' spacing={2}>
          <TextField
                  value={numberPassPort}

              
                  onChange={(e) => {setNumber(e.target.value);
                    setDisableBtn(true)
                  }}
                  required
                  fullWidth
                  placeholder="Number Passport"
                />
          <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                    <DatePicker
                 
                      disablePast
                     
                      sx={{ width: '100%' }}
                      label="Date Expired"
                      value={dayjs(dateExpired)}
                      onChange={(newValue) => {
                        setDate(newValue);
                        setDisableBtn(true)
                      }}
                      format="DD/MM/YYYY"
                      
                    />
                  </LocalizationProvider>
            </Stack>
            <Stack sx={{marginTop: 4}} direction='row' justifyContent='center' alignItems='center' spacing={2}>
            <TextField
  
                  value={socialLink}
 
              
                  onChange={(e) => {setLink(e.target.value);
                    setDisableBtn(true)
                  }}
                  required
                  fullWidth
       
                />

<FormControl fullWidth>
                    <InputLabel id="demo-simple-select-autowidth-label">Project</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      displayEmpty
                      label="Project"
                      value={project}
                      name="course"
                      defaultValue={student?.projectId}
                      onChange={(e) => {setProject(e.target.value); setDisableBtn(true)}}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: {
                              xs: MOBILE_ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                              sm: ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP
                            }
                          }
                        }
                      }}
                    >
                      {projects.map((project, index) => (
                        <MenuItem
                          style={{ display: 'flex', justifyContent: 'space-between', direction: 'row' }}
                          key={index}
                          value={project.project.id}
                        >
                          {project.project.projectName}
                        
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
            
            </Stack>
           
   <ImageList fullWidth>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Passport</ListSubheader>
      </ImageListItem>
      <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing={2}>
      {selectedFile ? (
              <img src={preview} alt="poster" style={{ maxWidth: '100%', borderRadius: 10 }} />
            ) : student?.passportImageUrl ? (
              <img
                src={student?.passportImageUrl}
                alt="poster"
                style={{ maxWidth: '100%', borderRadius: 10 }}
              />
            ) : <></>}
              <Button color="secondary" variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}>
              Import Passport Image
              <input onChange={onSelectFile} id="input" hidden accept="image/*" type="file" />
            </Button>
      </Stack>
   
   
    </ImageList>
    <ImageList sx={{marginTop: 6}} fullWidth>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Transfer Information</ListSubheader>
      </ImageListItem>
      <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing={2}>
      {selectedFile2 ? (
              <img src={preview2} alt="poster" style={{ maxWidth: '100%', borderRadius: 10 }} />
            ) :student?.urlImageBill? (
              <img
                src={student?.urlImageBill}
                alt="poster"
                style={{ maxWidth: '100%', borderRadius: 10 }}
              />
            ): <></>}
              <Button color="secondary" variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}>
              Import Payment Image
              <input onChange={onSelectFile2} id="input" hidden accept="image/*" type="file" />
            </Button>
      </Stack>
    </ImageList>
    {/* <Divider sx={{marginTop: 6}} variant="middle" /> */}
{/* 
<Stack direction="row" justifyItems="flex-start" alignItems="center" spacing={2}>
    <p>NuyenCongkhanhmarkrp</p>
    <Tooltip title="Click to download markreport">
    <Button  variant="text">Download</Button>
    </Tooltip>
</Stack> */}



   
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
        {disableBtn  ? (
                <Button variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
                  Save
                </Button>
              ) : (
                <Button disabled variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
                  Save
                </Button>
              )}
      
        </DialogActions>
        <Dialog
          open={showConfirm}
          onClose={handleCloseConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Update Student</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Update Student?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Cancel</Button>
            <Button variant="contained" onClick={() => UpdateStudent()} autoFocus>
              Accept
            </Button>
          </DialogActions>
          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Update Student Successful!'} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
      </form>
    </Dialog>
  );
}

export default DetailStudentRegister;
