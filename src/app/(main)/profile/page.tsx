import ProfileSection from "@/components/pages/profile page/ProfileSection";
import HeroBanner from "@/components/shared/HeroBanner/HeroBanner";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Profile | JetXClub',
    description: 'Sign in to your JetXClub account to access exclusive jet ski rentals and adventure experiences.',
};

export default function ProfilePage() {
    return (
        <div>
            <HeroBanner
                title="JETX COVER"
                subtitle="The details you'll need to know"
            />
            <ProfileSection />
        </div>
    );
}