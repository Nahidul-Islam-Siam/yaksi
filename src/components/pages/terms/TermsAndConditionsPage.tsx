'use client'

import React from 'react'
import { Container } from '@/components/shared/Container/Container'

const TermsAndConditionsPage = () => {
    const termsContent = [
        {
            title: "Overview",
            content: "JetXClub is an online platform designed for jet ski rentals, membership plans, and water adventure experiences. We provide access to premium jet ski equipment and thrilling water sports activities. By accessing our website, mobile application, or booking our services, you agree to all of the terms outlined below."
        },
        {
            title: "Account Registration",
            content: [
                "To book jet ski rentals or purchase membership plans, you are required to create an account.",
                "You agree to provide accurate, complete, and current information during registration including valid identification and contact details.",
                "You are responsible for maintaining the confidentiality of your account details and all activities under your account.",
                "You must be at least 18 years old to create an account and book our services."
            ]
        },
        {
            title: "Service Offerings",
            content: [
                "JetXClub offers three main service categories: Day Rentals, Adventure Packs, and Membership Plans.",
                "Day Rentals provide full-day access to jet ski equipment with safety gear and basic instruction.",
                "Adventure Packs include multi-ride packages with no time restrictions and premium equipment access.",
                "Membership Plans offer monthly ride allowances with exclusive benefits and priority booking.",
                "All services are subject to weather conditions, equipment availability, and safety regulations."
            ]
        },
        {
            title: "Pricing and Payments",
            content: [
                "All prices shown on the platform are in USD and are subject to change without prior notice.",
                "Customers agree to pay the full service price as listed at the time of booking.",
                "Payment methods include credit cards, debit cards, and approved digital payment platforms.",
                "Membership plans require recurring monthly payments and may include setup fees and refundable deposits.",
                "All transactions are processed securely through encrypted payment gateways."
            ]
        },
        {
            title: "Booking and Cancellation Policy",
            content: [
                "Bookings are confirmed upon successful payment and receipt of confirmation email.",
                "Cancellations made 24 hours before the scheduled service are eligible for full refund.",
                "Cancellations made less than 24 hours in advance incur a 50% cancellation fee.",
                "No-shows result in forfeiture of the entire booking amount.",
                "JetXClub reserves the right to cancel services due to unsafe weather conditions with full refund provided."
            ]
        },
        {
            title: "Safety Requirements and Liability",
            content: [
                "All participants must possess a valid driver's license and complete a safety briefing before operation.",
                "Participants must be physically capable of operating watercraft and swimming.",
                "JetXClub provides all necessary safety equipment including life jackets and emergency whistles.",
                "Customers assume all risks associated with water sports activities.",
                "JetXClub is not liable for injuries, accidents, or damages occurring during service use.",
                "Customers are responsible for any damage to equipment caused by misuse or negligence."
            ]
        },
        {
            title: "Equipment and Property",
            content: [
                "All jet skis and equipment remain the property of JetXClub at all times.",
                "Customers are responsible for the proper use and care of equipment during rental periods.",
                "Any damage to equipment will result in repair or replacement charges to the customer.",
                "Theft or loss of equipment will result in full replacement cost charges.",
                "Equipment inspections are conducted before and after each rental period."
            ]
        },
        {
            title: "Prohibited Conduct",
            content: [
                "You agree NOT to:",
                "• Operate equipment while under the influence of alcohol or drugs",
                "• Exceed designated water boundaries or speed limits",
                "• Allow unauthorized persons to operate rented equipment",
                "• Use equipment for commercial purposes without written permission",
                "• Engage in reckless or dangerous behavior that endangers others",
                "• Provide false information during registration or booking"
            ]
        },
        {
            title: "Membership Terms",
            content: [
                "Membership plans automatically renew monthly unless canceled 48 hours before renewal date.",
                "Unused rides do not roll over to the following month unless specified in the plan.",
                "Membership benefits are non-transferable and for the account holder's use only.",
                "Members receive priority booking and access to exclusive events and equipment.",
                "Membership suspension or termination may occur for violation of terms or safety regulations."
            ]
        },
        {
            title: "Intellectual Property",
            content: [
                "All content on the JetXClub platform, including text, images, videos, logos, and design elements, are the property of JetXClub.",
                "Customers may not reproduce, distribute, or use any content for commercial purposes without written permission.",
                "Customer photos and videos may be used by JetXClub for marketing purposes unless opted out."
            ]
        },
        {
            title: "Privacy and Data Protection",
            content: "Please review our Privacy Policy to understand how your personal information, location data, and service usage information is collected, stored, and used to enhance your JetXClub experience."
        },
        {
            title: "Modifications to Terms",
            content: [
                "JetXClub reserves the right to update or modify these Terms & Conditions at any time without prior notice.",
                "Customers will be notified of significant changes via email or platform notification.",
                "Continued use of services after any changes signifies acceptance of the updated terms."
            ]
        },
        {
            title: "Contact Information",
            content: [
                "If you have any questions about these Terms & Conditions, please contact us at:",
                "Email: support@jetxclub.com",
                "Phone: +1 (555) JET-CLUB",
                "Address: JetXClub Marina, 123 Waterfront Drive, Miami, FL 33101",
                "Emergency Hotline: +1 (555) 911-HELP (Available during operating hours)"
            ]
        }
    ]

    const renderContent = (content: string | string[]) => {
        if (Array.isArray(content)) {
            return (
                <div className="space-y-3">
                    {content.map((item, index) => (
                        <p key={index} className="text-gray-700 leading-relaxed">
                            {item}
                        </p>
                    ))}
                </div>
            )
        }
        return <p className="text-gray-700 leading-relaxed">{content}</p>
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Terms Content */}
            <Container>
                {/* Introduction */}
                <div className="mb-12">
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Please read these Terms and Conditions carefully before using our website or services.
                        These terms govern your use of our platform and any transactions you make through our marketplace.
                    </p>
                </div>

                {/* Terms Sections */}
                <div className="space-y-12">
                    {termsContent.map((section, index) => (
                        <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <span className="bg-[#00AEEF] text-white text-lg font-semibold px-3 py-1 rounded-md mr-4">
                                    {index + 1}
                                </span>
                                {section.title}
                            </h2>
                            <div className="pl-16">
                                {renderContent(section.content)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-16 p-6 bg-gray-50 rounded-lg border-l-4 border-[#00AEEF]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Important Notice
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        These Terms & Conditions are effective as of the date you access our website.
                        By using our services, you acknowledge that you have read, understood, and agree
                        to be bound by these terms. If you do not agree with any part of these terms,
                        please do not use our website or services.
                    </p>
                </div>

                {/* Last Updated */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Last updated: {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </Container>
        </div>
    )
}

export default TermsAndConditionsPage