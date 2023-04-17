import React, { FC, ReactNode, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Footer } from '../footer';
import { Header } from '../header';
import { ColorMenuContext } from '../../../context/context';
import { ThemeProvider } from '@mui/material';
import theme from '../../../config/theme';
import { Outlet } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = () => {
  const [colorMenu, setColorMenu] = useState('primary');
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);
  return (
    <ColorMenuContext.Provider value={{ colorMenu, setColorMenu }}>
      <ThemeProvider theme={theme}>
        <Box component="main" bgcolor={'background.default'}>
          <Header />
          <Outlet />
          <Footer />
        </Box>
      </ThemeProvider>
    </ColorMenuContext.Provider>
  );
};

export default MainLayout;
