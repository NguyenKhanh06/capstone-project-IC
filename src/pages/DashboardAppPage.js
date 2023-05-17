// @mui

import { Container, Typography } from '@mui/material';
// components

// sections
import { PieChart, Pie, Tooltip, BarChart, XAxis, YAxis, Legend, CartesianGrid, Bar } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Header/Chart';
import { API_URL } from '../config/apiUrl/apis-url';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
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

  // const [projects, setProjects] = useState([]);
  // const fetchData = async () => {

  //   await axios.get(`${API_URL}/project/getAllProject`).then((response) => {

  //     setProjects(response.data.responseSuccess);
  //    console.log(response.data.responseSuccess)
  //   });
  // };

  // useEffect(() => {
  //   fetchData().catch((error) => {

  //   });
  // }, []);
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome {user.fullName}
        </Typography>
        <img
          src="https://tuanfpt.blob.core.windows.net/folder-excel/loogo-PhotoRoom.png-PhotoRoom.png"
          alt="login"
          style={{ width: '50%', height: '80%', margin: 'auto' }}
        />
        {/* <div style={{ textAlign: "center" }}>
      <h1>Socail Media Users</h1>
      <div >
        <PieChart width={400} height={400}>
          <Pie
            dataKey='programId'
            isAnimationActive={false}
            data={projects}
   
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>

      </div>
    </div> */}
      </Container>
    </>
  );
}
