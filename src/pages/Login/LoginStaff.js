import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

// @mui
import { Stack, IconButton, InputAdornment, TextField, Button, Divider, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

import { Formik } from 'formik';
import Iconify from '../../components/iconify/Iconify';
import ErrorAlert from '../Alert/ErrorAlert';
import SuccessAlert from '../Alert/SuccessAlert';
import { API_URL } from '../../config/apiUrl/apis-url';

const LoginStaff = () => {
  const regexMail = /^[a-zA-Z0-9._%+-]+@fpt\.edu\.vn$/i;
  const regexMailFu = /[\w.-]+fptu@gmail\.com$/;
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [idAcc, setidAcc] = useState(null)
  const [showPassword, setShowPassword] = useState(false);
  const [showAl, setShowAl] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [deputies, setDeputies] = useState([]);
  const { state } = useLocation();
  const handleErr = (message) => {
    setShowAl(true);
    setMessage(message);
  };
  const handleSuccess = (message) => {
    setShow(true);
    setMessage(message);
  };
  const handleClick = () => {
    navigate('/header', { replace: true });
  };

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {

    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  // const getdetailStaff = (id) => {
  //   axios.get(`${API_URL}/staff/getStaffAccountId/${id}`).then((response) => {
  //     sessionStorage.setItem('staff', JSON.stringify(response.data.responseSuccess));

  //   });
  // };




  const getdetailStudent = (id) => {
    axios.get(`${API_URL}/student/getStudentDetail/${id}`).then((response) => {
      sessionStorage.setItem('user', JSON.stringify(response.data.responseSuccess[0]));
    });
  };
  const firebaseConfig = {
    apiKey: 'AIzaSyBzzMrusEf99NJzihK0LjYd5RAGMD75MDI',
    authDomain: 'capstoneic.firebaseapp.com',
    projectId: 'capstoneic',
    storageBucket: 'capstoneic.appspot.com',
    messagingSenderId: '270582436509',
    appId: '1:270582436509:web:3ee395eb0098ef9ba47a74',
    measurementId: 'G-HEEQ3XWDNC',
  };

  function requestPermission() {

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {

        const app = initializeApp(firebaseConfig);

        const messaging = getMessaging(app);
        getToken(messaging, {
          vapidKey: 'BJK48eQ8rOBKK2_nX_1qNjwwF-bVV-mnx24sEtEhcxXnil91TwxgWG8K_VxH5xnwVf9NgGJHpyi0omG3th_L_xI',
        }).then((currentToken) => {
          if (currentToken) {
            localStorage.setItem('tokenfcm',currentToken);

          
          } else {
            console.log('Can not get token');
          }
        });
      } else {
        console.log('Do not have permission!');
      }
    });
  }
  const getDeputy = (id) => {
    axios.get(`${API_URL}/deputy/getAll`).then((response) => {
      sessionStorage.setItem(
        'deputy',
        JSON.stringify(response.data.responseSuccess.filter((dep) => dep.accountId === id)[0])
      );
   
    });
  };
  return (
    <>
      <Stack spacing={3}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Please input your email!';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Please input your password!';
            } 
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              //  alert(JSON.stringify(values, null, 2));

              const formData = new FormData();
              formData.append('Email', values.email);
              formData.append('Password', values.password);
             
              axios({
                method: 'POST',
                data: formData,
                url: `${API_URL}/authen/login`,
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
          
                .then((response) => {
                 setidAcc(response.data.responseSuccess.id)

                  localStorage.setItem('token', response.data.responseSuccess.accountToken);
                  if (
                    response.data.responseSuccess.role === 2 &&
                    response.data.responseSuccess.staff.isHeadOfDepartMent&& response.data.responseSuccess.status
                  ) {
         
                
                    requestPermission();
              
                    sessionStorage.setItem('user', JSON.stringify(response.data.responseSuccess));
                    navigate('/header');
                  } else if (
                    response.data.responseSuccess.role === 2 &&
                    !response.data.responseSuccess.staff.isHeadOfDepartMent
                    && response.data.responseSuccess.status
                  ) {
                    sessionStorage.setItem('user', JSON.stringify(response.data.responseSuccess));
                   
                    navigate('/staff');
                    requestPermission();
                  } else if (
                    response.data.responseSuccess.role === 3&& response.data.responseSuccess.status
                  ) {
                    sessionStorage.setItem('user', JSON.stringify(response.data.responseSuccess));
                   
                 
                    navigate('/staff');
                    requestPermission();
                  }else if (response.data.responseSuccess.role === 4 && response.data.responseSuccess.status) {
                    sessionStorage.setItem('user', JSON.stringify(response.data.responseSuccess));
                  
                    getDeputy(response.data.responseSuccess.id);
                    navigate('/partner');

                    requestPermission();
                  } else if (response.data.responseSuccess.role === 4 && !response.data.responseSuccess.status) {
                    handleErr('Your account can not login!!!!');
                  } else if (response.data.responseSuccess.role === 1) {
                    sessionStorage.setItem('user', JSON.stringify(response.data.responseSuccess));
                    navigate('/admin');
                    requestPermission();
                  } else if (response.data.responseSuccess.role === 0) {
                    handleSuccess('You are not a staff member who needs to wait for admin set role!!');
                  }else if ( !response.data.responseSuccess.status) {
                    handleErr('Your account can not login!!!!');
                  }
                })
                .catch((err) => {
                 
                  handleErr('Wrong email or password!');
                });
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                type="email"
                name="email"
                fullWidth
  
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Email address *"
              />
                <Typography color={'red'} fontSize="14px">
                {errors.email && touched.email && errors.email}

                </Typography>

              <TextField
                name="password"
                fullWidth
                sx={{marginTop: 3}}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password *"
                type={showPassword ? 'text' : 'password'}
                
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
                              <Typography color={'red'} fontSize="14px">
                              {errors.password && touched.password && errors.password}

                              </Typography>
              <Button
                fullWidth
                size="large"
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                style={{ marginTop: 20 }}
              >
                Login
              </Button>
            </form>
          )}
        </Formik>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
      <Box sx={{ margin: '20px auto' }}>
        <GoogleLogin
          size="large"
          width="100px"
          theme="outline"
          text="signin_with"
          onSuccess={(credentialResponse) => {
            const decoded = jwt_decode(credentialResponse.credential);
            sessionStorage.setItem('student', JSON.stringify(decoded));
            if (regexMailFu.test(decoded.email)) {
              axios
                .post(`${API_URL}/authen/signin-google/${credentialResponse.credential}`)
                .then((response) => {
   
                  localStorage.setItem('token', response.data.responseSuccess.accountToken);
                  if (
                    response.data.responseSuccess.role === 2 &&
                    response.data.responseSuccess.staff.isHeadOfDepartMent&& response.data.responseSuccess.status
                  ) {
                    sessionStorage.setItem('user', JSON.stringify(response.data.responseSuccess));
                    setidAcc(response.data.responseSuccess.id)

                    navigate('/header');

                    requestPermission();
                  } else if (
                    response.data.responseSuccess.role === 2 &&
                    !response.data.responseSuccess.staff.isHeadOfDepartMent&& response.data.responseSuccess.status
                  ) {
                    sessionStorage.setItem('user', JSON.stringify(response.data.responseSuccess));
                    setidAcc(response.data.responseSuccess.id)

                    navigate('/staff');
                    requestPermission();
                  }else if (
                    response.data.responseSuccess.role === 3 && response.data.responseSuccess.status
            
                  ) {
                    sessionStorage.setItem('user', JSON.stringify(response.data.responseSuccess));
                    setidAcc(response.data.responseSuccess.id)

                    navigate('/staff');
                    requestPermission();
                  } else if (response.data.responseSuccess.role === 4) {
                    handleErr('This account is currently inactive.');
                  } else if (response.data.responseSuccess.role === 1) {
                    sessionStorage.setItem('user', JSON.stringify(response.data.responseSuccess));
                    setidAcc(response.data.responseSuccess.id)
                    
                    navigate('/admin');
                    requestPermission();
                  } else if (response.data.responseSuccess.role === 0) {
                    handleSuccess('You do not have access to this page. Contact admin to receive permission');
                  }  else if ( !response.data.responseSuccess.status) {
                    handleErr('This account is currently inactive.');
                  }
                });
            } else if (regexMail.test(decoded.email)) {
              axios
                .post(`${API_URL}/student/signin-google/${credentialResponse.credential}`)
                .then((response) => {
                  localStorage.setItem('token', response.data.responseSuccess.tokenToken);

                  getdetailStudent(response.data.responseSuccess.id);
                  navigate(state?.path || '/');
                });
            } else {
              handleErr('Your email can not login!!');
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </Box>
      <ErrorAlert show={showAl} close={() => setShowAl(false)} message={message} />
      <SuccessAlert show={show} close={() => setShow(false)} message={message} />

      {/* <Button onClick={() => googleLogin()} fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
      </Button> */}
    </>
  );
};

export default LoginStaff;
