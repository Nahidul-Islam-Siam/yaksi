import FromSunriseToSunsetSection from '@/components/pages/day-rentals/FromSunriseToSunsetSection'
import ContactUsContent from '@/components/shared/ContactUsContent/ContactUsContent'
import HeroBanner from '@/components/shared/HeroBanner/HeroBanner'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'Day Rentals | JetXClub',
    description: 'Explore all the models available for day rentals and JetXClub!',
};

const DayRentalsPage = () => {
    return (
        <div>
            <HeroBanner
                title="Day Rentals"
                subtitle="The smarter, more affordable alternative to ownership."
            />
            <FromSunriseToSunsetSection />
            <ContactUsContent />
        </div>
    )
}

export default DayRentalsPage;