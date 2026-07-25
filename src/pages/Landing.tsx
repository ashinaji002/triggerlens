import React from 'react';
import { Hero } from '../components/landing/Hero';
import { FeatureStrip } from '../components/landing/FeatureStrip';
import { HowItWorks } from '../components/landing/HowItWorks';
import { AudienceStrip } from '../components/landing/AudienceStrip';
import { PrivacyCTA } from '../components/landing/PrivacyCTA';
import { LandingFooter } from '../components/landing/LandingFooter';

export const Landing: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-white text-zinc-900">
      <Hero />
      <FeatureStrip />
      <HowItWorks />
      <AudienceStrip />
      <PrivacyCTA />
      <LandingFooter />
    </div>
  );
};
