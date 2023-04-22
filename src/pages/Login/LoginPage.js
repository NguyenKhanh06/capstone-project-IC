// @mui
import { styled } from '@mui/material/styles';
import {  Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';


import TabLogin from './TabLogin';
import LoginStaff from './LoginStaff';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 680,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: "white",
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 780,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <StyledRoot>
      

        {mdUp && (
          <StyledSection>
            {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
             Welcome To IC Website
            </Typography> */}
            <img src="https://tuanfpt.blob.core.windows.net/folder-excel/loogo.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
          <Typography variant="h4" gutterBottom>
              Sign in to IC website
            </Typography>
          
           
            <LoginStaff />
            <Link style={{position: "relative", top: "20vh", left:"38%"}} to="/">
              <Button>
              Back to homepage

              </Button>
      </Link>

          
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
