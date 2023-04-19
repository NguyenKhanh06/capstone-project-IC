import { Avatar, Button, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const LoginAvatar = () => {
  const student = JSON.parse(sessionStorage.getItem("student"));
  console.log(student)
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });
  const navigate = useNavigate()
  const LogOut = () => {
    localStorage.clear();
    sessionStorage.clear()
    navigate("/")
  }
  return (
    <div>
    {student ?  <>
        <IconButton {...bindTrigger(popupState)} disableRipple>
        <Avatar
          src={student.picture}
          style={{
            margin: '10px',
            width: '60px',
            height: '60px',
          }}
        />
      </IconButton>
      <Menu
        {...bindMenu(popupState)}
        PaperProps={{
          style: {
            marginTop: 10,
            width: 150,
            backgroundColor: '#fff',
          },
        }}
        MenuListProps={{ sx: { py: 1 } }}
      >
        {/* <MenuItem onClick={() => LogOut()}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem> */}
        <MenuItem onClick={() => LogOut()}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
      </> : <>
      <Button>Login</Button>
      </>}
     
    </div>
  );
};

export default LoginAvatar;
