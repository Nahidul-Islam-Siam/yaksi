// components/pages/membership-plans/MembershipHeroSection.tsx
'use client';

import React from 'react';
import { Container } from '@/components/shared/Container/Container';

interface MembershipHeroSectionProps {
    onGetStarted: () => void;
}

export default function MembershipHeroSection({ onGetStarted }: MembershipHeroSectionProps) {
    return (
        <section className="pt-16 md:pt-20">
            <Container>
                <div className="max-w-5xl mx-auto text-center">
                    {/* Main Heading */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-8">
                        Sydney&apos;s First Jet{' '}
                        <span className="text-[#00AEEF]">Ski Membership</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto">
                        The smarter, more affordable alternative to ownership. Get 24/7 access to our high performance Jet
                        Ski fleet from a secure self-serve location. No stress, just ride.
                    </p>

                    {/* Call-to-Action Button */}
                    <button
                        onClick={onGetStarted}
                        className="inline-flex items-center px-6 py-3 bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-semibold text-lg rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Let&apos;s get started
                    </button>
                </div>
            </Container>
        </section>
    );
}