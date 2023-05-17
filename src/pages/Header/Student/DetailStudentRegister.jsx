import {
  Box,
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
import { API_URL } from '../../../config/apiUrl/apis-url';

function DetailStudentRegister(props) {
  const [disableBtn, setDisableBtn] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [preview, setPreview] = useState();
  const [preview2, setPreview2] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [numberPassPort, setNumber] = useState('');
  const [socialLink, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [dateExpired, setDate] = useState(null);
  const [infor, setInfor] = useState(null);
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);

  const [inputList, setInputList] = useState([]);
  const handleClose = () => {
    setOpen(props.close);
  };
  const handleShowConfirm = (data) => {
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
  const handleError = (data) => {
    setShowError(true);
    setMessage(data);
  };

  const fetchDataPrj = async () => {
    await axios.get(`${API_URL}/registration/getAllRes`).then((response) => {
      setProjects(response.data.responseSuccess);
    });
  };
  const handleRegis = () => {
    for (let i = 0; i <= inputList.length; i += 1) {
      axios.put(
        `${API_URL}/registration/updateAnswer?RegistrationId=${props.studentID}&Id=${inputList[i]?.id}&Answer=${inputList[i]?.answer}`
      );
    }
  };
  const handleInputChange = (e, index) => {

    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    setDisableBtn(true)
  };

  const getDetail = async () => {
    await axios.get(`${API_URL}/registration/GetDetailResId/${props.studentID}`).then((response) => {
      setInputList(response.data.responseSuccess[0].registrationAddOn);
      setStudent(response.data.responseSuccess[0]);

      if (response.data.responseSuccess[0]?.numberPassPort !== 'null') {
        setNumber(response.data.responseSuccess[0]?.numberPassPort);
      }
      setDate(response.data.responseSuccess[0]?.dateExpired);

      setLink(response.data.responseSuccess[0]?.scocialLink);
      setProject(response.data.responseSuccess[0]?.project?.id);
      setTitle(response.data.responseSuccess[0]?.title);
    });
  };
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
    if (props.studentID) {
      getDetail();
      fetchDataPrj();
    }
  }, [props.studentID]);

  const UpdateStudent = () => {
    const formData = new FormData();
    formData.append('PassportImageUrl', selectedFile);
    formData.append('UrlImageBill', selectedFile2);

    axios({
      method: 'PUT',
      data: formData,
      url: `${API_URL}/registration/UpdateRegisId/${student.id}?FullName=${student.student.fullName}&MajorId=${
        student?.student?.majorId
      }&memberCode=${student?.student?.memberCode}&PhoneNumber=${
        student.student.phoneNumber
      }&NumberPassPort=${numberPassPort}&RollNumber=${student.student?.rollNumber}&RollNumber=${
        student.student?.rollNumber
      }&YourEmail=${student.student?.email}&ScocialLink=${socialLink}&DateExpired=${dayjs(dateExpired).add(
        1,
        'day'
      )}&ProjectId=${student?.projectId}&Title=${title}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          handleRegis();
          setShowSuccess(true);
          setLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        handleError('Update fail!!!!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };
  const ITEM_HEIGHT = 46;
  const MOBILE_ITEM_HEIGHT = 58;
  const ITEM_PADDING_TOP = 18;
  const MENU_ITEMS = 6;

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
      {student ? (
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
            <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
              <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                <Typography variant="body1">Full Name:</Typography>
                <Typography variant="h6">{student?.student?.fullName}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                <Typography variant="body1">Email:</Typography>
                <Typography variant="h6">{student?.student?.email}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                <Typography variant="body1">Phone Number:</Typography>
                <Typography variant="h6">{student?.student?.phoneNumber}</Typography>
              </Stack>
            </Stack>
            <Divider variant="middle" sx={{ marginBottom: 6, marginTop: 4 }} />
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
              <Typography variant="body1">Project:</Typography>
              <Typography variant="h6">{student?.project?.projectName}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2} sx={{ marginBottom: 6 }}>
              <Typography variant="body1">Form's title:</Typography>
              <Typography variant="h6">{title}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <TextField
                value={numberPassPort}
                onChange={(e) => {
                  setNumber(e.target.value);
                  setDisableBtn(true);
                }}
                required
                fullWidth
                label="Number Passport"
              />
              <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: '100%' }}
                  label="Date Expired"
                  value={dayjs(dateExpired)}
                  onChange={(newValue) => {
                    setDate(newValue);
                    setDisableBtn(true);
                  }}
                  format="DD/MM/YYYY"
                />
              </LocalizationProvider>
            </Stack>
            <Stack sx={{ marginTop: 4 }} direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <TextField
                value={socialLink}
                onChange={(e) => {
                  setLink(e.target.value);
                  setDisableBtn(true);
                }}
                required
                fullWidth
                label="Social Link"
              />
            </Stack>
            <Stack sx={{ marginTop: 4 }} direction="column" justifyContent="center" alignItems="center" spacing={2}>
              {inputList?.map((x, index) => (
                <TextField
                  key={index}
                  fullWidth
                  name="answer"
                  label={x.question}
                  inputProps={{
                    style: { fontWeight: 'bold !important' },
                  }}
                  multiline
                  value={x.answer}
                  onChange={(e) => handleInputChange(e, index)}
                />
              ))}
            </Stack>

            <Stack
              sx={{ marginTop: 4 }}
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            ></Stack>
            <ImageList fullWidth>
              <ImageListItem key="Subheader" cols={2}>
                <ListSubheader component="div">Passport</ListSubheader>
                <p style={{ color: 'red' }}>(Just accept file with size under 20MB)</p>
              </ImageListItem>
              <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
                {selectedFile ? (
                  <img src={preview} alt="poster" style={{ maxWidth: '100%', borderRadius: 10 }} />
                ) : student?.passportImageUrl ? (
                  <img src={student?.passportImageUrl} alt="poster" style={{ maxWidth: '100%', borderRadius: 10 }} />
                ) : (
                  <></>
                )}
                <Button color="secondary" variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}>
                  Import Passport Image
                  <input onChange={onSelectFile} id="input" hidden accept="image/*" type="file" />
                </Button>
              </Stack>
            </ImageList>
            <ImageList sx={{ marginTop: 6 }} fullWidth>
              <ImageListItem key="Subheader" cols={2}>
                <p style={{ color: 'red' }}>(Just accept file with size under 20MB)</p>
              </ImageListItem>
              <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
                {selectedFile2 ? (
                  <img src={preview2} alt="poster" style={{ maxWidth: '100%', borderRadius: 10 }} />
                ) : student?.urlImageBill ? (
                  <img src={student?.urlImageBill} alt="poster" style={{ maxWidth: '100%', borderRadius: 10 }} />
                ) : (
                  <></>
                )}
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
            {disableBtn ? (
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
            <SuccessAlert
              show={showSuccess}
              close={() => setShowSuccess(false)}
              message={'Update Student Successful!'}
            />
            <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
          </Dialog>
        </form>
      ) : (
        <DialogContent>This student do not regis any project!</DialogContent>
      )}
    </Dialog>
  );
}

export default DetailStudentRegister;
