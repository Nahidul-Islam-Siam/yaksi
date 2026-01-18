/* redux/api/adventurePack/adventurePackApi.ts
   ---------------------------------------------------------------
   Adventure-Pack CRUD endpoints added to the shared baseApi.
---------------------------------------------------------------- */

import { baseApi } from "../baseApi";

/* -------------------- Types -------------------- */
export interface TAdventurePack {
  _id: string;
  jet_skyId:
    | string
    | {
        images: string;
        _id: string;
        name: string;
        model: string;
        hp: number;
        price: number;
        image: string;
      };
  title: string;
  images?: string;
  discountPercentage: number;
  ridesPricing3: number;
  ridesPricing5: number;
  ridesPricing10: number;
  refundAmount: number;
  createdAt: string;
  updatedAt: string;
}

/* Body used for create / update */
export type TAdventurePackPayload = Partial<
  Pick<
    TAdventurePack,
    | "jet_skyId"
    | "title"
    | "discountPercentage"
    | "ridesPricing3"
    | "ridesPricing5"
    | "ridesPricing10"
    | "refundAmount"
  >
>;

type TListParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
};

export const adventurePackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------- CREATE ---------- */
    createAdventurePack: builder.mutation<
      TAdventurePack,
      TAdventurePackPayload
    >({
      query: (body) => ({
        url: "/adventurePack/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdventurePack"],
    }),

    /* ---------- GET ALL ---------- */
    getAllAdventurePacks: builder.query<TAdventurePack[], TListParams>({
      query: (args = {}) => {
        const { page, limit, searchTerm } = args;
        return {
          url: "/adventurePack/get",
          params: { page, limit, searchTerm },
        };
      },
      transformResponse: (res: { Data: TAdventurePack[] }) => res.Data,
      providesTags: ["AdventurePack"],
    }),

    /* ---------- GET BY ID ---------- */
    getAdventurePackById: builder.query<TAdventurePack, string>({
      query: (id) => `/adventurePack/get/${id}`,
      transformResponse: (res: { Data: TAdventurePack[] }) => res.Data[0],
      providesTags: (_result, _err, id) => [{ type: "AdventurePack", id }],
    }),

    /* ---------- UPDATE ---------- */
    updateAdventurePack: builder.mutation<
      TAdventurePack,
      { id: string; body: TAdventurePackPayload }
    >({
      query: ({ id, body }) => ({
        url: `/adventurePack/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "AdventurePack", id }],
    }),

    /* ---------- DELETE ---------- */
    deleteAdventurePack: builder.mutation<{ _id: string }, string>({
      query: (id) => ({
        url: `/adventurePack/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_r, _e, id) => [{ type: "AdventurePack", id }],
    }),
  }),
  overrideExisting: false,
});

/* --------------- Hooks --------------- */
export const {
  useCreateAdventurePackMutation,
  useGetAllAdventurePacksQuery,
  useGetAdventurePackByIdQuery,
  useUpdateAdventurePackMutation,
  useDeleteAdventurePackMutation,
} = adventurePackApi;
