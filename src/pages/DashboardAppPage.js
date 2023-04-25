

// @mui



import { Container, Typography } from '@mui/material';
// components

// sections

import { useEffect } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------



export default function DashboardAppPage() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const tokenfcm = localStorage.getItem('tokenfcm');


  const UpdateTokenFCM = async () => {
    const formData = new FormData();
    formData.append('accountId', user.id);
    formData.append('token',localStorage.getItem('tokenfcm'));
 await axios({
      method: 'POST',
      data: formData,
      url: 'https://api.ic-fpt.click/api/v1/firebasefcm',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  
      
  }
  
  useEffect(() => {
   
     
     setTimeout(() => {
UpdateTokenFCM()
    }, 3500)
  
    }

  , [tokenfcm]);
  return (
    <>


      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome {user.fullName}
        </Typography>
        <img src="https://tuanfpt.blob.core.windows.net/folder-excel/loogo-PhotoRoom.png-PhotoRoom.png" alt="login" style={{width: "50%", height: "80%", margin: "auto"}}/>
     
      </Container>
    </>
  );
}
