"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


interface CarouselItem  {
  id: number;
  imageUrl: string;
  title: string;
  body: string;
};

interface CarouselProps {
  items: CarouselItem[];  
  autoPlay?: boolean;    
  interval?: number;    
}

export const Carousell = ({ items, autoPlay = true, interval = 3000 }:CarouselProps) =>{
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (autoPlay && isHydrated) {
      const timer = setInterval(() => {
        handleNext();
      }, interval);
      return () => clearInterval(timer);
    }
  }, [currentIndex, autoPlay, interval, isHydrated]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!isHydrated) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col">
      <div className="rounded-lg relative">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full h-64 sm:h-72 md:h-96 lg:h-[500px] ${index === currentIndex ? 'block' : 'hidden'}`}
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ position: 'absolute', height: '100%', width: '100%' }}
              priority
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex justify-between items-center lg:top-[250px] md:top-[200px] top-[120px]">
        <button onClick={handlePrev} className="px-4 py-2 text-white">
          <FaArrowLeft size={24} />
        </button>
        <button onClick={handleNext} className="px-4 py-2 text-white">
          <FaArrowRight size={24} />
        </button>
      </div>

      <div className="flex justify-center z-[333] relative left-1/2 transform -translate-x-1/2 lg:top-[450px] md:top-[350px] top-[220px]">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 mx-1 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-400'}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

