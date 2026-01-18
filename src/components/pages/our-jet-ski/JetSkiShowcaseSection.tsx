"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import JetSkiShowcaseCard from "@/components/cards/JetSkiShowcaseCard";
import { Container } from "@/components/shared/Container/Container";
import { useGetAllJetSkisQuery } from "@/redux/api/jetSki/jetApi";

export default function JetSkiShowcaseSection() {
  const { data, isLoading, isError } = useGetAllJetSkisQuery({});

  const jetSkis = data?.Data || [];

  if (isLoading) {
    return (
      <section className="py-12 lg:py-16 bg-gray-50">
        <Container>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00AEEF]"></div>
          </div>
        </Container>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-12 lg:py-16 bg-gray-50">
        <Container>
          <p className="text-center text-red-500">Failed to load Jet Skis.</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <Container className="max-w-[120rem] overflow-hidden">
        <div className="relative">
          <Swiper
            modules={[FreeMode, Pagination]}
            spaceBetween={24}
            slidesPerView="auto"
            freeMode={{
              enabled: true,
              sticky: false,
              momentum: true,
              momentumRatio: 0.25,
              momentumVelocityRatio: 0.25,
            }}
            grabCursor={true}
            className="jet-ski-swiper"
            breakpoints={{
              320: { slidesPerView: 1.2, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              768: { slidesPerView: 2.5, spaceBetween: 24 },
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
              1280: { slidesPerView: 4.2, spaceBetween: 24 },
            }}
          >
            {jetSkis.map((jetSki) => (
              <SwiperSlide key={jetSki._id || jetSki._id}>
                <JetSkiShowcaseCard jetSki={jetSki} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .jet-ski-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        .jet-ski-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .jet-ski-swiper .swiper-pagination-bullet-active {
          background: #00aeef;
          transform: scale(1.2);
        }
        .jet-ski-swiper .swiper-slide {
          height: auto;
        }
        .jet-ski-swiper {
          overflow: visible;
          padding: 0 20px;
        }
        .jet-ski-swiper .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </section>
  );
}
