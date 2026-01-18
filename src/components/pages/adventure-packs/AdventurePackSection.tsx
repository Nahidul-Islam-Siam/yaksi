"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Components & data
import AdventureCard from "@/components/cards/AdventureCard";
import { Container } from "@/components/shared/Container/Container";
import Link from "next/link";
import {
  TAdventurePack,
  useGetAllAdventurePacksQuery,
} from "@/redux/api/adventurePack/adventurePackApi";

const AdventurePackSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { data: allAdventurePacks = [], isLoading } =
    useGetAllAdventurePacksQuery({});

  const handleBooking = (pack: TAdventurePack) => {
    console.log("Booking adventure pack:", pack);
    // router.push(`/adventure-packs/${pack._id}/book`);
  };

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 lg:py-20 xl:py-28 2xl:py-32 bg-white">
        <Container>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00AEEF]"></div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl xl:text-4xl font-bold text-gray-900 mb-6">
            What is an <span className="text-[#00AEEF]">Adventure Pack?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Owning a Jet Ski sounds great... until you add up the cost, time,
            and responsibility. With JetXClub, you get all the fun and freedom
            of riding without the downsides of ownership.
          </p>
        </div>

        {/* Adventure Packs Swiper */}
        {allAdventurePacks.length > 0 && (
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet !w-3 !h-3 !bg-slate-300 !opacity-100 transition-all duration-200 !mx-2",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-[#00AEEF] !w-8 !rounded-full",
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 24 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            loop={allAdventurePacks.length > 3}
            className="!pb-16 !pt-2"
          >
            {allAdventurePacks.map((pack) => (
              <SwiperSlide key={pack._id} className="cursor-pointer">
                <AdventureCard
                  packId={pack._id}
                  title={pack.title}
                  discountPercentage={pack.discountPercentage}
                  ridesPricing3={pack.ridesPricing3}
                  ridesPricing5={pack.ridesPricing5}
                  ridesPricing10={pack.ridesPricing10}
                  refundAmount={pack.refundAmount}
                  image={pack.images?.[0]}
                  isDashboard={false}
                  onClick={() => handleBooking(pack)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Call-to-Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-700">
            Still looking for more?{" "}
            <Link
              href="/membership-plans"
              className="text-[#00AEEF] font-semibold hover:text-[#00AEEF]/80 transition-colors duration-200"
            >
              Become a member
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default AdventurePackSection;
