import React from 'react';
import { Container } from '@/components/shared/Container/Container';

export default function BenefitsSection() {
    const benefits = [
        {
            title: 'Access to our entire fleet',
            description: 'Choose from our fleet of 15+ premium Sea-Doo jet skis ranging from 130hp to 300hp for all skill levels.'
        },
        {
            title: 'No storage hassles',
            description: 'Skip the garage clutter and storage fees. Your jet skis are safely stored at our secure facility.'
        },
        {
            title: 'Zero maintenance costs',
            description: 'No oil changes, repairs, or winterization. We handle all maintenance so you just ride.'
        },
        {
            title: '24/7 self-service access',
            description: 'Book online and access your jet ski anytime, day or night with our automated system.'
        },
        {
            title: 'Multiple locations',
            description: 'Starting in South West Sydney with more locations coming soon across Sydney.'
        },
        {
            title: 'Insurance included',
            description: 'Comprehensive coverage included with every ride. No additional insurance costs or worries.'
        },
        {
            title: 'Latest models available',
            description: 'Ride the newest Sea-Doo models with cutting-edge technology and performance features.'
        },
        {
            title: 'Priority member booking',
            description: 'Members get priority access during peak times and exclusive booking windows.'
        }
    ];

    return (
        <Container>
            <div className="max-w-7xl mx-auto">
                {/* Main Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 lg:mb-16">
                    So...What&apos;s The <span className="text-[#00AEEF]">Benefits?</span>
                </h2>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="space-y-4">
                            {/* Benefit Title */}
                            <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight">
                                {benefit.title}
                            </h3>

                            {/* Benefit Description */}
                            <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}