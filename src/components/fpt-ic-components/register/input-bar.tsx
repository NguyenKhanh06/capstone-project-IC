import { Input, makeStyles, TextField, Typography, Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface Props {
  inputName?: string;
  value: any;
  width?: string | null;
  helperText?: ReactNode;
  placeholderText?: string | null;
  error?: boolean;
  check?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
}

const InputBar = ({ width, inputName, value, helperText, error, placeholderText, check, type, ...props }: Props) => {


  return (
    <Box sx={{ margin: ' 10px 0 0 20px' }}>
      <TextField
        {...props}
        type={type ?? 'text'}
        name={inputName}
        value={value}
        error={error}
        placeholder={placeholderText ?? 'Enter your answer here'}
        variant="standard" // <== changed this
        InputProps={{
          disableUnderline: true, // <== change this
        }}
        inputProps={{
          style: { fontWeight: 'bold !important' },
        }}
        disabled={check}
        sx={{
          backgroundColor: 'background.grey',
          width: width ?? '100%',
          height: '60px',
          borderRadius: '25px',
          fontSize: '25px',
          justifyContent: 'center',
          padding: ' 0 20px',
          fontWeight: 'bold !important',
        }}
      ></TextField>
      <Box height={12}></Box>
      {helperText && error && (
        <Typography color={'red'} fontSize="14px">
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default InputBar;
