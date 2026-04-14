"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "../../assets/hero/hero1.png";
import hero2 from "../../assets/hero/hero2.png";
import Image from "next/image";

const heroSlides = [
  {
    id: 1,
    title: "Improve Motivation and Performance for customer satisACTion",
    description: "Empowering Every Voice to Deliver Better Service",
    image: hero1,
  },
  {
    id: 2,
    title: "NEED MORE HELP?",
    description:
      "If you experience or see any violations a twork, you can also seek for help through Telkomsel’s RWP (Respectful Workplace Program)",
    image: hero2,
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
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out lg:py-0 py-12"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroSlides.map((slide) => (
            <div
              key={slide.id}
              className="w-full relative lg:h-172 items-center justify-center min-w-full grid lg:grid-cols-2"
            >
              <div className="justify-center items-center lg:hidden flex">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  className=" object-contain"
                />
              </div>
              <div className="relative z-10 text-start space-y-6 px-4 max-w-4xl md:mx-24">
                <h1 className="text-4xl  xl:text-6xl font-bold text-[#5a5a72]">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-black">
                  {slide.description}
                </p>
              </div>
              <div className="justify-center items-center lg:flex hidden">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  className="w-[750px] h-[700px] object-contain"
                />
              </div>
              <p className="hidden lg:flex text-lg md:text-2xl text-black font-semibold absolute bottom-6  italic w-full text-center justify-center items-center mb-8">
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
