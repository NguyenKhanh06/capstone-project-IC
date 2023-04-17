import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Footer: FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.dark',
        color: 'primary.contrastText',
        padding: '10px 5%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <img src="/images/Logo_Đại_học_FPT.png" width={100} height={50} alt="Testimonial img" />

        <p style={{ fontSize: '12px' }}>Copyright @ 2023 International Collaboration</p>
      </Box>
    </Box>
  );
};

export default Footer;
