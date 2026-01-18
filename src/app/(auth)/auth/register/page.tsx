import logo from "@/assets/shared/logo.png";
import RegisterForm from '@/components/pages/auth/RegisterForm';
import { Metadata } from "next";
import Image from 'next/image';
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Sign Up | JetXClub',
    description: 'Create your JetXClub account to book jet ski rentals, membership plans, and thrilling water adventures.',
    keywords: ['signup', 'register', 'create account', 'jet ski', 'membership', 'water sports'],
    robots: 'noindex, nofollow',
};

export default function RegisterPage() {
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
                <h1 className="text-3xl font-bold text-blue-900 mb-2">Don&apos;t have account?</h1>
                <p className="text-blue-800">Please Create your account.</p>
            </div>

            {/* Sign Up Form */}
            <RegisterForm />
        </div>
    );
}