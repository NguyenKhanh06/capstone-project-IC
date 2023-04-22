import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Menu, Close } from '@mui/icons-material';
import { ColorMenuContext } from 'src/context/context';
import { useLocation } from 'react-router-dom';
import { Navigation } from '../navigation';
import LoginAvatar from './login-avatar';

const Header: FC = () => {
  const router = useLocation();
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  const { breakpoints } = useTheme();
  const matchMobileView = useMediaQuery(breakpoints.down('md'));
  return (
    <ColorMenuContext.Consumer>
      {({ colorMenu, setColorMenu }) => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                padding: '10px',
                ml: 'auto',
                display: { xs: 'inline-flex', md: 'none' },
              }}
            >
              {!visibleMenu && (
                <IconButton onClick={() => setVisibleMenu(!visibleMenu)}>
                  <Menu />
                </IconButton>
              )}
            </Box>
            <Box
              sx={{
                position:   'fixed',
                top: '20px',
                zIndex: '1',
                mb: router.pathname === '/register' ? '20px' : null,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: 'fit-content',
                  display: 'flex',
                  backgroundColor: colorMenu === 'primary' ? 'primary.light' : 'primary.dark',
                  padding: '5px 30px',
                  borderRadius: '25px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '40px',
                  flexDirection: { xs: 'column', md: 'row' },
                  transition: (theme) => theme.transitions.create(['top']),
                  ...(matchMobileView && {
                    py: 6,
                    borderRadius: '0px',
                    backgroundColor: 'primary.dark',
                    zIndex: 'appBar',
                    position: 'relative',
                    height: { xs: '100vh', md: 'auto' },
                    top: visibleMenu ? 0 : '-120vh',
                    left: 0,
                  }),
                }}
              >
                {/* <Logo /> */}
<img src='https://tuanfpt.blob.core.windows.net/folder-excel/loogo-PhotoRoom.png-PhotoRoom.png' alt='logo' style={{width: 100, height: 100, borderRadius: "50%", position: 'absolute', left: -150, zIndex: 999}}/>
                <Navigation onClick={() => setColorMenu('primary')} />
                {/* <AuthNavigation /> */}
                {visibleMenu && matchMobileView && (
                  <IconButton
                    sx={{
                      position: 'fixed',
                      top: 10,
                      right: 10,
                    }}
                    onClick={() => setVisibleMenu(!visibleMenu)}
                  >
                    <Close />
                  </IconButton>
                )}
              </Box>
              <Box width={24} />
              <LoginAvatar />
            </Box>
          </Box>
        );
      }}
    </ColorMenuContext.Consumer>
  );
};

export default Header;
