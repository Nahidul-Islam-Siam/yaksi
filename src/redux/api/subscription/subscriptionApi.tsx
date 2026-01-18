// redux/api/subscription/subscriptionApi.ts
import baseApi from "../baseApi"; // your existing baseApi (axios/fetch wrapper)

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation<
      { Data: { url_Link: string }[] }, // Response type from your API
      { memberShipPlanId: string; signUpFee: number; refundableDeposit: number } // Request payload
    >({
      query: (body) => ({
        url: "/subscribe",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubscribeMutation } = subscriptionApi;
