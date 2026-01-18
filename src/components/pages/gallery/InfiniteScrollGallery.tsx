"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import { Modal } from "antd";

import { Container } from "@/components/shared/Container/Container";
import { useGetAllImagesQuery } from "@/redux/api/gallery/galleryApi";

const BATCH = 10;

export default function InfiniteScrollGallery() {
  const { data: allImages, isLoading } = useGetAllImagesQuery();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [images, setImages] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");

  const load = async () => {
    if (loading || !allImages?.Data) return;
    setLoading(true);

    const next = allImages.Data.slice(0, (page + 1) * BATCH);
    setImages(next);
    setPage(page + 1);
    setHasMore(next.length < allImages.Data.length);

    setLoading(false);
  };

  useEffect(() => {
    if (allImages?.Data) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allImages]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-28">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00AEEF]"></div>
      </div>
    );
  }

  const openModal = (imgSrc: string) => {
    setCurrentImage(imgSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImage("");
  };

  return (
    <Container className="!pt-0">
      <InfiniteScroll
        dataLength={images.length}
        next={load}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center items-center py-28">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00AEEF]"></div>
          </div>
        }
        style={{ overflow: "hidden" }}
      >
        <div className="columns-2 md:columns-3 gap-2">
          {images.map((img, index) => {
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
                key={img.id}
                className={`${randomHeight} mb-1 break-inside-avoid relative cursor-pointer group`}
                onClick={() => openModal(img?.images?.[0] || "")}
              >
                <Image
                  src={img?.images?.[0] || ""}
                  alt={`img-${img.id}`}
                  fill
                  className="object-cover group-hover:opacity-90 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-opacity-10 transition-all duration-200" />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>

      {/* Full Image Modal */}
      <Modal
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width={700}
        wrapClassName="image-modal"
        styles={{
          body: {
            padding: 0,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        closable={false} // hide default AntD close button
      >
        {currentImage && (
          <div className="relative w-full max-w-[700px] h-[80vh] flex justify-center items-center">
            {/* Close Button */}

            {/* Image */}
            <Image
              src={currentImage}
              alt="Large view"
              fill
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        )}
      </Modal>
    </Container>
  );
}
