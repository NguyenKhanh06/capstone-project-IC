import React from 'react';
import ProfileComponent from '../../../components/fpt-ic-components/profile/profile';
import { MainLayout } from '../../../components/fpt-ic-components/layout';
import FadeInSection from 'src/components/fpt-ic-components/animations/fade-in-section';

const Profile = () => {
  return (
    <>
      <FadeInSection>
        <ProfileComponent />
      </FadeInSection>
    </>
  );
};
export default Profile;
