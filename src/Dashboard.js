// @mui

import {
    Card,
    Container,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
  } from '@mui/material';
  // components

  import { useEffect, useState } from 'react';
  import axios from 'axios';
 
  import { API_URL } from './config/apiUrl/apis-url';

  // ----------------------------------------------------------------------
  
  export default function Dashboard() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const tokenfcm = localStorage.getItem('tokenfcm');
  
    const UpdateTokenFCM = async () => {
      const formData = new FormData();
      formData.append('accountId', user.id);
      formData.append('token', localStorage.getItem('tokenfcm'));
      await axios({
        method: 'POST',
        data: formData,
        url: `${API_URL}/firebasefcm`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    };
  
    useEffect(() => {
      setTimeout(() => {
        UpdateTokenFCM();
      }, 3500);
    }, [tokenfcm]);
  
  
    return (
      <>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome {user.fullName}
          </Typography>
  
          <img
            src="https://tuanfpt.blob.core.windows.net/folder-excel/loogo-PhotoRoom.png-PhotoRoom.png"
            alt="login"
            style={{ width: '30%', height: '40%', margin: 'auto' }}
          />
          
        </Container>
      </>
    );
  }
  