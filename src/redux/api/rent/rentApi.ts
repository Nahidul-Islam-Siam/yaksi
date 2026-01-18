import { CreateRentRequest, Rent, TApiResponse, UpdateRentRequest } from '@/type/type';
import { baseApi } from '../baseApi';

export const rentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRent: builder.mutation<TApiResponse<Rent[]>, CreateRentRequest>({
      query: (body) => ({
        url: '/rent/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Rent'],
    }),

    getAllRents: builder.query<
      TApiResponse<Rent[]>,
      { page?: number; limit?: number; searchTerm?: string } | void
    >({
      query: ({ page = 1, limit = 10, searchTerm = '' } = {}) => ({
        url: '/rent/get',
        params: { page, limit, searchTerm },
      }),
      providesTags: ['Rent'],
    }),

    getRentById: builder.query<TApiResponse<Rent[]>, string>({
      query: (id) => `/rent/get/${id}`,
      providesTags: (_res, _err, id) => [{ type: 'Rent', id }],
    }),

    updateRent: builder.mutation<
      TApiResponse<Rent>,
      { rentId: string; data: UpdateRentRequest }
    >({
      query: ({ rentId, data }) => ({
        url: `/rent/update/${rentId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_r, _e, { rentId }) => [
        { type: 'Rent', id: rentId },
        'Rent',
      ],
    }),

    deleteRent: builder.mutation<TApiResponse<Rent>, string>({
      query: (rentId) => ({
        url: `/rent/delete/${rentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rent'],
    }),
  }),
});

export const {
  useCreateRentMutation,
  useGetAllRentsQuery,
  useGetRentByIdQuery,
  useUpdateRentMutation,
  useDeleteRentMutation,
} = rentApi;