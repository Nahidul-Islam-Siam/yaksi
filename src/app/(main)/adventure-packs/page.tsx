import AdventurePackSection from '@/components/pages/adventure-packs/AdventurePackSection'
import ContactUsContent from '@/components/shared/ContactUsContent/ContactUsContent'
import HeroBanner from '@/components/shared/HeroBanner/HeroBanner'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'Adventure Packs | JetXClub',
    description: 'Explore all adventure packs we are offering JetXClub!',
};

const AdventurePacksPage = () => {
    return (
        <div>
            <HeroBanner
                title="Adventure Packs"
                subtitle="The smarter, more affordable alternative to ownership."
            />
            <AdventurePackSection />
            <ContactUsContent />
        </div>
    )
}

export default AdventurePacksPage;