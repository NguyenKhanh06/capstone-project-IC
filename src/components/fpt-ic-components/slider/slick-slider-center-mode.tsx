import React from 'react';
import { FC, ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';
import { SliderArrow } from './slider-arrow';

interface Props {
  children: ReactNode;
}

const SlickSliderCenter: FC<Props> = ({ children }: Props) => {
  const sliderConfig: Settings = {
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    arrows: true,
    dots: false,
    focusOnSelect: true,
    speed: 300,
    // centerPadding: "20px",
    infinite: true,
    autoplaySpeed: 5000,
    autoplay: false,
    // prevArrow: <SliderArrow type="prev" />,
    // nextArrow: <SliderArrow type="next" />,
  };
  return (
    <div>
      <Slider {...sliderConfig}>{children}</Slider>
    </div>
  );
};
export default SlickSliderCenter;
