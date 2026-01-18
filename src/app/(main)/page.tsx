import FeaturesSection from '@/components/pages/home/FeaturesSection';
import HeroSection from '@/components/pages/home/HeroSection';
import MasonrySquareGallery from '@/components/pages/home/MasonrySquareGallery';
import SydneyMembershipSection from '@/components/pages/home/SydneyMembershipSection';
import VarietySection from '@/components/pages/home/VarietySection';
import ContactUsContent from '@/components/shared/ContactUsContent/ContactUsContent';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'Home | JetXClub',
    description: 'Home page of JetXClub!',
};

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <HeroSection />
      <FeaturesSection />
      <SydneyMembershipSection />
      <VarietySection />
      <MasonrySquareGallery />
      <ContactUsContent />
    </div>
  )
}

export default HomePage;