import { TUser } from "@/type/type";
import { TAdventurePack } from "../adventurePack/adventurePackApi";
import baseApi from "../baseApi";

// Adventure Pack Purchase type
export interface TAdventurePackPurchase {
  _id: string;
  userId: TUser | null;
  adventurePackId: TAdventurePack;
  model: string;
  ridesNumber: number;
  purchesCredits: number;
  remainingCredits: number;
  type: "onetime" | "subscription";
  stripePaymentIntentId: string;
  startDate: string;
  expiryDate: string;
  status: string;
  price: number;
  totalPrice: number;
  refundableDeposit: number;
  refundableBound: boolean;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

// Meta info for pagination
interface TMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

// API response type
interface TGetAdventurePackPurchasesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: TMeta;
  Data: TAdventurePackPurchase[];
}

// RTK Query
export const adventurePackPurchase = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create adventure pack purchase
    createAdventurePackPurchase: builder.mutation<
      TAdventurePackPurchase,
      Partial<TAdventurePackPurchase>
    >({
      query: (body) => ({
        url: "/booking/purchase/adventurePack",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdventurePack"],
    }),

    // Get all adventure pack purchases
    getAllAdventurePackPurchase: builder.query<
      TGetAdventurePackPurchasesResponse,
      void
    >({
      query: () => ({
        url: "/booking/purchase/adventurePack/get",
        method: "GET",
      }),
      providesTags: ["AdventurePack"],
    }),
  }),
});

// Export hooks
export const {
  useCreateAdventurePackPurchaseMutation,
  useGetAllAdventurePackPurchaseQuery,
} = adventurePackPurchase;
