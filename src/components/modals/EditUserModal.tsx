'use client';

import { useState, useEffect } from 'react';
import {
    Modal,
    Form,
    Input,
    Row,
    Col,
    Button,
    Upload,
    message
} from 'antd';
import type { UploadFile, RcFile } from 'antd/es/upload/interface';
import { InboxOutlined } from '@ant-design/icons';
import { useUpdateUserMutation } from '@/redux/api/auth/authApi';
import { UpdateUserRequest } from '@/type/type';

interface Props {
    userId: string | null;
    open: boolean;
    onCancel: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSave: (values: any) => void;
    initialValues: {
        firstName?: string;
        lastName?: string;
        phone: string;
        email: string;
        country: string;
        avatar: string;
    };
}

export default function EditUserModal({
    userId,
    open,
    onCancel,
    onSave,
    initialValues
}: Props) {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    // Set form values when modal opens or initialValues change
    useEffect(() => {
        if (open && initialValues) {
            form.setFieldsValue({
                firstName: initialValues.firstName || '',
                lastName: initialValues.lastName || '',
                phone: initialValues.phone || '',
                email: initialValues.email || '',
                country: initialValues.country || '',
            });

            // Set existing avatar if available
            if (initialValues.avatar) {
                const existingFile: UploadFile = {
                    uid: '-1',
                    name: 'Current Avatar',
                    status: 'done',
                    url: initialValues.avatar,
                };
                setFileList([existingFile]);
            } else {
                setFileList([]);
            }
        }
    }, [open, initialValues, form]);

    /* Validate image type/size (≤ 25 MB) */
    const beforeUpload = (file: RcFile) => {
        const isImg = file.type.startsWith('image/');
        const isLt25 = file.size / 1024 / 1024 < 25;
        
        if (!isImg) {
            message.error('Only image files allowed');
            return Upload.LIST_IGNORE;
        }
        if (!isLt25) {
            message.error('Image must be smaller than 25 MB');
            return Upload.LIST_IGNORE;
        }
        return false; // Prevent auto upload, keep in fileList only
    };

    const handleFinish = async (values: UpdateUserRequest) => {
        if (!userId) {
            message.error('User ID is required');
            return;
        }

        try {
            const name = `${values.firstName} ${values.lastName}`;

            // Prepare data for API call
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const userData: any = {
                name: name,
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
                email: values.email,
            };

            // Only include country if provided
            if (values.country) {
                userData.country = values.country;
            }

            // Only include image if a new file is selected
            if (fileList.length > 0 && fileList[0].originFileObj) {
                userData.image = fileList[0].originFileObj;
            }

            const response = await updateUser({ 
                userId, 
                userData 
            }).unwrap();

            if (response.success) {
                message.success('Profile updated successfully!');
                onSave({ ...values, avatarFile: fileList[0] ?? null });
                onCancel();
            } else {
                message.error(response.message || 'Update failed');
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Update user error:', error);
            if (error?.data?.message) {
                message.error(error.data.message);
            } else if (error?.status === 400) {
                message.error('Invalid data. Please check your inputs.');
            } else if (error?.status === 404) {
                message.error('User not found');
            } else {
                message.error('Failed to update profile. Please try again.');
            }
        }
    };

    return (
        <Modal
            open={open}
            title="Edit Profile"
            onCancel={onCancel}
            footer={null}
            centered
            destroyOnHidden
            width={600}
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={handleFinish}
                initialValues={{
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    country: '',
                }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[{ required: true, message: 'Please enter first name' }]}
                        >
                            <Input 
                                placeholder="Enter first name" 
                                disabled={isLoading}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[{ required: true, message: 'Please enter last name' }]}
                        >
                            <Input 
                                placeholder="Enter last name" 
                                disabled={isLoading}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[{ required: true, message: 'Please enter phone number' }]}
                        >
                            <Input 
                                placeholder="Enter phone number" 
                                disabled={isLoading}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please enter email' },
                                { type: 'email', message: 'Please enter valid email' }
                            ]}
                        >
                            <Input 
                                placeholder="Enter email address" 
                                disabled={isLoading}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            name="country"
                            label="Country"
                        >
                            <Input 
                                placeholder="Enter country" 
                                disabled={isLoading}
                            />
                        </Form.Item>
                    </Col>

                    {/* Profile image uploader - Only one file allowed */}
                    <Col span={24}>
                        <Form.Item label="Profile Image">
                            <Upload.Dragger
                                multiple={false}
                                accept="image/*"
                                maxCount={1}
                                beforeUpload={beforeUpload}
                                fileList={fileList}
                                onChange={({ fileList }) => setFileList(fileList)}
                                showUploadList={{ 
                                    showRemoveIcon: true,
                                    showPreviewIcon: true 
                                }}
                                listType="picture"
                                disabled={isLoading}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag image to upload
                                </p>
                                <p className="ant-upload-hint text-xs text-gray-500">
                                    JPG/PNG • Max 25 MB • Single file only
                                </p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Col>
                </Row>

                <div className="flex justify-end gap-3 mt-6">
                    <Button 
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={isLoading}
                        className="!bg-[#00AEEF] !border-none !text-white hover:!bg-[#00AEEF]/80"
                    >
                        {isLoading ? 'Updating...' : 'Update Profile'}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}