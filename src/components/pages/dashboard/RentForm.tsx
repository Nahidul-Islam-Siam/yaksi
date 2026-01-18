// components/pages/dashboard/RentForm.tsx
'use client';

import { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Space,
    Card,
    Tag,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TJetSki } from '@/type/type';

interface RentFormProps {
    jetSkis: TJetSki[];
    initialValues?: {
        title?: string;
        jetSkiId?: string;
        selectedFeatures?: string[];
        pricePerDay?: number;
        description?: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (values: any) => void;
    onCancel: () => void;
    loading?: boolean;
    isEdit?: boolean;
}

export default function RentForm({
    jetSkis,
    initialValues,
    onSubmit,
    onCancel,
    loading = false,
    isEdit = false,
}: RentFormProps) {
    /* ----------------------------- STATE ----------------------------- */
    const [form] = Form.useForm();
    const [selectedJetSki, setSelectedJetSki] = useState<TJetSki | null>(null);
    const [features, setFeatures] = useState<string[]>(
        initialValues?.selectedFeatures ?? []
    );
    const [newFeature, setNewFeature] = useState('');

    /* ------------------------- INITIALISATION ------------------------ */
    useEffect(() => {
        if (initialValues?.jetSkiId) {
            const found = jetSkis.find((j) => j._id === initialValues.jetSkiId);
            setSelectedJetSki(found || null);

            // ★ pre-fill price if it wasn’t stored previously
            if (found && initialValues.pricePerDay === undefined) {
                form.setFieldValue('pricePerDay', found.price);
            }
        }
        form.setFieldsValue(initialValues);
    }, [initialValues, jetSkis, form]);

    /* --------------------- JET-SKI SELECTION ------------------------- */
    const handleJetSkiSelect = (id: string) => {
        const jet = jetSkis.find((js) => js._id === id) || null;
        setSelectedJetSki(jet);
        form.setFieldValue('jetSkiId', id);

        // ★ auto-fill price whenever a Jet-Ski is chosen
        if (jet) form.setFieldValue('pricePerDay', jet.price);
    };

    const getBrandFromModel = (model: string) => {
        if (model.includes('Sea-Doo')) return 'SEADOO';
        if (model.includes('Yamaha')) return 'YAMAHA';
        if (model.includes('Kawasaki')) return 'KAWASAKI';
        return 'SEADOO';
    };

    /* ----------------------- FEATURE HELPERS ------------------------- */
    const addFeature = (feat: string) => {
        const trimmed = feat.trim();
        if (trimmed && !features.includes(trimmed)) {
            setFeatures([...features, trimmed]);
        }
    };

    const handleAddCustomFeature = () => {
        addFeature(newFeature);
        setNewFeature('');
    };

    const handleRemoveFeature = (feat: string) =>
        setFeatures(features.filter((f) => f !== feat));

    /* --------------------------- SUBMIT ------------------------------ */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFinish = (values: any) =>
        onSubmit({ ...values, selectedFeatures: features });

    /* ----------------------------- UI -------------------------------- */
    return (
        <div className="py-6">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#00AEEF]">
                    {isEdit ? 'Edit Rent' : 'Create Rent'}
                </h2>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                requiredMark={false}
                className="!space-y-6"
            >
                {/* hidden jetSkiId */}
                <Form.Item name="jetSkiId" style={{ display: 'none' }}>
                    <Input />
                </Form.Item>

                {/* Jet-Ski grid */}
                <Form.Item
                    label={<span className="text-sm font-medium text-gray-700">Model</span>}
                    rules={[{ required: true, message: 'Please select a model' }]}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {jetSkis.map((js) => (
                            <Button
                                key={js._id}
                                onClick={() => handleJetSkiSelect(js._id)}
                                className={`h-12 rounded-lg font-medium ${selectedJetSki?._id === js._id
                                        ? '!bg-cyan-500 !text-white !border-cyan-500'
                                        : '!bg-white !text-gray-700 !border-gray-300 hover:!border-cyan-400'
                                    }`}
                            >
                                {getBrandFromModel(js.name)} {js.model}
                            </Button>
                        ))}
                    </div>
                </Form.Item>

                {/* Specs card */}
                {selectedJetSki && (
                    <Card size="small" className="mb-4 bg-blue-50">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <strong>Model:</strong> {selectedJetSki.model}
                            </div>
                            <div>
                                <strong>Power:</strong> {selectedJetSki.hp} HP
                            </div>
                            <div>
                                <strong>Price Per Day:</strong> ${selectedJetSki.price}
                            </div>
                        </div>
                    </Card>
                )}

                {/* Price (auto-filled, still editable) */}
                <Form.Item
                    label={<span className="text-sm font-medium text-gray-700">Price Per Day</span>}
                    name="pricePerDay"
                    rules={[
                        { required: true, message: 'Please enter pricing' },
                        { type: 'number', min: 1, message: 'Price must be greater than 0' },
                    ]}
                >
                    <Input
                        type="number"
                        min={1}
                        step="0.01"
                        prefix="$"
                        placeholder="0.00"
                        className="h-12 rounded-lg border-gray-300 max-w-md"
                    />
                </Form.Item>

                {/* Feature Management */}
                <Form.Item
                    label={<span className="text-sm font-medium text-gray-700">Features</span>}
                >
                    <Space.Compact style={{ width: '100%', marginBottom: 12 }}>
                        <Input
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            onPressEnter={handleAddCustomFeature}
                            placeholder="Add custom feature"
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddCustomFeature}
                            disabled={!newFeature.trim()}
                            className="!bg-[#00AEEF] !text-white hover:!bg-[#00AEEF]/[0.8] disabled:!bg-gray-200 disabled:!text-gray-400 !border-none"
                        >
                            Add
                        </Button>
                    </Space.Compact>

                    {features.length > 0 && (
                        <Space wrap style={{ marginBottom: 12 }}>
                            {features.map((f) => (
                                <Tag
                                    key={f}
                                    closable
                                    onClose={() => handleRemoveFeature(f)}
                                    color="blue"
                                >
                                    {f}
                                </Tag>
                            ))}
                        </Space>
                    )}
                </Form.Item>

                {/* hidden extras */}
                <Form.Item name="title" style={{ display: 'none' }}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" style={{ display: 'none' }}>
                    <Input />
                </Form.Item>

                {/* actions */}
                <Form.Item className="mb-0 !mt-8">
                    <div className="flex justify-center space-x-4">
                        <Button
                            onClick={onCancel}
                            className="px-8 py-2 h-auto font-medium rounded-lg"
                            style={{
                                border: '1px solid #d1d5db',
                                backgroundColor: '#fff',
                                color: '#6b7280',
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="px-8 py-2 h-auto font-medium rounded-lg"
                            style={{
                                backgroundColor: '#0EA5E9',
                                borderColor: '#0EA5E9',
                            }}
                        >
                            {isEdit ? 'Update Rent' : 'Create Rent'}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}