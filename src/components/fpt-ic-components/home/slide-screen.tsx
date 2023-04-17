import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { Container, Fade, Link as MuiLink, Typography } from '@mui/material';
import FadeInSection from '../animations/fade-in-section';
import { Link } from 'react-router-dom';
import { ColorMenuContext } from 'src/context/context';

interface Props {
  id: number | string;
  key: number;
  textTilte?: String | null;
  textDate?: String | null;
  textDetail?: String | null;
  img: string;
}

function SlideScreen({ key, id, textTilte, textDate, textDetail, img }: Props) {
  const { setColorMenu } = useContext(ColorMenuContext);
  return (
    <Box
      sx={{
        width: { lg: '85%', sm: '90%', xs: '100%' },
        height: '100vh',
        padding: { lg: '5% 0 4% 0', sm: '2% 0 1% 0', xs: '5% 0 5% 0' },
        margin: '0 auto',
        display: 'flex',
        flexDirection: { lg: 'row', sm: 'column', xs: 'column' },
      }}
    >
      {/* set left  */}
      <Box
        sx={{
          width: { lg: '60%', sm: '100%', xs: '100%' },
          padding: { lg: '0', sm: '0 4%', xs: ' 0 2%' },
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        {/* set top content */}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '10px',
            height: '30%',
          }}
        >
          <Box display={'flex'} alignItems="center" width={'100%'} gap={5}>
            <Typography
              sx={{
                color: 'primary.contrastText',
                fontSize: { lg: '80px', sm: '40px', xs: '40px' },
                fontWeight: 'bold',
              }}
            >
              Join Now
            </Typography>
            <Box
              sx={{
                height: '1.5px',
                width: '40%',
                backgroundColor: 'primary.contrastText',
              }}
            ></Box>
          </Box>
        </Box>
        {/* set bottom content */}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '70%',
            width: '100%',
            justifyContent: { lg: 'flex-end', sm: 'left', xs: 'left' },
            textAlign: 'left',
          }}
        >
          {/* set bottom title text */}
          <Typography
            sx={{
              fontSize: { lg: '45px', sm: '35px', xs: '25px' },
              fontWeight: 'fontWeightBold',
              margin: '0',
              color: 'primary.contrastText',
            }}
          >
            {textTilte}
          </Typography>
          {/* set date text */}

          <Typography
            sx={{
              margin: '0',
              fontSize: { lg: '30px', sm: '20px', xs: '20px' },
              fontWeight: 'fontWeightMedium',
            }}
          >
            {textDate}
          </Typography>
          {/* set detail text */}

          <Typography
            sx={{
              margin: '0',
              fontSize: { lg: '20px', sm: '15px', xs: '15px' },
              fontWeight: 'fontWeightBold',
            }}
          >
            {textDetail}
          </Typography>
          {/* set link see detail */}

          <Typography
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              justifyContent: { lg: 'left', sm: 'center', xs: 'right' },
              marginTop: '20px',
              my: { sm: '30px' },
              alignItems: 'center',
            }}
          >
            <img src="/images/arrow.svg" width={250} height={30} alt="alt" />
            <Link
              to={`/landingpage/program/${id}`}
              onClick={() => setColorMenu('primary')}
              style={{
                fontWeight: 'fontWeightRegular',
                fontSize: 35,
                cursor: 'pointer',
                color: '#000',
              }}
            >
              SEE DETAIL
            </Link>
          </Typography>
        </Box>
      </Box>
      {/* set right image */}
      <Box
        sx={{
          width: { lg: '40%', sm: '100%', xs: '100%' },
          display: { lg: 'block', sm: 'block', xs: 'block' },
          marginTop: { lg: 0, sm: '20px', xs: '20px' },
          textAlign: 'center',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: { lg: '100%', sm: '80%', xs: '80%' },
            margin: '0px auto',
          }}
        >
          <img
            src={img}
            key={key}
            alt="alt"
            style={{ position: 'relative', borderRadius: 30 }}
            width={'100%'}
            height={'100%'}
          />
        </Box>
      </Box>
    </Box>
  );
}
export default SlideScreen;
