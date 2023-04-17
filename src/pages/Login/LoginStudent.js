import { Button } from '@mui/material';
import React from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import Iconify from '../../components/iconify/Iconify';


const LoginStudent = () => {
  const login = useGoogleLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse);
    }
  });
  return (
    <>
      <Button onClick={() => login()} fullWidth size="large" color="inherit" variant="outlined">
        <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
      </Button>
      <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>

    </>
  );
};

export default LoginStudent;
