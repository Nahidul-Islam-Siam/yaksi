import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/shared/Container/Container';

export default function SydneyMembershipSection() {
    return (
        <section className="bg-white">
            <Container>
                <div className="text-center max-w-4xl mx-auto">
                    {/* Main Heading */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-8">
                        Sydney&apos;s First <br />
                        <span className="text-[#00AEEF]">Jet Ski</span> Membership
                    </h2>

                    {/* Content Paragraphs */}
                    <div className="space-y-6 text-gray-700 text-base md:text-lg leading-relaxed mb-12">
                        <p>
                            Your key to unlimited water access made easier, faster, and more affordable than ownership.
                        </p>

                        <p>
                            JetXClub is revolutionising how Sydney gets on the water. As Sydneys first Jet Ski membership
                            service, we offer a smarter alternative to ownership. No storage, no maintenance, no rego, no
                            insurance costs.
                        </p>

                        <p>
                            Based in South West Sydney, with more locations coming soon, members enjoy 24/7 self-access to
                            premium Jet Skis, ready to ride whenever you are.
                        </p>

                        <p className="font-medium">
                            Just book, unlock, and hit the water anytime.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        {/* Day Hire Button */}
                        <Link href="/day-rentals">
                            <button className="w-full sm:w-auto px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200 min-w-[140px]">
                                Day Hire
                            </button>
                        </Link>

                        {/* Adventure Packs Button */}
                        <Link href="/adventure-packs">
                            <button className="w-full sm:w-auto px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200 min-w-[160px]">
                                Adventure Packs
                            </button>
                        </Link>

                        {/* Membership Button (Primary) */}
                        <Link href="/membership-plans">
                            <button className="w-full sm:w-auto px-8 py-3 bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-semibold rounded-lg transition-colors duration-200 min-w-[140px]">
                                Membership
                            </button>
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}