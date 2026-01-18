"use client";

import { useState } from "react";
import { Button, Spin, UploadFile } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";

import UploadImageModal from "@/components/modals/UploadImageModal";
import ViewImageModal from "@/components/modals/ViewImageModal";
import {
  useDeleteImageMutation,
  useGetAllImagesQuery,
} from "@/redux/api/gallery/galleryApi";
import { Container } from "@/components/shared/Container/Container";
import { toast } from "sonner";

export default function Gallery() {
  const [upOpen, setUpOpen] = useState(false);
  const [fileList, setFile] = useState<UploadFile[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [view, setView] = useState<any | null>(null);

  // Fetch images via RTK Query
  const { data: allImages, isLoading, refetch } = useGetAllImagesQuery();

  const [deleteImage] = useDeleteImageMutation();

  const images = allImages?.Data || [];

  /* delete image */
  const del = async () => {
    if (!view) return;

    try {
      await deleteImage(view._id).unwrap(); // call delete mutation
      toast.success("Image deleted successfully!"); // success toast
      setView(null); // close the modal
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete image"); // error toast
    }
  };

  if (isLoading) {
    return (
      <section className="pb-12 md:pb-16 lg:pb-20 xl:pb-28">
        <Container className="bg-white rounded-xl">
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        </Container>
      </section>
    );
  }
  return (
    <div className="min-h-screen bg-white py-6">
      {/* header */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-0 justify-between mb-10">
        <h2 className="text-2xl font-bold text-[#00AEEF]">Gallery</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="w-full sm:w-auto !px-6 !h-12 font-medium !rounded-full"
          style={{ backgroundColor: "#0EA5E9", borderColor: "#0EA5E9" }}
          onClick={() => setUpOpen(true)}
        >
          Add Image
        </Button>
      </div>

      {/* masonry grid + infinite scroll */}
      <InfiniteScroll
        dataLength={images?.length}
        next={refetch} // Load more by refetching
        hasMore={false} // disable if backend does not support pagination
        loader={<Spin className="w-full flex justify-center py-6" />}
        style={{ overflow: "hidden" }}
      >
        <div className="columns-2 md:columns-3 gap-2">
          {images?.map((img, index) => {
            const heights = [
              "h-48",
              "h-56",
              "h-64",
              "h-72",
              "h-80",
              "h-96",
              "h-40",
              "h-52",
              "h-60",
              "h-68",
              "h-76",
              "h-84",
            ];
            const randomHeight = heights[index % heights.length];

            return (
              <div
                key={img?._id}
                className={`${randomHeight} mb-1 break-inside-avoid relative cursor-pointer group`}
                onClick={() => setView(img)}
              >
                <Image
                  src={img?.images?.[0] || ""}
                  alt={`img-${img?._id}`}
                  fill
                  className="object-cover group-hover:opacity-90 transition-opacity duration-200"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-opacity-10 transition-all duration-200" />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>

      {/* modals */}
      <UploadImageModal
        open={upOpen}
        fileList={fileList}
        onChange={({ fileList }) => setFile(fileList)}
        onCancel={() => setUpOpen(false)}
      />

      <ViewImageModal
        open={!!view}
        imageSrc={view?.images?.[0]}
        onDelete={del}
        onClose={() => setView(null)}
      />
    </div>
  );
}
