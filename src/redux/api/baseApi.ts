import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://jet-sky-backend.vercel.app/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.accessToken;
    headers.set("Accept", "application/json");
    if (token) {
      headers.set("Authorization", token);
    }
    return headers;
  },
  credentials: "include",
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [
    "Auth",
    "Gallery",
    "Booking",
    "User",
    "JetSki",
    "Payment",
    "Rent",
    "MemberShip",
    "AdventurePack",
    "Contact"
  ],
  endpoints: () => ({}),
});

export default baseApi;
