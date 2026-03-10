"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Improve Motivation and Performance for customer satisACTion",
    description:
      "Sebuah wadah yang diciptakan untuk mendengar, menyimpan dan menyelesaikan setiap kegelisahan yang kamu miliki. Karena suaramu, berhak didengarkan.",
    image:
      "https://cdn.topkarir.com/production/assets/revamp/images/header/tipskarir.webp",
    tagline: "Empowering Every Voice to Deliver Better Service",
  },
  {
    id: 2,
    title: "NEED MORE HELP",
    description:
      "If you experience or see any violations a twork, you can also seek for help through Telkomsel’s RWP (Respectful Workplace Program)",
    image:
      "https://cdn.topkarir.com/production/assets/revamp/images/header/kewirausahaan.webp",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );

  return (
    <section className="relative w-full">
      <div className="overflow-hidden relative bg-white ">
        <div
          className="flex transition-transform duration-500 ease-in-out bg-white lg:py-0 py-36"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroSlides.map((slide) => (
            <div
              key={slide.id}
              className="w-full shrink-0 relative lg:h-175 items-center justify-center min-w-full grid grid-cols-2"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div className="relative z-10 text-start space-y-6 px-4 max-w-4xl md:mx-24">
                <h1 className="text-4xl lg:text-6xl font-bold text-[#5a5a72]">
                  {slide.title}
                </h1>
                <p className="hidden lg:flex text-lg md:text-2xl text-black">
                  {slide.description}
                </p>
              </div>
              <p className="hidden lg:flex text-lg md:text-2xl text-black font-semibold absolute bottom-6  left-1/2 -translate-x-1/2 -translate-y-1/2 italic">
                {slide.tagline}
              </p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="md:flex hidden absolute left-4 md:left-8 top-1/2 -translate-y-1/2 md:p-3 p-3 rounded-full bg-white shadow-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition border border-gray-100 cursor-pointer z-10"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="md:flex hidden absolute right-4 md:right-8 top-1/2 -translate-y-1/2 md:p-3 p-3 rounded-full bg-white shadow-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition border border-gray-100 cursor-pointer z-10"
        >
          <ChevronRight size={28} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer shadow ${
                currentSlide === idx ? "bg-blue-700 w-6" : "bg-[#5a5a72]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
