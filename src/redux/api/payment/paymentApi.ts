import baseApi from "../baseApi";

// Query parameters
interface GetAllPaymentsParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

// Response type
interface PaymentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Data: any[]; // Replace 'any' with proper Payment type if needed
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query<PaymentResponse, GetAllPaymentsParams | void>(
      {
        query: ({ page, limit, searchTerm } = {}) => ({
          url: "/payment/get",
          params: { page, limit, searchTerm },
        }),
        providesTags: ["Payment"],
      }
    ),
  }),
});

// Export the auto-generated hook
export const { useGetAllPaymentsQuery } = paymentApi;
