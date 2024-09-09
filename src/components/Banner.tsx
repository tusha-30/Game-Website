"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const banners = [
  {
    imgSrc: '/images/Banner.jpg',
    fallbackSrc: '/images/fallback.jpg',
    title: 'Explore Our Game Store',
    description: 'Discover the latest games and accessories for your favorite platform.',
    link: '/game-store',
  },
  {
    imgSrc: '/images/Banner2.jpg',
    fallbackSrc: '/images/fallback.jpg',
    title: 'Explore Our Game Store',
    description: 'Discover the latest games and accessories for your favorite platform.',
    link: '/game-store',
  },
];

const Banner: React.FC = () => {
  return (
    <div className="mb-[20px]">
      {banners.map((banner, index) => (
        <div key={index} className="banner-container flex flex-col lg:flex-row items-center justify-between p-2 sm:p-4 lg:p-8 mt-[20px]">
          <div className="image-container w-full lg:w-1/2 rounded-lg hover:scale-105 transition-transform duration-300">
            <Image
              src={banner.imgSrc}
              alt="Banner Image"
              width={500}
              height={300}
              className="w-full h-auto object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = banner.fallbackSrc;
              }}
            />
          </div>
          <div className="content-container w-full lg:w-1/2 mt-4 lg:mt-0 lg:ml-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold mb-4">{banner.title}</h1>
            <p className="text-lg mb-6">{banner.description}</p>
            <Link href={banner.link}>
              <span className="px-6 py-3 bg-[#051c3f] text-white rounded-lg hover:bg-[#214070] transition-colors mb-[10px]">
                Explore More
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
