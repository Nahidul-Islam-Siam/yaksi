// app/dashboard/adventure-packs/edit/[id]/page.tsx
'use client';

import { useRouter, useParams } from 'next/navigation';
import { Spin } from 'antd';
import { toast } from 'sonner';
import AdventurePackForm from '@/components/pages/dashboard/AdventurePackForm';
import {
    useGetAdventurePackByIdQuery,
    useUpdateAdventurePackMutation,
    TAdventurePackPayload,
} from '@/redux/api/adventurePack/adventurePackApi';
import { useGetAllJetSkisQuery } from '@/redux/api/jetSki/jetApi';

export default function EditAdventurePack() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    /* ---------- RTK Query hooks ---------- */
    const {
        data: packData,
        isLoading: packLoading,
        error: packError,
    } = useGetAdventurePackByIdQuery(id);

    const {
        data: jetData,
        isLoading: jetLoading,
        error: jetError,
    } = useGetAllJetSkisQuery({ page: 1, limit: 100 });

    const [updatePack, { isLoading: saving }] = useUpdateAdventurePackMutation();

    const jetSkis = jetData?.Data ?? [];
    const pack = packData;

    /* ---------- build initial values ---------- */
    const initialValues = pack
        ? {
            jetSkiId: typeof pack.jet_skyId === 'string'
                ? pack.jet_skyId
                : pack.jet_skyId._id, // handle both string and populated object
            title: pack.title,
            discountPercentage: pack.discountPercentage,
            ridesPricing3: pack.ridesPricing3,
            ridesPricing5: pack.ridesPricing5,
            ridesPricing8: pack.ridesPricing10,
            refundAmount: pack.refundAmount,
        }
        : undefined;

    /* ---------- submit handler ---------- */
    const handleSubmit = async (values: TAdventurePackPayload) => {
        try {
            await updatePack({ id, body: values }).unwrap();
            toast.success('Adventure pack updated');
            router.push('/dashboard/adventure-packs');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update adventure pack');
        }
    };

    /* ---------- loading states ---------- */
    if (packLoading || jetLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    /* ---------- error states ---------- */
    if (packError) {
        toast.error('Adventure pack not found');
        router.push('/dashboard/adventure-packs');
        return null;
    }

    if (jetError) {
        return <p>Error loading jet skis</p>;
    }

    /* ---------- render ---------- */
    return (
        <AdventurePackForm
            jetSkis={jetSkis}
            initial={initialValues}
            loading={saving}
            isEdit
            onSubmit={handleSubmit}
            onCancel={() => router.push('/dashboard/adventure-packs')}
        />
    );
}