import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Program } from '../../../interfaces/program';
import { Grow } from '@mui/material';
import { Link } from 'react-router-dom';
import { Post } from 'src/interfaces/post';

const myLoader = ({ src }: { src: string }) => {
  return src;
};

interface Props {
  item: Post;
  index: number;
}

const ProgramCardItem: FC<Props> = ({ item, index }) => {
  return (
    <Link to={`/post/${item.id}`}>
      <Grow in={true} style={{ transformOrigin: '0 0 0' }} {...(true ? { timeout: index * 610 } : {})}>
        <Box
          sx={{
            px: 1.5,
            py: 5,
           
          }}
        >
          <Box
            sx={{
              minHeight: 350,
              p: 2,
              backgroundColor: 'background.paper',
              transition: (theme) => theme.transitions.create(['box-shadow']),
              boxShadow: 5,
              '&:hover': {
                boxShadow: 10,
                cursor: 'pointer',
              },
            }}
          >
            <Box
              sx={{
                lineHeight: 0,
                overflow: 'hidden',
                height: 200,
                mb: 2,
              }}
            >
              <img
                src={item.posterUrl as string}
                width={570}
                height={200}
                style={{ objectFit: 'cover' }}
                alt={`Program ${item.id}`}
                loading="lazy"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography  component="h2" variant="h4" sx={{ fontSize: '1.4rem', textOverflow: "ellipsis", overflow: 'hidden', display:'-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: "vertical", lineClamp: 2 }} color="primary.main">
              {item.title}
              </Typography>
              <Typography sx={{ mb: 2, color: 'text.secondary' }} variant="subtitle2" color="text.primary">
                {item.dateCreated.slice(0, 10)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grow>
    </Link>
  );
};
export default ProgramCardItem;
