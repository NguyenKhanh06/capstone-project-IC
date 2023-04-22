import React from 'react';
import FadeInSection from '../../../components/fpt-ic-components/animations/fade-in-section';
import HomeHero from '../../../components/fpt-ic-components/home/hero';
import JoinNow from '../../../components/fpt-ic-components/home/join-now';
import ReferancesInter from '../../../components/fpt-ic-components/home/references-alter';

const Home = () => {
  return (
    <>
      <FadeInSection>
        <HomeHero />
      </FadeInSection>
      <FadeInSection>
        <JoinNow />
      </FadeInSection>
      {/* <FadeInSection>
        <ReferancesInter />
      </FadeInSection> */}
    </>
  );
};

export default Home;
