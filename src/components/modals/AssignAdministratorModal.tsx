'use client';

import { Modal, Form, Input, Button, Select } from 'antd';
import { CloseOutlined, GlobalOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import { useRegisterAdminMutation } from '@/redux/api/auth/authApi';
import countries from '@/data/countries';

interface AssignAdministratorModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

interface FormValues {
    name: string;
    email: string;
    phone: string;
    country: string;
    password: string;
    confirmPassword: string;
}

export default function AssignAdministratorModal({
    open,
    onClose,
    onSuccess
}: AssignAdministratorModalProps) {
    const [form] = Form.useForm();
    const [registerAdmin, { isLoading }] = useRegisterAdminMutation();

    const handleSubmit = async (values: FormValues) => {
        try {
            // Prepare data for API (exclude confirmPassword)
            const adminData = {
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: values.password,
                ...(values.country && { country: values.country }) // Only include if provided
            };

            const response = await registerAdmin(adminData).unwrap();

            if (response.success) {
                toast.success('Administrator assigned successfully!');
                form.resetFields();
                onSuccess();
                onClose();
            } else {
                toast.error(response.message || 'Failed to assign administrator');
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Register admin error:', error);
            
            // Handle different error scenarios
            if (error?.data?.message) {
                toast.error(error.data.message);
            } else if (error?.status === 400) {
                toast.error('Invalid data. Please check your inputs.');
            } else if (error?.status === 409) {
                toast.error('Email already exists. Please use a different email.');
            } else if (error?.status === 500) {
                toast.error('Server error. Please try again later');
            } else {
                toast.error('Failed to assign administrator. Please try again.');
            }
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={handleCancel}
            footer={null}
            closeIcon={<CloseOutlined className="text-gray-400 hover:text-gray-600" />}
            centered
            width={800}
        >
            <div className="p-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Assign Administrator
                    </h2>
                </div>

                {/* Form */}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    requiredMark={false}
                >
                    {/* Admin Information Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Admin Information
                        </h3>
                    </div>

                    {/* Name Field */}
                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Name*</span>}
                        name="name"
                        rules={[
                            { required: true, message: 'Please enter the full name' },
                            { min: 2, message: 'Name must be at least 2 characters' }
                        ]}
                    >
                        <Input
                            placeholder="Enter full name"
                            className="h-12 rounded-lg border-gray-300"
                            disabled={isLoading}
                        />
                    </Form.Item>

                    {/* Email Field */}
                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Email*</span>}
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter the email' },
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                    >
                        <Input
                            placeholder="Enter email address"
                            className="h-12 rounded-lg border-gray-300"
                            disabled={isLoading}
                        />
                    </Form.Item>

                    {/* Phone Number Field */}
                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Phone Number*</span>}
                        name="phone"
                        rules={[
                            { required: true, message: 'Please enter phone number' },
                            { pattern: /^[\+]?[0-9\s\-\(\)]{10,15}$/, message: 'Please enter a valid phone number' }
                        ]}
                    >
                        <Input
                            placeholder="Enter phone number"
                            className="h-12 rounded-lg border-gray-300"
                            disabled={isLoading}
                        />
                    </Form.Item>

                    {/* Country Dropdown Field (Optional) */}
                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Country</span>}
                        name="country"
                    >
                        <Select
                            placeholder="Select country name"
                            className="h-12"
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
                            style={{ height: '48px' }}
                        />
                    </Form.Item>

                    {/* Password Field */}
                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Password*</span>}
                        name="password"
                        rules={[
                            { required: true, message: 'Please enter password' },
                            { min: 8, message: 'Password must be at least 8 characters' },
                            {
                                pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d).{8,}$/,
                                message: 'Password must contain uppercase, number, and special character'
                            }
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter password"
                            className="h-12 rounded-lg border-gray-300"
                            disabled={isLoading}
                        />
                    </Form.Item>

                    {/* Confirm Password Field */}
                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Confirm Password*</span>}
                        name="confirmPassword"
                        rules={[
                            { required: true, message: 'Please confirm your password' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirm password"
                            className="h-12 rounded-lg border-gray-300"
                            disabled={isLoading}
                        />
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item className="mb-0 mt-8">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            disabled={isLoading}
                            className="w-full h-12 rounded-lg font-medium text-base"
                            style={{
                                backgroundColor: '#0EA5E9',
                                borderColor: '#0EA5E9'
                            }}
                        >
                            {isLoading ? 'Assigning...' : 'Assign Administrator'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
}