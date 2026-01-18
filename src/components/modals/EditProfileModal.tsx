'use client';

import { Modal, Form, Input, Button, Upload, Row, Col, Select } from 'antd';
import { CloseOutlined, UploadOutlined, GlobalOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { UploadProps, UploadFile } from 'antd';
import { useUpdateUserMutation } from '@/redux/api/auth/authApi';
import countries from '@/data/countries';

interface EditAdminProfileModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    adminData: {
        id: string;
        name: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        country: string;
        introduction: string;
        avatar: string;
    };
}

interface FormValues {
    name: string;
    phone: string;
    email: string;
    country: string;
    introduction: string;
}

export default function EditAdminProfileModal({
    open,
    onClose,
    onSuccess,
    adminData
}: EditAdminProfileModalProps) {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    // Initialize form with admin data when modal opens
    useEffect(() => {
        if (open) {
            form.setFieldsValue({
                name: adminData.name || `${adminData.firstName} ${adminData.lastName}`.trim(),
                phone: adminData.phone,
                email: adminData.email,
                country: adminData.country,
                introduction: adminData.introduction
            });

            // Set existing avatar if available
            if (adminData.avatar) {
                setFileList([{
                    uid: '-1',
                    name: 'current-avatar',
                    status: 'done',
                    url: adminData.avatar
                }]);
            } else {
                setFileList([]);
            }
        }
    }, [open, adminData, form]);

    const handleSubmit = async (values: FormValues) => {
        try {
            // Prepare FormData for multipart/form-data
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('phone', values.phone);
            formData.append('email', values.email);
            formData.append('country', values.country || '');
            formData.append('introduction', values.introduction || '');

            // Add image file if uploaded
            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append('image', fileList[0].originFileObj);
            }

            const response = await updateUser({
                userId: adminData.id,
                userData: Object.fromEntries(formData.entries())
            }).unwrap();

            if (response.success) {
                toast.success('Profile updated successfully!');
                form.resetFields();
                setFileList([]);
                onSuccess();
                onClose();
            } else {
                toast.error(response.message || 'Failed to update profile');
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Update profile error:', error);

            if (error?.data?.message) {
                toast.error(error.data.message);
            } else if (error?.status === 400) {
                toast.error('Invalid data. Please check your inputs.');
            } else if (error?.status === 404) {
                toast.error('User not found');
            } else if (error?.status === 500) {
                toast.error('Server error. Please try again later');
            } else {
                toast.error('Failed to update profile. Please try again.');
            }
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setFileList([]);
        onClose();
    };

    const uploadProps: UploadProps = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        beforeUpload: (file: any) => {
            const isImg = file.type.startsWith('image/');
            const isLt25M = file.size / 1024 / 1024 < 25;

            if (!isImg) {
                toast.error('Only image files are allowed!');
                return Upload.LIST_IGNORE;
            }
            if (!isLt25M) {
                toast.error('Image must be smaller than 25MB!');
                return Upload.LIST_IGNORE;
            }
            return false; // Prevent automatic upload
        },
        onChange: (info) => {
            setFileList(info.fileList.slice(-1)); // Keep only the latest file
        },
        onRemove: () => {
            setFileList([]);
        },
        fileList,
        maxCount: 1, // Only one image allowed
    };

    return (
        <Modal
            open={open}
            onCancel={handleCancel}
            footer={null}
            closeIcon={
                <CloseOutlined className="text-red-500 hover:text-red-600 text-lg" />
            }
            centered
            width={600}
            className="edit-profile-modal"
            destroyOnHidden
        >
            <div className="p-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Edit Profile
                    </h2>
                </div>

                {/* Form */}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    requiredMark={false}
                >
                    {/* Name and Phone Row */}
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label={<span className="text-sm font-medium text-gray-700">Name</span>}
                                name="name"
                                rules={[
                                    { required: true, message: 'Please enter your name' },
                                    { min: 2, message: 'Name must be at least 2 characters' }
                                ]}
                            >
                                <Input
                                    placeholder="Enter Name"
                                    className="h-12 rounded-lg border-gray-300"
                                    disabled={isLoading}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label={<span className="text-sm font-medium text-gray-700">Phone</span>}
                                name="phone"
                                rules={[
                                    { required: true, message: 'Please enter your phone' },
                                    { pattern: /^[\+]?[0-9\s\-\(\)]{10,15}$/, message: 'Please enter a valid phone number' }
                                ]}
                            >
                                <Input
                                    placeholder="Enter Phone Number"
                                    className="h-12 rounded-lg border-gray-300"
                                    disabled={isLoading}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Email and Country Row */}
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label={<span className="text-sm font-medium text-gray-700">Email</span>}
                                name="email"
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    { type: 'email', message: 'Please enter a valid email' }
                                ]}
                            >
                                <Input
                                    placeholder="Enter Email"
                                    className="h-12 rounded-lg border-gray-300"
                                    disabled={isLoading}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
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
                        </Col>
                    </Row>

                    {/* Introduction Field */}
                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Introduction</span>}
                        name="introduction"
                    >
                        <Input.TextArea
                            placeholder="Enter introduction"
                            className="!border-gray-300 !rounded-lg"
                            rows={4}
                            showCount
                            maxLength={500}
                            disabled={isLoading}
                        />
                    </Form.Item>

                    {/* Profile Image Upload - Single Image Only */}
                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Profile Image (Optional)</span>}
                    >
                        <Upload.Dragger
                            {...uploadProps}
                            className="!border-2 !border-dashed !border-gray-300 !bg-gray-50"
                            disabled={isLoading}
                        >
                            <div className="text-gray-400 mb-2">
                                <UploadOutlined className="text-2xl" />
                            </div>
                            <div className="text-gray-600 mb-2">
                                <span className="font-medium">Click or drag image to upload</span>
                            </div>
                            <div className="text-gray-400 text-sm">
                                JPG/PNG only • Max 25 MB • Single image only
                            </div>
                        </Upload.Dragger>
                    </Form.Item>

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4 mt-8">
                        <Button
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="px-8 py-2 h-auto font-medium rounded-lg"
                            style={{
                                border: '1px solid #d1d5db',
                                backgroundColor: '#fff',
                                color: '#6b7280'
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            disabled={isLoading}
                            className="px-8 py-2 h-auto font-medium rounded-lg !border-none hover:!bg-[#00AEEF]/80"
                            style={{
                                backgroundColor: '#00AEEF',
                            }}
                        >
                            {isLoading ? 'Updating...' : 'Update Profile'}
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}