'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { toast } from 'sonner';
// import { useVerifyOtpMutation } from '@/redux/api/auth/authApi'; // We'll create this
import { useEffect } from 'react';

export default function VerifyOTPPage() {
  const [form] = Form.useForm();
  const [loading] = useState(false);
  const router = useRouter();

//   const [verifyOtp] = useVerifyOtpMutation();

  // ✅ Check if email exists in localStorage
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('resetEmail');
    if (!storedEmail) {
      toast.error('No email found. Please start from the beginning.');
      router.push('/auth/forgot-password');
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

//   const handleSubmit = async (values: { otp: string }) => {
//     if (!email) return;

//     setLoading(true);

//     try {
//       const res = await verifyOtp({ email, otp: values.otp }).unwrap();

//       if (res.success) {
//         toast.success('OTP verified! You can now reset your password.');

//         // ✅ Proceed to set new password
//         router.push('/auth/set-password'); // Will create next
//       } else {
//         toast.error(res.message || 'Invalid or expired OTP.');
//       }
//     } catch (error: unknown) {
//       const err = error as { data?: { message?: string } };
//       toast.error(err?.data?.message || 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

  if (!email) {
    return <div>Loading...</div>; // Or better: redirect handled above
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Verify OTP</h2>
        <p className="text-gray-600 mb-6 text-center">
          We&lsquo;ve sent a 6-digit code to <strong>{email}</strong>. Enter it below.
        </p>

        <Form
          form={form}
          name="verifyOtp"
        //   onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          {/* OTP Field */}
          <Form.Item
            label="Verification Code"
            name="otp"
            rules={[
              { required: true, message: 'Please enter the 6-digit code!' },
              { len: 6, message: 'OTP must be exactly 6 digits!' },
              { pattern: /^[0-9]+$/, message: 'OTP must be numeric!' },
            ]}
          >
            <Input
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter 6-digit code"
              size="large"
              maxLength={6}
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
              {loading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </Form.Item>

          {/* Resend OTP Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                router.push('/auth/forgot-password');
                toast.info('Requesting a new OTP...');
              }}
              className="text-[#00AEEF] hover:text-[#00AEEF]/80 font-medium"
              disabled={loading}
            >
              Resend Code
            </button>
          </div>

          {/* Back to Email Entry */}
          <div className="text-center mt-4">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              ← Change Email
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}