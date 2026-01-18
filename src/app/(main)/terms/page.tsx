import { Metadata } from 'next';
import TermsAndConditionsPage from '@/components/pages/terms/TermsAndConditionsPage';
import HeroBanner from '@/components/shared/HeroBanner/HeroBanner';

export const metadata: Metadata = {
    title: 'Terms & Conditions | JetXClub',
    description: 'Read our terms and conditions to understand the rules and guidelines for using JetXClub services.',
};

export default function TermsAndConditionsServer() {
    return (
        <>
            <HeroBanner
                title="Terms & Conditions"
            />
            <TermsAndConditionsPage />
        </>
    );
}