import logo from "@/assets/shared/logo.png";
import SetNewPasswordForm from '@/components/pages/auth/SetNewPasswordForm';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Set New Password | JetXClub',
    description: 'Set a new secure password for your JetXClub account to continue enjoying our jet ski services.',
    keywords: ['set password', 'new password', 'password reset', 'account security'],
    robots: 'noindex, nofollow',
};

export default function SetNewPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
            <div className="mb-8 md:mb-16 xl:mb-20">
                <Link href={`/`} className="block">
                    <Image
                        placeholder='blur'
                        blurDataURL={logo.src}
                        src={logo}
                        alt="JetXClub Logo"
                        width={240}
                        height={40}
                        className={`object-contain bg-black p-2`}
                        priority
                    />
                </Link>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-8 md:mb-16 xl:mb-20">
                <h1 className="text-3xl font-bold text-blue-900 mb-2">Set New Password</h1>
            </div>

            {/* Set New Password Form */}
            <SetNewPasswordForm />
        </div>
    );
}