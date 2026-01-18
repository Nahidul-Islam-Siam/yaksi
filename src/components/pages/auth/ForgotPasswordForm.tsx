'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { toast } from 'sonner';
import { useForgotPasswordMutation } from '@/redux/api/auth/authApi';

interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  Data: {
    email: string;
    message: string;
  };
}

export default function ForgotPasswordForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (values: ForgotPasswordFormData) => {
    setLoading(true);

    try {
      const res: ForgotPasswordResponse = await forgotPassword(values).unwrap();

      if (res.success) {
        toast.success(res.message || 'Password reset code sent successfully!');
        form.resetFields();

        // ✅ Save email to localStorage (for verify-otp page)
        localStorage.setItem('resetEmail', res.Data.email);

        // ✅ Redirect to verify-otp page
        router.push('/auth/verify-otp');
      } else {
        toast.error(res.message || 'Failed to send reset code.');
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Forgot Password?</h2>
        <p className="text-gray-600 mb-6 text-center">Enter your email to receive a reset code.</p>

        <Form
          form={form}
          name="forgotPassword"
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          {/* Email Field */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter your email"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              className="w-full rounded-lg !bg-[#00AEEF] hover:!bg-[#00AEEF]/80 border-none h-12 font-medium"
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </Button>
          </Form.Item>

          {/* Back to Login */}
          <div className="text-center mt-6">
            <span className="text-gray-600">Remember your password? </span>
            <Link
              href="/auth/login"
              className="font-medium text-[#00AEEF] hover:text-[#00AEEF]/80 transition"
            >
              Back to Sign In
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
