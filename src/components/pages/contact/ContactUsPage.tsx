'use client'

import React from 'react'
import ContactUsContent from '@/components/shared/ContactUsContent/ContactUsContent'

const ContactUsPage = () => {
  return (
    <div>
      {/* Hero Banner Section */}
      {/* <HeroBanner 
        imagePath="/images/mustang.jpg"
        headerText="Contact Us"
        imageAlt="Contact us - Blue luxury car"
      /> */}
      
      <section className='py-12 md:py-16 lg:py-20 xl:py-28 2xl:py-32'>
        {/* Contact Us Content Section */}
        <ContactUsContent />
      </section>
    </div>
  )
}

export default ContactUsPage;