import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface props {
  NameText?: String | null;
}
const RightTitle = ({ NameText }: props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        color: 'primary.light',
        fontWeight: 'fontWeightMedium',
        position: 'relative',
        marginTop: '10px',
      }}
    >
      <div
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: '#F27024',
          position: 'absolute',
          left: '-20px',
        }}
      ></div>
      <Typography>{NameText}</Typography>
    </Box>
  );
};

export default RightTitle;
