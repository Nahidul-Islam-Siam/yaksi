import baseApi from "../baseApi";

export interface ImageResponse {
  success: boolean;
  message: string;
  Data: { _id: string; images: string }[];
}

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createImage: builder.mutation<ImageResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("image", file);

        return {
          url: "/jet/create/gallary",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Gallery"],
    }),

    getAllImages: builder.query<ImageResponse, void>({
      query: () => ({
        url: "/jet/gallary/get",
        method: "GET",
      }),
      providesTags: ["Gallery"],
    }),
    // Delete mutation
    deleteImage: builder.mutation<ImageResponse, string>({
      query: (id) => ({
        url: `/jet/gallary/delete/${id}`, // your API endpoint
        method: "DELETE",
      }),
      invalidatesTags: ["Gallery"], // invalidate gallery so getAllImages refetches
    }),
  }),
});

export const { useCreateImageMutation, useGetAllImagesQuery ,useDeleteImageMutation } = galleryApi;
