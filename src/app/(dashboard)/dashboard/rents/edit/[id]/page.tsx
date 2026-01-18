/* pages/dashboard/rents/edit/[id].tsx */
'use client';

import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useGetAllJetSkisQuery } from '@/redux/api/jetSki/jetApi';
import {
    useGetRentByIdQuery,
    useUpdateRentMutation,
} from '@/redux/api/rent/rentApi';
import RentForm from '@/components/pages/dashboard/RentForm';
import { TJetSki } from '@/type/type';

export default function EditRentPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    /* ---------- queries ---------- */
    const {
        data: rentRes,
        isLoading: rentLoading,
        error: rentError,
    } = useGetRentByIdQuery(id);

    const {
        data: jetRes,
        isLoading: jetLoading,
        error: jetError,
    } = useGetAllJetSkisQuery({});

    const [updateRent, { isLoading: saving }] = useUpdateRentMutation();

    const jetSkis: TJetSki[] = jetRes?.Data ?? [];

    /* ---------- build initial values ---------- */
    const rent = rentRes?.Data[0];
    const initialValues = rent
        ? {
            jetSkiId: rent.jet_skyId._id,
            selectedFeatures: rent.feature_list,
            pricePerDay: rent.price,
        }
        : undefined;

    /* ---------- submit ---------- */
    const handleSubmit = async (vals: {
        jetSkiId: string;
        pricePerDay: number;
        selectedFeatures: string[];
    }) => {
        const jet = jetSkis.find((j) => j._id === vals.jetSkiId);
        if (!jet) {
            toast.error('Selected Jet-ski not found');
            return;
        }

        const body = {
            jet_skyId: vals.jetSkiId,
            model: jet.model,
            hp: jet.hp,
            price: vals.pricePerDay,
            feature_list: vals.selectedFeatures,
        };

        try {
            await updateRent({ rentId: id, data: body }).unwrap();
            toast.success('Rent updated');
            router.push('/dashboard/rents');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to update rent');
        }
    };

    /* ---------- loading / error ---------- */
    if (rentLoading || jetLoading) return null;
    if (rentError) return <p>Error loading rent</p>;
    if (jetError) return <p>Error loading jet skis</p>;

    /* ---------- render form ---------- */
    return (
        <RentForm
            jetSkis={jetSkis}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onCancel={() => router.push('/dashboard/rents')}
            loading={saving}
            isEdit
        />
    );
}