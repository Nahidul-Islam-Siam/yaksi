"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import components
import RentCard from "@/components/cards/RentCard";
import { Container } from "@/components/shared/Container/Container";
import BookingModal from "@/components/modals/BookingModal";
import { useGetAllRentsQuery } from "@/redux/api/rent/rentApi";

// Import your RTK Query hook

const FromSunriseToSunsetSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { data: allTheRents, isLoading, isError } = useGetAllRentsQuery();
  const rents = allTheRents?.Data || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedRent, setSelectedRent] = useState<any | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReservation = (rent: any) => {
    setSelectedRent(rent);
    setBookingOpen(true);
  };

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 lg:py-20 xl:py-28 2xl:py-32 bg-black">
        <Container>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00AEEF]"></div>
          </div>
        </Container>
      </section>
    );
  }

  if (isError || rents.length === 0) {
    return (
      <section className="py-12 md:py-16 lg:py-20 xl:py-28 2xl:py-32 bg-black">
        <Container>
          <div className="text-center text-white">
            <p>No rentals available at the moment. Please check back later.</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl xl:text-4xl font-bold text-white mb-4">
            From Sunrise, <span className="text-[#00AEEF]">To Sunset</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Owning a Jet Ski sounds great... until you add up the cost, time,
            and responsibility.
          </p>
        </div>

        {/* Rents Swiper */}
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
          loop={rents.length > 3}
          className="!pb-16 !pt-2"
        >
          {rents.map((rent) => (
            <SwiperSlide key={rent._id} className="cursor-pointer">
              <RentCard
                rent={rent}
                isDashboard={false}
                onButtonClick={handleReservation}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {selectedRent && (
        <BookingModal
          open={bookingOpen}
          onClose={() => setBookingOpen(false)}
          rentId={selectedRent._id}
          jetName={selectedRent.jet_skyId?.name}
          jetHp={selectedRent.jet_skyId?.hp}
          jetPrice={selectedRent.jet_skyId?.price}
        />
      )}
    </section>
  );
};

export default FromSunriseToSunsetSection;
