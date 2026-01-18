import { baseApi } from '../baseApi';

/* ------------- Type definitions (match backend) ------------- */
export interface TMemberShip {
  success?: true;
  message?: string;
  _id: string;
  durationInMonths: number;
  ridesPerMonth: number;
  refundableDeposit: number;
  signUpFee: number;
  price: number;
  planId?: string;
  description: string;
}

/* ------------- Payload for PATCH ------------- */
export type TMemberShipUpdatePayload = Partial<
  Pick<
    TMemberShip,
    | "durationInMonths"
    | "ridesPerMonth"
    | "refundableDeposit"
    | "signUpFee"
    | "price"
    | "description"
    | "planId"
  >
>;

export const memberShipApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* GET  /memberShip/get  – returns the fixed list (no params) */
    getAllMemberShips: builder.query<TMemberShip[], void>({
      query: () => "/memberShip/get",
      transformResponse: (response: { Data: TMemberShip[] }) => response.Data,
      providesTags: ["MemberShip"],
    }),
    createMemberShip: builder.mutation<TMemberShip, TMemberShipUpdatePayload>({
      query: (body) => ({
        url: "/memberShip/create", // adjust if your backend route is different
        method: "POST",
        body,
      }),
      invalidatesTags: ["MemberShip"],
    }),

    // delete

    deleteMemberShip: builder.mutation({
      query: (id) => ({
        url: `/memberShip/delete/${id}`,
        method: "Delete",
      }),
      invalidatesTags: ["MemberShip"],
    }),

    /* PATCH /memberShip/update/:id  – partial update */
    updateMemberShip: builder.mutation<
      TMemberShip,
      { id: string; body: TMemberShipUpdatePayload }
    >({
      query: ({ id, body }) => ({
        url: `/memberShip/update/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["MemberShip"],
    }),
  }),
  overrideExisting: false,
});

/* -------- exported auto-generated hooks -------- */
export const {
    useCreateMemberShipMutation,
    useGetAllMemberShipsQuery,
    useUpdateMemberShipMutation,
    useDeleteMemberShipMutation
} = memberShipApi;