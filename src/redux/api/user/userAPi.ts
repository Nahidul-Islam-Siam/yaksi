// redux/api/userApi.ts
import { TApiResponse, TUser } from "@/type/type";
import baseApi from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // ✅ Get all users
    getAllUsers: builder.query<
      TApiResponse<TUser[]>,
      { page?: number; limit?: number; searchTerm?: string }
    >({
      query: ({ page, limit, searchTerm }) => ({
        url: "/auth/getAll/user",
        method: "GET",
        params: {
          page,
          limit,
          searchTerm: searchTerm || undefined,
        },
      }),
      providesTags: ["User"],
    }),

    // ✅ Get user by ID
    getUserById: builder.query<TApiResponse<TUser>, string>({
      query: (id) => ({
        url: `/auth/getUser/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // ✅ Delete user (must be a mutation)
    deleteUser: builder.mutation<TApiResponse<TUser>, string>({
      query: (id) => ({
        url: `/auth/delete/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// ✅ Export hooks
export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
} = userApi;
