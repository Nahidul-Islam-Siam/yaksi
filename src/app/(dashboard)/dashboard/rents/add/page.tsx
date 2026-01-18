'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCreateRentMutation } from '@/redux/api/rent/rentApi';
import { useGetAllJetSkisQuery } from '@/redux/api/jetSki/jetApi';
import RentForm from '@/components/pages/dashboard/RentForm';

export default function AddRentPage() {
    const router = useRouter();

    /* ---------- RTK Query hooks ---------- */
    const [createRent, { isLoading }] = useCreateRentMutation();
    const { data, isLoading: jetLoading, error } = useGetAllJetSkisQuery({});

    const jetSkis = data?.Data ?? [];

    /* ---------- form submit ---------- */
    // pages/dashboard/rents/add.tsx   (inside AddRentPage)
    const handleSubmit = async (values: {
        jetSkiId: string;          
        pricePerDay: number;       
        selectedFeatures: string[] 
    }) => {
        /* 1 — look-up the chosen jet-ski */
        const jet = jetSkis.find(j => j._id === values.jetSkiId);
        if (!jet) {
            toast.error('Selected Jet-ski not found');
            return;
        }

        console.log(values);

        /* 2 — shape the payload exactly as the API expects */
        const body = {
            jet_skyId: values.jetSkiId,     
            model: jet.model,
            hp: jet.hp,
            price: values.pricePerDay,  
            feature_list: values.selectedFeatures,
        };

        /* 3 — RTK-Query mutation */
        try {
            await createRent(body).unwrap();
            toast.success('Rent created');
            router.push('/dashboard/rents');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to create rent');
        }
    };
    if (jetLoading) return null;              // opt: loading skeleton
    if (error) return <p>Error loading jet skis</p>;

    return (
        <RentForm
            jetSkis={jetSkis}
            onSubmit={handleSubmit}
            onCancel={() => router.push('/dashboard/rents')}
            loading={isLoading}
        />
    );
}