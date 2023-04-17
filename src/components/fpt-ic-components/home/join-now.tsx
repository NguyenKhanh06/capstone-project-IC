import { ColorMenuContext } from '../../../context/context';
import React, { FC, useCallback, useContext, useEffect } from 'react';
import Slider, { Settings } from 'react-slick';
import SlideScreen from './slide-screen';
import { useTheme, styled } from '@mui/material/styles';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { SliderArrow } from '../slider/slider-arrow';
import SliderCommon from '../slider/slider-common';
import FadeInSection from '../animations/fade-in-section';
import { data } from '../program/program.data';

const NavbarTopAnchor = styled('div')(() => ({
  display: 'block',
  position: 'absolute',
  top: '-30px',
  visibility: 'hidden',
}));
const NavbarBottomAnchor = styled('div')(() => ({
  display: 'block',
  position: 'absolute',
  bottom: '0px',
  visibility: 'hidden',
}));

const JoinNow = () => {
  const renderSlides = () =>
    data.map((item, index) => (
      <SlideScreen
        key={index}
        textTilte={item.programName}
        textDate={item.date}
        textDetail={item.detailContent}
        img={item.detailImageUrl}
        id={item.id}
      />
    ));
  const { setColorMenu } = useContext(ColorMenuContext);
  const trackScrolling = useCallback(() => {
    const wrappedTopElementId = `__isTopDynamicJoinNow`;
    const wrappedBottomElementId = `__isBottomDynamicJoinNow`;
    const wrappedTopElement = document.getElementById(wrappedTopElementId);
    const wrappedBottomElement = document.getElementById(wrappedBottomElementId);
    if (isTop(wrappedTopElement)) {
      setColorMenu('black');
    } else if (isBottom(wrappedTopElement)) {
      setColorMenu('primary');
    }
    if (isTop(wrappedBottomElement)) {
      setColorMenu('primary');
    }
  }, []);
  useEffect(() => {
    document.addEventListener('scroll', trackScrolling);
    return () => {
      document.removeEventListener('scroll', trackScrolling);
    };
  }, [trackScrolling]);
  const isTop = (el: HTMLElement | null) => el && el.getBoundingClientRect().top <= 15;

  const isBottom = (el: HTMLElement | null) => el && el.getBoundingClientRect().bottom >= 80;

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: 'primary.main',
        position: 'relative',
      }}
    >
      <NavbarTopAnchor id="__isTopDynamicJoinNow"></NavbarTopAnchor>
      <SliderCommon>{renderSlides()}</SliderCommon>
      <NavbarBottomAnchor id="__isBottomDynamicJoinNow"></NavbarBottomAnchor>
    </Box>
  );
};
export default JoinNow;
