'use client';

import { useRouter } from 'next/navigation';
import { Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Link from 'next/link';
import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';
import { useLoginMutation } from '@/redux/api/auth/authApi';
import { JWTPayload } from '@/type/type';

// Password validation regex: min 8 chars, 1 uppercase, 1 special char, 1 number
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d).{8,}$/;

export default function LoginForm() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [login, { isLoading }] = useLoginMutation();

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            const response = await login(values).unwrap();

            if (response.success) {
                const token = response.Data[0]; // Get token from response

                // Decode JWT token using jwt-decode
                const decoded = jwtDecode<JWTPayload>(token);

                // Show success message
                toast.success(`Welcome ${decoded.userEmail}!`);

                // Navigate based on role
                if (decoded.role === 'Administrator' || decoded.role === 'Admin') {
                    router.push('/dashboard');
                } else if (decoded.role === 'User') {
                    router.push('/');
                } else {
                    // Default fallback
                    router.push('/');
                }

            } else {
                toast.error(response.message || 'Login failed');
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // Handle different error scenarios
            if (error?.data?.message) {
                toast.error(error.data.message);
            } else if (error?.status === 401) {
                toast.error('Invalid email or password');
            } else if (error?.status === 500) {
                toast.error('Server error. Please try again later');
            } else {
                toast.error('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-semibold text-center mb-6">Sign In</h2>

                <Form
                    form={form}
                    name="login"
                    onFinish={handleSubmit}
                    layout="vertical"
                    requiredMark={false}
                >
                    {/* Email Field */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email address!' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder="Enter Email Address"
                            size="large"
                            className="rounded-lg"
                            disabled={isLoading}
                        />
                    </Form.Item>

                    {/* Password Field */}
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            {
                                validator: (_, value) => {
                                    if (!value) {
                                        return Promise.reject(new Error('Password is required!'));
                                    }
                                    if (!passwordRegex.test(value)) {
                                        return Promise.reject(
                                            new Error('Password must be at least 8 characters with uppercase, number, and special character!')
                                        );
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Enter password"
                            size="large"
                            className="rounded-lg"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            disabled={isLoading}
                        />
                    </Form.Item>

                    {/* Forgot Password Link */}
                    <div className="text-right mb-4">
                        <Link href="/auth/forgot-password" className="text-sm !text-[#00AEEF] hover:!text-[#00AEEF]/[0.8]">
                            Forgot Password ?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            size="large"
                            className="w-full rounded-lg !bg-[#00AEEF] hover:!bg-[#00AEEF]/[0.8] border-none h-12 font-medium"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </Form.Item>

                    {/* Sign Up Link */}
                    <div className="text-center mt-6">
                        <span className="text-gray-600">Don&apos;t have an account? </span>
                        <Link href="/auth/register" className="!text-[#00AEEF] hover:!text-[#00AEEF]/[0.8] font-medium">
                            Sign Up
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}