import { baseApi } from '../baseApi';
import { setCredentials, logout } from '../../services/user/authSlice';
import { AdminRegisterRequest, ChangePasswordRequest, JWTPayload, LoginRequest, TApiResponse, TUser, UpdateUserRequest, UserRegisterRequest } from '@/type/type';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { verify } from 'crypto';

interface ForgotPasswordResponse {
  email: string;
  message: string;
}

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // User Registration
        registerUser: builder.mutation<TApiResponse<TUser[]>, UserRegisterRequest>({
            query: (data) => ({
                url: '/auth/user/register',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),

        // Administrator Registration
        registerAdmin: builder.mutation<TApiResponse<TUser[]>, AdminRegisterRequest>({
            query: (data) => ({
                url: '/auth/administrator/register',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        
forgotPassword: builder.mutation<
  { success: boolean; statusCode: number; message: string; Data: ForgotPasswordResponse },
  { email: string }
>({
  query: ({ email }) => ({
    url: '/auth/forgot-password',
    method: 'POST',
    body: { email },
  }),
  
  invalidatesTags: ['User'],
}),

verifyOtp: builder.mutation<
  { success: boolean; statusCode: number; message: string; Data: ForgotPasswordResponse },
  { email: string; otp: string }
>({
  query: ({ email, otp }) => ({
    url: '/auth/verify-otp',
    method: 'POST',
    body: { email, otp },
  }),
}),
        // Login (works for both user and admin)
        login: builder.mutation<TApiResponse<string[]>, LoginRequest>({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.success && data.Data.length > 0) {
                        const token = data.Data[0]; // Token is in Data array

                        // Decode JWT to get user info
                        const decoded = jwtDecode<JWTPayload>(token);

                        // Set cookie
                        Cookies.set('access-token', token, {
                            expires: 7,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'strict',
                        });

                        // Update Redux state automatically
                        dispatch(setCredentials({
                            user: {
                                _id: decoded.id,
                                name: '',
                                email: decoded.userEmail,
                                phone: '',
                                role: decoded.role,
                                createdAt: '',
                                updatedAt: '',
                            },
                            accessToken: token,
                        }));
                    }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    if (error?.data?.message) {
                        toast.error(error.data.message);
                    }
                }
            },
            invalidatesTags: ['Auth'],
        }),

        // Get All Users
        getAllUsers: builder.query<TApiResponse<TUser[]>, void>({
            query: () => '/auth/getAll/user',
            providesTags: ['User'],
        }),

        // Get Single User
        getUserById: builder.query<TApiResponse<TUser>, string>({
            query: (userId) => `/auth/getUser/${userId}`,
            providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
        }),

        // Update User (using FormData for multipart/form-data)
        updateUser: builder.mutation<
            TApiResponse<TUser>,
            { userId: string; userData: UpdateUserRequest }
        >({
            query: ({ userId, userData }) => {
                const formData = new FormData();

                Object.entries(userData).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        if (key === 'image' && value instanceof File) {
                            formData.append('image', value);
                        } else {
                            formData.append(key, value.toString());
                        }
                    }
                });

                return {
                    url: `/auth/update/user/${userId}`,
                    method: 'PATCH',
                    body: formData,
                };
            },
            invalidatesTags: (result, error, { userId }) => [
                { type: 'User', id: userId },
                'User',
            ],
        }),

        changePassword: builder.mutation<
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            TApiResponse<any>,
            { userId: string; passwordData: ChangePasswordRequest }
        >({
            query: ({ userId, passwordData }) => ({
                url: `/auth/changePassword/${userId}`,
                method: 'PATCH',
                body: passwordData,
            }),
            invalidatesTags: ['Auth'],
        }),

        // Delete User
        deleteUser: builder.mutation<TApiResponse<TUser>, string>({
            query: (userId) => ({
                url: `/auth/delete/user/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),

        // Logout (client-side only, no API call needed based on your docs)
        logout: builder.mutation<void, void>({
            queryFn: () => ({ data: undefined }),
            async onQueryStarted(arg, { dispatch }) {
                dispatch(logout());
            },
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useRegisterAdminMutation,
    useLoginMutation,
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useChangePasswordMutation, // ✅ Export the new hook
    useDeleteUserMutation,
    useLogoutMutation,
    useForgotPasswordMutation
} = authApi;

// Export the interface for use in components
export type { ChangePasswordRequest };