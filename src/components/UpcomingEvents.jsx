"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Icons } from "@/components/icons";

const events = [
  {
    title: "AI Workshop Series",
    date: "July 15-17, 2023",
    description: "A three-day intensive workshop on Artificial Intelligence and its applications."
  },
  {
    title: "Hackathon 2023",
    date: "August 5-6, 2023",
    description: "48-hour coding challenge to solve real-world problems. Amazing prizes to be won!"
  },
  {
    title: "Cybersecurity Summit",
    date: "September 10, 2023",
    description: "Learn about the latest cybersecurity threats and how to protect digital assets."
  },
  {
    title: "Web3 & Blockchain Expo",
    date: "October 22-24, 2023",
    description: "Explore decentralized technologies, smart contracts, and NFTs."
  },
];

export default function EventCarousel() {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 mt-20">
      <div className="w-full max-w-6xl px-4 relative">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Upcoming Events
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          loop={true}
          className="w-full"
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="relative min-h-[320px] flex flex-col justify-between backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl mb-10">
        
                <div className="mt-12 text-center">
                  <h3 className="text-2xl font-semibold text-white">{event.title}</h3>
                  <p className="text-lg text-gray-300 mt-2">{event.date}</p>
                  <p className="text-base text-gray-400 mt-4">{event.description}</p>
                </div>
                <div className="mt-4 flex justify-center">
                  <button className="bg-gradient-to-r from-indigo-400 to-blue-500 text-white px-5 py-2 rounded-full font-semibold hover:scale-105 transition-all">
                    Register Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
