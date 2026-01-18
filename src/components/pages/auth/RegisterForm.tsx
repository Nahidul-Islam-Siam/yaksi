'use client';

import { useRouter } from 'next/navigation';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import { 
    UserOutlined, 
    MailOutlined, 
    LockOutlined, 
    PhoneOutlined,
    GlobalOutlined,
    FileTextOutlined,
    EyeInvisibleOutlined, 
    EyeTwoTone 
} from '@ant-design/icons';
import Link from 'next/link';
import { toast } from 'sonner';
import countries from '@/data/countries';
import { useRegisterUserMutation } from '@/redux/api/auth/authApi';

// Password validation regex: min 8 chars, 1 uppercase, 1 special char, 1 number
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d).{8,}$/;

interface SignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    country?: string;
    password: string;
    confirmPassword: string;
    drivingLicense?: string;
}

export default function RegisterForm() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const handleSubmit = async (values: SignUpFormData) => {
        try {
            const fullName = `${values.firstName} ${values.lastName}`.trim();

            // Prepare the data for API
            const registrationData = {
                name: fullName,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phoneNumber,
                password: values.password,
                ...(values.country && { country: values.country }),
                ...(values.drivingLicense && { drivingLicense: values.drivingLicense })
            };

            console.log('Registration Data:', registrationData);

            const response = await registerUser(registrationData).unwrap();

            if (response.success) {
                toast.success('Account created successfully!');
                router.push('/auth/login');
            } else {
                toast.error(response.message || 'Registration failed');
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Registration error:', error);
            
            // Handle different error scenarios
            if (error?.data?.message) {
                toast.error(error.data.message);
            } else if (error?.status === 400) {
                toast.error('Invalid registration data. Please check your inputs.');
            } else if (error?.status === 409) {
                toast.error('Email already exists. Please use a different email.');
            } else if (error?.status === 500) {
                toast.error('Server error. Please try again later');
            } else {
                toast.error('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-semibold text-center mb-6">Sign Up</h2>

                <Form
                    form={form}
                    name="signup"
                    onFinish={handleSubmit}
                    layout="vertical"
                    requiredMark={true}
                >
                    {/* First Name and Last Name Fields */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[
                                    { required: true, message: 'Please input your first name!' },
                                    { min: 2, message: 'First name must be at least 2 characters!' }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="text-gray-400" />}
                                    placeholder="Enter first name"
                                    size="large"
                                    className="rounded-lg"
                                    disabled={isLoading}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[
                                    { required: true, message: 'Please input your last name!' },
                                    { min: 2, message: 'Last name must be at least 2 characters!' }
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="text-gray-400" />}
                                    placeholder="Enter last name"
                                    size="large"
                                    className="rounded-lg"
                                    disabled={isLoading}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

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
                            placeholder="Enter your email"
                            size="large"
                            className="rounded-lg"
                            disabled={isLoading}
                        />
                    </Form.Item>

                    {/* Phone Number Field */}
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[
                            { required: true, message: 'Please input your phone number!' },
                            { pattern: /^[\+]?[0-9\s\-\(\)]{10,15}$/, message: 'Please enter a valid phone number!' }
                        ]}
                    >
                        <Input
                            prefix={<PhoneOutlined className="text-gray-400" />}
                            placeholder="Enter phone number"
                            size="large"
                            className="rounded-lg"
                            disabled={isLoading}
                        />
                    </Form.Item>

                    {/* Country Field - Optional */}
                    <Form.Item
                        label="Select Country"
                        name="country"
                    >
                        <Select
                            placeholder="Select Country name"
                            size="large"
                            className="rounded-lg"
                            showSearch
                            allowClear
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            suffixIcon={<GlobalOutlined className="text-gray-400" />}
                            options={countries.map(country => ({
                                value: country,
                                label: country
                            }))}
                            disabled={isLoading}
                        />
                    </Form.Item>

                    {/* Driving License Field - Optional */}
                    <Form.Item
                        label="Driving License"
                        name="drivingLicense"
                        rules={[
                            { min: 5, message: 'Driving license must be at least 5 characters!' }
                        ]}
                    >
                        <Input
                            prefix={<FileTextOutlined className="text-gray-400" />}
                            placeholder="Enter driving license number"
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
                            placeholder="Enter Password"
                            size="large"
                            className="rounded-lg"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            disabled={isLoading}
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
                            placeholder="Confirm Password"
                            size="large"
                            className="rounded-lg"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            disabled={isLoading}
                        />
                    </Form.Item>

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
                            {isLoading ? 'Creating Account...' : 'Sign up'}
                        </Button>
                    </Form.Item>

                    {/* Sign In Link */}
                    <div className="text-center mt-6">
                        <span className="text-gray-600">Already have an account? </span>
                        <Link href="/auth/login" className="!text-[#00AEEF] hover:!text-[#00AEEF]/[0.8] font-medium">
                            Sign In
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}