import { Box, Fade } from '@mui/material';
import React from 'react';
import PhotoAlbum, { Photo } from 'react-photo-album';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
interface Props {
  image: string;
}

function SinglePhotoView({ image }: Props) {
  return (
    <PhotoProvider
      maskOpacity={0.5}
      speed={() => 410}
      easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
    >
      <PhotoView key={image} src={image}>
        <Box
          pr={1}
          sx={{
            display: 'inline-flex',
            width: { lg: '100%', sm: '100%', xs: '100%' },
          }}
        >
          <img src={image} width={'100%'} alt="alt" />
        </Box>
      </PhotoView>
    </PhotoProvider>
  );
}
export default SinglePhotoView;
