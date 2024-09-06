"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaStore } from 'react-icons/fa';

const carouselItems = [
  { id: 1, imageUrl: '/images/img1.jpg', title: 'Slide 1', body: 'Description for Slide 1' },
  { id: 2, imageUrl: '/images/img6.jpg', title: 'Slide 2', body: 'Description for Slide 2' },
  { id: 3, imageUrl: '/images/img4.png', title: 'Slide 3', body: 'Description for Slide 3' },
  { id: 4, imageUrl: '/images/img7.jpg', title: 'Slide 4', body: 'Description for Slide 4' },

];

export const Cards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    const numCardsToShow = screenWidth >= 1024 ? 4 : screenWidth >= 768 ? 2 : 1;
    const newIndex = (currentIndex + numCardsToShow) % carouselItems.length;
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    const numCardsToShow = screenWidth >= 1024 ? 4 : screenWidth >= 768 ? 2 : 1;
    const newIndex =
      (currentIndex - numCardsToShow + carouselItems.length) % carouselItems.length;
    setCurrentIndex(newIndex);
  };

  if (!isHydrated) return null;

  const numCardsToShow = screenWidth >= 1024 ? 4 : screenWidth >= 768 ? 2 : 1;
  const displayedItems = [];

  // Ensuring that displayed items wrap around
  for (let i = 0; i < numCardsToShow; i++) {
    displayedItems.push(carouselItems[(currentIndex + i) % carouselItems.length]);
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
 
    <div className="flex justify-between items-center mb-4 pt-3 pr-[10px] pl-[10px]">
      <h2 className="sm:text-sm md:text-3xl text-[#224b88]">OUR PRODUCTS</h2>
      <div className="hidden sm:flex items-center">
        <Link href="/game-store" className="text-[#224b88] font-bold">
        &#8594; Go to Game Store
        </Link>
      </div>
      <div className="flex sm:hidden items-center">
        <Link href="/game-store" className="text-[#224b88]">
         <FaStore/>
        </Link>
      </div>
    </div>

  

 
      <div className="relative">
        <div className="flex justify-between">
          {displayedItems.map((item) => (
            <div key={item.id} className="w-full lg:w-1/4 md:w-1/2 sm:w-full px-2 ">
              <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-200 rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-lg">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="w-full h-full object-cover rounded-lg"
                  priority
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

       
        {screenWidth < 1024 && (
  <div className="flex justify-between items-center absolute inset-0 lg:hidden">
    <button onClick={handlePrev} className="p-2 bg-white text-black rounded-full">
      <FaArrowLeft size={24} />
    </button>
    <button onClick={handleNext} className="p-2 bg-white text-black rounded-full">
      <FaArrowRight size={24} />
    </button>
  </div>
)}

      </div>
    </div>
  );
};
