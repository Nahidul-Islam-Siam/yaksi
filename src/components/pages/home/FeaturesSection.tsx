import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/shared/Container/Container';

// Import icons
import calendarIcon from '@/assets/home/calendar.png';
import jetSkiIcon from '@/assets/home/jet-ski.png';
import crownIcon from '@/assets/home/crown.png';
import logoXIcon from '@/assets/shared/logo-x-black.png';

export default function FeaturesSection() {
    const features = [
        {
            icon: calendarIcon,
            title: ['Easy to Use', 'Booking System'],
            description: 'Once you\'re setup in our system, login and reserve your ski in under 3 minutes!',
            iconAlt: 'Calendar'
        },
        {
            icon: jetSkiIcon,
            title: ['Wide range of', 'Ski\'s Available'],
            description: 'Choose from one of our 15 From 130hp, 300hp. Suited for beginners and experts.',
            iconAlt: 'Jet Ski'
        },
        {
            icon: crownIcon,
            title: ['Wide range of', 'Ski\'s Available'],
            description: 'Once you\'re in our system, maintain your access anytime with a once off weekly payment.',
            iconAlt: 'VIP Crown'
        }
    ];

    return (
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-10 md:gap-6 lg:gap-8">
                {/* Feature Cards */}
                {features.map((feature, index) => (
                    <div key={index} className="text-white">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 flex-shrink-0 mt-1">
                                <Image
                                    src={feature.icon}
                                    alt={feature.iconAlt}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div>
                                {feature.title.map((line, lineIndex) => (
                                    <h3 key={lineIndex} className="text-lg font-semibold leading-tight">
                                        {line}
                                    </h3>
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed pl-16">
                            {feature.description}
                        </p>
                    </div>
                ))}

                {/* Join JetXClub Card */}
                <div className="bg-[#00AEEF] rounded-xl p-6 text-white relative overflow-hidden">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 flex-shrink-0 mt-1">
                            <Image
                                src={logoXIcon}
                                alt="JetXClub Logo"
                                width={40}
                                height={40}
                                className="w-full h-full object-contain filter brightness-0"
                            />
                        </div>
                        <div className='text-black'>
                            <h3 className="text-lg font-bold leading-tight">Join</h3>
                            <h3 className="text-lg font-bold leading-tight">JetXClub!</h3>
                        </div>
                    </div>
                    <p className="text-gray-200 text-sm leading-relaxed">
                        Signup today JetXClub online and get started with your anytime Ski Access!
                    </p>
                </div>
            </div>
        </Container>
    );
}
