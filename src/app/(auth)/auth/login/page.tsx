import logo from "@/assets/shared/logo.png";
import LoginForm from '@/components/pages/auth/LoginForm';
import { Metadata } from "next";
import Image from 'next/image';
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Login | JetXClub',
    description: 'Sign in to your JetXClub account to access exclusive jet ski rentals and adventure experiences.',
    keywords: ['login', 'sign in', 'jet ski', 'water sports', 'authentication'],
    robots: 'noindex, nofollow', 
};


export default function LoginPage() {
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
                <h1 className="text-3xl font-bold text-blue-900 mb-2">Hello!</h1>
                <p className="text-blue-800">Please log in to your account.</p>
            </div>

            {/* Login Form */}
            <LoginForm />
        </div>
    );
}
