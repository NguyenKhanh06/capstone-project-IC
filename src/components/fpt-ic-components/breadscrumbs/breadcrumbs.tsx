import React from 'react';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
  previousLink: { href: string; name: string }[];
  currentLink: string;
}
function BaseBreadCrumbs({ previousLink, currentLink }: Props) {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.primary' }} />}
      aria-label="breadcrumb"
      sx={{ my: 3 }}
    >
      {previousLink.map((e, index) => (
        <Link key={index} to={`/landingpage/${e.href}`}>
          <Typography color="text.primary" fontWeight={'600'}>
            {e.name}
          </Typography>
        </Link>
      ))}
      <Typography color="primary.main" fontWeight={'bold'}>
        {currentLink}
      </Typography>
    </Breadcrumbs>
  );
}
export default BaseBreadCrumbs;
