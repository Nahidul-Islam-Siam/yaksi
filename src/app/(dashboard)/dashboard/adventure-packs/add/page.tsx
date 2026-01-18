// app/dashboard/adventure-packs/add/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import AdventurePackForm from '@/components/pages/dashboard/AdventurePackForm';
import {
    useCreateAdventurePackMutation,
    TAdventurePackPayload,
} from '@/redux/api/adventurePack/adventurePackApi';
import { useGetAllJetSkisQuery } from '@/redux/api/jetSki/jetApi';

export default function AddAdventurePack() {
    const router = useRouter();

    /* RTK-Query hooks */
    const [createPack] = useCreateAdventurePackMutation();
    const { data: jetData, isLoading: jetLoading, error: jetError } = useGetAllJetSkisQuery({
        page: 1,
        limit: 100,
    });

    const [saving, setSaving] = useState(false);
    const jetSkis = jetData?.Data ?? [];

    /* submit handler */
    const handleSubmit = async (values: TAdventurePackPayload) => {
        setSaving(true);
        try {
            await createPack(values).unwrap();
            toast.success('Adventure pack created');
            router.push('/dashboard/adventure-packs');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err?.data?.message || 'Failed to create adventure pack');
        } finally {
            setSaving(false);
        }
    };

    if (jetLoading) return null;
    if (jetError) return <p>Error loading jet skis</p>;

    return (
        <AdventurePackForm
            jetSkis={jetSkis}
            loading={saving}
            onSubmit={handleSubmit}
            onCancel={() => router.push('/dashboard/adventure-packs')}
        />
    );
}