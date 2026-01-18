'use client';

import Link from 'next/link';
import Image from 'next/image';

// Import your logo
import logoImage from '@/assets/shared/logo.png';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const mainLinks = [
        { name: 'Home', href: '/' },
        { name: 'Our Skis', href: '/our-jet-ski' },
        { name: 'Membership', href: '/membership-plans' },
        { name: 'Day Rental', href: '/day-rentals' },
        { name: 'Adventure Packs', href: '/adventure-packs' },
        { name: 'FAQ', href: '/faq' }
    ];

    const legalLinks = [
        { name: 'Terms & Conditions', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' }
    ];

    return (
        <footer className="bg-black text-white">
            {/* Main Footer Content */}
            <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left Column - Navigation Links */}
                    <div className="space-y-8 order-2 md:order-1">
                        {/* Main Navigation Links */}
                        <div>
                            <ul className="space-y-2">
                                {mainLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-white hover:text-[#00AEEF] transition-colors duration-200 text-sm block"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal Links */}
                        <div>
                            <ul className="space-y-2">
                                {legalLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-white hover:text-[#00AEEF] transition-colors duration-200 text-sm block"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Logo & Contact Info */}
                    <div className="lg:text-right space-y-6 order-1 md:order-2">
                        {/* Logo */}
                        <div className="flex justify-start md:justify-end">
                            <div className="text-left md:text-right">
                                <Link href="/" className="block">
                                    <Image
                                        placeholder="blur"
                                        blurDataURL={logoImage.src}
                                        src={logoImage}
                                        alt="JetXClub Logo"
                                        width={240}
                                        height={40}
                                        className="object-contain w-48 h-8 lg:w-64 lg:h-10"
                                    />
                                </Link>
                                <p className="text-xs text-white mt-1">
                                    JETXCLUBPTYLTD
                                </p>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="text-left md:text-right space-y-1">
                            <p className="text-white text-sm">
                                54 STATION STREET SCHOFIELDS
                            </p>
                            <p className="text-white text-sm">
                                ABN 687 go
                            </p>
                            <p className="text-white text-sm">
                                info@jetclub.com.au
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright - Centered */}
            <div className="border-t border-gray-800">
                <div className="w-11/12 2xl:w-[88%] max-w-[105.6rem] mx-auto py-6">
                    <div className="text-center">
                        <p className="text-white text-sm">
                            Copyright {currentYear} JetXClub
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
