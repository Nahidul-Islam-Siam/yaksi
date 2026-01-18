// redux/api/subscription/subscriptionApi.ts
import baseApi from "../baseApi";

export const activeAdventurePack = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adventurePack: builder.mutation<
      {
          sessionUrl: string; Data: { url_Link: string }[] 
}, // Response type
      {
        userId: string;
        adventurePackId: string;
        ridesNumber: number;
        drivingLicense?: string;
        price: number;
        refundableDeposit: number;
      } // Request payload matches your API
    >({
      query: (body) => ({
        url: "/payment/create-pakage",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAdventurePackMutation } = activeAdventurePack;
