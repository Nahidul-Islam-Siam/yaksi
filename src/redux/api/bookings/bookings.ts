import baseApi from "../baseApi";
import { TApiResponse, TBooking } from "@/type/type"; // adjust paths

export const bookings = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query<
      TApiResponse<TBooking[]>, // API response type
      {
        page?: number;
        limit?: number;
        searchTerm?: string | number;
        sort?: string;
      } // Query args type
    >({
      query: ({ page, limit, searchTerm = "", sort } = {}) => ({
        url: "/booking/get",
        params: { page, limit, searchTerm, sort },
      }),
      providesTags: ["Booking"], // must match your tagTypes in baseApi
    }),
    // delete booking
    deleteBookings: builder.mutation({
      query: (bookingId) => ({
        url: `/booking/delete/${bookingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const { useGetAllBookingsQuery, useDeleteBookingsMutation } = bookings;
