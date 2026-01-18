import { Metadata } from 'next';
import FAQPage from '@/components/pages/faq/FAQPage';
import HeroBanner from '@/components/shared/HeroBanner/HeroBanner';
import ContactUsContent from '@/components/shared/ContactUsContent/ContactUsContent';

export const metadata: Metadata = {
    title: 'FAQ | JetXClub',
    description: 'Frequently Asked Questions about JetXClub services and policies',
};

export default function FAQServer() {
    return (
        <>
            <HeroBanner
                title="Frequently Asked Questions"
                subtitle="The smarter, more affordable alternative to ownership. Get 24/7 access to our high performance"
            />
            <FAQPage />
            <ContactUsContent />
        </>
    );
}