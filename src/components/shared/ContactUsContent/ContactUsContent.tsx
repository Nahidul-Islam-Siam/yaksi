/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import { Form, Input, Button } from 'antd'

// import { ContactFormValues } from '@/type/type'
import { Container } from '../Container/Container'
import { useCreateContactMutation } from '@/redux/api/contact/contactApi'
import { toast } from 'sonner'

const { TextArea } = Input

// Update your ContactFormValues interface to include all fields
// Make sure it matches what you're sending
export interface ContactFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

const ContactUsContent = () => {
  const [form] = Form.useForm()
  const [createContact, { isLoading }] = useCreateContactMutation() // ✅ RTK Mutation Hook

  const onFinish = async (values: ContactFormValues) => {
    const fullName = `${values.firstName} ${values.lastName}`.trim()

    // Prepare payload as expected by backend
    const payload = {
      name: fullName,
      email: values.email,
      phone: values.phone,
      message: values.message,
    }

    try {
      // ✅ Send request via RTK Query
     const response = await createContact(payload).unwrap()

    if(response.success) {
        toast.success(response.message || 'Message sent successfully! We will get back to you soon.')
    }else {
        toast.error(response.message || 'Failed to send message. Please try again later.')  
    }
      form.resetFields()
    } catch (error: any) {
      // ✅ On error
      const errorMessage =
        error?.data?.message || 'Failed to send message. Please try again later.'

      toast.error(errorMessage, {
        position: 'top-right',
        duration: 4000,
      })
      console.error('Contact form error:', error)
    }
  }

  const onFinishFailed = () => {
    toast.error('Please fill in all required fields correctly.', {
      position: 'top-right',
      duration: 4000,
    })
  }

  return (
    <div className="bg-gray-900">
      <Container>
        {/* Get in Touch Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left Side - Map */}
          <div className="order-1 lg:order-1">
            <div className="h-96 lg:h-[35rem] bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211879.1127226706!2d151.04349525312498!3d-33.8473567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129838f39a743f%3A0x3017d681632a850!2sSydney%20NSW%2C%20Australia!5e0!3m2!1sen!2sbd!4v1754255743027!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="order-2 lg:order-2">
            <div className="mb-8">
              <h3 className="text-3xl xl:text-5xl font-bold text-white mb-4 xl:mb-6">
                Get In Touch
              </h3>
              <p className="text-sm xl:text-base text-white">
                Have any questions? Or just wanting to know more?
              </p>
              <p className="text-sm xl:text-base text-[#00AEEF]">
                Make sure to checkout our FAQ
              </p>
            </div>

            {/* Contact Form */}
            <Form
              form={form}
              name="contactForm"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="!space-y-6"
            >
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="firstName"
                  rules={[
                    { required: true, message: 'Please enter your first name!' },
                    { min: 2, message: 'Name must be at least 2 characters!' },
                  ]}
                  className="mb-0"
                >
                  <Input
                    placeholder="First Name"
                    className="!bg-transparent !border-0 !border-b-2 !border-white/30 !rounded-none h-12 !text-white placeholder:!text-white/60 focus:!border-b-[#00AEEF] focus:!shadow-none hover:!border-b-white/50 px-0 focus:!bg-transparent"
                    style={{ boxShadow: 'none', borderRadius: 0 }}
                  />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  rules={[
                    { required: true, message: 'Please enter your last name!' },
                    { min: 2, message: 'Name must be at least 2 characters!' },
                  ]}
                  className="mb-0"
                >
                  <Input
                    placeholder="Last Name"
                    className="!bg-transparent !border-0 !border-b-2 !border-white/30 !rounded-none h-12 !text-white placeholder:!text-white/60 focus:!border-b-[#00AEEF] focus:!shadow-none hover:!border-b-white/50 px-0 focus:!bg-transparent"
                    style={{ boxShadow: 'none', borderRadius: 0 }}
                  />
                </Form.Item>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                  ]}
                  className="mb-0"
                >
                  <Input
                    placeholder="Email"
                    className="!bg-transparent !border-0 !border-b-2 !border-white/30 !rounded-none h-12 !text-white placeholder:!text-white/60 focus:!border-b-[#00AEEF] focus:!shadow-none hover:!border-b-white/50 px-0 focus:!bg-transparent"
                    style={{ boxShadow: 'none', borderRadius: 0 }}
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: 'Please enter your phone number!' },
                  ]}
                  className="mb-0"
                >
                  <Input
                    placeholder="Phone"
                    className="!bg-transparent !border-0 !border-b-2 !border-white/30 !rounded-none h-12 !text-white placeholder:!text-white/60 focus:!border-b-[#00AEEF] focus:!shadow-none hover:!border-b-white/50 px-0 focus:!bg-transparent"
                    style={{ boxShadow: 'none', borderRadius: 0 }}
                  />
                </Form.Item>
              </div>

              {/* Message */}
              <Form.Item
                name="message"
                rules={[
                  { required: true, message: 'Please enter your message!' },
                  { min: 10, message: 'Message must be at least 10 characters!' },
                ]}
                className="mb-0"
              >
                <TextArea
                  rows={4}
                  placeholder="Message"
                  className="!bg-transparent !border-0 !border-b-2 !border-white/30 !rounded-none !text-white placeholder:!text-white/60 focus:!border-b-[#00AEEF] focus:!shadow-none hover:!border-b-white/50 px-0 resize-none focus:!bg-transparent"
                  style={{ boxShadow: 'none', borderRadius: 0 }}
                />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item className="!mb-0 !mt-0 lg:!mt-10">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={isLoading} // ✅ Show loading spinner
                  className="!bg-[#00AEEF] hover:!bg-[#00AEEF]/80 !border-none h-12 text-base font-semibold rounded-md w-full sm:w-auto px-8"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ContactUsContent