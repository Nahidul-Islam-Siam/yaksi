"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Container } from '@/components/shared/Container/Container';

export default function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Ensure video plays on mount
        if (videoRef.current) {
            videoRef.current.play().catch(console.error);
        }
    }, []);

    return (
      <section className="relative w-full h-[35rem] lg:h-[40rem] 2xl:h-[45rem] overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={`/videos/banner-video.mp4`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/home/hero-poster.jpg" // Optional poster image
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <Container className="relative z-10 flex flex-col justify-end items-start h-full w-11/12 2xl:w-[88%] max-w-[105.6rem] !px-0">
          <div>
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-bold text-white leading-none mb-6 sm:mb-8 md:mb-12">
              <span className="text-[#00AEEF] drop-shadow-lg">Your ski.</span>
              <br />
              <span className="drop-shadow-lg">Anytime, Anywhere.</span>
            </h1>

            {/* Call-to-Action Button */}
            <Link href="/membership-plans">
              <button className="inline-flex items-center px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 cursor-pointer bg-[#00AEEF] hover:bg-[#00AEEF]/80 text-white font-bold text-base sm:text-lg md:text-xl rounded-lg transition-all duration-300 shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105">
                Become a JetX Member
                <svg
                  className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </Container>
      </section>
    );
}