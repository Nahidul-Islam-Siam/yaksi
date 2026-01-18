"use client";

import Image from "next/image";
import { Container } from "@/components/shared/Container/Container";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useGetAllImagesQuery } from "@/redux/api/gallery/galleryApi";

interface MasonrySquareGalleryProps {
  maxImages?: number;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function MasonrySquareGallery({
  maxImages = 6,
}: MasonrySquareGalleryProps) {
  const router = useRouter();
  const { data: allImages, isLoading } = useGetAllImagesQuery();

  // Take only the first maxImages images from API
  const images = allImages?.Data?.slice(0, maxImages) || [];

  if (isLoading) {
    return (
      <div className="bg-white">
        <Container>
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00AEEF]"></div>
          </div>
        </Container>
      </div>
    );
  }

  if (maxImages === 6) {
    return (
      <div className="bg-white">
        <Container className="flex flex-col items-center gap-8 lg:gap-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-center">
            Gallery
          </h2>
          <div className="grid grid-cols-3 gap-2 h-48 sm:h-96 md:h-[640px] w-full">
            <div className="flex flex-col gap-2">
              {images[0] && (
                <div className="relative h-16 sm:h-32 md:h-64 rounded-lg overflow-hidden cursor-pointer group">
                  <Image
                    src={images[0]?.images?.[0] || ""}
                    alt={`Gallery image ${images[0]?._id}`}
                    fill
                    className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              )}
              {images[1] && (
                <div className="relative flex-1 rounded-lg overflow-hidden cursor-pointer group">
                  <Image
                    src={images[1]?.images?.[0] || ""}
                    alt={`Gallery image ${images[1]?._id}`}
                    fill
                    className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {images[2] && (
                <div className="relative h-8 sm:h-16 md:h-40 rounded-lg overflow-hidden cursor-pointer group">
                  <Image
                    src={images[2]?.images?.[0] || ""}
                    alt={`Gallery image ${images[2]?._id}`}
                    fill
                    className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              )}
              {images[3] && (
                <div className="relative h-12 sm:h-20 md:h-48 rounded-lg overflow-hidden cursor-pointer group">
                  <Image
                    src={images[3]?.images?.[0] || ""}
                    alt={`Gallery image ${images[3]?._id}`}
                    fill
                    className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              )}
              {images[4] && (
                <div className="relative flex-1 rounded-lg overflow-hidden cursor-pointer group">
                  <Image
                    src={images[4]?.images?.[0] || ""}
                    alt={`Gallery image ${images[4]?._id}`}
                    fill
                    className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {images[5] && (
                <div className="relative flex-1 rounded-lg overflow-hidden cursor-pointer group">
                  <Image
                    src={images[5]?.images?.[0] || ""}
                    alt={`Gallery image ${images[5]?._id}`}
                    fill
                    className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              )}
            </div>
          </div>
          <Button
            type="primary"
            size="large"
            className="!bg-[#00AEEF] hover:!bg-[#00AEEF]/80 !border-none h-12 text-base font-semibold rounded-md"
            onClick={() => router.push("/gallery")}
          >
            See More
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="columns-2 sm:columns-3 gap-2">
          {images.map((img, index) => (
            <div
              key={img?._id}
              className={`relative mb-2 break-inside-avoid cursor-pointer group rounded-lg overflow-hidden ${getRandomHeight(
                index
              )}`}
            >
              <Image
                src={img?.images?.[0] || ""}
                alt={`Gallery image ${img?._id}`}
                fill
                className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-300"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

function getRandomHeight(index: number): string {
  const heights = [
    "h-24",
    "h-32",
    "h-28",
    "h-36",
    "h-20",
    "h-40",
    "h-24",
    "h-32",
  ];
  return heights[index % heights.length];
}
