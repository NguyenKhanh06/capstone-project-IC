// component

import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import PortraitTwoToneIcon from '@mui/icons-material/PortraitTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import SvgColor from '../../../components/svg-color';
import FeedbackTwoToneIcon from '@mui/icons-material/FeedbackTwoTone';



// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/header/app',
  //   icon: <DashboardTwoToneIcon/>,
  // },
  {
    title: 'Project',
    path: '/header/project',
    icon: <ContentPasteTwoToneIcon/>,
  },

  {
    title: 'course',
    path: '/header/course',
    icon: <MenuBookTwoToneIcon/>
  },
  {
    title: 'Negotiation',
    path: '/header/negotiation',
    icon: <HandshakeTwoToneIcon/>,

  },
  {
    title: 'staff',
    path: '/header/staff',
    icon: <PortraitTwoToneIcon/>,
  },
  {
    title: 'partner',
    path: '/header/partner',
    icon: <PeopleAltTwoToneIcon/>,
  },
 
 
  {
    title: 'Post',
    path: '/header/blog',
    icon: <DriveFileRenameOutlineTwoToneIcon/>
  },
  {
    title: 'Registration Form',
    path: '/header/registration-form',
    icon: <AppRegistrationTwoToneIcon/>
  },
  {
    title: 'Feedback Form',
    path: '/header/feedback-form',
    icon: <FeedbackTwoToneIcon/>
  },
  {
    title: 'Major',
    path: '/header/major',
    icon: <SchoolTwoToneIcon/>,
  },

  {
    title: 'Student',
    path: '/header/student',
    icon: <BadgeTwoToneIcon/>
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
