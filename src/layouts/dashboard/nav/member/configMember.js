// component

import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import AssignmentLateTwoToneIcon from '@mui/icons-material/AssignmentLateTwoTone';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import AppRegistrationTwoToneIcon from '@mui/icons-material/AppRegistrationTwoTone';
import SvgColor from '../../../../components/svg-color';
import FeedbackTwoToneIcon from '@mui/icons-material/FeedbackTwoTone';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfigMember = [

  {
    title: 'Project',
    path: '/staff/projects',
    icon: <ContentPasteTwoToneIcon/>,
  },
  {
    title: 'blog',
    path: '/staff/blog',
    icon: <DriveFileRenameOutlineTwoToneIcon/>
  },
  {
    title: 'Registration Form',
    path: '/staff/registration-form',
    icon: <AppRegistrationTwoToneIcon/>
  },
  {
    title: 'Feedback Form',
    path: '/staff/feedback-form',
    icon: <FeedbackTwoToneIcon/>
  },
  {
    title: 'Student',
    path: '/staff/student',
    icon: <BadgeTwoToneIcon/>
  },
 
 
 
];

export default navConfigMember;
