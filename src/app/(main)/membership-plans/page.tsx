import React from 'react';
import { Metadata } from 'next';
import MembershipPlanPage from '@/components/pages/membership-plans/MembershipPlanPage';

export const metadata: Metadata = {
    title: 'Membership Plans | JetXClub',
    description: 'Explore all membership plans available to join JetXClub!',
};

const MembershipPlansPage = () => {
    return (
        <MembershipPlanPage />
    );
};

export default MembershipPlansPage;