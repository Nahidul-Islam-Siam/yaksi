"use client";

import React, { useRef } from 'react'
import MembershipHeroSection from './MembershipHeroSection';
import HowItWorksSection from './HowItWorksSection';
import BenefitsSection from './BenefitsSection';
import MembershipPlansSection from './MembershipPlansSection';
import ContactUsContent from '@/components/shared/ContactUsContent/ContactUsContent';

const MembershipPlanPage = () => {
    const membershipPlansRef = useRef<HTMLDivElement>(null);

    const handleGetStarted = () => {
        membershipPlansRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <div>
            <MembershipHeroSection onGetStarted={handleGetStarted} />
            <HowItWorksSection />
            <BenefitsSection />
            <div ref={membershipPlansRef}>
                <MembershipPlansSection />
            </div>
            <ContactUsContent />
        </div>
    );
}

export default MembershipPlanPage;