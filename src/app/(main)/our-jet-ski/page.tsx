import JetSkiShowcaseSection from '@/components/pages/our-jet-ski/JetSkiShowcaseSection';
import ReadyToHitWater from '@/components/pages/our-jet-ski/ReadyToHitWater';
import ContactUsContent from '@/components/shared/ContactUsContent/ContactUsContent';
import HeroBanner from '@/components/shared/HeroBanner/HeroBanner';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'Our JetSki | JetXClub',
    description: 'Explore all JetSkis belong to JetXClub!',
};

const OurJetSkiPage = () => {
    return (
        <div>
            <HeroBanner
                title="Our Fleet of Jetski"
                subtitle="The smarter, more affordable alternative to ownership. Get 24/7 access to our high performance."
            />
            <JetSkiShowcaseSection />
            <ReadyToHitWater />
            <ContactUsContent />
        </div>
    )
}

export default OurJetSkiPage;