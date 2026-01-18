import { baseApi } from '../baseApi';
import { CreateJetSkiRequest, GetAllJetParams, TApiResponse, TJetSki, UpdateJetSkiRequest } from '@/type/type';

export const jetApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Create Jet Ski
        createJetSki: builder.mutation<TApiResponse<TJetSki[]>, CreateJetSkiRequest>({
            query: (jetSkiData) => {
                const formData = new FormData();

                // Append all form fields
                formData.append('name', jetSkiData.name);
                formData.append('model', jetSkiData.model);
                formData.append('hp', jetSkiData.hp.toString());
                formData.append('price', jetSkiData.price.toString());
                formData.append('description', jetSkiData.description);
                formData.append('image', jetSkiData.image);

                return {
                    url: '/jet/create',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['JetSki'],
        }),

        // Get All Jet Skis
        getAllJetSkis: builder.query<TApiResponse<TJetSki[]>, GetAllJetParams>({
            query: ({ page = 1, limit = 10, searchTerm = '' } = {}) => ({
                url: '/jet/get',
                params: { page, limit, searchTerm },
            }),
            providesTags: ['JetSki'],
        }),

        // Get Single Jet Ski
        getJetSkiById: builder.query<TApiResponse<TJetSki[]>, string>({
            query: (jetSkiId) => `/jet/get/${jetSkiId}`,
            providesTags: (result, error, jetSkiId) => [{ type: 'JetSki', id: jetSkiId }],
        }),

        // Update Jet Ski
        updateJetSki: builder.mutation<
            TApiResponse<TJetSki>,
            { jetSkiId: string; jetSkiData: UpdateJetSkiRequest }
        >({
            query: ({ jetSkiId, jetSkiData }) => {
                const formData = new FormData();

                // Only append fields that are provided
                Object.entries(jetSkiData).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        if (key === 'image' && value instanceof File) {
                            formData.append('image', value);
                        } else if (key === 'hp' || key === 'price') {
                            formData.append(key, value.toString());
                        } else {
                            formData.append(key, value as string);
                        }
                    }
                });

                return {
                    url: `/jet/update/${jetSkiId}`,
                    method: 'PATCH',
                    body: formData,
                };
            },
            invalidatesTags: (result, error, { jetSkiId }) => [
                { type: 'JetSki', id: jetSkiId },
                'JetSki',
            ],
        }),

        // Delete Jet Ski
        deleteJetSki: builder.mutation<TApiResponse<TJetSki>, string>({
            query: (jetSkiId) => ({
                url: `/jet/delete/${jetSkiId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['JetSki'],
        }),
    }),
});

export const {
    useCreateJetSkiMutation,
    useGetAllJetSkisQuery,
    useGetJetSkiByIdQuery,
    useUpdateJetSkiMutation,
    useDeleteJetSkiMutation,
} = jetApi;