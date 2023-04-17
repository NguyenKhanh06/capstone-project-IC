import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import BaseBreadCrumbs from '../breadscrumbs/breadcrumbs';
import RightTitle from './right-title';

const ProfileComponent = () => {
  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <Container
        sx={{
          height: '100%',
          width: { lg: '70%', sm: '90%', xs: '90%' },
          paddingTop: '5%',
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
              height: '300px',
              borderRadius: '30px',
              backgroundColor: '#fff',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: '10px',
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
              <img
                src={'/images/mentors/jonas-kakaroto-KIPqvvTOC1s-unsplash.jpg'}
                style={{ objectFit: 'cover' }}
                width={200}
                height={200}
                alt="alt"
              ></img>
            </Box>
            <Typography variant="h3" style={{ margin: '10px 0 0 0' }}>
              NGUYEN CONG KHANH
            </Typography>
            <Typography style={{ margin: '0' }}>khanhncse130305@fpt.edu.vn</Typography>
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
              height: { lg: '500px', sm: '500px', xs: 'auto' },
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
              <Typography>NGUYEN CONG KHANH</Typography>
            </Typography>

            <RightTitle NameText={'Roll number'} />
            <Box
              sx={{
                fontWeight: 'fontWeightRegular',
              }}
            >
              <Typography>SE130305</Typography>
            </Box>
            <RightTitle NameText={'Main major'} />
            <Box
              sx={{
                fontWeight: 'fontWeightRegular',
              }}
            >
              <Typography>Digital Art & Design</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfileComponent;
