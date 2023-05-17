import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { number } from 'prop-types';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React, { useEffect, useState } from 'react';
import Loading from '../../Loading';
import ErrorAlert from '../../Alert/ErrorAlert';
import SuccessAlert from '../../Alert/SuccessAlert';
import { API_URL } from '../../../config/apiUrl/apis-url';

function CreateStudent(props) {
  const regexMail = /^[a-zA-Z0-9._%+-]+@fpt\.edu\.vn$/i;
  const regex = /^[\w\s]*$/
  const regexPhone = /(0[3|5|7|8|9])+([0-9]{7})\b/g;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [oldRollNumber, setOldRoll] = useState('');
  const [memberCode, setMemberCode] = useState('');
  const [majorName, setMajorName] = useState('');
  const [batch, setBatch] = useState('');
  const [semester, setSemester] = useState('');
  const [studentStatus, setStudentStatus] = useState(null);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [Checkerr, setErr] = useState(false);
  const [CheckerrPhone, setErrPhone] = useState(false);
  const [majors, setMajors] = useState([]);

  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setOpen(props.close);
  };

  const handleError = (data) => {
    setMessage(data);
    setShowError(true);
  };

  function reload() {
    window.location.reload(false);
  }

  const handleCreateStudent = () => {
    const formData = new FormData();
    formData.append('rollNumber', rollNumber);
    formData.append('memberCode', memberCode);
    formData.append('fullName', fullName);
    formData.append('oldRollNumber', rollNumber);
    formData.append('majorId', majorName?.id);
    formData.append('majorName', majorName?.name);
    formData.append('batch', batch);
    formData.append('upStatus', studentStatus);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('semeter', semester);
    formData.append('address', address);
    formData.append('status', true);

    axios({
      method: 'POST',
      data: formData,
      url: `${API_URL}/student/create`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.data.isSuccess) {
          setShowSuccess(true);
          setLoading(false);
          setTimeout(reload(), 5000);
        }
      })
      .catch((err) => {
        handleError('Please check email or phone number!!!');
        setLoading(false);
      });
  };
  // const data = {
  //   "rollNumber": rollNumber,
  //   "memberCode": memberCode,
  //   "fullName": fullName,
  //  "oldRollNumber": rollNumber,
  //   "majorName": majorName,
  //   "batch": batch,
  //   "period": semester,
  //   "upStatus": studentStatus,
  //   "email": email,
  //  "phoneNumber": phoneNumber,
  //   "address": address,
  //   "status": true,
  // };
  // const handleCreateStudent = () => {
  //   axios.post(`${API_URL}/student/create`, data).then((response) => {
  //     if (response.data.isSuccess) {
  //       setShowSuccess(true);
  //       setTimeout(reload(), 2000);
  //     } else {
  //       handleError(response.statusText);
  //     }
  //   });
  // };
 
  const onblurMail = () => {
    if (regexMail.test(email)) {
      setErr(false);
    } else {
      setErr(true);
    }
  };
  const onblurPhone = (e) => {
    setPhoneNumber(e.target.value)
    if (regexPhone.test(phoneNumber)) {
      setErrPhone(false);
    } else {
      setErrPhone(true);
    }
  };
  const fetchData = async () => {
    await axios.get(`${API_URL}/Major/getAllMajor`).then((response) => {
     
      setMajors(response.data.responseSuccess.filter((course) => course.status));
    });
  };

  
  useEffect(() => {
    fetchData()
  }, []);
  const ITEM_HEIGHT = 46;
  const MOBILE_ITEM_HEIGHT = 58;
  const ITEM_PADDING_TOP = 18;
  const MENU_ITEMS = 6;
  return (
    <div>
      {loading ? (
        <Dialog fullWidth maxWidth="md" open={props.show} onClose={handleClose} aria-labelledby="alert-dialog-title">
          <form onSubmit={handleCreateStudent}>
            <DialogContent>
              <Loading />
            </DialogContent>
          </form>
        </Dialog>
      ) : (
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
              <DialogTitle id="alert-dialog-title">Create Student</DialogTitle>
              <IconButton style={{ marginRight: 6 }} onClick={() => handleClose()}>
                <CloseOutlinedIcon />
              </IconButton>
            </Stack>
            <Divider variant="middle" />
            <DialogContent>
              <Stack direction="column" spacing={3.5}>
                <TextField
                  value={fullName}
                  onChange={(e) => {setFullName(e.target.value)}}
                  required
                  fullWidth
                  label="Full Name"
                />
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <TextField
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                  
                    }}
                    onBlur={onblurMail}
                    required
                    fullWidth
                    label="Email"
                    error={Checkerr}
                    helperText={Checkerr && 'Please input email fpt'}
                  />
                  <TextField
                    value={phoneNumber}
                    onChange={onblurPhone}
                    required
                    fullWidth
                 

                    inputProps={{ maxLength: 10 }}
                    label="Phone Number"
                    error={CheckerrPhone}
                    helperText={CheckerrPhone && 'Phone number must be 10 digits only'}
                  />
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <TextField
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    required
                    fullWidth
                    type={number}
                    label="Roll Number"
                    error={ !regex.test(rollNumber)}
                  helperText={!regex.test(rollNumber) && "Can not input special character"}
                  />
                  <TextField
                    value={memberCode}
                    onChange={(e) => setMemberCode(e.target.value)}
                    required
                    fullWidth
                    label="Member Code"
                   
                    error={ !regex.test(memberCode)}
                    helperText={!regex.test(memberCode) && "Can not input special character"}
                  />
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Major</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={majorName?.name}
                      label="Major"
                      onChange={(e) => setMajorName(e.target.value)}
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
                      {majors.map((major, index) => (
 <MenuItem value={major}>{major.name}</MenuItem>
                      ))}
                   
                    </Select>
                  </FormControl>
                  {/* <TextField
                    value={majorName}
                  
                    required
                    fullWidth
                    label="Major"
                    error={ !regex.test(majorName)}
                    helperText={!regex.test(majorName) && "Can not input special character"}
                  /> */}
                  <TextField
                    value={batch}
                    type="number"
                    onChange={(e) => setBatch(e.target.value)}
                    required
                    fullWidth
                    label="Batch"
                   
                  
                    error={ !regex.test(batch)}
                    helperText={!regex.test(batch) && "Can not input special character"}
                  />
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                  <TextField
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    required
                    fullWidth
                    label="Semester"
                    error={ !regex.test(semester)}
                    helperText={!regex.test(semester) && "Can not input special character"}
                  />
                  {/* <TextField
                    value={studentStatus}
                    onChange={(e) => setStudentStatus(e.target.value)}
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
                      onChange={(e) => setStudentStatus(e.target.value)}
                    >
                      <MenuItem value="HD">Active</MenuItem>
                      <MenuItem value="KHD">Deactive</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <TextField
                  value={address}
                  multiline
                  onChange={(e) => setAddress(e.target.value)}
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
            </DialogContent>
            <DialogActions style={{ padding: 20 }}>
              {
             fullName.trim().length &&
              rollNumber.trim().length &&
              regex.test(rollNumber) && 
              memberCode.trim().length &&
              regex.test(memberCode) &&
              majorName &&
             
              batch.trim().length &&
              regex.test(batch) &&
              semester.trim().length &&
              regex.test(semester) &&
              studentStatus &&
              email.trim().length &&
          
              phoneNumber.trim().length &&
    
              address.trim().length &&
         
              !Checkerr && !CheckerrPhone ? (
                
                <Button variant="contained" onClick={() => handleCreateStudent()} autoFocus>
                  Create Student
                </Button>
              ) : (
                <Button disabled variant="contained" onClick={() => handleCreateStudent()} autoFocus>
                  Create Student
                </Button>
              )}
            </DialogActions>
          </form>
        </Dialog>
      )}
      <SuccessAlert show={showSuccess} close={() => setShowSuccess(false)} message={'Create Student Successful!'} />
      <ErrorAlert show={showError} close={() => setShowError(false)} message={message} />
    </div>
  );
}

export default CreateStudent;
