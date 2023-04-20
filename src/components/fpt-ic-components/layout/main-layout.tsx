import React, { FC, ReactNode, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Footer } from '../footer';
import { Header } from '../header';
import { ColorMenuContext } from '../../../context/context';
import Messenger from '../../../pages/FPTIC/Messenger'
import { ThemeProvider } from '@mui/material';
import theme from '../../../config/theme';
import { Outlet } from 'react-router-dom';
import Home from 'src/pages/FPTIC/Home';


interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = () => {
  const student = JSON.parse(sessionStorage.getItem("student"));

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
          <Messenger />
          <Footer />
        </Box>
      </ThemeProvider>
    </ColorMenuContext.Provider>
  );
};

export default MainLayout;
