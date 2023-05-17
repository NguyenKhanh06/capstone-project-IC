import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grow,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from 'src/config/apiUrl/apis-url';
import BaseBreadCrumbs from '../breadscrumbs/breadcrumbs';
import RightTitle from './right-title';
import CloseIcon from '@mui/icons-material/Close';
const ProfileComponent = () => {
  const navigate = useNavigate();
  const regexPhone = /(0[3|5|7|8|9])+([0-9]{7})\b/g;

  const student = JSON.parse(sessionStorage.getItem('student'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [CheckerrPhone, setErrPhone] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const [infors, setInfors] = useState(null);
  const [grading, setGrading] = useState(null);
  const [edit, setEdit] = useState(false);
  const [fullName, setFullName] = useState('');
  const [rollNumber, setRoll] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [batch, setBatch] = useState('');
  const [address, setAddress] = useState('');
  const [major, setMajor] = useState(null);
  const [majors, setMajors] = useState(null);
  const [show, setShow] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [studentDetail, setStudentDetail] = useState(null);
  const getRegisInfor = async () => {
    axios.get(`${API_URL}/registration/getDetailbyStudentId/${user.id}`).then((response) => {
      setInfors(response.data.responseSuccess);
    });
  };
  // const getGrading = async () => {
  //   axios.get(`${API_URL}/student/GetGradingStudentId/${user.id}`).then((response) => {
  //     setGrading(response.data.responseSuccess);
  //   });
  // };
  const getAllMajor = async () => {
    await axios.get(`${API_URL}/Major/getAllMajor`).then((response) => {
      setMajors(response.data.responseSuccess);
    });
  };

  useEffect(() => {
    getRegisInfor();
    setFullName(user?.fullName);
    setRoll(user?.rollNumber);
    setMajor(user?.majorId);
    setPhone(user?.phoneNumber);
    setAddress(user?.address);
    setBatch(user?.batch);
    getAllMajor();
  }, []);
  const getDetailStudent = () => {
    axios.get(`${API_URL}/student/getStudentDetail/${user.id}`).then((response) => {
      sessionStorage.setItem('user', JSON.stringify(response.data.responseSuccess[0]));
    });
  };
  const handleUpdateStudent = () => {
    const data = {
      memberCode: user?.memberCode,
      oldRollNumber: user?.oldRollNumber,
      batch: batch,
      semeter: user?.semeter,
      upStatus: user?.studentStatus,
      address: address,
      rollNumber: rollNumber,
      fullName: fullName,
      majorId: major,
      email: user?.email,
      phoneNumber: phoneNumber,

      status: true,
    };
    axios
      .put(`${API_URL}/student/update/${user.id}`, data)
      .then((response) => {
      
        if (response.data.isSuccess) {
          setShow(true);
          getDetailStudent();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        setShowErr(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  };

  const ITEM_HEIGHT = 46;
  const MOBILE_ITEM_HEIGHT = 58;
  const ITEM_PADDING_TOP = 18;
  const MENU_ITEMS = 5;
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
    if (regexPhone.test(phoneNumber)) {
      setErrPhone(false);
      setDisableBtn(true);
    } else {
      setErrPhone(true);
      setDisableBtn(false);
    }
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Container
        sx={{
          marginTop: 10,
          height: '100%',
          width: { lg: '70%', sm: '90%', xs: '90%' },
          paddingTop: '6%',
        }}
      >
        {/* <BaseBreadCrumbs previousLink={[{ href: '/home', name: 'Homepage' }]} currentLink={'Profile'} /> */}
        {user ? (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { lg: 'row', sm: 'row', xs: 'column' },
                justifyContent: 'center',
                gap: '50px',
              }}
            >
              <Box
                sx={{
                  width: { lg: '350px', sm: '100%', xs: '100%' },
                  height: '100%',
                  borderRadius: '30px',
                  backgroundColor: '#fff',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  paddingBottom: '10px',
                  paddingTop: '10px',
                }}
              >
                <Box
                  sx={{
                    borderRadius: '50%',
                    width: '170px',
                    height: '170px',
                    overflow: 'hidden',
                  }}
                >
                  <img src={student?.picture} style={{ objectFit: 'cover' }} width={200} height={200} alt="alt"></img>
                </Box>
                <Typography variant="h6" style={{ margin: '10px 0 0 0' }}>
                  {user?.fullName}
                </Typography>
                <Typography style={{ margin: '0' }}>{user?.email}</Typography>
                {!edit ? (
                  <Button
                    onClick={() => setEdit(true)}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '5px',
                      cursor: 'pointer',
                      fontWeight: 'fontWeightRegular',
                      marginTop: '10px',
                      color: 'text.secondary',
                    }}
                  >
                    <Typography>Edit</Typography>
                    <img src={'/images/edit.svg'} width={15} height={15} alt="alt" />
                  </Button>
                ) : (
                  <Button
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '5px',
                      cursor: 'pointer',
                      fontWeight: 'fontWeightRegular',
                      marginTop: '10px',
                      color: 'text.secondary',
                    }}
                    onClick={() => setEdit(false)}
                  >
                    Cancel edit
                  </Button>
                )}
              </Box>
              <Box
                sx={{
                  width: { lg: '35%', sm: '100%', xs: '100%' },

                  borderRadius: '30px',
                  backgroundColor: '#fff',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '20px 0 20px 60px',
                }}
              >
                {/* left content */}
                <RightTitle NameText={'Full name'} />

                {!edit ? (
                  <Typography
                    sx={{
                      fontWeight: 'fontWeightRegular',
                    }}
                  >
                    <Typography>{user?.fullName}</Typography>
                  </Typography>
                ) : (
                  <TextField
                    size="small"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{ width: '80%' }}
                  />
                )}

                <RightTitle NameText={'Roll number'} />
                <Box
                  sx={{
                    fontWeight: 'fontWeightRegular',
                  }}
                >
                  {!edit ? (
                    <Typography>{user?.rollNumber}</Typography>
                  ) : (
                    <TextField
                      size="small"
                      onChange={(e) => setRoll(e.target.value)}
                      value={rollNumber}
                      style={{ width: '80%' }}
                    />
                  )}
                </Box>
                <RightTitle NameText={'Main major'} />
                <Box
                  sx={{
                    fontWeight: 'fontWeightRegular',
                  }}
                >
                  {!edit ? (
                    <Typography>{user?.majorName}</Typography>
                  ) : (
                    <FormControl style={{ width: '80%' }} size="small">
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={major}
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
                        onChange={(e) => {
                          setMajor(e.target.value);
                        }}
                      >
                        {majors.map((majorUpdate, index) => (
                          <MenuItem key={index} value={majorUpdate.id}>
                            {majorUpdate.majorFullName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Box>
                <RightTitle NameText={'Batch'} />
                <Box
                  sx={{
                    fontWeight: 'fontWeightRegular',
                  }}
                >
                  {!edit ? (
                    <Typography>{user?.batch}</Typography>
                  ) : (
                    <TextField
                      size="small"
                      onChange={(e) => setBatch(e.target.value)}
                      value={batch}
                      type='number'
                      style={{ width: '80%' }}
                    />
                  )}
                </Box>
                <RightTitle NameText={'Phone Number'} />
                <Box
                  sx={{
                    fontWeight: 'fontWeightRegular',
                  }}
                >
                  {!edit ? (
                    <Typography>{user?.phoneNumber}</Typography>
                  ) : (
                    <TextField
                      size="small"
                      onChange={handleChangePhone}
                      value={phoneNumber}
                      style={{ width: '80%' }}
                      inputProps={{ maxLength: 10 }}
             type='number'
                    error={CheckerrPhone}
                    helperText={CheckerrPhone && 'Invalid phone number, please check again!'}
                    />
                  )}
                </Box>
                <RightTitle NameText={'Address'} />
                <Box
                  sx={{
                    fontWeight: 'fontWeightRegular',
                  }}
                >
                  {!edit ? (
                    <Typography>{user?.address}</Typography>
                  ) : (
                    <TextField
                      size="small"
                      
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      style={{ width: '80%' }}
                    />
                  )}
                </Box>
                {edit && (
                  <Button
                  disabled={CheckerrPhone}
                    onClick={() => handleUpdateStudent()}
                    size="small"
                    style={{ margin: '20px auto  10px 50px' }}
                    variant="contained"
                  >
                    Update profile
                  </Button>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                width: { lg: '100%', sm: '100%', xs: '100%' },

                borderRadius: '30px',
                backgroundColor: '#fff',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px 0 20px 60px',
                margin: '20px 0 0 20px',
              }}
            >
              <Typography variant="h3" style={{ margin: '10px 0 0 0' }}>
                Register Information
              </Typography>
              {infors &&
                infors.map((infor, index) => (
                  <Link key={index} to="/register-information" state={infor}>
                    <RightTitle NameText={infor?.title} />
                  </Link>
                ))}
            </Box>
            <Box
              sx={{
                width: { lg: '100%', sm: '100%', xs: '100%' },

                borderRadius: '30px',
                backgroundColor: '#fff',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: '20px 0 20px 60px',
                margin: '20px 0px 40px 20px',
              }}
            >
              <Typography variant="h3" style={{ margin: '10px 0 0 0' }}>
                Your files mark
              </Typography>
              {user?.gradingUrl && (
                <Button variant="text" href={user?.gradingUrl}>
                  <RightTitle NameText="File mark" />
                </Button>
              )}
            </Box>
          </>
        ) : (
          <Typography style={{ marginTop: '5%' }} variant="h6">
            Please <Link to={'/login'}>Login</Link> before view profile
          </Typography>
        )}
      </Container>
      <Snackbar
        open={show}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShow(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          variant="filled"
          severity="success"
          sx={{ width: '100%' }}
        >
          {'Update Profile Successful!!'}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showErr}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowErr(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          variant="filled"
          severity="error"
          sx={{ width: '100%' }}
        >
          {'Update Profile Fail!!'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileComponent;
