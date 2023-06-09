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
  InputAdornment,
  InputLabel,
  Link,
  ListItem,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';
import { API_URL } from '../../../config/apiUrl/apis-url';

function DetailStudent(props) {
  const regexMail = /^[a-zA-Z0-9._%+-]+@fpt\.edu\.vn$/i;
  const regex = /^[\w\s]*$/;
  const regexPhone = /(0[3|5|7|8|9])+([0-9]{7})\b/g;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [fullName, setFullName] = useState(null);
  const [rollNumber, setRollNumber] = useState(null);
  const [oldRollNumber, setOldRoll] = useState(null);
  const [memberCode, setMemberCode] = useState(null);

  const [majorID, setMajorID] = useState(null);
  const [batch, setBatch] = useState(null);
  const [Checkerr, setErr] = useState(false);
  const [semester, setSemester] = useState(null);
  const [studentStatus, setStudentStatus] = useState('');
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');
  const [fileStudent, setFileStudent] = useState(null);
  const [listFile, setListFile] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [id, setID] = useState('');
  const [majors, setMajors] = useState([]);

  const [CheckerrPhone, setErrPhone] = useState(false);

  const handleShowConfirm = (data) => {
    setID(data);
    setShowConfirm(true);
  };

  const handleCloseConfirm = (data) => {
    setShowConfirm(false);
  };
  const handleCloseConfirmDelete = (data) => {
    setShowConfirmDelete(false);
  };
  const handleClose = () => {
    setOpen(props.close);
  };

  const handleError = (data) => {
    setMessage(data);
    setShowError(true);
  };
  const handleSuccess = (data) => {
    setMessage(data);
    setShowSuccess(true);
  };

  useEffect(() => {
    if (props.student !== null) {
      setFullName(props.student.fullName);
      setRollNumber(props.student.rollNumber);
      setMemberCode(props.student.memberCode);
      setMajorID(props.student.majorId);
      setBatch(props.student.batch);
      setSemester(props.student.semeter);
      setStudentStatus(props.student.studentStatus);
      setEmail(props.student.email);
      setPhoneNumber(props.student.phoneNumber);
      setAddress(props.student.address);
      setOldRoll(props.student.oldRollNumber);
    }
  }, [props.student]);

  // const handleUpdateStudent = () => {};
  // console.log(props.student);
  const data = {
    rollNumber: rollNumber,
    memberCode: memberCode,
    fullName: fullName,
    oldRollNumber: props.student.rollNumber,
    majorId: majorID,
    batch: batch,
    semeter: semester,
    upStatus: studentStatus,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    status: true,
  };
  const handleUpdateStudent = () => {
    axios
      .put(`${API_URL}/student/update/${props.student.id}`, data)
      .then((response) => {
        if (response.data.isSuccess) {
          window.location.reload(false);

          handleSuccess('Update Student Successfull!!!');
        }
      })
      .catch((err) => {
        handleError('Please check email or number phone!!!');
      });
  };

  // const onChangeFile = (e) => {
  //   setFileStudent(e.target.files[0]);

  // };

  const deleteFile = (name) => {
    axios
      .delete(`${API_URL}/student/deleteGrading/${props.student.id}`)
      .then((response) => {
        if (response.data.isSuccess) {
          handleSuccess('Delete File Successfull!!!');

          setTimeout(() => {
            window.location.reload();
          }, 1000);

          // setTimeout(reload(), 3000)
        }
      })
      .catch((err) => {
        handleError('Delete File fail!!');
        setLoading(false);
      });
  };

  const getAllFile = () => {
    axios.get(`${API_URL}/student/GetGradingStudentId/${props.student.id}`).then((response) => {
      setListFile(response.data.responseSuccess[0]);
    });
  };

  useEffect(() => {
    if (props.student) {
      getAllFile();
    }
  }, [props.student]);

  const handleImportFile = (id) => {
    const formData = new FormData();
    formData.append('FormFile', fileStudent);
    axios({
      method: 'POST',
      data: formData,
      url: `${API_URL}/student/upload/${id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          handleSuccess('Update File Successfull!!!');
          setTimeout(() => {
            window.location.reload();
          }, 1000);

          // setTimeout(reload(), 3000)
        }
      })
      .catch((err) => {
        handleError('Update File fail!!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        setLoading(false);
      });
  };

  // const getListFile = async () => {
  //  await axios.get(`${API_URL}/storage/Get`).then((response) => {
  //     setListFile(response.data)
  //     console.log("file",response)
  //   })
  // }
  useEffect(() => {
    if (fileStudent) {
      handleImportFile(props.student.id);
    }
  }, [fileStudent]);

  const handleChangeName = (e) => {
    setFullName(e.target.value);
    if (e.target.value) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const handleChangeRoll = (e) => {
    setRollNumber(e.target.value);
    if (e.target.value) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const handleChangeCode = (e) => {
    setMemberCode(e.target.value);
    if (e.target.value) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeMajor = (e) => {
    setMajorID(e.target.value);
    setDisableBtn(true);
  };
  const handleChangeBatch = (e) => {
    setBatch(e.target.value);
    if (e.target.value) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const handleChangeSemester = (e) => {
    setSemester(e.target.value);
    if (e.target.value) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const handleChangeStatus = (e) => {
    setStudentStatus(e.target.value);
    if (e.target.value) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
    if (e.target.value) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  };
  const handleChangeFile = (e) => {
    setFileStudent(e.target.files[0]);
  };
  const onblurMail = () => {
    if (regexMail.test(email)) {
      setErr(false);
      setDisableBtn(true);
    } else {
      setErr(true);
    }
  };
  const handleChangePhone = (e) => {
    setPhoneNumber(e.target.value);
    if (regexPhone.test(phoneNumber)) {
      setErrPhone(false);
      setDisableBtn(true);
    } else {
      setErrPhone(true);
      setDisableBtn(false);
    }
  };

  const fetchData = async () => {
    await axios.get(`${API_URL}/Major/getAllMajor`).then((response) => {
      setMajors(response.data.responseSuccess.filter((course) => course.status));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const ITEM_HEIGHT = 46;
  const MOBILE_ITEM_HEIGHT = 58;
  const ITEM_PADDING_TOP = 18;
  const MENU_ITEMS = 6;

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={props.show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <DialogTitle id="alert-dialog-title">Detail Student</DialogTitle>
            <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" />
          <DialogContent>
            <Stack direction="column" spacing={3.5}>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <TextField value={fullName} onChange={handleChangeName} required fullWidth label="Full Name" />
                <TextField
                  value={memberCode}
                  onChange={handleChangeCode}
                  required
                  fullWidth
                  label="Member Code"
                  error={!regex.test(memberCode)}
                  helperText={!regex.test(memberCode) && 'Can not input special character'}
                />
              </Stack>

              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <TextField
                  value={email}
                  onChange={handleChangeEmail}
                  onBlur={onblurMail}
                  required
                  fullWidth
                  label="Email"
                  error={Checkerr}
                  helperText={Checkerr && 'Please input email fpt'}
                />
                <TextField
                  value={phoneNumber}
                  onChange={handleChangePhone}
                  required
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                  label="Phone Number"
                  error={CheckerrPhone}
                  helperText={CheckerrPhone && 'Phone number must be 10 digits only'}
                />
              </Stack>
              <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                <TextField
                  autoComplete="off"
                  sx={{ width: '50%' }}
                  name="description"
                  label="Roll Number"
                  value={rollNumber}
                  onChange={handleChangeRoll}
                  error={!regex.test(rollNumber)}
                  helperText={!regex.test(rollNumber) && 'Can not input special character'}
                  inputProps={{ maxLength: 9 }}
                />

                <Stack>
                  <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      Old roll number
                    </Typography>
                    <Typography>{props.student.oldRollNumber}</Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Major</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={majorID}
                    label="Major"
                    onChange={handleChangeMajor}
                    defaultValue={props.student.majorId}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: {
                            xs: MOBILE_ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                            sm: ITEM_HEIGHT * MENU_ITEMS + ITEM_PADDING_TOP,
                          },
                        },
                      },
                    }}
                  >
                    {majors.map((major, index) => (
                      <MenuItem key={index} value={major.id}>
                        {major.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  value={batch}
                  type="number"
                  onChange={handleChangeBatch}
                  required
                  fullWidth
                  label="Batch"
                  error={!regex.test(batch)}
                  helperText={!regex.test(batch) && 'Can not input special character'}
                />
              </Stack>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <TextField
                  value={semester}
                  onChange={handleChangeSemester}
                  required
                  fullWidth
                  label="Semester"
                  error={!regex.test(semester)}
                  helperText={!regex.test(semester) && 'Can not input special character'}
                />
                {/* <TextField
                  value={studentStatus}
                  onChange={handleChangeStatus}
                  required
                  fullWidth
                  label="Student status"
                /> */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Student Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={studentStatus}
                    label="Student Status"
                    defaultValue={props.student.studentStatus}
                    onChange={handleChangeStatus}
                  >
                    <MenuItem value="HD">Active</MenuItem>
                    <MenuItem value="KHD">Deactive</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <TextField
                value={address}
                multiline
                onChange={handleChangeAddress}
                required
                fullWidth
                label="Address"
                inputProps={{ maxLength: 200 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ position: 'absolute', right: 10, bottom: 25 }}>
                      {address?.length}/200
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Divider style={{ marginTop: 20 }} variant="middle" />
            {/* {props.student.gradingUrl && <Link href={props.student.gradingUrl}>Grading file</Link>} */}
            <DialogTitle>File Student's Mark</DialogTitle>

            {props?.student?.gradingUrl ? (
              <ListItem disableGutters divider>
                <Link href={listFile?.gradingUrl}>
                  {' '}
                  <Button color="warning" variant="contained" startIcon={<FileDownloadOutlinedIcon />}>
                    Download File
                  </Button>
                </Link>

                <Tooltip title="Delete File">
                  <IconButton onClick={() => setShowConfirmDelete(true)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ) : (
              <>
                <Button color="secondary" variant="contained" component="label" startIcon={<FileUploadOutlinedIcon />}>
                  Update File
                  <input
                    onChange={(e) => setFileStudent(e.target.files[0])}
                    id="input"
                    accept=".pdf"
                    hidden
                    type="file"
                  />
                </Button>
                <p style={{ marginTop: 10, color: 'red' }}>(Just accept file with size under 20MB)</p>
              </>
            )}
          </DialogContent>
          <DialogActions style={{ padding: 20 }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              {disableBtn &&
              !CheckerrPhone &&
              regex.test(rollNumber) &&
              regex.test(memberCode) &&
              regex.test(batch) &&
              regex.test(semester) ? (
                <Button variant="contained" onClick={() => setShowConfirm(true)} autoFocus>
                  Save
                </Button>
              ) : (
                <Button variant="contained" disabled autoFocus>
                  Save
                </Button>
              )}
            </Stack>

            {/* {fullName &&
            rollNumber &&
            memberCode &&
            majorName &&
            batch &&
            semester &&
            studentStatus &&
            email &&
            phoneNumber &&
            address ? (
              <Button variant="contained" onClick={() => handleUpdateStudent()} autoFocus>
                Update Student
              </Button>
            ) : (
              <Button disabled variant="contained" onClick={() => handleUpdateStudent()} autoFocus>
                Update Student
              </Button>
            )} */}
          </DialogActions>
        </form>
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
            <Button variant="contained" onClick={() => handleUpdateStudent()} autoFocus>
              Accept
            </Button>
          </DialogActions>

          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={message} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>
        <Dialog
          open={showConfirmDelete}
          onClose={handleCloseConfirmDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Update Student</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">You Want To Delete File?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDelete}>Cancel</Button>
            <Button variant="contained" color="error" onClick={() => deleteFile()} autoFocus>
              Delete
            </Button>
          </DialogActions>

          <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={message} />
          <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
        </Dialog>

        <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={message} />
        <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
      </Dialog>
    </div>
  );
}

export default DetailStudent;
