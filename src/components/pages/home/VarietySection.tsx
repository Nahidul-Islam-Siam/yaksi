import React from 'react';
import Image from 'next/image';
import seaDooJetSki from '@/assets/jet-ski/sea-doo-jet-ski.jpg';
import { Container } from '@/components/shared/Container/Container';

export default function VarietySection() {
    return (
        <section className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={seaDooJetSki}
                    alt="Sea-Doo Jet Ski on water"
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-4">
                <Container>
                    <h2 className="text-center text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                        With so much variety,{' '}
                        <span className="text-[#00AEEF]">Where will you go first?</span>
                    </h2>
                </Container>
            </div>
        </section>
    );
}