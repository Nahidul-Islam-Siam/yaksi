'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button } from 'antd';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Link from 'next/link';
import { toast } from 'sonner';

// Password validation regex: min 8 chars, 1 uppercase, 1 special char, 1 number
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d).{8,}$/;

interface SetNewPasswordFormData {
    password: string;
    confirmPassword: string;
}

export default function SetNewPasswordForm() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: SetNewPasswordFormData) => {
        setLoading(true);

        try {
            // Console log form data
            console.log('Set New Password Form Data:', {
                password: values.password,
                confirmPassword: values.confirmPassword,
                timestamp: new Date().toISOString()
            });

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('Password updated successfully!');
            router.push('/login');

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <Form
                    form={form}
                    name="setNewPassword"
                    onFinish={handleSubmit}
                    layout="vertical"
                    requiredMark={false}
                >
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
                            placeholder="Enter New Password"
                            size="large"
                            className="rounded-lg"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    {/* Confirm Password Field */}
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Confirm New Password"
                            size="large"
                            className="rounded-lg"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            size="large"
                            className="w-full rounded-lg !bg-[#00AEEF] hover:!bg-[#00AEEF]/[0.8] border-none h-12 font-medium"
                        >
                            Done
                        </Button>
                    </Form.Item>

                    {/* Back to Login Link */}
                    <div className="text-center mt-6">
                        <span className="text-gray-600">Remember your password? </span>
                        <Link href="/auth/login" className="!text-[#00AEEF] hover:!text-[#00AEEF]/[0.8] font-medium">
                            Back to Sign In
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}