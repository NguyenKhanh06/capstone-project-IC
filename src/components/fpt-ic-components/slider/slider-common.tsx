import React, { FC, ReactNode } from 'react';
import Slider, { Settings } from 'react-slick';
import { SliderArrow } from './slider-arrow';

interface Props {
  children: ReactNode;
}

const SliderCommon: FC<Props> = ({ children }: Props) => {
  const sliderConfig: Settings = {
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToScroll: 1,
    prevArrow: <SliderArrow type="prev" />,
    nextArrow: <SliderArrow type="next" />,
  };
  return (
    <div>
      <Slider {...sliderConfig}>{children}</Slider>
    </div>
  );
};
export default SliderCommon;
