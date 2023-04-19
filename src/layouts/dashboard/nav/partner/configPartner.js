// component

import HandshakeTwoToneIcon from '@mui/icons-material/HandshakeTwoTone';
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';

import SvgColor from '../../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfigPartner = [
  // {
  //   title: 'dashboard',
  //   path: '/partner/app',
  //   icon: <DashboardTwoToneIcon/>,
  // },
 

  {
    title: 'Project',
    path: '/partner/project',
    icon: <ContentPasteTwoToneIcon/>,

  },
  {
    title: 'Campus',
    path: '/partner/campus',
    icon: <BusinessTwoToneIcon/>,
  },
 
  {
    title: 'Deputy',
    path: '/partner/deputy',
    icon: <PeopleAltTwoToneIcon/>,
  },
 
];

export default navConfigPartner;
