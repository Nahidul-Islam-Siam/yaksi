import logo from "@/assets/shared/logo.png";
import ForgotPasswordForm from '@/components/pages/auth/ForgotPasswordForm';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from "next/link";
import { useForgotPasswordMutation } from "@/redux/api/auth/authApi";

export const metadata: Metadata = {
    title: 'Forgot Password | JetXClub',
    description: 'Reset your JetXClub account password securely to regain access to your jet ski bookings and adventures.',
    keywords: ['forgot password', 'reset password', 'password recovery', 'account recovery'],
    robots: 'noindex, nofollow',
};

export default function ForgotPasswordPage() {




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
                <h1 className="text-3xl font-bold text-blue-900 mb-2">Forgot Password</h1>
            </div>

            {/* Forgot Password Form */}
            <ForgotPasswordForm />
        </div>
    );
}