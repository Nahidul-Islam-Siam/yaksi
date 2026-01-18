import { baseApi } from "../baseApi";

// Correct response and request types
export interface ContactResponse {
  success: boolean;
  statusCode: number;
  message: string;
  Data: {
    accepted: string[];
    rejected: string[];
    ehlo: string[];
    envelopeTime: number;
    messageTime: number;
    messageSize: number;
    response: string;
    envelope: {
      from: string;
      to: string[];
    };
    messageId: string;
  };
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

// Enhanced API slice
export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation<ContactResponse, ContactRequest>({
      query: (body) => ({
        url: "/contactForm/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

// Export correct hook
export const { useCreateContactMutation } = contactApi;