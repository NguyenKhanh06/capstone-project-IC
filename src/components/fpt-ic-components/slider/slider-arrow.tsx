import { IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/ArrowForwardIosRounded';
import NavigateBeforeIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import React from 'react';

interface SliderArrowArrow {
  onClick?: () => void;
  type: 'next' | 'prev';
  className?: 'string';
}

export function SliderArrow({ onClick, type }: SliderArrowArrow) {
  return (
    <IconButton
      sx={{
        display: { lg: 'block', sm: 'block', xs: 'none' },
        position: 'absolute',
        bottom: { lg: '30%', sm: '20%', xs: '20%' },
        right: type === 'next' ? '2% !important ' : 'unset !important',
        left: type === 'prev' ? '2% !important ' : 'unset !important',
        zIndex: 10,
      }}
      disableRipple
      color="inherit"
      onClick={onClick}
    >
      {type === 'next' ? <NavigateNextIcon sx={{ fontSize: 50 }} /> : <NavigateBeforeIcon sx={{ fontSize: 50 }} />}
    </IconButton>
  );
}
