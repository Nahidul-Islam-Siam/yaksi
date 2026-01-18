import React from 'react';
import Image from 'next/image';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Container } from '@/components/shared/Container/Container';

const { Panel } = Collapse;

const FAQSection = () => {
    const faqItems = [
        {
            key: '1',
            question: 'What jet ski models do you have available?',
            answer: 'We offer a premium fleet including Yamaha WaveRunner, Sea-Doo GTX, and Kawasaki Ultra models. Our jet skis range from beginner-friendly models to high-performance watercraft for experienced riders. All equipment is regularly maintained and updated to ensure optimal performance and safety.'
        },
        {
            key: '2',
            question: 'Do I need a license to rent a jet ski?',
            answer: 'Yes, you must have a valid driver\'s license and be at least 18 years old to rent a jet ski. Some states may require additional boating safety certification. We provide a comprehensive safety briefing and basic operation instruction before each rental to ensure you\'re comfortable and safe on the water.'
        },
        {
            key: '3',
            question: 'What\'s included in the rental price?',
            answer: 'All rentals include the jet ski, life jacket, safety whistle, basic instruction, fuel, and insurance coverage. We also provide waterproof storage containers and safety equipment. Wetsuits are available for an additional fee during cooler months.'
        },
        {
            key: '4',
            question: 'What are the age and safety requirements?',
            answer: 'Riders must be 18+ with a valid driver\'s license. All participants must demonstrate basic swimming ability and complete our safety briefing. We provide all required safety equipment including Coast Guard-approved life jackets. Pregnant women and individuals with certain medical conditions should consult their physician before participating.'
        },
        {
            key: '5',
            question: 'What happens if weather conditions are unsafe?',
            answer: 'Safety is our top priority. We monitor weather conditions closely and may cancel or postpone rentals due to high winds, storms, or unsafe water conditions. In case of weather cancellations, we offer full refunds or the option to reschedule at no additional cost.'
        },
        {
            key: '6',
            question: 'Can I cancel or reschedule my booking?',
            answer: 'Cancellations made 24+ hours in advance receive a full refund. Cancellations within 24 hours incur a 50% fee. No-shows forfeit the entire amount. Rescheduling is available based on availability and must be done at least 12 hours before your original booking time.'
        },
        {
            key: '7',
            question: 'How do membership plans work?',
            answer: 'Our membership plans offer monthly ride credits, priority booking, and exclusive discounts. Plans range from 3-6 rides per month with rollover options. Members also get access to premium equipment, special events, and can bring guests at discounted rates.'
        },
        {
            key: '8',
            question: 'What are Adventure Packs and how do they differ from day rentals?',
            answer: 'Adventure Packs are multi-ride packages (3, 5, or 8 rides) with no expiration date, perfect for frequent riders. Day Rentals are single-day experiences. Adventure Packs offer better value per ride and include exclusive access to guided tours and advanced equipment options.'
        }
    ];

    return (
        <div className="bg-white">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - FAQ Content and Images */}
                    <div>
                        {/* Header */}
                        <div className="space-y-4 mb-8">
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">FAQ</h1>
                            <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                                Owning a Jet Ski sounds great... until you add up the cost, time, and
                                responsibility. With JetXClub, you get all the fun and freedom of riding without
                                the hassles of ownership.
                            </p>
                        </div>

                        {/* Images Container - Responsive */}
                        <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[420px] mb-8 lg:mb-0">
                            {/* First Image - Top Left */}
                            <div className="absolute top-0 left-0 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[320px] h-[220px] sm:h-[285px] md:h-[350px] lg:h-[240px] rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                                    alt="Person riding jetski on water"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 320px"
                                />
                            </div>

                            {/* Second Image - Bottom Right with overlap */}
                            <div className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[320px] h-[220px] sm:h-[285px] md:h-[350px] lg:h-[240px] rounded-2xl overflow-hidden shadow-xl z-10">
                                <Image
                                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                                    alt="Jetski jumping on waves"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 320px"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - FAQ Section */}
                    <div>
                        <div className="space-y-4">
                            {/* FAQ Items with Accordion Behavior */}
                            <Collapse
                                accordion // This ensures only one panel is open at a time
                                defaultActiveKey={['1']} // First panel open by default
                                ghost
                                expandIcon={({ isActive }) => (
                                    <CaretRightOutlined
                                        className={`text-gray-600 transition-transform duration-200 ${isActive ? 'rotate-90' : ''
                                            }`}
                                    />
                                )}
                                expandIconPosition="end"
                                className="space-y-2"
                            >
                                {faqItems.map((item) => (
                                    <Panel
                                        key={item.key}
                                        header={
                                            <span className="text-gray-800 font-medium !text-base lg:text-base">
                                                {item.question}
                                            </span>
                                        }
                                        className="bg-gray-100 rounded-lg !mb-2 border-0 overflow-hidden"
                                    >
                                        <div className="text-[#00AEEF] leading-relaxed px-3 pb-2 !text-sm lg:text-base">
                                            {item.answer}
                                        </div>
                                    </Panel>
                                ))}
                            </Collapse>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default FAQSection;