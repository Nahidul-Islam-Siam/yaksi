/* pages/dashboard/membership-plans/edit/[id].tsx */
'use client';

import { Form, Input, Button, Spin } from 'antd';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import {
    useGetAllMemberShipsQuery,
    useUpdateMemberShipMutation,
} from '@/redux/api/memberShip/memberShipApi';

interface FormValues {
    durationInMonths: number;
    ridesPerMonth: number;
    signUpFee: number;
    refundableDeposit: number;
    price: number;
    description: string;
}

export default function EditMembershipPlanPage() {
    const router = useRouter();
    const { id: planId } = useParams<{ id: string }>();

    /* ---------- queries ---------- */
    const { data: plans, isFetching } = useGetAllMemberShipsQuery();
    const [updatePlan, { isLoading: saving }] = useUpdateMemberShipMutation();

    /* ---------- locate the plan ---------- */
    const plan = plans?.find(p => p._id === planId);

    /* redirect if not found after load */
    useEffect(() => {
        if (!isFetching && !plan) {
            toast.error('Plan not found');
            router.push('/dashboard/membership-plans');
        }
    }, [isFetching, plan, router]);

    /* ---------- form instance ---------- */
    const [form] = Form.useForm<FormValues>();

    /* set initial fields once data is ready */
    useEffect(() => {
        if (plan) {
            form.setFieldsValue({
                durationInMonths: plan.durationInMonths,
                ridesPerMonth: plan.ridesPerMonth,
                signUpFee: plan.signUpFee,
                refundableDeposit: plan.refundableDeposit,
                price: plan.price,
                description: plan.description,
            });
        }
    }, [plan, form]);

    /* ---------- submit ---------- */
    const handleSubmit = async (values: FormValues) => {
        try {
            await updatePlan({
                id: planId,
                body: values,          // values already match API field names
            }).unwrap();

            toast.success('Membership plan updated');
            router.push('/dashboard/membership-plans');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update plan');
        }
    };

    if (isFetching || !plan) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    /* ---------- UI ---------- */
    return (
        <div className="py-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#00AEEF]">Membership Plan</h2>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Form.Item
                        label="Duration (in months)"
                        name="durationInMonths"
                        rules={[
                            { required: true, message: 'Please enter duration' },
                            { type: 'number', min: 1 },
                        ]}
                    >
                        <Input type="number" className="h-12 rounded-lg border-gray-300" />
                    </Form.Item>

                    <Form.Item
                        label="Rides per month"
                        name="ridesPerMonth"
                        rules={[
                            { required: true, message: 'Please enter rides per month' },
                            { type: 'number', min: 1 },
                        ]}
                    >
                        <Input type="number" className="h-12 rounded-lg border-gray-300" />
                    </Form.Item>

                    <Form.Item
                        label="Signup Fee"
                        name="signUpFee"
                        rules={[
                            { required: true, message: 'Please enter signup fee' },
                            { type: 'number', min: 0 },
                        ]}
                    >
                        <Input type="number" className="h-12 rounded-lg border-gray-300" />
                    </Form.Item>

                    <Form.Item
                        label="Refundable Deposit*"
                        name="refundableDeposit"
                        rules={[
                            { required: true, message: 'Please enter refundable deposit' },
                            { type: 'number', min: 0 },
                        ]}
                    >
                        <Input type="number" className="h-12 rounded-lg border-gray-300" />
                    </Form.Item>

                    <Form.Item
                        label="Pricing"
                        name="price"
                        className="md:col-span-2"
                        rules={[
                            { required: true, message: 'Please enter pricing' },
                        ]}
                    >
                        <Input type="number" className="h-12 rounded-lg border-gray-300" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        className="md:col-span-2"
                        rules={[{ required: true, message: 'Please enter description' }]}
                    >
                        <Input.TextArea
                            rows={4}
                            className="rounded-lg border-gray-300"
                        />
                    </Form.Item>
                </div>

                <Form.Item className="mb-0 mt-8">
                    <div className="flex justify-center space-x-4">
                        <Button
                            onClick={() => router.push('/dashboard/membership-plans')}
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
                            loading={saving}
                            className="px-8 py-2 h-auto font-medium rounded-lg"
                            style={{ backgroundColor: '#0EA5E9', borderColor: '#0EA5E9' }}
                        >
                            Save Plan
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}