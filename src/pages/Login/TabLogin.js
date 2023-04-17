
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import LoginStaff from './LoginStaff';
import LoginStudent from './LoginStudent';
import LoginPartner from './LoginPartner';


const TabLogin = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Student" value="1" />
              <Tab label="Staff" value="2" />
              <Tab label="Partner" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1"><LoginStudent/></TabPanel>
          <TabPanel value="2"><LoginStaff/></TabPanel>
          <TabPanel value="3"><LoginPartner/></TabPanel>
        </TabContext>
      </Box>
    );
};

export default TabLogin;