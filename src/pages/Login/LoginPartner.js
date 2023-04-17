import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../components/iconify/Iconify';

const LoginPartner = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
  
    const handleClick = () => {
      navigate('/dashboard', { replace: true });
    };
  
    return (
       <>
           <Stack spacing={3}>
          <TextField required name="email" placeholder="Email address *" />
  
          <TextField
  
          required
            name="password"
            placeholder="Password *"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
  
     
  
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} style={{marginTop: 20}}>
          Login
        </LoadingButton>
       </>
    );
};

export default LoginPartner;