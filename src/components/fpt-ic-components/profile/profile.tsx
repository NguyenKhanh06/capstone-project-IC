import { Box, Button, Container, Grow, Typography } from '@mui/material';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from 'src/config/apiUrl/apis-url';
import BaseBreadCrumbs from '../breadscrumbs/breadcrumbs';
import RightTitle from './right-title';

const ProfileComponent = () => {
  const navigate = useNavigate();
  const student = JSON.parse(sessionStorage.getItem('student'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [infors, setInfors] = useState(null);
  const [grading, setGrading] = useState(null);
  const getRegisInfor = async () => {
    axios.get(`${API_URL}/registration/getDetailbyStudentId/${user.id}`).then((response) => {
      setInfors(response.data.responseSuccess);
    });
  };
  const getGrading = async () => {
    axios.get(`${API_URL}/student/GetGradingStudentId/${user.id}`).then((response) => {
      setGrading(response.data.responseSuccess);
    });
  };
  useEffect(() => {
    getRegisInfor();
    getGrading();
  }, []);

  console.log(user);
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Container
        sx={{
          height: '100%',
          width: { lg: '70%', sm: '90%', xs: '90%' },
          paddingTop: '6%',
        }}
      >
        <BaseBreadCrumbs previousLink={[{ href: 'home', name: 'Homepage' }]} currentLink={'Profile'} />
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
            <Typography variant="h3" style={{ margin: '10px 0 0 0' }}>
              {user?.fullName}
            </Typography>
            <Typography style={{ margin: '0' }}>{user?.email}</Typography>
            <Box
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
            </Box>
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
            <Typography
              sx={{
                fontWeight: 'fontWeightRegular',
              }}
            >
              <Typography>{user?.fullName}</Typography>
            </Typography>

            <RightTitle NameText={'Roll number'} />
            <Box
              sx={{
                fontWeight: 'fontWeightRegular',
              }}
            >
              <Typography>{user?.rollNumber}</Typography>
            </Box>
            <RightTitle NameText={'Main major'} />
            <Box
              sx={{
                fontWeight: 'fontWeightRegular',
              }}
            >
              <Typography>{user?.majorName}</Typography>
            </Box>
            <RightTitle NameText={'Batch'} />
            <Box
              sx={{
                fontWeight: 'fontWeightRegular',
              }}
            >
              <Typography>{user?.batch}</Typography>
            </Box>
            <RightTitle NameText={'Phone Number'} />
            <Box
              sx={{
                fontWeight: 'fontWeightRegular',
              }}
            >
              <Typography>{user?.phoneNumber}</Typography>
            </Box>
            <RightTitle NameText={'Address'} />
            <Box
              sx={{
                fontWeight: 'fontWeightRegular',
              }}
            >
              <Typography>{user?.address}</Typography>
            </Box>
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
              <Link key={index} to="/landingpage/register-information" state={infor}>
                <RightTitle NameText={infor?.project?.projectName} />
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
            Your files
          </Typography>
          {grading &&
            grading.map((grad, index) => (
              <Button variant="text" key={index} href={grad.gradingUrl}>
                <RightTitle NameText={grad.fileName} />
              </Button>
            ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ProfileComponent;
