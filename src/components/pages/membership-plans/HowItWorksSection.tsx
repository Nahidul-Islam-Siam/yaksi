import React from 'react';
import { Container } from '@/components/shared/Container/Container';

export default function HowItWorksSection() {
    const steps = [
        {
            number: '1',
            title: 'Join the Club',
            description: 'Choose your plan, pay your sign-up fee, and complete your set-up online.'
        },
        {
            number: '2',
            title: 'Book a ride',
            description: 'Use our online booking system to book your ski in.'
        },
        {
            number: '3',
            title: 'Pick your ski',
            description: 'Come to our 24/7 self-serve facility, hook up the ski and tow it to your launch.'
        },
        {
            number: '4',
            title: 'Ride & Return!',
            description: 'Come to our 24/7 self-serve facility, hook up the ski and tow it to your launch.'
        }
    ];

    return (
        <section className="bg-white">
            <Container>
                {/* Main Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-12 lg:mb-16">
                    HOW DOES{' '}
                    <span className="text-[#00AEEF]">IT WORK?</span>
                </h2>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {steps.map((step) => (
                        <div key={step.number} className="space-y-4">
                            {/* Step Number and Title */}
                            <div className="flex items-center gap-3">
                                <span className="text-[#00AEEF] text-2xl md:text-3xl font-bold flex-shrink-0">
                                    {step.number}
                                </span>
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                                    {step.title}
                                </h3>
                            </div>

                            {/* Step Description */}
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}