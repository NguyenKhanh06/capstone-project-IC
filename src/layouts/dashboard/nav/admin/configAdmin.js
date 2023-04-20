// component

import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import PortraitTwoToneIcon from '@mui/icons-material/PortraitTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import SvgColor from '../../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfigAdmin= [
  // {
  //   title: 'dashboard',
  //   path: '/admin/app',
  //   icon: <DashboardTwoToneIcon/>,
  // },
 

  {
    title: 'partner',
    path: '/admin/partner',
    icon: <PeopleAltTwoToneIcon/>,
  },
  {
    title: 'Account',
    path: '/admin/staff',
    icon: < PortraitTwoToneIcon/>,
  },
 
  {
    title: 'History',
    path: '/admin/history',
    icon: < PortraitTwoToneIcon/>,
  },
 
 
];

export default navConfigAdmin;
