'use client';

import { Modal, Form, Input, Button, Upload, Row, Col } from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useUpdateJetSkiMutation } from '@/redux/api/jetSki/jetApi';
import type { UploadProps, UploadFile } from 'antd';

interface EditJetSkiModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jetSki:any;
}

interface FormValues {
    jetSkiName: string;
    model: string;
    hp: string;
    price: string;
    descriptions: string;
}

export default function EditJetSkiModal({ open, onClose, onSuccess, jetSki }: EditJetSkiModalProps) {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [updateJetSki, { isLoading }] = useUpdateJetSkiMutation();

    console.log("here is the hehe hehe", jetSki);

    useEffect(() => {
        if (open && jetSki) {
            form.setFieldsValue({
                jetSkiName: jetSki.name,
                model: jetSki.model,
                hp: jetSki.hp.toString(),
                price: jetSki.price.toString(),
                descriptions: jetSki.description
            });

            // Set existing image if available
            if (jetSki.images?.[0]) {
                setFileList([{
                    uid: '-1',
                    name: 'current-image',
                    status: 'done',
                    url: jetSki.images?.[0],
                }]);
            } else {
                setFileList([]);
            }
        }
    }, [open, jetSki, form]);

    const handleSubmit = async (values: FormValues) => {
        if (!jetSki) return;

        try {
            const response = await updateJetSki({
                jetSkiId: jetSki._id,
                jetSkiData: {
                    name: values.jetSkiName,
                    model: values.model,
                    hp: parseInt(values.hp),
                    price: parseFloat(values.price),
                    description: values.descriptions,
                    // Only include image if a new file is uploaded
                    ...(fileList.length > 0 && fileList[0].originFileObj && {
                        image: fileList[0].originFileObj as File
                    })
                }
            }).unwrap();

            if (response.success) {
                toast.success('Jet ski updated successfully!');
                form.resetFields();
                setFileList([]);
                onSuccess();
                onClose();
            } else {
                toast.error(response.message || 'Failed to update jet ski');
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Update jet ski error:', error);
            
            // Handle different error scenarios
            if (error?.data?.message) {
                toast.error(error.data.message);
            } else if (error?.status === 400) {
                toast.error('Invalid data. Please check your inputs.');
            } else if (error?.status === 404) {
                toast.error('Jet ski not found');
            } else if (error?.status === 500) {
                toast.error('Server error. Please try again later');
            } else {
                toast.error('Failed to update jet ski. Please try again.');
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
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                toast.error('You can only upload JPG/PNG files!');
                return Upload.LIST_IGNORE;
            }
            const isLt25M = file.size / 1024 / 1024 < 25;
            if (!isLt25M) {
                toast.error('Image must be smaller than 25MB!');
                return Upload.LIST_IGNORE;
            }
            return false; // Prevent automatic upload
        },
        onChange: (info) => {
            setFileList(info.fileList.slice(-1)); // Keep only the latest file (single image)
        },
        onRemove: () => {
            setFileList([]);
        },
        fileList,
        maxCount: 1, // ✅ Only one image allowed
    };
    

    return (
        <Modal
            open={open}
            onCancel={handleCancel}
            footer={null}
            closeIcon={<CloseOutlined className="text-gray-400 hover:text-gray-600" />}
            centered
            width={600}
            title={
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Edit Jet Ski</h2>
                </div>
            }
            destroyOnHidden
        >
            <div className="pt-6">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    requiredMark={false}
                >
                    {/* Jet ski name and Model Row */}
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label={<span className="text-sm font-medium text-gray-700">Jet Ski Name*</span>}
                                name="jetSkiName"
                                rules={[
                                    { required: true, message: 'Please enter jet ski name' },
                                    { min: 2, message: 'Name must be at least 2 characters' }
                                ]}
                            >
                                <Input
                                    placeholder="Enter jet ski name"
                                    className="h-12 rounded-lg border-gray-300"
                                    disabled={isLoading}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label={<span className="text-sm font-medium text-gray-700">Model*</span>}
                                name="model"
                                rules={[{ required: true, message: 'Please enter model' }]}
                            >
                                <Input
                                    placeholder="Enter model"
                                    className="h-12 rounded-lg border-gray-300"
                                    disabled={isLoading}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* HP and Price Row */}
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label={<span className="text-sm font-medium text-gray-700">HP*</span>}
                                name="hp"
                                rules={[
                                    { required: true, message: 'Please enter HP' },
                                    { pattern: /^\d+$/, message: 'HP must be a valid number' }
                                ]}
                            >
                                <Input
                                    placeholder="Enter horsepower"
                                    className="h-12 rounded-lg border-gray-300"
                                    disabled={isLoading}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label={<span className="text-sm font-medium text-gray-700">Price*</span>}
                                name="price"
                                rules={[
                                    { required: true, message: 'Please enter price' },
                                    { pattern: /^\d+(\.\d{1,2})?$/, message: 'Please enter a valid price (e.g., 15000 or 15000.50)' }
                                ]}
                            >
                                <Input
                                    placeholder="Enter price"
                                    className="h-12 rounded-lg border-gray-300"
                                    disabled={isLoading}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Descriptions Field */}
                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Description*</span>}
                        name="descriptions"
                        rules={[
                            { required: true, message: 'Please enter description' },
                            { max: 500, message: 'Description cannot exceed 500 characters' }
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Enter jet ski description"
                            className="!border-gray-300 !rounded-lg"
                            rows={4}
                            showCount
                            maxLength={500}
                            disabled={isLoading}
                        />
                    </Form.Item>

                    {/* Image Upload - Single Image Only */}
                    <Form.Item
                        label={<span className="text-sm font-medium text-gray-700">Image (Optional)</span>}
                    >
                        <Upload.Dragger 
                            {...uploadProps} 
                            className="!border-2 !border-dashed !border-gray-300 !bg-gray-50"
                            disabled={isLoading}
                        >
                            <div className="text-gray-400 mb-2">
                                <UploadOutlined className="text-2xl block mx-auto" />
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
                            className="px-8 py-2 h-auto font-medium rounded-lg !border-none hover:!bg-[#0EA5E9]/80"
                            style={{
                                backgroundColor: '#0EA5E9',
                            }}
                        >
                            {isLoading ? 'Updating...' : 'Update Jet Ski'}
                        </Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}