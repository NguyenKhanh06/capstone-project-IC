import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SliderArrow } from '../slider/slider-arrow';
import NavigateNextIcon from '@mui/icons-material/ArrowForwardIosRounded';
import NavigateBeforeIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { data } from '../program/program.data';
import { Link } from 'react-router-dom';

const ReferancesInter = () => {
  const renderSlides = () =>
    data.map((item, index) => (
      <Box
        key={index}
        data-slick-index={index}
        className="slide-item-cover"
        style={{ borderRadius: '20px', height: '100%', width: '100%' }}
      >
        <Link to={`/landingpage/program/${item.id}`}>
          <img src={item.detailImageUrl} key={index} width={250} height={350} alt="alt" />
        </Link>
        <div className="cover"></div>
      </Box>
    ));
  const customSlider = React.createRef<Slider>();
  const goNext = () => {
    customSlider.current?.slickNext();
  };
  const goPrev = () => {
    customSlider.current?.slickPrev();
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        paddingTop: { lg: '11%', sm: '8%', xs: '5%' },
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: { lg: '60px', sm: '50px', xs: '40px' },
            color: 'primary.main',
            fontWeight: '700',
          }}
        >
          REFERENCE
        </Typography>
      </Box>

      <Box
        sx={{
          padding: '0% 5%',
          height: 'auto',
          margin: { lg: '40px 0', sm: '40px 0', xs: '20px 0' },
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={() => goNext()}
          disableRipple
          sx={{
            display: { lg: 'block', sm: 'block', xs: 'none' },
            position: 'absolute',
            right: { lg: '10px', sm: '5px', xs: '0px' },
            bottom: { lg: '35%', sm: '25%', xs: '35%' },
            color: 'primary.main',
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 50 }} />
        </IconButton>
        <Slider
          className="refer-slide"
          ref={customSlider}
          slidesToShow={5}
          slidesToScroll={1}
          arrows={false}
          dots={false}
          focusOnSelect={true}
          centerMode={true}
          infinite={true}
          centerPadding={'0'}
          autoplay={false}
          speed={500}
          pauseOnHover={true}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {renderSlides()}
        </Slider>
        <IconButton
          onClick={() => goPrev()}
          disableRipple
          sx={{
            display: { lg: 'block', sm: 'block', xs: 'none' },
            position: 'absolute',
            left: '10px',
            bottom: { lg: '35%', sm: '25%', xs: '35%' },
            color: 'primary.main',
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 50 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ReferancesInter;
