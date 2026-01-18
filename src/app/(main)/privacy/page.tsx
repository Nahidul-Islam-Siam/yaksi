import { Metadata } from 'next';
import PrivacyPolicyPage from '@/components/pages/privacy/PrivacyPolicyPage';
import HeroBanner from '@/components/shared/HeroBanner/HeroBanner';

export const metadata: Metadata = {
    title: 'Privacy Policy | AML',
    description: 'Your privacy is important to us. Read our policy to understand how we handle your data.',
};

export default function PrivacyPolicyServer() {
    return (
        <>
            <HeroBanner
                title="Privacy Policy"
            />
            <PrivacyPolicyPage />
        </>
    );
}