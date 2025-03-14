"use client"
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react";

const teamMembers = [
  {
    name: "Jane Smith",
    role: "Vice President",
    image: "/p2.jpg",
  },
  {
    name: "Sophia Lee",
    role: "Marketing Manager",
    image: "/p5.jpg",
  },
  {
    name: "Alex Johnson",
    role: "Event Coordinator",
    image: "/p3.jpg",
  },
  {
    name: "Michael Brown",
    role: "Technical Lead",
    image: "/p6.jpg",
  },
  {
    name: "Emily Davis",
    role: "Designer",
    image: "/p4.jpg",
  },
  {
    name: "Wafiqa Irn",
    role: "Club President",
    image: "/p9.jpg",
  },
  {
    name: "Chris Evans",
    role: "Project Manager",
    image: "/p7.jpg",
  },
  {
    name: "John Doe",
    role: "Club President",
    image: "/p1.jpg",
  },
  {
    name: "Ms. Sim",
    role: "Club President",
    image: "/p8.jpg",
  },
];

const AboutPage = () => {
    return (
        <div className='mt-16'>
            <div className="text-center">
                <div data-aos="fade-up" data-aos-duration="2000">
                    <h2 className='text-center text-5xl font-bold primary-text'>About Us</h2>
                    <svg width="500" height="60" viewBox="0 0 200 40" className="hidden md:block  mx-auto" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 20 30 Q 100 0 180 30" stroke="url(#gradient)" strokeWidth="4" fill="transparent" />
                        <defs>
                        <linearGradient id="gradient" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#4f46e5" /> 
                          <stop offset="50%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>

                        </defs>
                    </svg>
                </div>
            </div>

            <div className="mt-20 ">
                <div className="relative">
                    <div className="z-10 lg:h-[440px] md:w-2/5 bg-indigo-500 absolute md:rounded-r-lg"></div>
                    <div className="flex flex-col md:flex-row justify-evenly pt-12 items-center">

                        <div data-aos="fade-up" data-aos-duration="1000" className="z-30 w-full md:w-[500px] h-[350px]">
                            <img src='/ab9.jpg' alt="Picture of the author" className="rounded-lg h-[350px] shadow-md" />
                        </div>

                        <div className="text-center md:ml-8 ">
                            <div data-aos="fade-up" data-aos-duration="600">
                                <h3 className="text-4xl mt-6 md:mt-0">Our Mission</h3>
                                <p className="text-gray-300 my-7 leading-8">The Polytechnic Computer Club is dedicated to fostering <br /> a community of tech enthusiasts, providing opportunities for <br /> learning, collaboration, and professional growth in the field of <br /> computer science and technology.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2nd */}
            <div className="mt-32 md:mt-32">
                <div className="relative">
                    <div className="z-10 md:h-[300px] lg:h-[370px] w-full md:w-[400px] bg-purple-600/35 absolute md:right-0 md:rounded-l-lg"></div>
                    <div className="flex flex-col-reverse md:flex-row justify-evenly pt-12 items-center">
                        <div className="text-center md:mr-8">
                            <div data-aos="fade-up" data-aos-duration="1000">
                                <h3 className="text-4xl mt-6 md:mt-0">Our History</h3>
                                <p className="text-gray-300 my-7 leading-8">
                                Founded in 2010, our club has grown from a small <br /> group of passionate students to a thriving community of<br />  over 500 members.  We've organized numerous <br /> workshops, hackathons, and tech talks, connecting students<br />  with industry professionals and cutting-edge technologies.
                                </p>
                            </div>
                        </div>
                        <div data-aos="fade-up" data-aos-duration="800" className="z-30 w-full md:w-[400px] ">
                            <img src='/ab1.jpg' width={500} height={500} alt="Picture of the author" className="rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 3rd */}
            <div className="mt-32">
                <div className="relative">
                    <div className="z-10 lg:h-[450px] w-full md:w-2/5 bg-blue-500/60 absolute md:rounded-r-lg"></div>
                    <div className="flex flex-col md:flex-row justify-evenly pt-12 items-center">
                        <div data-aos="fade-up" data-aos-duration="1000" className="z-30 w-full md:w-[550px] h-[350px] ">
                            <img src='/ab5.jpg' width={500} height={500} alt="Picture of the author" className="rounded-lg h-full" />
                        </div>
                        
                        <div className="text-center md:ml-8">
                            <div data-aos="fade-up" data-aos-duration="1000">
                            <h3 className="text-4xl mt-6 md:mt-0">Our Track Record</h3>
                            <p className="text-gray-300 my-7 leading-8"> Since our founding, our computer club has hosted numerous <br /> workshops, hackathons, and tech events, fostering innovation <br /> and nurturing future leaders in the tech community.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-40 mb-20 text-center px-5 md:px-0">
              <h2 className="text-5xl font-bold mb-4">Our Team</h2>
              <p className="text-lg text-gray-400 mb-10">Meet Our Exceptionally Talented and Creative Team Members!</p>
              <div className="grid grid-cols-3 md:flex md:justify-center md:items-center gap-4">
                {teamMembers.map((member, index) => (
                <div key={index} className="relative group w-28 h-40 flex items-center justify-center overflow-hidden rounded-full">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-center p-2 transition-opacity duration-300">
                    <p className="text-sm font-bold">{member.name}</p>
                    <p className="text-xs">{member.role}</p>
                </div>
            </div>
        ))}
    </div>
</div>

        </div>
    );
};

export default AboutPage;
