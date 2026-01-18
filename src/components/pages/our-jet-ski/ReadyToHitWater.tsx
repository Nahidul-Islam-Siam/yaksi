import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'antd';
import yamahaJetSki from '@/assets/jet-ski/yamaha-jet-ski.png';
import { Container } from '@/components/shared/Container/Container';

export default function ReadyToHitWater() {
    return (
        <section className="relative h-[400px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={yamahaJetSki}
                    alt="Yamaha Jet Ski"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <Container className="relative z-10 flex flex-col xl:flex-row gap-6 md:gap-10 xl:gap-0 items-center justify-center xl:justify-between h-full">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                    Ready to hit the water?
                </h2>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                    {/* Day Hire Button */}
                    <Link href="/day-rentals">
                        <Button
                            size="large"
                            className="w-full sm:w-auto min-w-[140px] h-12 bg-transparent border-2 !border-none text-white font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 rounded-md"
                            style={{
                                backgroundColor: 'transparent',
                                borderColor: 'white',
                                color: 'white'
                            }}
                        >
                            Day Hire
                        </Button>
                    </Link>

                    {/* Adventure Packs Button */}
                    <Link href="/adventure-packs">
                        <Button
                            size="large"
                            className="w-full sm:w-auto min-w-[160px] h-12 bg-transparent border-2 !border-none text-white font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 rounded-md"
                            style={{
                                backgroundColor: 'transparent',
                                borderColor: 'white',
                                color: 'white'
                            }}
                        >
                            Adventure packs
                        </Button>
                    </Link>

                    {/* Become JetX Member Button */}
                    <Link href="/membership-plans">
                        <Button
                            type="primary"
                            size="large"
                            className="w-full sm:w-auto min-w-[180px] h-12 font-semibold rounded-md !bg-[#00AEEF] hover:!bg-[#00AEEF]/90 !border-[#00AEEF] transition-all duration-300"
                        >
                            Become JetX Member
                        </Button>
                    </Link>
                </div>
            </Container>
        </section>
    );
}