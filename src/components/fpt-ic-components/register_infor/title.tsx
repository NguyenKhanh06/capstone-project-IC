import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

interface Props {
  number: string;
  title: string;
}
function Title({ number, title }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '5px',
        color: 'primary.main',
        marginTop: '20px',
      }}
    >
      <Typography style={{ fontWeight: '500', fontSize: '20px' }}>{number}.</Typography>
      <Typography style={{ fontWeight: '500', fontSize: '20px' }}>{title} :</Typography>
    </Box>
  );
}

export default Title;
