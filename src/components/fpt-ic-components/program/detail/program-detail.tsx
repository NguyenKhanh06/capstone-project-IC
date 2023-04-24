import React, { FC, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Program } from '../../../../interfaces/program';
import { Container, Fade, Grid, Slide } from '@mui/material';
import BaseBreadCrumbs from '../../breadscrumbs/breadcrumbs';
import AlbumImageView from '../../photo_view/album-photo-view';
import SinglePhotoView from '../../photo_view/single-photo-view';
import { Post } from 'src/interfaces/post';

export const myLoader = ({ src }: { src: string }) => {
  return src;
};

interface Props {
  item: Post;
}

const ProgramDetailComponent: FC<Props> = ({ item }) => {
  const containerRef = useRef(null);

  return (
    <Box
      id={`program-detail-${item.id}`}
      sx={{
        height: "100vh",
        pt: {
          xs: 6,
          md: 20,
        },
        pb: {
          xs: 8,
          md: 12,
        },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="xl">
        <BaseBreadCrumbs
          previousLink={[
            { href: '/', name: 'Homepage' },
            { href: '/program', name: 'Programs' },
          ]}
          currentLink={item.title}
        />
        <Grid container columnGap={10}>
          <Fade in={true} style={{ transformOrigin: '0 0 0' }} {...(true ? { timeout: 1000 } : {})}>
            <Grid item lg={5} xs={12} justifyContent={'center'}>
              <SinglePhotoView image={item.posterUrl}></SinglePhotoView>
            </Grid>
          </Fade>
          <Grid item lg={6} xs={12} justifyContent={'center'}>
            <Box ref={containerRef}>
              <Slide
                direction="up"
                in={true}
                container={containerRef.current}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 600 } : {})}
              >
                <Typography
                  sx={{
                    fontSize: { lg: '50px', sm: '40px' },
                    color: 'primary.main',
                    fontWeight: 'bold',
                  }}
                >
                  {item.title.toUpperCase()}
                </Typography>
              </Slide>
              <Slide
                direction="up"
                in={true}
                container={containerRef.current}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 700 } : {})}
              >
                <Typography
            
                  sx={{
                    color: 'text.primary',
                    fontWeight: '500',
                    fontSize: { lg: '20px', sm: '60px' },
                  }}
                >
                  {item.dateCreated.slice(0, 10)}
                </Typography>
              </Slide>
              <Box height={24}></Box>
              <Slide
                direction="up"
                in={true}
                container={containerRef.current}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 800 } : {})}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    fontWeight: '500',
                  }}
                >
              {item.subTitle}
                </Typography>
              </Slide>
              <Box height={24}></Box>
              <Slide
                direction="up"
                in={true}
                container={containerRef.current}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 900 } : {})}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    fontWeight: '500',
                  }}
                >
              {item.content}
                </Typography>
              </Slide>
              <Box height={24}></Box>
              {/* <Slide
                direction="up"
                in={true}
                container={containerRef.current}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 1000 } : {})}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    fontWeight: '500',
                  }}
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae quaerat temporibus repellendus
                  dolor officia reprehenderit rem similique excepturi ex eligendi reiciendis, ab repellat fuga natus
                  nemo velit rerum aut placeat. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum in hic
                  vero, quod doloribus voluptate rerum labore, necessitatibus autem sequi aliquid ducimus commodi,
                  maiores vitae excepturi nisi reprehenderit. Perferendis, esse!
                </Typography>
              </Slide> */}
            </Box>
          </Grid>
        </Grid>
        {item.postImages && item.postImages.length > 0 && (
          <>
            <Typography variant="h1" my={5}>
              Photos of event
            </Typography>
            <Fade in={true} style={{ transformOrigin: '4 0 0' }} {...(true ? { timeout: 1500 } : {})}>
              <Box sx={{ width: '100%' }}>
                <AlbumImageView
                  listImage={item.postImages.map((e) => {
                    return { src: e.postImageUrl };
                  })}
                ></AlbumImageView>
              </Box>
            </Fade>
          </>
        )}
      </Container>
    </Box>
  );
};
export default ProgramDetailComponent;
