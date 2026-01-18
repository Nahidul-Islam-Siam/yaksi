'use client'

import React from 'react'
import { Container } from '@/components/shared/Container/Container'

const PrivacyPolicyPage = () => {
    const privacyContent = [
        {
            title: "Information We Collect",
            content: [
                "When you visit or use JetXClub, we may collect the following types of information:",
                "• Personal Information: Name, phone number, email address, physical address, date of birth, and emergency contact details.",
                "• Account Information: Username, password, preferences, and membership status when creating an account.",
                "• Safety & Licensing Information: Driver's license details, swimming proficiency, medical conditions, and safety certification records.",
                "• Payment Details: Transaction information, billing details, membership payments, and refundable deposit records.",
                "• Booking Information: Rental dates, equipment preferences, group size, and adventure pack selections.",
                "• Location Data: GPS coordinates for safety monitoring and equipment tracking during rentals.",
                "• Browsing Information: IP address, browser type, device details, and pages visited on our platform."
            ]
        },
        {
            title: "How We Use Your Information",
            content: [
                "We use your data for the following purposes:",
                "• To create and manage your account and membership plans.",
                "• To process bookings, rentals, and facilitate secure transactions.",
                "• To ensure safety compliance and emergency response coordination.",
                "• To communicate regarding bookings, safety updates, weather conditions, and service notifications.",
                "• To improve our platform, equipment, and customer experience.",
                "• To send promotional offers for adventure packs and membership benefits (with your consent).",
                "• To comply with maritime safety regulations and legal obligations.",
                "• To track equipment location and ensure safe return of jet skis."
            ]
        },
        {
            title: "Information Sharing",
            content: [
                "We do NOT sell or rent your personal data to third parties. We may share your data with:",
                "• Trusted service providers (payment processors, equipment suppliers, insurance providers) to fulfill your bookings.",
                "• Coast Guard and maritime authorities when required by law or for safety incidents.",
                "• Emergency services if safety situations arise during your rental period.",
                "• Other customers (limited contact info) only when necessary for group bookings or safety coordination.",
                "• Insurance providers in case of accidents or equipment damage claims."
            ]
        },
        {
            title: "Data Security",
            content: [
                "We implement strict security measures to protect your data, including:",
                "• Secure servers with SSL encryption for all data transmission.",
                "• Limited employee access to personal information on a need-to-know basis.",
                "• Regular security audits and updates to our protection systems.",
                "• Secure storage of safety certifications and emergency contact information.",
                "• GPS tracking data is encrypted and used solely for safety and equipment recovery.",
                "However, please note that no online data transmission can be guaranteed 100% secure."
            ]
        },
        {
            title: "Location and Safety Data",
            content: [
                "For your safety and equipment protection, we collect and use location data to:",
                "• Monitor jet ski locations during rental periods for safety compliance.",
                "• Ensure equipment stays within designated water boundaries.",
                "• Coordinate emergency response if needed.",
                "• Track equipment for recovery and maintenance purposes.",
                "• This data is retained only for the duration necessary for safety and legal compliance."
            ]
        },
        {
            title: "Cookies Policy",
            content: "We use cookies and similar technologies to enhance your browsing experience, remember your preferences, analyze website traffic, and personalize content. Cookies help us improve booking processes and provide better customer service. You can control cookie settings through your browser."
        },
        {
            title: "Your Rights",
            content: [
                "You have the right to:",
                "• Access your personal data and safety records.",
                "• Correct inaccurate or incomplete information.",
                "• Delete your data (subject to safety record retention requirements).",
                "• Opt-out of marketing communications while maintaining safety notifications.",
                "• Request information about emergency contacts and safety data we maintain.",
                "To exercise these rights, please contact us at privacy@jetxclub.com."
            ]
        },
        {
            title: "Membership Data",
            content: [
                "For membership plans, we additionally collect and maintain:",
                "• Monthly ride usage and remaining ride credits.",
                "• Membership renewal dates and payment history.",
                "• Exclusive event participation and preferences.",
                "• Equipment usage patterns to improve service quality.",
                "• Membership data is retained for the duration of your membership plus 3 years for record-keeping."
            ]
        },
        {
            title: "Third-Party Links and Partners",
            content: "Our website may contain links to weather services, maps, or partner marina sites. We are not responsible for the privacy practices of these external websites. We recommend reviewing their privacy policies before sharing any information."
        },
        {
            title: "Data Retention",
            content: [
                "We retain your information for different periods based on its purpose:",
                "• Account information: Duration of account plus 2 years.",
                "• Safety and licensing records: 7 years as required by maritime regulations.",
                "• Payment records: 7 years for tax and legal compliance.",
                "• Emergency contact information: Duration of account plus 1 year.",
                "• Marketing preferences: Until you opt-out or account closure."
            ]
        },
        {
            title: "Changes to This Privacy Policy",
            content: [
                "We may update this Privacy Policy periodically to reflect changes in our services or legal requirements.",
                "Significant changes will be communicated via email to registered users.",
                "Your continued use of JetXClub services means you accept the updated policy."
            ]
        },
        {
            title: "Contact Us",
            content: [
                "For any questions about this Privacy Policy or how we handle your data, please contact:",
                "JetXClub Privacy Team",
                "Email: privacy@jetxclub.com",
                "Phone: +1 (555) JET-CLUB",
                "Address: JetXClub Marina, 123 Waterfront Drive, Miami, FL 33101",
                "Emergency Privacy Concerns: emergency@jetxclub.com"
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
            {/* Privacy Policy Content */}
            <Container>
                {/* Introduction */}
                <div className="mb-12">
                    <p className="text-lg text-gray-600 leading-relaxed">
                        At JetXClub, we value your privacy and are committed to protecting your personal information.
                        This Privacy Policy explains how we collect, use, and protect your data when you use our jet ski rental platform,
                        book adventure experiences, or participate in our membership programs. Your safety and privacy are our top priorities.
                    </p>
                </div>

                {/* Privacy Policy Sections */}
                <div className="space-y-12">
                    {privacyContent.map((section, index) => (
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

                {/* Important Privacy Notice */}
                <div className="mt-16 p-6 bg-blue-50 rounded-lg border-l-4 border-[#00AEEF]">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Your Safety & Privacy Matter
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                        We are committed to maintaining the highest standards of data protection and privacy while ensuring your safety
                        during water sports activities. This policy balances our need to protect you during adventures with respect for your privacy.
                        Your safety records and emergency contact information are handled with special care and are never used for marketing purposes.
                        If you have any concerns about your privacy or safety data, please don&apos;t hesitate to contact us.
                    </p>
                </div>

                {/* GDPR & Maritime Compliance Notice */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-md font-semibold text-gray-900 mb-2">
                        Legal Compliance
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        We comply with the General Data Protection Regulation (GDPR), maritime safety regulations,
                        and other applicable data protection laws. Some safety-related information must be retained
                        longer than other data to meet legal requirements for water sports operations.
                        You have the right to know what personal data we hold about you and how it&apos;s processed.
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

export default PrivacyPolicyPage