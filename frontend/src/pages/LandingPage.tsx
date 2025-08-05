// src/pages/LandingPage.tsx

import Hero from '../components/LandingPage/Hero';
import DoctorsGrid from '../components/LandingPage/DoctorsGrid';
import CTA from '../components/LandingPage/CTA';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <DoctorsGrid />
      <CTA />
    </>
  );
};

export default LandingPage;
